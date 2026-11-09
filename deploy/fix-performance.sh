#!/usr/bin/env bash
#
# One-shot performance and configuration fix for ithihasam.in.
#
#   sudo bash deploy/fix-performance.sh
#
# Measured before writing this, on the live site:
#
#   665 kB of JS and CSS per visit, every byte uncompressed
#   no Cache-Control on /assets/, so return visitors re-download everything
#   www and non-www both answer 200, so every page exists at two URLs
#
# Fixes all three, plus HSTS and the static-file routing for robots/sitemap.
# Every file is backed up and the whole change is rolled back if `nginx -t`
# fails, so a bad edit cannot take the site down.

set -euo pipefail

FRONTEND_DIST=/srv/apps/Ithihasam_frontend/dist
MAIN_CONF=/etc/nginx/nginx.conf
STAMP=$(date +%Y%m%d-%H%M%S)
BACKUPS=()

log()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()   { printf '  \033[1;32m%s\033[0m\n' "$*"; }
warn() { printf '  \033[1;33m%s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31mFAILED: %s\033[0m\n' "$*" >&2; rollback; exit 1; }

rollback() {
  for file in "${BACKUPS[@]:-}"; do
    [ -f "${file}.perf-backup-${STAMP}" ] && cp "${file}.perf-backup-${STAMP}" "$file"
  done
}

backup() {
  cp "$1" "${1}.perf-backup-${STAMP}"
  BACKUPS+=("$1")
}

[ "$(id -u)" -eq 0 ] || fail "Run with sudo: sudo bash $0"

# ─────────────────────────────────────────────── locate the site config

log "Locating the nginx config for ithihasam.in"

SITE_CONF=$(grep -RlE "server_name[^;]*ithihasam|${FRONTEND_DIST}" \
  /etc/nginx/sites-enabled /etc/nginx/sites-available /etc/nginx/conf.d 2>/dev/null \
  | xargs -r -n1 readlink -f | sort -u | head -n1)

[ -n "$SITE_CONF" ] || fail "No nginx config mentions ithihasam or the dist path.
  Show me: sudo nginx -T | grep -n 'server_name\\|root'"

ok "$SITE_CONF"

# ─────────────────────────────────────────────── 1. compression

log "1/4  Compression"

# nginx gzips text/html by default and nothing else, which is why the JS bundle
# and stylesheet were being sent raw. These belong in the http block so every
# site gets them and the directives are not duplicated per server.
if grep -q "gzip_types" "$MAIN_CONF" && grep -q "application/javascript" "$MAIN_CONF"; then
  ok "already configured"
else
  backup "$MAIN_CONF"
  python3 - "$MAIN_CONF" <<'PYEOF'
import re
import sys

path = sys.argv[1]
with open(path) as handle:
    conf = handle.read()

block = """
    # Compression. Without gzip_types, nginx compresses text/html only, which
    # left ~665 kB of JS and CSS being served raw on every first visit.
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_types
        text/plain text/css text/xml text/javascript
        application/javascript application/json application/xml
        application/rss+xml application/manifest+json
        image/svg+xml font/woff font/woff2;
"""

match = re.search(r"\nhttp\s*\{", conf)
if not match:
    sys.exit("no http block in nginx.conf")

with open(path, "w") as handle:
    handle.write(conf[: match.end()] + block + conf[match.end() :])
PYEOF
  ok "gzip enabled for JS, CSS, JSON, SVG and fonts"
fi

# ─────────────────────────────────────────────── 2. caching + routing

log "2/4  Cache headers and static-file routing"

SNIPPET=/etc/nginx/snippets/ithihasam-perf.conf
mkdir -p "$(dirname "$SNIPPET")"

cat > "$SNIPPET" <<NGINXEOF
# Managed by deploy/fix-performance.sh

# Vite fingerprints every filename, so the content at a given URL never
# changes. Without this header a returning visitor re-downloads all ~665 kB.
location /assets/ {
    root ${FRONTEND_DIST};
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}

location /og/ {
    root ${FRONTEND_DIST};
    expires 30d;
    add_header Cache-Control "public";
    access_log off;
}

# Served as static files rather than proxied to Django, which has no route for
# robots.txt and whose sitemap view predates the build-time generator.
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

# The Chalode area was published as /chalod; Google has those URLs indexed.
location ~ ^/(.+)-chalod\$ {
    return 301 /\$1-chalode;
}

location = /locations/chalod {
    return 301 /locations/chalode;
}
NGINXEOF
ok "$SNIPPET"

# ─────────────────────────────────────────────── 3. patch the server block

log "3/4  Include, HSTS, trailing slashes, www redirect"

backup "$SITE_CONF"

python3 - "$SITE_CONF" "$SNIPPET" "$FRONTEND_DIST" <<'PYEOF'
import re
import sys

path, snippet, dist = sys.argv[1], sys.argv[2], sys.argv[3]
with open(path) as handle:
    conf = handle.read()
original = conf
changes = []


def server_blocks(text):
    for match in re.finditer(r"\bserver\s*\{", text):
        depth, index = 0, match.end() - 1
        while index < len(text):
            if text[index] == "{":
                depth += 1
            elif text[index] == "}":
                depth -= 1
                if depth == 0:
                    yield match.start(), index + 1
                    break
            index += 1


