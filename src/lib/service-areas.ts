import { createKeywordSet } from "@/lib/seo";

export interface ServiceAreaEntry {
  slug: string;
  name: string;
  district: string;
  localityFocus: string;
  propertyMix: string;
  nearbySlugs: string[];
}

const sharedServiceLine =
  "electrical, plumbing, painting, appliance servicing, carpentry, roofing, deep cleaning, pest control, and smart home setup";

export const serviceAreas: ServiceAreaEntry[] = [
  {
    slug: "thalassery",
    name: "Thalassery",
    district: "Kannur district",
    localityFocus:
      "fast electrical repairs, plumbing leak work, home painting, appliance servicing, and CCTV support for busy residential and mixed-use neighbourhoods",
    propertyMix:
      "heritage homes, apartments, bakeries, clinics, shops, offices, and family residences across town",
    nearbySlugs: ["panoor", "mahe", "anjarakandy"],
  },
  {
    slug: "panoor",
    name: "Panoor",
    district: "Kannur district",
    localityFocus:
      "routine home repairs, interior painting, plumbing maintenance, appliance servicing, carpentry, and pest control for fast-growing residential pockets",
    propertyMix:
      "family homes, new villas, local schools, clinics, and small commercial buildings",
    nearbySlugs: ["thalassery", "kuthuparamba", "mahe"],
  },
  {
    slug: "nadapuram",
    name: "Nadapuram",
    district: "Kozhikode district",
    localityFocus:
      "practical home maintenance, AC service, plumbing support, repainting work, cleaning, and smart home installation for nearby North Malabar customers",
    propertyMix:
      "independent homes, rental properties, shops, service offices, and compact commercial spaces",
    nearbySlugs: ["mahe", "panoor", "thalassery"],
  },
  {
    slug: "mahe",
    name: "Mahe",
    district: "Mahe region",
    localityFocus:
      "quick-response repair work, painting, cleaning, pest control, appliance servicing, and security upgrades for coastal urban properties",
    propertyMix:
      "apartments, villas, guest houses, offices, and compact commercial units",
    nearbySlugs: ["thalassery", "panoor", "nadapuram"],
  },
  {
    slug: "kuthuparamba",
    name: "Kuthuparamba",
    district: "Kannur district",
    localityFocus:
      "same-day electrical and plumbing repairs, home painting, carpentry fixes, roof work, and appliance support for town-side customers",
    propertyMix:
      "town homes, apartments, clinics, schools, and retail spaces",
    nearbySlugs: ["panoor", "mattannur", "iritty"],
  },
  {
    slug: "mattannur",
    name: "Mattannur",
    district: "Kannur district",
    localityFocus:
      "airport-side home maintenance, AC service, electrical upgrades, plumbing repairs, smart home setup, and cleaning support",
    propertyMix:
      "airport-side homes, apartments, villas, shops, and small office properties",
    nearbySlugs: ["kuthuparamba", "iritty", "anjarakandy"],
  },
  {
    slug: "iritty",
    name: "Iritty",
    district: "Kannur district",
    localityFocus:
      "repair, maintenance, painting, fabrication, appliance service, and pest control bookings for inland residential and work properties",
    propertyMix:
      "independent homes, hillside residences, shops, institutions, and workspaces",
    nearbySlugs: ["mattannur", "kuthuparamba", "anjarakandy"],
  },
  {
    slug: "chakkarakkal",
    name: "Chakkarakkal",
    district: "Kannur district",
    localityFocus:
      "electrical repairs, plumbing maintenance, appliance service, fabrication, roofing sheet work, and scheduled home upgrade support",
    propertyMix:
      "family homes, roadside shops, apartments, workshops, clinics, and compact commercial properties",
    nearbySlugs: ["anjarakandy", "thalassery", "mattannur"],
  },
  {
    slug: "anjarakandy",
    name: "Anjarakandy",
    district: "Kannur district",
    localityFocus:
      "family-home repairs, deep cleaning, painting, appliance care, and security installation for expanding residential clusters",
    propertyMix:
      "villas, town homes, educational campuses, clinics, and small businesses",
    nearbySlugs: ["thalassery", "mattannur", "chalod"],
  },
  {
    slug: "chalod",
    name: "Chalode",
    district: "Kannur district",
    localityFocus:
      "fast maintenance requests, repainting, carpentry, plumbing, roof work, and home upgrade support for growing roadside communities",
    propertyMix:
      "roadside homes, new villa projects, workshops, and local commercial units",
    nearbySlugs: ["anjarakandy", "thazhe-chovva", "thalassery"],
  },
  {
    slug: "thazhe-chovva",
    name: "Thazhe Chovva",
    district: "Kannur district",
    localityFocus:
      "high-frequency electrical, plumbing, AC servicing, cleaning, pest control, and CCTV bookings for dense urban neighbourhoods",
    propertyMix:
      "apartments, office spaces, hospitals, retail stores, and nearby residential colonies",
    nearbySlugs: ["chalod", "anjarakandy", "taliparamba"],
  },
  {
    slug: "taliparamba",
    name: "Taliparamba",
    district: "Kannur district",
    localityFocus:
      "multi-service home maintenance, painting, carpentry, appliance servicing, and smart home work for established town properties",
    propertyMix:
      "large family homes, flats, educational institutions, and shop buildings",
    nearbySlugs: ["thazhe-chovva", "payyannur", "iritty"],
  },
  {
    slug: "payyannur",
    name: "Payyannur",
    district: "Kannur district",
    localityFocus:
      "coastal-side home repairs, painting, AC service, pest control, deep cleaning, and security installation for residential and commercial properties",
    propertyMix:
      "coastal residences, apartments, retail outlets, clinics, and office spaces",
    nearbySlugs: ["taliparamba", "thazhe-chovva", "anjarakandy"],
  },
  {
    slug: "kannur",
    name: "Kannur",
    district: "Kannur district",
    localityFocus:
      "high-volume electrical, plumbing, AC servicing, painting, cleaning, and CCTV bookings across the district headquarters and its surrounding urban belt",
    propertyMix:
      "apartments, independent houses, shops, showrooms, clinics, hospitals, and office buildings across the city",
    nearbySlugs: ["thazhe-chovva", "chakkarakkal", "thalassery"],
  },
  {
    slug: "thrissur",
    name: "Thrissur",
    district: "Thrissur district",
    localityFocus:
      "city-wide appliance servicing, electrical and plumbing repairs, home painting, deep cleaning, and smart home installation for a dense mix of residential and commercial property",
    propertyMix:
      "flats, heritage homes, villas, retail outlets, offices, and institutional buildings across the city and its suburbs",
    nearbySlugs: ["ollur", "irinjalakuda", "guruvayur"],
  },
  {
    slug: "guruvayur",
    name: "Guruvayur",
    district: "Thrissur district",
    localityFocus:
      "guest house and hotel maintenance, AC servicing, plumbing repairs, deep cleaning, and pest control driven by heavy year-round visitor footfall",
    propertyMix:
      "hotels, lodges, guest houses, family homes, shops, and temple-side commercial units",
    nearbySlugs: ["chavakkad", "kunnamkulam", "thrissur"],
  },
  {
    slug: "kunnamkulam",
    name: "Kunnamkulam",
    district: "Thrissur district",
    localityFocus:
      "trade-town home maintenance, wiring and switchboard work, appliance repair, fabrication, and repainting for busy commercial and residential streets",
    propertyMix:
      "merchant homes, shop buildings, warehouses, apartments, and small manufacturing units",
    nearbySlugs: ["guruvayur", "wadakkanchery", "chavakkad"],
  },
  {
    slug: "chalakudy",
    name: "Chalakudy",
    district: "Thrissur district",
    localityFocus:
      "household repairs, AC and refrigerator service, roofing and fabrication, plumbing maintenance, and pest control for town and highway-side properties",
    propertyMix:
      "independent houses, rental homes, roadside shops, small industrial units, and offices",
    nearbySlugs: ["kodakara", "irinjalakuda", "mala"],
  },
  {
    slug: "irinjalakuda",
    name: "Irinjalakuda",
    district: "Thrissur district",
    localityFocus:
      "residential electrical and plumbing repairs, carpentry, appliance servicing, interior painting, and scheduled cleaning for established neighbourhoods",
    propertyMix:
      "family homes, apartments, colleges, clinics, and local commercial buildings",
    nearbySlugs: ["mala", "chalakudy", "thrissur"],
  },
  {
    slug: "kodungallur",
    name: "Kodungallur",
    district: "Thrissur district",
    localityFocus:
      "coastal-belt maintenance including damp and rust-related repairs, exterior repainting, AC service, plumbing work, and pest control",
    propertyMix:
      "coastal homes, rental properties, shops, guest houses, and small offices",
    nearbySlugs: ["mala", "irinjalakuda", "chalakudy"],
  },
  {
    slug: "wadakkanchery",
    name: "Wadakkanchery",
    district: "Thrissur district",
    localityFocus:
      "routine home maintenance, wiring repairs, appliance service, carpentry, roofing sheet work, and deep cleaning for growing residential pockets",
    propertyMix:
      "independent homes, new villa projects, farm properties, shops, and local institutions",
    nearbySlugs: ["kunnamkulam", "thrissur", "ollur"],
  },
  {
    slug: "chavakkad",
    name: "Chavakkad",
    district: "Thrissur district",
    localityFocus:
      "beachside property upkeep, corrosion-prone fittings replacement, AC servicing, painting, plumbing, and pest control",
    propertyMix:
      "coastal residences, guest houses, apartments, retail outlets, and clinics",
    nearbySlugs: ["guruvayur", "kunnamkulam", "thrissur"],
  },
  {
    slug: "ollur",
    name: "Ollur",
    district: "Thrissur district",
    localityFocus:
      "suburban home repairs, appliance servicing, electrical upgrades, interior work, cleaning, and smart home installation close to the city",
    propertyMix:
      "apartments, gated-community homes, independent houses, offices, and roadside businesses",
    nearbySlugs: ["thrissur", "irinjalakuda", "wadakkanchery"],
  },
  {
    slug: "mala",
    name: "Mala",
    district: "Thrissur district",
    localityFocus:
      "everyday home maintenance, plumbing and electrical repairs, appliance service, carpentry, and roof work for semi-urban households",
    propertyMix:
      "family homes, rental houses, shops, small workshops, and community buildings",
    nearbySlugs: ["kodungallur", "irinjalakuda", "chalakudy"],
  },
  {
    slug: "kodakara",
    name: "Kodakara",
    district: "Thrissur district",
    localityFocus:
      "highway-corridor property maintenance, AC and appliance repair, fabrication, plumbing, painting, and pest control",
    propertyMix:
      "independent homes, roadside commercial units, godowns, offices, and rental properties",
    nearbySlugs: ["chalakudy", "irinjalakuda", "ollur"],
  },
  {
    slug: "ernakulam",
    name: "Ernakulam",
    district: "Ernakulam district",
    localityFocus:
      "high-density city maintenance: AC servicing, appliance repair, electrical and plumbing work, deep cleaning, and smart home installation for flats and commercial property",
    propertyMix:
      "high-rise flats, gated communities, villas, IT offices, showrooms, restaurants, and clinics across the city",
    nearbySlugs: ["kakkanad", "tripunithura", "aluva"],
  },
  {
    slug: "kakkanad",
    name: "Kakkanad",
    district: "Ernakulam district",
    localityFocus:
      "IT-corridor apartment servicing, AC and appliance maintenance, smart home installation, deep cleaning, and pest control for a young rental-heavy population",
    propertyMix:
      "IT-park apartments, gated villas, serviced flats, co-living units, and office spaces",
    nearbySlugs: ["ernakulam", "tripunithura", "aluva"],
  },
  {
    slug: "aluva",
    name: "Aluva",
    district: "Ernakulam district",
    localityFocus:
      "riverside and airport-belt home maintenance, AC servicing, plumbing repairs, painting, and appliance support for a fast-growing residential corridor",
    propertyMix:
      "apartments, independent homes, guest houses, shops, and industrial-area offices",
    nearbySlugs: ["ernakulam", "angamaly", "perumbavoor"],
  },
  {
    slug: "perumbavoor",
    name: "Perumbavoor",
    district: "Ernakulam district",
    localityFocus:
      "town and industrial-belt maintenance covering electrical work, plumbing, fabrication, appliance repair, and roofing for homes and small units",
    propertyMix:
      "family homes, rental properties, plywood and timber units, shops, and workshops",
    nearbySlugs: ["aluva", "kothamangalam", "muvattupuzha"],
  },
  {
    slug: "muvattupuzha",
    name: "Muvattupuzha",
    district: "Ernakulam district",
    localityFocus:
      "town-side household repairs, AC and refrigerator service, carpentry, painting, and pest control for established residential areas",
    propertyMix:
      "independent houses, apartments, schools, clinics, and commercial buildings",
    nearbySlugs: ["kothamangalam", "perumbavoor", "piravom"],
  },
  {
    slug: "angamaly",
    name: "Angamaly",
    district: "Ernakulam district",
    localityFocus:
      "highway and airport-adjacent property maintenance, appliance servicing, electrical upgrades, fabrication, and deep cleaning",
    propertyMix:
      "homes, hotels, godowns, roadside commercial units, and small factories",
    nearbySlugs: ["aluva", "perumbavoor", "ernakulam"],
  },
  {
    slug: "kothamangalam",
    name: "Kothamangalam",
    district: "Ernakulam district",
    localityFocus:
      "hill-side town maintenance including damp-related repairs, roofing work, plumbing, appliance service, and repainting",
    propertyMix:
      "independent homes, estates, colleges, shops, and guest houses",
    nearbySlugs: ["muvattupuzha", "perumbavoor", "angamaly"],
  },
  {
    slug: "tripunithura",
    name: "Tripunithura",
    district: "Ernakulam district",
    localityFocus:
      "heritage-town and suburban servicing: AC and appliance repair, carpentry, interior painting, cleaning, and smart home setup",
    propertyMix:
      "heritage homes, apartments, gated villas, clinics, and retail outlets",
    nearbySlugs: ["ernakulam", "kakkanad", "piravom"],
  },
  {
    slug: "north-paravur",
    name: "North Paravur",
    district: "Ernakulam district",
    localityFocus:
      "coastal-belt maintenance covering corrosion-prone fittings, plumbing, exterior repainting, AC service, and pest control",
    propertyMix:
      "coastal homes, rental houses, shops, and small offices",
    nearbySlugs: ["ernakulam", "aluva", "angamaly"],
  },
  {
    slug: "piravom",
    name: "Piravom",
    district: "Ernakulam district",
    localityFocus:
      "semi-urban home maintenance including electrical repairs, appliance service, carpentry, roofing, and scheduled cleaning",
    propertyMix:
      "family homes, farm properties, shops, and community buildings",
    nearbySlugs: ["muvattupuzha", "tripunithura", "ernakulam"],
  },
];

