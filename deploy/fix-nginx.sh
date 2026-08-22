#!/usr/bin/env bash
#
# Patches the nginx server block that serves ithihasam.in.
#
#   sudo bash deploy/fix-nginx.sh
#
# Your config explicitly proxies these to Django:
#
#     location = /sitemap.xml { proxy_pass http://127.0.0.1:8000/sitemap.xml; }
#     location = /robots.txt  { proxy_pass http://127.0.0.1:8000/robots.txt;  }
#
# Django has no robots route, so /robots.txt returns its 404 page. Its sitemap
# view is a leftover that emits a flat urlset, while the build now produces a
# sitemap index over five child sitemaps. Both blocks are removed rather than
# shadowed — nginx rejects two `location =` blocks for the same path.
#
# Also rewrites `try_files $uri $uri/ /index.html`. Letting nginx resolve $uri
# as a directory is what makes it 301 to a trailing slash, and every canonical
# tag on the site is the no-slash form, so the canonical currently names a URL
# that redirects away from itself.
#
# Backs up every file it touches and rolls back if `nginx -t` fails.

set -euo pipefail

SNIPPET=/etc/nginx/snippets/ithihasam-seo.conf
FRONTEND_DIST=/srv/apps/Ithihasam_frontend/dist
PATCHER="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/patch-nginx.py"
STAMP=$(date +%Y%m%d-%H%M%S)

log()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()   { printf '  \033[1;32m%s\033[0m\n' "$*"; }
warn() { printf '  \033[1;33m%s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31mFAILED: %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || fail "Run with sudo: sudo bash $0"
[ -f "$PATCHER" ] || fail "patch-nginx.py not found next to this script."

# ---------------------------------------------------------------- snippet

log "Writing SEO snippet"

mkdir -p "$(dirname "$SNIPPET")"
cat > "$SNIPPET" <<NGINXEOF
# Managed by deploy/fix-nginx.sh — serves SEO files from the frontend build
# instead of proxying them to Django.

location = /robots.txt {
    default_type text/plain;
    add_header Cache-Control "public, max-age=3600";
    access_log off;
    try_files /robots.txt =404;
}

location = /llms.txt {
    default_type text/plain;
    add_header Cache-Control "public, max-age=3600";
    access_log off;
    try_files /llms.txt =404;
}

location ~ ^/sitemap(-[a-z-]+)?\.xml\$ {
    default_type application/xml;
    add_header Cache-Control "public, max-age=3600";
    access_log off;
}

location = /feed.xml {
    default_type application/rss+xml;
    add_header Cache-Control "public, max-age=3600";
    access_log off;
}

location = /site.webmanifest {
    default_type application/manifest+json;
    access_log off;
}

location /og/ {
    expires 30d;
    add_header Cache-Control "public";
    access_log off;
}
NGINXEOF
ok "$SNIPPET"

# ---------------------------------------------------------------- locate

log "Locating the server block"

# -R (not -r) so symlinks in sites-enabled are followed, and sites-available is
# searched directly. That symlink behaviour is why the previous attempt found
# nothing even though the config plainly contains the domain.
CANDIDATES=$(grep -RlE "server_name[^;]*ithihasam|${FRONTEND_DIST}" \
  /etc/nginx/sites-enabled /etc/nginx/sites-available /etc/nginx/conf.d /etc/nginx/nginx.conf \
  2>/dev/null | xargs -r -n1 readlink -f | sort -u || true)

[ -n "$CANDIDATES" ] || fail "Still no match. Show me:
  sudo nginx -T | grep -n 'server_name\\|root\\|try_files' | head -30"

echo "$CANDIDATES" | sed 's/^/  candidate: /'

# ---------------------------------------------------------------- patch

log "Patching"

PATCHED=""
for CONF in $CANDIDATES; do
  cp "$CONF" "${CONF}.backup-${STAMP}"
  if python3 "$PATCHER" "$CONF" "$SNIPPET" "$FRONTEND_DIST"; then
    ok "patched $CONF"
    PATCHED="${CONF} ${PATCHED}"
  else
    rm -f "${CONF}.backup-${STAMP}"
    printf '  skipped %s (nothing to change)\n' "$CONF"
  fi
done

[ -n "$PATCHED" ] || fail "Found the config but nothing matched. Show me:
  sudo nginx -T | sed -n '185,265p'"

# ---------------------------------------------------------------- test

log "Testing config"

if ! nginx -t 2>&1 | tail -2; then
  for CONF in $PATCHED; do cp "${CONF}.backup-${STAMP}" "$CONF"; done
  fail "nginx -t failed — every change rolled back. Nothing applied."
fi

systemctl reload nginx
ok "nginx reloaded"
sleep 2

# ---------------------------------------------------------------- verify

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

printf '\n  sitemap root  : '
curl -s --max-time 15 https://ithihasam.in/sitemap.xml | grep -o '<sitemapindex\|<urlset' | head -1
printf '  /contact      : '
curl -s -o /dev/null -w '%{http_code}' --max-time 15 https://ithihasam.in/contact
printf '   (200 = fixed, 301 = still redirecting)\n'
printf '  robots first line: '
curl -s --max-time 15 https://ithihasam.in/robots.txt | head -1

echo
if [ "$STATUS" -eq 0 ]; then
  log "All checks passed"
else
  warn "Some checks failed. Backups: *.backup-${STAMP}"
fi
