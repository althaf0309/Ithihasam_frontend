import { describe, expect, it } from "vitest";

import {
  buildingServices,
  constructionDistricts,
  constructionServiceBySlug,
  constructionServices,
  materialServices,
  siteworkServices,
  CONSTRUCTION_PARTNER_NOTE,
} from "@/lib/construction-catalogue";

describe("construction catalogue", () => {
  it("resolves every service-district slug back to the right pair", () => {
    // This is the exact logic ConstructionServiceDistrict uses. Both halves of
    // the slug contain hyphens, so a naive split would mis-resolve
    // "construction-transport-alappuzha" and the page would 404 after mounting.
    for (const service of constructionServices) {
      for (const district of constructionDistricts) {
        const slug = `${service.slug}-${district.slug}`;

        const matched = constructionDistricts.find((d) => slug.endsWith(`-${d.slug}`));
        expect(matched, `no district matched ${slug}`).toBeDefined();

        const resolved = constructionServiceBySlug[slug.slice(0, -(matched!.slug.length + 1))];
        expect(resolved?.slug, `${slug} resolved to the wrong service`).toBe(service.slug);
        expect(matched!.slug).toBe(district.slug);
      }
    }
  });

  it("has no district slug that is a suffix of another", () => {
    // If one district slug ended with another ("kollam" / "am"), suffix
    // matching above would pick the wrong one and the page would silently show
    // the wrong location.
    for (const a of constructionDistricts) {
      for (const b of constructionDistricts) {
        if (a.slug === b.slug) continue;
        expect(a.slug.endsWith(`-${b.slug}`), `${a.slug} ends with ${b.slug}`).toBe(false);
      }
    }
  });

  it("states that machinery and quarry material are partner-arranged", () => {
    // The business does not own a machinery fleet or a quarry. These pages must
    // say the work is coordinated, or they promise capacity that does not exist.
    const mustBePartner = [
      "equipment-rental",
      "earthmoving-excavation",
      "construction-transport",
      "aggregate-quarry-supply",
      "ready-mix-concrete",
    ];

    for (const slug of mustBePartner) {
      const service = constructionServiceBySlug[slug];
      expect(service, `${slug} is missing from the catalogue`).toBeDefined();
      expect(service.partner, `${slug} must be marked partner-arranged`).toBe(true);
    }

    expect(CONSTRUCTION_PARTNER_NOTE).toMatch(/arranged through operators/i);
    expect(CONSTRUCTION_PARTNER_NOTE).toMatch(/Ithihasam coordinates/i);
  });

  it("keeps the sand and RERA compliance notices", () => {
    expect(constructionServiceBySlug["sand-supply"].compliance).toMatch(/legally authorised/i);
    expect(constructionServiceBySlug["flat-construction"].compliance).toMatch(/RERA/);
    expect(constructionServiceBySlug["demolition-services"].compliance).toMatch(/permission/i);
  });

  it("groups every service into exactly one of the three kinds", () => {
    const grouped = [...materialServices, ...siteworkServices, ...buildingServices];
    expect(grouped).toHaveLength(constructionServices.length);
    expect(new Set(grouped.map((s) => s.slug)).size).toBe(constructionServices.length);
  });

  it("gives every service a non-empty item list and a unique slug", () => {
    const slugs = new Set<string>();
    for (const service of constructionServices) {
      expect(service.items.length, `${service.slug} has no items`).toBeGreaterThan(0);
      expect(service.intro.length, `${service.slug} has no intro`).toBeGreaterThan(40);
      expect(slugs.has(service.slug), `duplicate slug ${service.slug}`).toBe(false);
      slugs.add(service.slug);
    }
  });
});
