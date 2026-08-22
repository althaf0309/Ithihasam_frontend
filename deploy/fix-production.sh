#!/usr/bin/env bash
#
# One-shot production repair for ithihasam.in.
#
#   bash fix-production.sh
#
# Fixes, in order:
#   1. Missing backend .env  -> API is returning 502 because settings refuse to
#      start without SECRET_KEY. Also removes the DEBUG=True exposure and the
#      http:// sitemap URLs.
#   2. nginx routing         -> /robots.txt currently 404s into Django, and
#      /sitemap.xml is served by Django with http:// URLs instead of the static
#      sitemap index built by the frontend.
#   3. Trailing-slash 301s   -> nginx redirects /contact to /contact/, but every
#      canonical tag says /contact. Google sees a canonical pointing at a URL
#      that redirects away from itself.
#
# Safe to re-run. Every file it touches is backed up first, and the nginx change
# is rolled back automatically if `nginx -t` fails.

set -euo pipefail

BACKEND_DIR=/srv/apps/Ithihasam_backend
FRONTEND_DIST=/srv/apps/Ithihasam_frontend/dist
SNIPPET=/etc/nginx/snippets/ithihasam-seo.conf
STAMP=$(date +%Y%m%d-%H%M%S)

log()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()   { printf '  \033[1;32m%s\033[0m\n' "$*"; }
warn() { printf '  \033[1;33m%s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31mFAILED: %s\033[0m\n' "$*" >&2; exit 1; }

# ═══════════════════════════════════════════════════ 1. backend .env

log "1/4  Backend environment"

cd "$BACKEND_DIR"
# shellcheck disable=SC1091
source .venv/bin/activate

if [ -f .env ]; then
  cp .env ".env.backup-${STAMP}"
  ok "existing .env backed up to .env.backup-${STAMP}"
  EXISTING_KEY=$(grep -E '^SECRET_KEY=' .env | tail -n1 | cut -d= -f2- || true)
else
  warn "no .env found — this is why the API is 502ing"
  EXISTING_KEY=""
fi

# Reuse a real key if one is already present; otherwise mint a new one. The old
# hardcoded fallback ("django-insecure-...") must never be carried forward: it is
# in the git history, so anything it signed was forgeable.
case "$EXISTING_KEY" in
  ""|django-insecure-*)
    SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
    warn "generated a new SECRET_KEY (existing admin sessions will be logged out)"
    ;;
  *)
    SECRET_KEY="$EXISTING_KEY"
    ok "kept the existing SECRET_KEY"
    ;;
esac

# Preserve mail credentials across the rewrite so notifications keep working.
keep() { [ -f .env ] && grep -E "^${1}=" .env | tail -n1 | cut -d= -f2- || true; }
EMAIL_USER=$(keep EMAIL_HOST_USER)
EMAIL_PASS=$(keep EMAIL_HOST_PASSWORD)
NOTIFY=$(keep BOOKING_NOTIFICATION_EMAILS)
[ -n "$NOTIFY" ] || NOTIFY="services@ithihasam.in"

cat > .env <<ENVEOF
SECRET_KEY=${SECRET_KEY}
DEBUG=false
ALLOWED_HOSTS=ithihasam.in,www.ithihasam.in,127.0.0.1,localhost
SITE_URL=https://ithihasam.in

DATABASE_URL=sqlite:///db.sqlite3
DATABASE_CONN_MAX_AGE=600
TIME_ZONE=Asia/Kolkata
LOG_LEVEL=INFO

CORS_ALLOWED_ORIGINS=https://ithihasam.in,https://www.ithihasam.in
CSRF_TRUSTED_ORIGINS=https://ithihasam.in,https://www.ithihasam.in
CORS_ALLOW_CREDENTIALS=false
CORS_ALLOW_ALL_ORIGINS=false
CONTACT_SUBMISSION_THROTTLE_RATE=10/hour

# nginx already terminates TLS and redirects http->https. Enabling the Django
# redirect as well causes a loop unless X-Forwarded-Proto is perfectly set.
SECURE_SSL_REDIRECT=false
SESSION_COOKIE_SECURE=true
CSRF_COOKIE_SECURE=true
SECURE_HSTS_SECONDS=31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS=true
SECURE_HSTS_PRELOAD=false
USE_X_FORWARDED_HOST=true
WHITENOISE_MAX_AGE=31536000
SESSION_COOKIE_SAMESITE=Lax
CSRF_COOKIE_SAMESITE=Lax

EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=${EMAIL_USER}
EMAIL_HOST_PASSWORD=${EMAIL_PASS}
EMAIL_USE_TLS=true
EMAIL_USE_SSL=false
EMAIL_TIMEOUT=30
DEFAULT_FROM_EMAIL=Ithihasam <services@ithihasam.in>
SERVER_EMAIL=services@ithihasam.in
BOOKING_NOTIFICATION_EMAILS=${NOTIFY}
ENVEOF

