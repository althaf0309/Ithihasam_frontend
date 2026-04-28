export const DEFAULT_SEO_IMAGE = "/ithihasa-logo.jpeg";

export function createKeywordSet(
  ...groups: Array<Array<string | null | undefined | false> | string | null | undefined | false>
) {
  const seen = new Set<string>();
  const keywords: string[] = [];

  for (const group of groups) {
    const values = Array.isArray(group) ? group : [group];

    for (const value of values) {
      if (!value) {
        continue;
      }

      const keyword = value.trim();
      const normalized = keyword.toLowerCase();

      if (!keyword || seen.has(normalized)) {
        continue;
      }

      seen.add(normalized);
      keywords.push(keyword);
    }
  }

  return keywords;
}

export function extractPlainText(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(value: string, maxLength = 160) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}