export const serviceAreaBySlug = Object.fromEntries(
  serviceAreas.map((area) => [area.slug, area]),
) as Record<string, ServiceAreaEntry>;


/**
 * The districts we market as separate service areas.
 *
 * Each is also an entry in serviceAreas, so it already has a /locations page and
 * a full set of local service pages. This list is what the UI offers as a choice.
 */
export const serviceDistricts = [
  { slug: "kannur", name: "Kannur" },
  { slug: "thrissur", name: "Thrissur" },
  { slug: "ernakulam", name: "Ernakulam" },
] as const;


export interface DistrictLanding {
  slug: string;
  areaSlug: string;
  name: string;
  district: string;
  aka: string;
  towns: string[];
}

/**
 * Root-level district landing pages: /kochi, /thrissur, /kannur.
 *
 * Short URLs are what marketing links to and what customers remember, so these
 * are the canonical district pages. /locations/<slug> still renders for each
 * one but canonicalises here, so the pair never competes for the same query.
 *
 * Mirrors districtLandings in scripts/site-data.mjs; check-seo-data.mjs fails
 * the build if they drift.
 */
export const districtLandings: DistrictLanding[] = [
  {
    slug: "kochi",
    areaSlug: "ernakulam",
    name: "Kochi",
    district: "Ernakulam district",
    aka: "Ernakulam",
    towns: ["Kakkanad", "Aluva", "Perumbavoor", "Muvattupuzha", "Angamaly", "Kothamangalam", "Tripunithura", "North Paravur", "Piravom"],
  },
  {
    slug: "thrissur",
    areaSlug: "thrissur",
    name: "Thrissur",
    district: "Thrissur district",
    aka: "Trichur",
    towns: ["Guruvayur", "Kunnamkulam", "Chalakudy", "Irinjalakuda", "Kodungallur", "Wadakkanchery", "Chavakkad", "Ollur", "Mala", "Kodakara"],
  },
  {
    slug: "kannur",
    areaSlug: "kannur",
    name: "Kannur",
    district: "Kannur district",
    aka: "Cannanore",
    towns: ["Thalassery", "Taliparamba", "Payyannur", "Mattannur", "Iritty", "Kuthuparamba", "Panoor", "Chakkarakkal", "Anjarakandy", "Thazhe Chovva", "Chalode", "Mahe"],
  },
];

