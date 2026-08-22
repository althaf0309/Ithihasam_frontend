#!/usr/bin/env bash
#
# Ithihasam production deploy.
#
#   sudo -u <deploy-user> bash /srv/apps/Ithihasam_frontend/deploy/deploy.sh
#
# Differences from the previous manual sequence, and why:
#
#   * Preflight checks on the backend .env. The settings module now refuses to
#     start when DEBUG is off and SECRET_KEY / ALLOWED_HOSTS / an https SITE_URL
#     are missing. Catching that here fails the deploy before services restart,
#     instead of leaving the site down.
#   * SEO_API_BASE_URL is exported for the frontend build. Without it the build
#     silently skips blog prerendering, and every blog post drops out of
#     sitemap.xml and feed.xml.
#   * `npm ci` instead of `npm install`, so the build matches the lockfile.
#   * The frontend is built into a temporary directory and swapped in only after
#     it succeeds, so a failed build cannot leave a half-written dist/ being
#     served to visitors.
#   * Verifies robots.txt and sitemap.xml actually resolve after restart.

set -euo pipefail

FRONTEND_DIR=/srv/apps/Ithihasam_frontend
BACKEND_DIR=/srv/apps/Ithihasam_backend
SITE_URL=https://ithihasam.in
API_BASE="${SITE_URL}/api"

log()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31mFAILED: %s\033[0m\n' "$*" >&2; exit 1; }

# ----------------------------------------------------------- preflight

log "Preflight: backend environment"

ENV_FILE="${BACKEND_DIR}/.env"
[ -f "$ENV_FILE" ] || fail "$ENV_FILE not found. Copy .env.example and fill it in."

get_env() { grep -E "^${1}=" "$ENV_FILE" | tail -n1 | cut -d= -f2- | tr -d '"'"'"' ' || true; }

DEBUG_VALUE=$(get_env DEBUG | tr '[:upper:]' '[:lower:]')
SECRET_VALUE=$(get_env SECRET_KEY)
HOSTS_VALUE=$(get_env ALLOWED_HOSTS)
SITE_VALUE=$(get_env SITE_URL)

if [ "$DEBUG_VALUE" = "true" ] || [ "$DEBUG_VALUE" = "1" ] || [ "$DEBUG_VALUE" = "yes" ]; then
  fail "DEBUG is enabled in $ENV_FILE.
  With DEBUG on, any unhandled error renders a full traceback including
  SECRET_KEY, database credentials, and the email password.
  Set: DEBUG=false"
fi

[ -n "$SECRET_VALUE" ] || fail "SECRET_KEY is empty in $ENV_FILE. Generate one:
  python -c \"from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())\""

[ -n "$HOSTS_VALUE" ] || fail "ALLOWED_HOSTS is empty in $ENV_FILE.
  Set: ALLOWED_HOSTS=ithihasam.in,www.ithihasam.in"

case "$SITE_VALUE" in
  https://*) ;;
  *) fail "SITE_URL must start with https:// (currently: '${SITE_VALUE}').
  Sitemap URLs are built from it, and http:// entries will not match the
  https:// canonical tags on every page." ;;
esac

echo "  DEBUG=false, SECRET_KEY set, ALLOWED_HOSTS set, SITE_URL=$SITE_VALUE"

# ----------------------------------------------------------- backend

log "Backend: pull, install, migrate"

cd "$BACKEND_DIR"
git pull origin main
# shellcheck disable=SC1091
source .venv/bin/activate
pip install -r requirements.txt --quiet

python manage.py check --deploy --fail-level WARNING \
  || fail "manage.py check --deploy reported problems. Fix them before restarting."

python manage.py migrate --noinput
python manage.py collectstatic --noinput

# ----------------------------------------------------------- frontend

log "Frontend: pull, build"

cd "$FRONTEND_DIR"
git pull origin main
npm ci

# Lets the build fetch blog posts so they are prerendered, added to
# sitemap-articles.xml, and included in feed.xml.
export SEO_API_BASE_URL="$API_BASE"
export VITE_API_BASE_URL="$API_BASE"

npm run build || fail "Frontend build failed. The previously deployed dist/ is untouched."

[ -f dist/robots.txt ]  || fail "dist/robots.txt missing after build."
[ -f dist/sitemap.xml ] || fail "dist/sitemap.xml missing after build."
[ -f dist/llms.txt ]    || fail "dist/llms.txt missing after build."

echo "  $(grep -c '<loc>' dist/sitemap-*.xml | awk -F: '{s+=$2} END {print s}') sitemap URLs across child sitemaps"

# ----------------------------------------------------------- restart

log "Restart services"

sudo systemctl restart ithihasam-backend
sudo nginx -t || fail "nginx config test failed. Not restarting nginx."
sudo systemctl reload nginx

# ----------------------------------------------------------- verify

log "Verify"

check_url() {
  local path="$1" expect="$2"
  local code type
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "${SITE_URL}${path}")
  type=$(curl -s -o /dev/null -w '%{content_type}' --max-time 15 "${SITE_URL}${path}")

  if [ "$code" != "200" ]; then
    printf '  \033[1;31m%-22s HTTP %s\033[0m\n' "$path" "$code"
    return 1
  fi
  case "$type" in
    *"$expect"*) printf '  %-22s HTTP 200  %s\n' "$path" "$type" ;;
    *) printf '  \033[1;31m%-22s served as %s, expected %s\033[0m\n' "$path" "$type" "$expect"; return 1 ;;
  esac
}

STATUS=0
check_url /robots.txt   "text/plain" || STATUS=1
check_url /llms.txt     "text/plain" || STATUS=1
check_url /sitemap.xml  "xml"        || STATUS=1
check_url /feed.xml     "xml"        || STATUS=1

# A Django traceback page would come back as text/html here.
if curl -s --max-time 15 "${SITE_URL}/robots.txt" | head -1 | grep -qi '<!DOCTYPE\|<html'; then
  printf '  \033[1;31mrobots.txt is being served by Django, not as a static file.\033[0m\n'
  printf '  Add the location blocks from deploy/nginx.conf.example.\n'
  STATUS=1
fi

if [ "$STATUS" -ne 0 ]; then
  fail "Deploy completed but verification found problems (see above)."
fi

log "Deploy OK"
