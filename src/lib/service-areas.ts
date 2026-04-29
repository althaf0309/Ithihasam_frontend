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
    name: "Chalod",
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
];

export const serviceAreaBySlug = Object.fromEntries(
  serviceAreas.map((area) => [area.slug, area]),
) as Record<string, ServiceAreaEntry>;

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