export const districtLandingBySlug = Object.fromEntries(
  districtLandings.map((entry) => [entry.slug, entry]),
) as Record<string, DistrictLanding>;

/** Maps an area slug back to its district landing page, for canonical links. */
export const districtLandingByAreaSlug = Object.fromEntries(
  districtLandings.map((entry) => [entry.areaSlug, entry]),
) as Record<string, DistrictLanding>;

export const serviceAreaNames = serviceAreas.map((area) => area.name);
export const serviceAreaCoverageLine = serviceAreaNames.join(", ");

export function getServiceAreaMetaTitle(area: ServiceAreaEntry) {
  return `Home Services in ${area.name} | Electrical, Plumbing, Painting & More | Ithihasam`;
}

export function getServiceAreaMetaDescription(area: ServiceAreaEntry) {
  return `Book ${sharedServiceLine} in ${area.name}. Ithihasam serves ${area.propertyMix} with location-focused home maintenance support across ${area.district}.`;
}

export function getServiceAreaKeywords(area: ServiceAreaEntry) {
  return createKeywordSet(
    `home services in ${area.name}`,
    `electrician in ${area.name}`,
    `plumber in ${area.name}`,
    `painting services in ${area.name}`,
    `AC service in ${area.name}`,
    `carpenter in ${area.name}`,
    `deep cleaning in ${area.name}`,
    `pest control in ${area.name}`,
    `CCTV installation in ${area.name}`,
    `smart home setup in ${area.name}`,
    area.name,
    area.district,
    "Ithihasam",
  );
}

