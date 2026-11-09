#!/usr/bin/env python3
"""Rewrites an nginx site config so every host lands on https://<domain>.

Called by force-https.sh. Kept as its own file rather than a heredoc because a
heredoc inside a shell script mangles the regexes.

Exit codes:
    0  the file was changed
    1  nothing needed changing
    2  the config could not be parsed; the file was not touched
"""

import re
import sys


def split_server_blocks(text):
    """Returns [(start, end, body)] for each top-level `server { ... }` block.

    Brace counting rather than a regex, because a server block contains nested
    location blocks and a regex cannot match balanced braces.
    """
    blocks = []
    for match in re.finditer(r"\bserver\s*\{", text):
        depth = 0
        i = match.start()
        while i < len(text):
            if text[i] == "{":
                depth += 1
            elif text[i] == "}":
                depth -= 1
                if depth == 0:
                    blocks.append((match.start(), i + 1, text[match.start():i + 1]))
                    break
            i += 1
        else:
            return None  # unbalanced braces; refuse to touch the file
    return blocks


def server_names(body):
    found = re.search(r"server_name([^;]*);", body)
    return found.group(1).split() if found else []


def is_redirect_only(body):
    """True for a block that only issues a redirect and serves no content."""
    return "return 301" in body and "location" not in body


def listens_on(body, port):
    return bool(re.search(r"listen\s+(\[::\]:)?" + str(port) + r"\b", body))


def main():
    path, domain = sys.argv[1], sys.argv[2]
    www = "www." + domain

    with open(path, encoding="utf-8") as handle:
        conf = handle.read()

    original = conf
    changes = []

    blocks = split_server_blocks(conf)
    if blocks is None:
        print("  ! unbalanced braces in the config; not touching it")
        return 2

    # --- 1. Port 80 -------------------------------------------------------
    #
    # Certbot writes `return 301 https://$host$request_uri`, which preserves
    # the www prefix and therefore needs a second redirect to reach the
    # canonical host. Replacing $host with the literal domain makes it one hop.

    http_ok = False
    for start, end, body in reversed(blocks):
        if not listens_on(body, 80) or not is_redirect_only(body):
            continue

        if re.search(r"return\s+301\s+https://" + re.escape(domain) + r"\$request_uri", body):
            http_ok = True
            break

        if re.search(r"return\s+301\s+https://\$host", body):
            patched = re.sub(
                r"return\s+301\s+https://\$host\$request_uri\s*;",
                "return 301 https://" + domain + "$request_uri;",
                body,
            )
            patched = re.sub(
                r"server_name([^;]*);",
                "server_name " + domain + " " + www + ";",
                patched,
                count=1,
            )
            conf = conf[:start] + patched + conf[end:]
            changes.append(
                "port 80 now redirects straight to the canonical host "
                "(was $host, which cost a second hop)"
            )
            http_ok = True
            break

    if not http_ok:
        conf += (
            "\n# Every plain-http request, with or without www, in a single hop.\n"
            "server {\n"
            "    listen 80;\n"
            "    listen [::]:80;\n"
            "    server_name " + domain + " " + www + ";\n"
            "    return 301 https://" + domain + "$request_uri;\n"
            "}\n"
        )
        changes.append("added a port 80 -> https redirect covering both hosts")

    # --- 2. Port 443, www -> non-www --------------------------------------

    blocks = split_server_blocks(conf)
    has_https_www = any(
        listens_on(b, 443) and is_redirect_only(b) and www in server_names(b)
        for _, _, b in blocks
    )

    if not has_https_www:
        cert = re.search(r"ssl_certificate\s+([^;]+);", conf)
        key = re.search(r"ssl_certificate_key\s+([^;]+);", conf)
        if not (cert and key):
            print("  ! no ssl_certificate found; skipped the https www block")
        else:
            conf += (
                "\n# Canonical host is the non-www form, matching every canonical tag.\n"
                "server {\n"
                "    listen 443 ssl;\n"
                "    listen [::]:443 ssl;\n"
                "    server_name " + www + ";\n"
                "    ssl_certificate " + cert.group(1).strip() + ";\n"
                "    ssl_certificate_key " + key.group(1).strip() + ";\n"
                "    return 301 https://" + domain + "$request_uri;\n"
                "}\n"
            )
            changes.append("added an https www -> non-www 301")

    # --- 3. The content server must not also answer to www ----------------
    #
    # If the main block lists both names, nginx matches www there and serves
    # the site directly, so the redirect block above never runs.

    blocks = split_server_blocks(conf)
    for start, end, body in reversed(blocks):
        if is_redirect_only(body) or not listens_on(body, 443):
            continue
        names = server_names(body)
        if www in names and domain in names:
            kept = " ".join(n for n in names if n != www)
            patched = re.sub(r"server_name([^;]*);", "server_name " + kept + ";", body, count=1)
            conf = conf[:start] + patched + conf[end:]
            changes.append(
                "removed " + www + " from the main server block so the redirect can match"
            )
            break

    if conf == original:
        print("  no changes needed, redirects already correct")
        return 1

    with open(path, "w", encoding="utf-8") as handle:
        handle.write(conf)

    for change in changes:
        print("  " + change)
    return 0


if __name__ == "__main__":
    sys.exit(main())
