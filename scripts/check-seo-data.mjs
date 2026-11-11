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

import {
  serviceAreas,
  services,
  localTemplates,
  duplicateTemplateCanonicals,
  newsArticles,
  districtLandings,
} from "./site-data.mjs";
import { constructionDistricts, allConstructionServices } from "./construction-data.mjs";
import { allTowns, townDetail } from "./construction-towns.mjs";
import { designCategories } from "./design-data.mjs";

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
  // The file also declares districtLandings, whose entries look identical at a
  // glance. Scope this to the serviceAreas array or /kochi reads as an area.
  const areasArray = areasSource.match(/export const serviceAreas[^=]*=\s*\[([\s\S]*?)\]\s*;/);
  compare(
    "area slugs",
    expectedAreas,
    areasArray
      ? uniqueSorted([...areasArray[1].matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]))
      : [],
    "src/lib/service-areas.ts",
  );

  // District landings must mirror site-data.mjs, and each must point at a real
  // service area — otherwise /kochi renders with no local service pages behind it.
  const landingArray = areasSource.match(/export const districtLandings[^=]*=\s*\[([\s\S]*?)\]\s*;/);
  compare(
    "district landing slugs",
    uniqueSorted(districtLandings.map((entry) => entry.slug)),
    landingArray
      ? uniqueSorted([...landingArray[1].matchAll(/^\s{4}slug:\s*"([a-z0-9-]+)"/gm)].map((m) => m[1]))
      : [],
    "src/lib/service-areas.ts",
  );

  for (const entry of districtLandings) {
    if (!expectedAreas.includes(entry.areaSlug)) {
      problems.push(
        `districtLandings: /${entry.slug} points at area "${entry.areaSlug}", which is not a service area`,
      );
    }
    if (expectedAreas.includes(entry.slug) && entry.slug !== entry.areaSlug) {
      problems.push(
        `districtLandings: /${entry.slug} collides with an area slug of the same name; ` +
          "the root route and the local-service route would fight",
      );
    }
  }
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


// --- 5. Every prerendered section must have a React route -------------------
// A prerendered page returns HTTP 200 with correct HTML, then React mounts,
// finds no matching route, and replaces it with the 404 page. curl cannot see
// this because it never runs the JavaScript, so it has to be checked here.
const appSource = read("src/App.tsx");
if (!appSource) {
  problems.push("src/App.tsx not found");
} else {
  const prerenderedSections = [
    { path: "/rentals", pattern: /path="\/rentals"/ },
    { path: "/rentals/:city", pattern: /path="\/rentals\/:citySlug"/ },
    { path: "/rentals/:city/:locality", pattern: /path="\/rentals\/:citySlug\/:localitySlug"/ },
    { path: "/rentals/for/:audience", pattern: /path="\/rentals\/for\/:audienceSlug"/ },
    { path: "/kochi", pattern: /path="\/kochi"/ },
    { path: "/thrissur", pattern: /path="\/thrissur"/ },
    { path: "/kannur", pattern: /path="\/kannur"/ },
    { path: "/locations/:slug", pattern: /path="\/locations\/:slug"/ },
  ];

  for (const section of prerenderedSections) {
    if (!section.pattern.test(appSource)) {
      problems.push(
        `src/App.tsx: no React route for "${section.path}" — the prerendered page would ` +
          "render, then be replaced by the 404 page as soon as React mounts",
      );
    }
  }

  // The catch-all swallows anything declared after it.
  const catchAll = appSource.indexOf('path="/:landingSlug"');
  const rentalsRoute = appSource.indexOf('path="/rentals"');
  if (catchAll !== -1 && rentalsRoute !== -1 && rentalsRoute > catchAll) {
    problems.push(
      'src/App.tsx: /rentals is declared after the /:landingSlug catch-all, which will swallow it',
    );
  }
}


// --- 6. Every /og/ image a page references must exist ----------------------
// A page pointing at a photo that was never taken renders a broken image, and
// an og:image that 404s makes social platforms drop the preview entirely.
const rentalRoutesSource = read("scripts/rental-routes.mjs");
const prerenderSource2 = read("scripts/prerender-seo.mjs");
const ogDir = path.resolve("public/og");

