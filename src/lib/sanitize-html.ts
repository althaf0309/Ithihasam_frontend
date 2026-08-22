import DOMPurify from "dompurify";

/**
 * Sanitises CMS-authored HTML before it reaches dangerouslySetInnerHTML.
 *
 * Blog content comes from CKEditor, whose `sourceEditing` mode lets a staff
 * author write raw HTML, and nothing sanitised it on write or on read. That made
 * the blog a stored-XSS sink: a compromised or careless editor account could
 * execute script in every reader's browser.
 *
 * The allowlist covers what the editor's toolbar can actually produce.
 */
const ALLOWED_TAGS = [
  "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "sub", "sup",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "a", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
  "span", "div",
];

const ALLOWED_ATTR = [
  "href", "target", "rel",
  "src", "alt", "title", "width", "height", "loading",
  "class", "style",
  "colspan", "rowspan",
];

export function sanitizeHtml(html: string) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // Block javascript:, data: and other script-bearing URL schemes.
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|#|\/)/i,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input", "button"],
    FORBID_ATTR: ["srcset", "formaction", "xlink:href"],
  });

  return typeof clean === "string" ? clean : String(clean);
}

// Any link the CMS emits is external content: force it to open safely and stop
// it passing referrer or window.opener to a third party.
if (typeof window !== "undefined") {
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node instanceof HTMLAnchorElement && node.hasAttribute("href")) {
      const href = node.getAttribute("href") || "";
      if (/^https?:/i.test(href) && !href.startsWith(window.location.origin)) {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer nofollow");
      }
    }
  });
}