def drop_location(body, location_path):
    pattern = re.compile(r"[ \t]*location\s*=\s*" + re.escape(location_path) + r"\s*\{")
    match = pattern.search(body)
    if not match:
        return body, False
    depth, index = 0, match.end() - 1
    while index < len(body):
        if body[index] == "{":
            depth += 1
        elif body[index] == "}":
            depth -= 1
            if depth == 0:
                end = index + 1
                if end < len(body) and body[end] == "\n":
                    end += 1
                return body[: match.start()] + body[end:], True
        index += 1
    return body, False


pieces, last = [], 0

for start, end in server_blocks(conf):
    body = conf[start:end]
    if dist not in body:
        continue
    if "return 301" in body and "location" not in body:
        continue

    new = body

    # Remove proxies that shadow the static files served by the snippet.
    for location_path in ("/robots.txt", "/sitemap.xml", "/llms.txt", "/feed.xml"):
        new, dropped = drop_location(new, location_path)
        if dropped:
            changes.append(f"removed proxy: location = {location_path}")

    if snippet not in new:
        anchor = re.search(r"\n(\s*)root[^;]*;", new) or re.search(r"\n(\s*)server_name[^;]*;", new)
        if anchor:
            indent = anchor.group(1)
            new = new[: anchor.end()] + f"\n\n{indent}include {snippet};" + new[anchor.end() :]
            changes.append("added include for the performance snippet")

    # Resolving $uri as a directory is what emits the 301 that appends a
    # trailing slash, which fights the no-slash canonical on every page.
    before = new
    new = re.sub(r"try_files\s+\$uri\s+\$uri/\s+(/index\.html\s*;)", r"try_files $uri $uri/index.html \1", new)
    new = re.sub(r"try_files\s+\$uri\s+\$uri/index\.html\s+\$uri/\s+(/index\.html\s*;)", r"try_files $uri $uri/index.html \1", new)
    if new != before:
        changes.append("try_files no longer 301s to a trailing slash")

    if "Strict-Transport-Security" not in new:
        anchor = re.search(r"\n(\s*)ssl_certificate\s+[^;]+;", new)
        if anchor:
            indent = anchor.group(1)
            header = (
                f'\n{indent}# Browsers use https for a year. "preload" omitted deliberately:'
                f"\n{indent}# that submission is effectively irreversible."
                f'\n{indent}add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;'
            )
            new = new[: anchor.end()] + header + new[anchor.end() :]
            changes.append("added HSTS header")

    if new != body:
        pieces.append(conf[last:start])
        pieces.append(new)
        last = end

pieces.append(conf[last:])
conf = "".join(pieces)

# www and non-www both answered 200, so every page existed at two URLs. The
# canonical already names the non-www form; this makes the server agree.
if "server_name www.ithihasam.in" not in conf:
    cert = re.search(r"ssl_certificate\s+([^;]+);", conf)
    key = re.search(r"ssl_certificate_key\s+([^;]+);", conf)
    if cert and key:
        conf += (
            "\n# Canonical host is the non-www form, matching every canonical tag.\n"
            "server {\n"
            "    listen 443 ssl;\n"
            "    listen [::]:443 ssl;\n"
            "    server_name www.ithihasam.in;\n"
            f"    ssl_certificate {cert.group(1).strip()};\n"
            f"    ssl_certificate_key {key.group(1).strip()};\n"
            "    return 301 https://ithihasam.in$request_uri;\n"
            "}\n"
        )
        changes.append("added www -> non-www 301 redirect")

if conf == original:
    print("  no changes needed")
    sys.exit(1)

with open(path, "w") as handle:
    handle.write(conf)

for change in changes:
    print(f"  {change}")
PYEOF
PATCH_RESULT=$?

if [ "$PATCH_RESULT" -eq 0 ]; then
  ok "server block patched"
else
  warn "server block already up to date"
fi

# ─────────────────────────────────────────────── 4. test, reload, verify

log "4/4  Testing and reloading"

nginx -t 2>&1 | tail -2 || fail "nginx -t failed"
systemctl reload nginx
ok "nginx reloaded"
sleep 2

log "Verifying"

JS=$(curl -s --max-time 15 https://ithihasam.in/ | grep -o '/assets/index-[A-Za-z0-9_-]*\.js' | head -1)

printf '  compression   : '
ENC=$(curl -sI -H "Accept-Encoding: gzip, br" --max-time 15 "https://ithihasam.in${JS}" | grep -i content-encoding | tr -d '\r' | awk '{print $2}')
[ -n "$ENC" ] && printf '\033[1;32m%s\033[0m\n' "$ENC" || printf '\033[1;31mstill uncompressed\033[0m\n'

printf '  asset caching : '
CC=$(curl -sI --max-time 15 "https://ithihasam.in${JS}" | grep -i cache-control | tr -d '\r' | cut -d' ' -f2-)
[ -n "$CC" ] && printf '\033[1;32m%s\033[0m\n' "$CC" || printf '\033[1;31mno cache header\033[0m\n'

printf '  www redirect  : '
curl -s -o /dev/null -w '%{http_code}\n' --max-time 15 https://www.ithihasam.in/

printf '  /contact      : '
curl -s -o /dev/null -w '%{http_code} (200 = no trailing-slash redirect)\n' --max-time 15 https://ithihasam.in/contact

printf '  robots.txt    : '
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' --max-time 15 https://ithihasam.in/robots.txt

printf '  HSTS          : '
curl -sI --max-time 15 https://ithihasam.in/ | grep -i strict-transport >/dev/null && echo "set" || echo "missing"

echo
log "Done. Backups: *.perf-backup-${STAMP}"
