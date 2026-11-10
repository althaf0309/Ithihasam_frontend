// Writes src/lib/construction-catalogue.ts from construction-data.mjs.
//
// The React mirror used to be maintained by hand, which meant every category
// added had to be typed twice and kept word-for-word identical. The drift guard
// caught the mismatches, but catching them is worse than not having them: this
// generates the mirror instead, so the two cannot diverge.
//
// Run by `npm run build` before check-seo-data.mjs. Do not edit the generated
// file — edit construction-data.mjs and re-run.

import fs from "node:fs";
import path from "node:path";

import {
  constructionDistricts,
  constructionCategories,
} from "./construction-data.mjs";
import { allTowns } from "./construction-towns.mjs";

const target = path.resolve("src/lib/construction-catalogue.ts");

const header = `// GENERATED FILE — do not edit.
//
// Written by scripts/generate-construction-catalogue.mjs from
// scripts/construction-data.mjs, which the build also uses to prerender these
// pages. Edit the data file and re-run \`npm run build\` (or
// \`node scripts/generate-construction-catalogue.mjs\`) instead of editing here.

export interface ConstructionDistrict {
  slug: string;
  name: string;
  towns: string[];
  context: string;
  demand: string;
}

export type ConstructionKind = "material" | "sitework" | "building";

export interface ConstructionTown {
  slug: string;
  name: string;
  districtSlug: string;
  districtName: string;
  /** What the ground does to a foundation or a delivery. */
  terrain: string;
  /** What a loaded tipper has to get through to reach site. */
  access: string;
  /** What is actually being built there. */
  building: string;
  /** One concrete local detail, used verbatim in the page copy. */
  note: string;
}

export interface ConstructionService {
  slug: string;
  name: string;
  kind: ConstructionKind;
  icon: string;
  items: string[];
  intro: string;
  /** Stated prominently on the page where the work carries a legal obligation. */
  compliance?: string;
  /** True where Ithihasam coordinates the work rather than performing it itself. */
  partner?: boolean;
}
`;

const districts = `
export const constructionDistricts: ConstructionDistrict[] = ${JSON.stringify(constructionDistricts, null, 2)};
`;

const services = `
export const constructionServices: ConstructionService[] = ${JSON.stringify(
  constructionCategories.map((c) => ({
    slug: c.slug,
    name: c.name,
    kind: c.kind,
    icon: c.icon,
    items: c.items,
    intro: c.intro,
    ...(c.compliance ? { compliance: c.compliance } : {}),
    ...(c.partner ? { partner: true } : {}),
  })),
  null,
  2,
)};
`;

const towns = `
export const constructionTowns: ConstructionTown[] = ${JSON.stringify(
  allTowns(constructionDistricts).map((town) => ({
    slug: town.slug,
    name: town.name,
    districtSlug: town.district.slug,
    districtName: town.district.name,
    terrain: town.terrain,
    access: town.access,
    building: town.building,
    note: town.note,
  })),
  null,
  2,
)};

export const constructionTownBySlug = Object.fromEntries(
  constructionTowns.map((t) => [t.slug, t]),
) as Record<string, ConstructionTown>;
`;

const footer = `
export const materialServices = constructionServices.filter((s) => s.kind === "material");
export const siteworkServices = constructionServices.filter((s) => s.kind === "sitework");
export const buildingServices = constructionServices.filter((s) => s.kind === "building");

export const constructionDistrictBySlug = Object.fromEntries(
  constructionDistricts.map((d) => [d.slug, d]),
) as Record<string, ConstructionDistrict>;

export const constructionServiceBySlug = Object.fromEntries(
  constructionServices.map((s) => [s.slug, s]),
) as Record<string, ConstructionService>;

/** Options for the enquiry form on construction pages. */
export const constructionServiceOptions = constructionServices.map((service) => ({
  value: \`Construction — \${service.name}\`,
  label: service.name,
}));

/** The same five steps the prerendered pages list, so both read identically. */
export const constructionHowItWorks: string[] = [
  "Tell us the material or scope, the quantity or built-up area, and the site location.",
  "We confirm availability, grade or specification, and the delivered rate before anything is committed.",
  "Material is delivered to site, or the build is scheduled against your start date.",
  "For construction, work is billed in stages against progress rather than upfront.",
  "Documentation, including sourcing papers where they apply, is handed over with the material.",
];

/**
 * Shown wherever the work is coordinated rather than self-performed. Kept here
 * so the page and the prerendered HTML say the same thing.
 */
export const CONSTRUCTION_PARTNER_NOTE =
  "Machinery, tippers and quarry material are arranged through operators and suppliers we work with regularly in the district. " +
  "Ithihasam coordinates the hire, the scheduling and the rate; the machine and operator come from that partner.";
`;

fs.writeFileSync(target, header + districts + services + towns + footer, "utf8");

console.log(
  `Construction catalogue: ${constructionCategories.length} categories, ` +
    `${constructionDistricts.length} districts, ${allTowns(constructionDistricts).length} towns ` +
    `written to src/lib/construction-catalogue.ts`,
);