if (fs.existsSync(ogDir)) {
  const present = new Set(fs.readdirSync(ogDir));
  const referenced = new Set();

  for (const source of [rentalRoutesSource, prerenderSource2]) {
    if (!source) continue;
    // Only literal paths can be checked; template expressions are skipped.
    for (const match of source.matchAll(/["'`](\/og\/[A-Za-z0-9._-]+\.(?:jpg|jpeg|png|webp))["'`]/g)) {
      referenced.add(match[1].replace("/og/", ""));
    }
  }

  for (const file of referenced) {
    if (!present.has(file)) {
      problems.push(`missing image: /og/${file} is referenced but does not exist in public/og/`);
    }
  }
}


// --- 5b. Grouped sub-services ------------------------------------------------
//
// itemGroups exist in two places: site-data.mjs drives the prerendered HTML,
// and service-catalog.ts drives the React page. A group present in one and not
// the other means a visitor and a crawler see different pages.
{
  const catalogSource = read("src/lib/service-catalog.ts");

  // `services`, not `expectedServices` — the latter is a list of slug strings,
  // so `service.itemGroups` was always undefined and this whole block passed
  // without ever checking anything.
  for (const service of services) {
    if (!service.itemGroups?.length) continue;

    for (const group of service.itemGroups) {
      if (catalogSource && !catalogSource.includes(`slug: "${group.slug}"`)) {
        problems.push(
          `src/lib/service-catalog.ts: "${service.slug}" is missing the "${group.slug}" group, ` +
            "so the React page would show less than the prerendered HTML",
        );
      }

      // Every group image has to exist, or the section renders broken.
      const imageFile = path.resolve("public", group.image.replace(/^\//, ""));
      if (!fs.existsSync(imageFile)) {
        problems.push(`missing image: ${group.image} is referenced by the "${group.slug}" group`);
      }

      if (!group.items?.length) {
        problems.push(`site-data.mjs: group "${group.slug}" has no items`);
      }
    }
  }

  // The detail page must actually render them.
  const detailPage = read("src/pages/ServiceDetail.tsx");
  if (detailPage && !detailPage.includes("itemGroups")) {
    problems.push(
      "src/pages/ServiceDetail.tsx does not render itemGroups — the grouped sub-services " +
        "would exist in the data and never be shown",
    );
  }
}


// --- 6. Construction section ------------------------------------------------
const constructionSource = read("src/lib/construction-catalogue.ts");
if (!constructionSource) {
  problems.push(
    "src/lib/construction-catalogue.ts not found — run node scripts/generate-construction-catalogue.mjs",
  );
} else {
  // The catalogue is generated from construction-data.mjs, so the two can no
  // longer be edited out of step. What can still go wrong is a stale generated
  // file committed from an older data file, which this catches: every slug the
  // data defines must be present in the generated output.
  if (!/GENERATED FILE/.test(constructionSource)) {
    problems.push(
      "src/lib/construction-catalogue.ts is not the generated file — it is now produced by " +
        "scripts/generate-construction-catalogue.mjs and must not be hand-edited",
    );
  }

  for (const district of constructionDistricts) {
    if (!constructionSource.includes(`"slug": "${district.slug}"`)) {
      problems.push(
        `src/lib/construction-catalogue.ts is stale: district "${district.slug}" is missing. ` +
          "Run node scripts/generate-construction-catalogue.mjs",
      );
    }
  }

  for (const service of [...allConstructionServices, ...designCategories]) {
    if (!constructionSource.includes(`"slug": "${service.slug}"`)) {
      problems.push(
        `src/lib/construction-catalogue.ts is stale: category "${service.slug}" is missing. ` +
          "Run node scripts/generate-construction-catalogue.mjs",
      );
    }
  }

  // Every town named by a district must have its detail written, or its pages
  // fall back to generic copy and become the duplicates these pages exist to
  // avoid.
  for (const district of constructionDistricts) {
    for (const name of district.towns) {
      if (!townDetail[name]) {
        problems.push(
          `scripts/construction-towns.mjs: "${name}" (${district.name}) has no detail. ` +
            "Every town needs terrain, access, building and note, or its 18 pages are near-identical.",
        );
      }
    }
  }

  // A town slug that ends with a district slug, or with another town slug,
  // would be resolved to the wrong place by the suffix matcher in
  // ConstructionServiceDistrict, and the page would show the wrong location.
  const townList = allTowns(constructionDistricts);
  const districtSlugs = constructionDistricts.map((d) => d.slug);

  for (const town of townList) {
    if (districtSlugs.some((ds) => town.slug === ds || town.slug.endsWith(`-${ds}`))) {
      problems.push(
        `construction-towns.mjs: town slug "${town.slug}" collides with a district slug, ` +
          "so its pages would resolve to the district instead",
      );
    }
    for (const other of townList) {
      if (other.slug !== town.slug && other.slug.endsWith(`-${town.slug}`)) {
        problems.push(
          `construction-towns.mjs: "${other.slug}" ends with "${town.slug}", which the suffix ` +
            "matcher cannot tell apart",
        );
      }
    }
  }

  // Every prerendered construction page needs a React route, or it renders
  // and is then replaced by the 404 as soon as React mounts.
  const appSource2 = read("src/App.tsx");
  if (appSource2) {
    for (const pattern of [/path="\/construction"/, /path="\/construction\/:slug"/, /CONSTRUCTION_SERVICE_DISTRICT_PATHS/]) {
      if (!pattern.test(appSource2)) {
        problems.push(`src/App.tsx: missing construction route matching ${pattern}`);
      }
    }

    const catchAll = appSource2.indexOf('path="/:landingSlug"');
    const constructionAt = appSource2.indexOf("CONSTRUCTION_SERVICE_DISTRICT_PATHS.map");
    if (catchAll !== -1 && constructionAt !== -1 && constructionAt > catchAll) {
      problems.push(
        'src/App.tsx: construction service-district routes are declared after /:landingSlug, which will swallow them',
      );
    }
  }

  const constructionPage = read("src/pages/Construction.tsx");

  // Town pages must be linked from the district and service-district pages.
  // 864 pages reachable only from the sitemap is 864 pages Google has little
  // reason to crawl, and the links were plain <span> text until this check.
  if (constructionPage) {
    if (!/constructionTowns[\s\S]{0,400}?<Link/.test(constructionPage)) {
      problems.push(
        "src/pages/Construction.tsx renders towns without linking them — the town pages " +
          "would be orphaned, reachable only from the sitemap",
      );
    }
  }

  // A compliance obligation is only useful if it reaches the page, so the
  // component must render the field rather than merely carry the data.
  if (constructionPage) {
    for (const field of ["compliance", "partner"]) {
      if (!constructionPage.includes(field)) {
        problems.push(
          `src/pages/Construction.tsx does not render "${field}" — the notice would exist in the ` +
            "data and never be shown to a customer",
        );
      }
    }
  }

  // A design category names its image directly, so check the file exists.
  for (const category of designCategories) {
    if (!category.image) {
      problems.push(`design-data.mjs: "${category.slug}" has no image`);
      continue;
    }
    const file = path.resolve("public", category.image.replace(/^\//, ""));
    if (!fs.existsSync(file)) {
      problems.push(`missing image: ${category.image} is referenced by "${category.slug}"`);
    }
    if (!category.items?.length) {
      problems.push(`design-data.mjs: "${category.slug}" has no items`);
    }
  }

  // Every category needs a card image that exists, or the page renders a
  // broken image where the service photo should be.
  const cardIcons = new Set(allConstructionServices.map((s) => s.icon));
  for (const icon of cardIcons) {
    const expected = `construction-${icon === "materials" ? "materials" : icon}.jpg`;
    const alt = icon === "building" ? "construction-site.jpg" : expected;
    if (!fs.existsSync(path.resolve("public/og", alt))) {
      problems.push(`missing image: public/og/${alt} is needed for construction icon "${icon}"`);
    }
  }
}

// --- 7. Prerendered internal linking -----------------------------------------
//
// A page reachable only from the sitemap gives Google little reason to crawl
// it. Before this check, a crawl from the prerendered homepage reached 364 of
// 2,759 pages: the homepage linked to neither /services nor /construction,
// because the header nav only exists after React mounts.
{
  const prerenderScript = read("scripts/prerender-seo.mjs");

  if (prerenderScript) {
    if (!prerenderScript.includes("sectionLinks")) {
      problems.push(
        "scripts/prerender-seo.mjs: the homepage route has no sectionLinks, so a crawler " +
          "that does not run JavaScript cannot reach /services or /construction",
      );
    }

    // The location pages are the only prerendered link into the 36 local
    // template landings. Without them, 738 pages are sitemap-only.
    if (!/localTemplates\s*\.filter/.test(prerenderScript)) {
      problems.push(
        "scripts/prerender-seo.mjs: location pages no longer link the local template " +
          "landings, which orphans ~738 pages",
      );
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
