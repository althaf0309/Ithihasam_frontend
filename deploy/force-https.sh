#!/usr/bin/env bash
#
# Makes every entry point land on https://ithihasam.in in ONE redirect.
#
#   http://ithihasam.in       -> https://ithihasam.in   (301)
#   http://www.ithihasam.in   -> https://ithihasam.in   (301, single hop)
#   https://www.ithihasam.in  -> https://ithihasam.in   (301)
#   https://ithihasam.in      -> 200, no redirect
#
# Why single-hop matters: Certbot's default port-80 block redirects to the SAME
# host over https, so http://www -> https://www -> https://non-www is two hops.
# Google follows it, but chains dilute signals and slow crawling, and Search
# Console reports every hop under "Page with redirect".
#
# The script reads the live config and changes only what is actually wrong, so
# running it twice is safe. Every earlier nginx script in this directory failed
# at least once because it assumed the server's state instead of reading it.
#
#   sudo bash /srv/apps/Ithihasam_frontend/deploy/force-https.sh

set -euo pipefail

DOMAIN=ithihasam.in
BACKUP_SUFFIX="https-backup-$(date +%Y%m%d-%H%M%S)"

log()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()   { printf '  \033[32m%s\033[0m\n' "$*"; }
warn() { printf '  \033[33m%s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31mFAILED: %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || fail "Run with sudo."

# ------------------------------------------------------------ locate config

log "Locating the nginx config for ${DOMAIN}"

SITE_CONF=$(grep -RlE "server_name[^;]*ithihasam" \
  /etc/nginx/sites-available/ /etc/nginx/conf.d/ 2>/dev/null \
  | grep -v backup | head -n1 || true)

[ -n "$SITE_CONF" ] || fail "No nginx config mentions ${DOMAIN}.
  Show me: sudo nginx -T | grep -n 'server_name'"

ok "$SITE_CONF"
cp "$SITE_CONF" "${SITE_CONF}.${BACKUP_SUFFIX}"

# ------------------------------------------------------------ audit current

log "Current behaviour, before any change"

probe() {
  local url="$1"
  local out code loc
  out=$(curl -sS -o /dev/null -D - --max-time 15 "$url" 2>/dev/null || true)
  code=$(printf '%s' "$out" | awk 'NR==1{print $2}')
  loc=$(printf '%s' "$out" | awk 'tolower($1)=="location:"{print $2}' | tr -d '\r')
  printf '  %-32s %-4s %s\n' "$url" "${code:-???}" "${loc:-}"
}

probe "http://${DOMAIN}/"
probe "http://www.${DOMAIN}/"
probe "https://www.${DOMAIN}/"
probe "https://${DOMAIN}/"

# ------------------------------------------------------------ patch

log "Applying redirect blocks"

set +e
python3 "$(dirname "$0")/patch-https.py" "$SITE_CONF" "$DOMAIN"
PATCH_RESULT=$?
set -e

if [ "$PATCH_RESULT" -eq 2 ]; then
  fail "patch-https.py could not parse the config. Nothing was changed."
fi

if [ "$PATCH_RESULT" -eq 1 ]; then
  ok "config already correct, nothing rewritten"
  rm -f "${SITE_CONF}.${BACKUP_SUFFIX}"
fi

# ------------------------------------------------------------ test + reload

log "Testing and reloading"

if ! nginx -t; then
  if [ -f "${SITE_CONF}.${BACKUP_SUFFIX}" ]; then
    cp "${SITE_CONF}.${BACKUP_SUFFIX}" "$SITE_CONF"
    warn "rolled back to the backup"
  fi
  fail "nginx config test failed. The site is unchanged."
fi

systemctl reload nginx
ok "nginx reloaded"

# ------------------------------------------------------------ verify

log "Verifying every entry point"

STATUS=0

expect_redirect() {
  local url="$1"
  local want="https://${DOMAIN}/"
  local out code loc
  out=$(curl -sS -o /dev/null -D - --max-time 15 "$url" 2>/dev/null || true)
  code=$(printf '%s' "$out" | awk 'NR==1{print $2}')
  loc=$(printf '%s' "$out" | awk 'tolower($1)=="location:"{print $2}' | tr -d '\r')

  if [ "$code" = "301" ] && [ "$loc" = "$want" ]; then
    printf '  \033[32m%-32s 301 -> %s\033[0m\n' "$url" "$loc"
  else
    printf '  \033[1;31m%-32s %s -> %s   (wanted 301 -> %s)\033[0m\n' \
      "$url" "${code:-???}" "${loc:-none}" "$want"
    STATUS=1
  fi
}

expect_redirect "http://${DOMAIN}/"
expect_redirect "http://www.${DOMAIN}/"
expect_redirect "https://www.${DOMAIN}/"

CODE=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 15 "https://${DOMAIN}/")
if [ "$CODE" = "200" ]; then
  printf '  \033[32m%-32s 200\033[0m\n' "https://${DOMAIN}/"
else
  printf '  \033[1;31m%-32s %s   (wanted 200)\033[0m\n' "https://${DOMAIN}/" "$CODE"
  STATUS=1
fi

# A deep path must keep its path through the redirect. Redirecting everything
# to the homepage is a common nginx mistake and Google treats it as a soft 404.
DEEP=$(curl -sS -o /dev/null -D - --max-time 15 "https://www.${DOMAIN}/construction" 2>/dev/null \
  | awk 'tolower($1)=="location:"{print $2}' | tr -d '\r')
if [ "$DEEP" = "https://${DOMAIN}/construction" ]; then
  ok "path preserved: /construction survives the redirect"
else
  printf '  \033[1;31mpath LOST: www/construction -> %s\033[0m\n' "${DEEP:-none}"
  STATUS=1
fi

# Worst-case entry point. More than one hop means a chain.
HOPS=$(curl -sS -o /dev/null -w '%{num_redirects}' -L --max-time 20 "http://www.${DOMAIN}/")
printf '  redirect hops from http://www.%s : %s\n' "$DOMAIN" "$HOPS"
if [ "$HOPS" -gt 1 ]; then
  warn "more than one hop; Search Console reports each hop under 'Page with redirect'"
  STATUS=1
fi

# HSTS tells browsers to skip the http request entirely on later visits.
if curl -sI --max-time 15 "https://${DOMAIN}/" | grep -qi 'strict-transport-security'; then
  ok "HSTS header present"
else
  warn "no HSTS header; browsers will keep making the plain-http request first"
fi

echo
if [ "$STATUS" -ne 0 ]; then
  fail "Some checks failed (above). Backup: ${SITE_CONF}.${BACKUP_SUFFIX}"
fi

log "All entry points land on https://${DOMAIN} in one hop"
