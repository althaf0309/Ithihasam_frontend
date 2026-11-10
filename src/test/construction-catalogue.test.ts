import { describe, expect, it } from "vitest";

import {
  buildingServices,
  constructionDistricts,
  constructionTowns,
  constructionTownBySlug,
  constructionServiceBySlug,
  constructionServices,
  designServices,
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

  it("groups every service into exactly one kind bucket", () => {
    // Four buckets drive the hub page's sections. A service in none of them
    // would exist as a page but never be listed, and one in two would be
    // listed twice.
    const grouped = [
      ...materialServices,
      ...siteworkServices,
      ...buildingServices,
      ...designServices,
    ];
    expect(grouped).toHaveLength(constructionServices.length);
    expect(new Set(grouped.map((s) => s.slug)).size).toBe(constructionServices.length);
  });

  it("resolves every service-town slug to the right pair", () => {
    // ConstructionServiceDistrict matches the town by suffix. A town slug that
    // ended with a district slug, or with another town slug, would silently
    // resolve to the wrong place and show the wrong location on the page.
    for (const service of constructionServices) {
      for (const town of constructionTowns) {
        const slug = `${service.slug}-${town.slug}`;

        const matched = constructionTowns.find((t) => slug.endsWith(`-${t.slug}`));
        expect(matched?.slug, `no town matched ${slug}`).toBe(town.slug);

        const resolved = constructionServiceBySlug[slug.slice(0, -(town.slug.length + 1))];
        expect(resolved?.slug, `${slug} resolved to the wrong service`).toBe(service.slug);
      }
    }
  });

  it("keeps town slugs unambiguous against districts and each other", () => {
    const districtSlugs = constructionDistricts.map((d) => d.slug);

    for (const town of constructionTowns) {
      expect(
        districtSlugs.some((ds) => town.slug === ds || town.slug.endsWith(`-${ds}`)),
        `town ${town.slug} collides with a district slug`,
      ).toBe(false);

      for (const other of constructionTowns) {
        if (other.slug === town.slug) continue;
        expect(
          other.slug.endsWith(`-${town.slug}`),
          `${other.slug} ends with ${town.slug}`,
        ).toBe(false);
      }
    }
  });

  it("gives every town the detail its page depends on", () => {
    // A town missing these renders generic copy, which is what makes 864 pages
    // read as duplicates rather than as distinct places.
    expect(constructionTowns.length).toBe(48);

    for (const town of constructionTowns) {
      expect(town.terrain.length, `${town.slug} has no terrain`).toBeGreaterThan(15);
      expect(town.access.length, `${town.slug} has no access detail`).toBeGreaterThan(15);
      expect(town.building.length, `${town.slug} has no building mix`).toBeGreaterThan(15);
      expect(town.note.length, `${town.slug} has no local note`).toBeGreaterThan(40);
      expect(constructionTownBySlug[town.slug]?.name).toBe(town.name);
      expect(
        constructionDistricts.some((d) => d.slug === town.districtSlug),
        `${town.slug} points at an unknown district`,
      ).toBe(true);
    }
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