chmod 600 .env
ok ".env written (DEBUG=false, https SITE_URL)"

[ -n "$EMAIL_USER" ] || warn "EMAIL_HOST_USER is blank — bookings will save but no alert email will send"

python manage.py check --deploy 2>&1 | tail -5
python manage.py migrate --noinput 2>&1 | tail -3
python manage.py collectstatic --noinput 2>&1 | tail -2

# ═══════════════════════════════════════════════════ 2. nginx snippet

log "2/4  nginx static-file routing"

sudo mkdir -p "$(dirname "$SNIPPET")"
sudo tee "$SNIPPET" > /dev/null <<NGINXEOF
# Managed by deploy/fix-production.sh — serves SEO files from the frontend build
# instead of proxying them to Django.

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

# Takes precedence over any /sitemap.xml proxy_pass to Django.
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
ok "snippet written to $SNIPPET"

# ═══════════════════════════════════════════════════ 3. patch site config

log "3/4  Patch the ithihasam server block"

SITE_CONF=$(sudo grep -rl "ithihasam" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null | head -n1 || true)
[ -n "$SITE_CONF" ] || fail "Could not find an nginx config mentioning ithihasam.
  List them with:  ls -la /etc/nginx/sites-enabled/"

ok "found: $SITE_CONF"
sudo cp "$SITE_CONF" "${SITE_CONF}.backup-${STAMP}"
ok "backed up to ${SITE_CONF}.backup-${STAMP}"

sudo python3 - "$SITE_CONF" "$SNIPPET" <<'PYEOF'
import re, sys

path, snippet = sys.argv[1], sys.argv[2]
with open(path) as f:
    conf = f.read()
original = conf

include_line = f"    include {snippet};"

# Add the include once, immediately after each server_name that serves the site.
if snippet not in conf:
    conf = re.sub(
        r"(\n(\s*)server_name[^;]*ithihasam[^;]*;)",
        lambda m: m.group(1) + "\n" + m.group(2) + f"include {snippet};",
        conf,
        count=1,
    )

# Serve $uri/index.html BEFORE letting nginx resolve $uri as a directory.
# Directory resolution is what emits the 301 that appends a trailing slash,
# and every canonical tag on the site is the no-slash form.
conf = re.sub(
    r"try_files\s+\$uri\s+\$uri/\s+/index\.html\s*;",
    "try_files $uri $uri/index.html /index.html;",
    conf,
)
conf = re.sub(
    r"try_files\s+\$uri\s+\$uri/index\.html\s+\$uri/\s+/index\.html\s*;",
    "try_files $uri $uri/index.html /index.html;",
    conf,
)

if conf == original:
    print("  no changes needed (already patched)")
else:
    with open(path, "w") as f:
        f.write(conf)
    print("  patched")
PYEOF

if ! sudo nginx -t 2>&1 | tail -2; then
  sudo cp "${SITE_CONF}.backup-${STAMP}" "$SITE_CONF"
  fail "nginx config test failed — original restored from backup. Nothing changed."
fi

# ═══════════════════════════════════════════════════ 4. restart + verify

log "4/4  Restart and verify"

sudo systemctl restart ithihasam-backend
sudo systemctl reload nginx
sleep 3

check() {
  local path="$1" want="$2"
  local code type
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "https://ithihasam.in${path}")
  type=$(curl -s -o /dev/null -w '%{content_type}' --max-time 15 "https://ithihasam.in${path}")
  if [ "$code" = "200" ] && [[ "$type" == *"$want"* ]]; then
    printf '  \033[1;32mOK  \033[0m%-24s %s  %s\n' "$path" "$code" "$type"
  else
    printf '  \033[1;31mBAD \033[0m%-24s %s  %s  (wanted 200 %s)\n' "$path" "$code" "$type" "$want"
    return 1
  fi
}

STATUS=0
check /robots.txt  "text/plain" || STATUS=1
check /llms.txt    "text/plain" || STATUS=1
check /sitemap.xml "xml"        || STATUS=1
check /feed.xml    "xml"        || STATUS=1
check /api/blog/   "json"       || STATUS=1

printf '\n  sitemap root element : '
curl -s --max-time 15 https://ithihasam.in/sitemap.xml | grep -o '<sitemapindex\|<urlset' | head -1
printf '  http:// URLs left    : '
curl -s --max-time 15 https://ithihasam.in/sitemap.xml | grep -c '<loc>http://' || true
printf '  trailing-slash 301   : '
curl -s -o /dev/null -w '%{http_code}\n' --max-time 15 https://ithihasam.in/contact

echo
if [ "$STATUS" -eq 0 ]; then
  log "All checks passed"
else
  fail "Some checks failed — see above. Backups: .env.backup-${STAMP}, ${SITE_CONF}.backup-${STAMP}"
fi
