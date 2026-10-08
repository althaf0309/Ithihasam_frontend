#!/usr/bin/env python3
"""Patches the nginx server block that serves ithihasam.in.

Three changes, all inside the block that has `root .../dist`:

  1. Delete the `location = /robots.txt` and `location = /sitemap.xml` blocks
     that proxy to Django. Django has no robots route, so /robots.txt returns a
     404 page; and its sitemap view is a leftover that emits a flat urlset,
     while the build now produces a sitemap index. These must be *removed*, not
     shadowed — two `location =` blocks for the same path is a config error.

  2. Add `include` for the SEO snippet, which serves robots.txt, llms.txt, the
     sitemaps, feed.xml, the manifest and /og/ as static files.

  3. Rewrite `try_files $uri $uri/ /index.html` to `$uri $uri/index.html
     /index.html`. Letting nginx resolve `$uri` as a directory is what makes it
     301 to a trailing slash, and every canonical tag on the site is the
     no-slash form — so the canonical currently names a URL that redirects away
     from itself.

Usage:  patch-nginx.py <config-path> <snippet-path> <dist-path>
Exit 0 if the file was changed, 1 if nothing matched.
"""

import re
import sys


def server_blocks(text):
    """Yield (start, end) spans of each top-level `server { ... }` block."""
    for match in re.finditer(r"\bserver\s*\{", text):
        depth = 0
        index = match.end() - 1
        while index < len(text):
            if text[index] == "{":
                depth += 1
            elif text[index] == "}":
                depth -= 1
                if depth == 0:
                    yield match.start(), index + 1
                    break
            index += 1


def drop_location(body, path):
    """Remove a `location = <path> { ... }` block, brace-matched."""
    pattern = re.compile(r"[ \t]*location\s*=\s*" + re.escape(path) + r"\s*\{")
    match = pattern.search(body)
    if not match:
        return body, False

    depth = 0
    index = match.end() - 1
    while index < len(body):
        if body[index] == "{":
            depth += 1
        elif body[index] == "}":
            depth -= 1
            if depth == 0:
                end = index + 1
                # Swallow the trailing newline so no blank gap is left behind.
                if end < len(body) and body[end] == "\n":
                    end += 1
                return body[: match.start()] + body[end:], True
        index += 1

    return body, False


def ensure_www_redirect(conf):
    """Add a www -> non-www 301 server block if one is not already present.

    Every canonical tag on the site uses the non-www form. Serving the same
    pages at www as well splits ranking signals across two hostnames, and
    Search Console treats them as separate properties. A redirect keeps one
    canonical host while still answering customers who type www from habit.

    The certificate must cover www or browsers hit a TLS warning before they
    ever reach the redirect:

        sudo certbot --nginx -d ithihasam.in -d www.ithihasam.in
    """
    if "server_name www.ithihasam.in" in conf:
        return conf, False

    # Reuse whatever cert paths certbot already configured, so this block stays
    # in step with the rest of the file rather than hardcoding a path.
    cert = re.search(r"ssl_certificate\s+([^;]+);", conf)
    key = re.search(r"ssl_certificate_key\s+([^;]+);", conf)
    if not cert or not key:
        return conf, False

    lines = [
        "",
        "# Canonical host is the non-www form, matching every canonical tag.",
        "server {",
        "    listen 443 ssl;",
        "    listen [::]:443 ssl;",
        "    server_name www.ithihasam.in;",
        "    ssl_certificate {};".format(cert.group(1).strip()),
        "    ssl_certificate_key {};".format(key.group(1).strip()),
        "    return 301 https://ithihasam.in$request_uri;",
        "}",
        "",
    ]
    return conf + "\n".join(lines), True


def patch(path, snippet, dist):
    with open(path) as handle:
        conf = handle.read()

    original = conf
    pieces = []
    last = 0
    changed = False

    for start, end in server_blocks(conf):
        body = conf[start:end]

        # The block that serves the site roots at the build directory. A plain
        # :80 redirect block needs none of this.
        if dist not in body:
            continue
        if "return 301" in body and "location" not in body:
            continue

        new = body

        for location_path in ("/robots.txt", "/sitemap.txt", "/sitemap.xml", "/llms.txt", "/feed.xml"):
            new, dropped = drop_location(new, location_path)
            if dropped:
                print(f"  removed proxy block: location = {location_path}")

        if snippet not in new:
            anchor = re.search(r"\n(\s*)root[^;]*;", new) or re.search(r"\n(\s*)server_name[^;]*;", new)
            if anchor:
                indent = anchor.group(1)
                new = new[: anchor.end()] + f"\n\n{indent}include {snippet};" + new[anchor.end() :]
                print(f"  added: include {snippet}")

        before = new
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
        if new != before:
            print("  fixed: try_files no longer 301s to a trailing slash")

        if new != body:
            pieces.append(conf[last:start])
            pieces.append(new)
            last = end
            changed = True

    pieces.append(conf[last:])
    conf = "".join(pieces)

    conf, added_www = ensure_www_redirect(conf)
    if added_www:
        print("  added: www -> non-www 301 redirect block")
        changed = True

    if not changed or conf == original:
        return False

    with open(path, "w") as handle:
        handle.write(conf)
    return True


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(__doc__)
        sys.exit(2)
    sys.exit(0 if patch(sys.argv[1], sys.argv[2], sys.argv[3]) else 1)
