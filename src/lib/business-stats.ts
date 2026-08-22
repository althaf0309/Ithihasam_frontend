import { serviceAreas } from "@/lib/service-areas";

/**
 * Single source of truth for the trust numbers shown across the site.
 *
 * These previously disagreed with each other on the same screen: the homepage
 * hero claimed "2000+ Happy Customers" and "50+ Professionals" while the About
 * block a few hundred pixels below claimed "10,000+" and "500+". Conflicting
 * numbers on one page read as invented and undermine every other claim, so the
 * conservative pair is used everywhere.
 *
 * ⚠️ Confirm these against real records before the next release, and update
 * them here only — never inline in a page.
 */
export const BUSINESS_STATS = {
  customers: "2,000+",
  professionals: "50+",
  satisfaction: "98%",
} as const;

/** Derived from the real coverage list so it can never overstate the footprint. */
export const AREAS_COVERED = `${serviceAreas.length}`;
