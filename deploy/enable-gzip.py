#!/usr/bin/env python3
"""Enables gzip for text assets in the http block of nginx.conf.

    enable-gzip.py /etc/nginx/nginx.conf

Ubuntu's stock nginx.conf has `gzip on;` active with every other gzip
directive commented out. The result is a file that looks configured but
compresses `text/html` only — which left ~665 kB of JS and CSS being served
raw on every visit to ithihasam.in.

Adding a prewritten block fails, because repeating `gzip on;` is a fatal
"directive is duplicate" error. So each directive is added only when it is
not already present as an uncommented line.

Exit 0 if the file was changed, 1 if nothing was needed.
"""

import re
import sys

# Directive name -> the line to add when it is missing.
WANTED = [
    ("gzip", "    gzip on;"),
    ("gzip_vary", "    gzip_vary on;"),
    ("gzip_comp_level", "    gzip_comp_level 6;"),
    ("gzip_min_length", "    gzip_min_length 256;"),
    ("gzip_proxied", "    gzip_proxied any;"),
    (
        "gzip_types",
        "\n".join(
            [
                "    gzip_types",
                "        text/plain text/css text/xml text/javascript",
                "        application/javascript application/json application/xml",
                "        application/rss+xml application/manifest+json",
                "        image/svg+xml font/woff font/woff2;",
            ]
        ),
    ),
]

HEADER = [
    "",
    "    # Compression. The stock config leaves gzip_types commented out, so only",
    "    # text/html was compressed and the JS bundle and stylesheet went raw.",
]


def present(conf: str, directive: str) -> bool:
    """True when the directive appears uncommented at the start of a line."""
    return bool(re.search(rf"^[ \t]*{re.escape(directive)}\b", conf, re.MULTILINE))


def main(path: str) -> int:
    with open(path) as handle:
        conf = handle.read()

    missing = [line for directive, line in WANTED if not present(conf, directive)]
    if not missing:
        return 1

    match = re.search(r"\nhttp\s*\{", conf)
    if not match:
        print("no http block found in nginx.conf", file=sys.stderr)
        return 1

    block = "\n".join(HEADER + missing) + "\n"
    with open(path, "w") as handle:
        handle.write(conf[: match.end()] + block + conf[match.end() :])

    names = ", ".join(line.strip().split()[0] for line in missing)
    print(f"  added: {names}")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1]))
