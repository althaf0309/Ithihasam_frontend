#!/usr/bin/env bash
#
# Patches the nginx server block that serves ithihasam.in.
#
#   sudo bash fix-nginx.sh
#
# Step 3 of fix-production.sh looked for the literal string "ithihasam" in the
# config and found nothing — the server block is probably named `default`, or
# server_name is `_` or the instance IP. This finds the block by what it does
# rather than what it is called: the one listening on 443, or the one whose
# root points at the frontend build.
#
# Fixes two things:
#   1. Includes the SEO snippet so /robots.txt and /sitemap.xml are served as
#      static files instead of being proxied into Django.
#   2. Rewrites try_files so nginx serves $uri/index.html directly. Letting it
#      resolve $uri as a directory is what emits the 301 that appends a trailing
#      slash, and every canonical tag on the site is the no-slash form.
#
# Backs up before touching anything and rolls back if `nginx -t` fails.

set -euo pipefail

SNIPPET=/etc/nginx/snippets/ithihasam-seo.conf
FRONTEND_DIST=/srv/apps/Ithihasam_frontend/dist
STAMP=$(date +%Y%m%d-%H%M%S)

log()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()   { printf '  \033[1;32m%s\033[0m\n' "$*"; }
warn() { printf '  \033[1;33m%s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31mFAILED: %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || fail "Run with sudo: sudo bash $0"

# ---------------------------------------------------------------- snippet

log "Writing SEO snippet"

mkdir -p "$(dirname "$SNIPPET")"
cat > "$SNIPPET" <<NGINXEOF
# Managed by deploy/fix-nginx.sh — serves SEO files from the frontend build.

location = /robots.txt {
    root ${FRONTEND_DIST};
    default_type text/plain;
    add_header Cache-Control "public, max-age=3600";
    access_log off;
    try_files /robots.txt =404;
}

location = /llms.txt {
    root ${FRONTEND_DIST};
    default_type text/plain;
    add_header Cache-Control "public, max-age=3600";
    access_log off;
    try_files /llms.txt =404;
}

location ~ ^/sitemap(-[a-z-]+)?\.xml\$ {
    root ${FRONTEND_DIST};
    default_type application/xml;
    add_header Cache-Control "public, max-age=3600";
    access_log off;
}

location = /feed.xml {
    root ${FRONTEND_DIST};
    default_type application/rss+xml;
    add_header Cache-Control "public, max-age=3600";
    access_log off;
}

location = /site.webmanifest {
    root ${FRONTEND_DIST};
    default_type application/manifest+json;
    access_log off;
}

location /og/ {
    root ${FRONTEND_DIST};
    expires 30d;
    access_log off;
}
NGINXEOF
ok "$SNIPPET"

# ---------------------------------------------------------------- locate

log "Locating the server block"

CANDIDATES=$(grep -rl --include='*' -E "listen[[:space:]]+443|${FRONTEND_DIST}|proxy_pass.*:8000" \
  /etc/nginx/sites-enabled /etc/nginx/conf.d /etc/nginx/nginx.conf 2>/dev/null | sort -u || true)

[ -n "$CANDIDATES" ] || fail "No nginx config found with listen 443, the dist path, or a :8000 proxy.
  Show me:  ls -la /etc/nginx/sites-enabled/ && sudo nginx -T | head -60"

echo "$CANDIDATES" | sed 's/^/  candidate: /'

# ---------------------------------------------------------------- patch

log "Patching"

PATCHED=""
for CONF in $CANDIDATES; do
  cp "$CONF" "${CONF}.backup-${STAMP}"

  if python3 - "$CONF" "$SNIPPET" "$FRONTEND_DIST" <<'PYEOF'
import re, sys

path, snippet, dist = sys.argv[1], sys.argv[2], sys.argv[3]
conf = open(path).read()
original = conf


def blocks(text):
    """Yield (start, end) spans of each top-level `server { ... }` block."""
    for m in re.finditer(r"\bserver\s*\{", text):
        depth, i = 0, m.end() - 1
        while i < len(text):
            if text[i] == "{":
                depth += 1
            elif text[i] == "}":
                depth -= 1
                if depth == 0:
                    yield m.start(), i + 1
                    break
            i += 1


changed = False
out = []
last = 0

for start, end in blocks(conf):
    body = conf[start:end]

    # The block that actually serves the site: listens on 443, or roots at the
    # frontend build. A plain :80 redirect block needs neither change.
    serves_site = ("listen" in body and "443" in body) or dist in body
    is_redirect_only = "return 301" in body and "location" not in body

    if not serves_site or is_redirect_only:
        continue

    new = body

    # 1. include the snippet once
    if snippet not in new:
        anchor = re.search(r"\n(\s*)(server_name[^;]*;|root[^;]*;|listen[^;]*;)", new)
        if anchor:
            indent = anchor.group(1)
            new = new[: anchor.end()] + f"\n{indent}include {snippet};" + new[anchor.end() :]

    # 2. serve $uri/index.html before nginx resolves $uri as a directory
    new = re.sub(
        r"try_files\s+\$uri\s+\$uri/\s+(/index\.html\s*;)",
        r"try_files $uri $uri/index.html \1",
        new,
    )
    new = re.sub(
        r"try_files\s+\$uri\s+\$uri/index\.html\s+\$uri/\s+(/index\.html\s*;)",
        r"try_files $uri $uri/index.html \1",
        new,
    )

    if new != body:
        out.append(conf[last:start])
        out.append(new)
        last = end
        changed = True

out.append(conf[last:])
conf = "".join(out)

if not changed or conf == original:
    sys.exit(1)

open(path, "w").write(conf)
sys.exit(0)
PYEOF
  then
    ok "patched $CONF"
    PATCHED="$CONF ${PATCHED}"
  else
    rm -f "${CONF}.backup-${STAMP}"
    printf '  skipped %s (no matching server block)\n' "$CONF"
  fi
done

[ -n "$PATCHED" ] || fail "Found candidates but none had a patchable server block.
  Show me:  sudo nginx -T | grep -A40 'listen.*443'"

# ---------------------------------------------------------------- verify

log "Testing config"

if ! nginx -t 2>&1 | tail -2; then
  for CONF in $PATCHED; do
    cp "${CONF}.backup-${STAMP}" "$CONF"
  done
  fail "nginx -t failed — all changes rolled back. Nothing was applied."
fi

systemctl reload nginx
ok "nginx reloaded"
sleep 2

log "Verifying"

check() {
  local path="$1" want="$2" code type
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "https://ithihasam.in${path}")
  type=$(curl -s -o /dev/null -w '%{content_type}' --max-time 15 "https://ithihasam.in${path}")
  if [ "$code" = "200" ] && [[ "$type" == *"$want"* ]]; then
    printf '  \033[1;32mOK  \033[0m%-22s %s  %s\n' "$path" "$code" "$type"
  else
    printf '  \033[1;31mBAD \033[0m%-22s %s  %s\n' "$path" "$code" "$type"
    return 1
  fi
}

STATUS=0
check /robots.txt  "text/plain" || STATUS=1
check /llms.txt    "text/plain" || STATUS=1
check /sitemap.xml "xml"        || STATUS=1
check /feed.xml    "xml"        || STATUS=1
check /api/blog/   "json"       || STATUS=1

printf '\n  sitemap root   : '
curl -s --max-time 15 https://ithihasam.in/sitemap.xml | grep -o '<sitemapindex\|<urlset' | head -1
printf '  /contact code  : '
curl -s -o /dev/null -w '%{http_code}' --max-time 15 https://ithihasam.in/contact
printf '  (200 = fixed, 301 = still redirecting)\n'

echo
[ "$STATUS" -eq 0 ] && log "All checks passed" || warn "Some checks failed. Backups: *.backup-${STAMP}"
