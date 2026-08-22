// Fails the build when the three copies of the site's route data drift apart.
//
// The same service prefixes and area slugs are declared in:
//   1. scripts/site-data.mjs          — prerendered HTML + sitemap.xml
//   2. src/lib/local-service-pages.ts — the React routes users actually land on
//   3. finorabackend/finoraapp/views.py — the fallback Django sitemap
//
// If they disagree, the site advertises URLs that render 404s, or ships routes
// no crawler is told about. They agreed by luck before this check existed.

import fs from "node:fs";
import path from "node:path";

import { serviceAreas, services, localTemplates, duplicateTemplateCanonicals, newsArticles } from "./site-data.mjs";

const problems = [];

function read(relativePath) {
  const full = path.resolve(relativePath);
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null;
}

function uniqueSorted(values) {
  return [...new Set(values)].sort();
}

function compare(label, expected, actual, sourceName) {
  const missing = expected.filter((value) => !actual.includes(value));
  const extra = actual.filter((value) => !expected.includes(value));

  if (missing.length) problems.push(`${sourceName}: missing ${label} -> ${missing.join(", ")}`);
  if (extra.length) problems.push(`${sourceName}: unexpected ${label} -> ${extra.join(", ")}`);
}

const expectedPrefixes = uniqueSorted(localTemplates.map(([prefix]) => prefix));
const expectedAreas = uniqueSorted(serviceAreas.map((area) => area.slug));
const expectedServices = uniqueSorted(services.map((service) => service.slug));

// --- 1. React data ----------------------------------------------------------
const localPagesSource = read("src/lib/local-service-pages.ts");
if (!localPagesSource) {
  problems.push("src/lib/local-service-pages.ts not found");
} else {
  compare(
    "local service prefixes",
    expectedPrefixes,
    uniqueSorted([...localPagesSource.matchAll(/slugPrefix:\s*"([a-z0-9-]+)"/g)].map((m) => m[1])),
    "src/lib/local-service-pages.ts",
  );

  if (!/path:\s*`\/\$\{slug\}`/.test(localPagesSource)) {
    problems.push(
      "src/lib/local-service-pages.ts: landing page `path` must be `/${slug}` with no trailing slash, " +
        "so canonical tags match sitemap.xml",
    );
  }
}

const areasSource = read("src/lib/service-areas.ts");
if (!areasSource) {
  problems.push("src/lib/service-areas.ts not found");
} else {
  compare(
    "area slugs",
    expectedAreas,
    uniqueSorted([...areasSource.matchAll(/^\s{4}slug:\s*"([a-z0-9-]+)"/gm)].map((m) => m[1])),
    "src/lib/service-areas.ts",
  );
}

const catalogSource = read("src/lib/service-catalog.ts");
if (!catalogSource) {
  problems.push("src/lib/service-catalog.ts not found");
} else {
  compare(
    "service slugs",
    expectedServices,
    uniqueSorted([...catalogSource.matchAll(/^\s{4}slug:\s*"([a-z0-9-]+)"/gm)].map((m) => m[1])),
    "src/lib/service-catalog.ts",
  );
}

// News lives in a React page; the build needs the same slugs to prerender it.
const newsSource = read("src/pages/News.tsx");
if (!newsSource) {
  problems.push("src/pages/News.tsx not found");
} else {
  compare(
    "news slugs",
    uniqueSorted(newsArticles.map((article) => article.slug)),
    uniqueSorted([...newsSource.matchAll(/^\s{4}slug:\s*"([a-z0-9-]+)"/gm)].map((m) => m[1])),
    "src/pages/News.tsx",
  );

  for (const article of newsArticles) {
    if (!newsSource.includes(`date: "${article.date}"`)) {
      problems.push(`src/pages/News.tsx: no article dated ${article.date} (${article.slug}) — sitemap lastmod would be wrong`);
    }
  }
}

// --- 2. Django fallback sitemap --------------------------------------------
const viewsSource = read("../finorabackend/finoraapp/views.py");
if (viewsSource) {
  const block = viewsSource.match(/LOCAL_SERVICE_SLUG_PREFIXES\s*=\s*\[([\s\S]*?)\]/);
  if (block) {
    compare(
      "local service prefixes",
      expectedPrefixes,
      uniqueSorted([...block[1].matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1])),
      "finoraapp/views.py",
    );
  }

  const excluded = viewsSource.match(/NON_CANONICAL_SLUG_PREFIXES\s*=\s*\{([\s\S]*?)\}/);
  if (excluded) {
    compare(
      "non-canonical prefixes",
      uniqueSorted(Object.keys(duplicateTemplateCanonicals)),
      uniqueSorted([...excluded[1].matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1])),
      "finoraapp/views.py",
    );
  }
}

// --- 3. Internal consistency of the canonical map ---------------------------
for (const [from, to] of Object.entries(duplicateTemplateCanonicals)) {
  if (!expectedPrefixes.includes(from)) problems.push(`duplicateTemplateCanonicals: unknown source prefix "${from}"`);
  if (!expectedPrefixes.includes(to)) problems.push(`duplicateTemplateCanonicals: unknown target prefix "${to}"`);
  if (duplicateTemplateCanonicals[to]) {
    problems.push(`duplicateTemplateCanonicals: "${from}" -> "${to}" chains to another synonym; point it at a primary`);
  }
}

for (const [, , parentSlug] of localTemplates) {
  if (!expectedServices.includes(parentSlug)) {
    problems.push(`localTemplates: parent service "${parentSlug}" is not in the service catalog`);
  }
}


// --- 4. Headline districts must exist as real areas and match the UI list ---
const districtSource = read("src/lib/service-areas.ts");
if (districtSource) {
  const uiDistricts = uniqueSorted(
    [...districtSource.matchAll(/\{ slug: "([a-z-]+)", name: "[^"]+" \}/g)].map((m) => m[1]),
  );
  const prerenderSource = read("scripts/prerender-seo.mjs");
  const buildDistricts = prerenderSource
    ? uniqueSorted([...prerenderSource.matchAll(/\{ slug: "([a-z-]+)", name: "[^"]+" \}/g)].map((m) => m[1]))
    : [];

  compare("headline districts", uiDistricts, buildDistricts, "scripts/prerender-seo.mjs");

  for (const slug of uiDistricts) {
    if (!expectedAreas.includes(slug)) {
      problems.push(`serviceDistricts: "${slug}" is offered in the UI but is not a service area, so its pages do not exist`);
    }
  }
}

if (problems.length) {
  console.error("\nSEO route data is out of sync:\n");
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error("");
  process.exit(1);
}

console.log(
  `SEO data check passed: ${expectedServices.length} services, ${expectedAreas.length} areas, ` +
    `${expectedPrefixes.length} local templates, ${Object.keys(duplicateTemplateCanonicals).length} canonicalised synonyms.`,
);