export function getServiceAreaIntro(area: ServiceAreaEntry) {
  return [
    `Ithihasam provides ${sharedServiceLine} in ${area.name} for ${area.propertyMix}. Customers searching for an electrician in ${area.name}, plumber in ${area.name}, painting services in ${area.name}, AC service in ${area.name}, or pest control in ${area.name} can use one booking flow for multiple home maintenance needs.`,
    `${area.name} demand is often centered on ${area.localityFocus}. We support scheduled maintenance, quick repair visits, pre-move work, post-repair cleanup, and upgrade jobs across ${area.name} and nearby parts of ${area.district}.`,
  ];
}

export function getServiceAreaHighlights(area: ServiceAreaEntry) {
  return [
    {
      title: `Popular service needs in ${area.name}`,
      description: `Local enquiries commonly include electrical troubleshooting, plumbing repairs, house painting, AC and appliance servicing, carpentry adjustments, deep cleaning, pest control, and CCTV or smart home installation.`,
    },
    {
      title: `Property types we support`,
      description: `Our booking flow is suitable for ${area.propertyMix}. That makes the page relevant for both residential customers and smaller commercial requirements in ${area.name}.`,
    },
    {
      title: `Coverage around ${area.name}`,
      description: `We also coordinate work for nearby places connected to ${area.name}, so customers can use the same booking support when the property is close to the main town area or in adjacent residential pockets.`,
    },
  ];
}

export function getNearbyServiceAreas(area: ServiceAreaEntry) {
  return area.nearbySlugs
    .map((slug) => serviceAreaBySlug[slug])
    .filter(Boolean);
}
