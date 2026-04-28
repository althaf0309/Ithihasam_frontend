import { useEffect } from "react";
import { DEFAULT_SEO_IMAGE } from "@/lib/seo";

interface SeoMetaProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  canonicalPath?: string;
  robots?: string;
  publishedTime?: string;
}

function toAbsoluteUrl(value?: string) {
  if (!value || typeof window === "undefined") {
    return undefined;
  }

  try {
    return new URL(value, window.location.origin).toString();
  } catch {
    return value;
  }
}

function upsertMeta(selector: string, attributes: Record<string, string>, content?: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!content) {
    tag?.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement("meta");

    for (const [key, value] of Object.entries(attributes)) {
      tag.setAttribute(key, value);
    }

    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function upsertCanonical(href?: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!href) {
    link?.remove();
    return;
  }

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = href;
}

export function SeoMeta({
  title,
  description,
  keywords = [],
  image = DEFAULT_SEO_IMAGE,
  type = "website",
  canonicalPath,
  robots = "index, follow",
  publishedTime,
}: SeoMetaProps) {
  useEffect(() => {
    const canonicalUrl = toAbsoluteUrl(canonicalPath || window.location.pathname);
    const imageUrl = toAbsoluteUrl(image) || toAbsoluteUrl(DEFAULT_SEO_IMAGE);
    const keywordsContent = keywords.join(", ");

    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description" }, description);
    upsertMeta('meta[name="keywords"]', { name: "keywords" }, keywordsContent);
    upsertMeta('meta[name="robots"]', { name: "robots" }, robots);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, description);
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, type);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, "Ithihasam");
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, imageUrl);
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, imageUrl);
    upsertMeta('meta[property="article:published_time"]', { property: "article:published_time" }, publishedTime);
    upsertCanonical(canonicalUrl);
  }, [canonicalPath, description, image, keywords, publishedTime, robots, title, type]);

  return null;
}
