// Generates the construction section's routes for the prerenderer.
//
//   /construction                      section hub
//   /construction/<service>            service hub      "m sand supply Kerala"
//   /construction/<district>           district hub     "construction Kochi"
//   /<service>-<district>              service + place  "m sand supply kochi"
//
// Deliberately no service x town pages. The site already carries 1,102 URLs
// built from templates, and 10 services x 48 towns would add 480 more
// near-identical pages to a domain that cannot yet support the ones it has.
// District level captures the search volume that matters for materials, which
// are bought by the lorry load across a district rather than by street.

import {
  constructionBrand,
  constructionDistricts,
  materialCategories,
  siteworkCategories,
  buildingCategories,
  allConstructionServices,
} from "./construction-data.mjs";

// Each category names its own icon, which also decides the card image, so a
// demolition page does not show a stack of cement bags.
const CARD_BY_ICON = {
  materials: "/og/construction-materials.jpg",
  building: "/og/construction-site.jpg",
  delivery: "/og/construction-delivery.jpg",
  demolition: "/og/construction-demolition.jpg",
  excavation: "/og/construction-excavation.jpg",
};

function cardFor(service) {
  return CARD_BY_ICON[service.icon] ?? CARD_BY_ICON.materials;
}

function galleryFor(service) {
  const primary = service ? cardFor(service) : "/og/construction-materials.jpg";

  // The page's own card leads, then two general shots, with duplicates dropped
  // so a delivery page does not show the same image twice.
  return [
    { src: primary, alt: service ? `${service.name} from Ithihasam` : "Construction materials supplied to site by Ithihasam" },
    { src: "/og/construction-site.jpg", alt: "Building work in progress on an Ithihasam project" },
    { src: "/og/construction-delivery.jpg", alt: "Bulk material delivery across Kerala" },
  ].filter((image, index, all) => all.findIndex((other) => other.src === image.src) === index);
}

// Stated on every page where the work is coordinated rather than self-performed.
// The business does not own a machinery fleet or a quarry, and a page that
// implies otherwise brings in enquiries it cannot honour.
const PARTNER_NOTE =
  "Machinery, tippers and quarry material are arranged through operators and suppliers we work with regularly in the district. " +
  "Ithihasam coordinates the hire, the scheduling and the rate; the machine and operator come from that partner.";

const howItWorks = [
  "Tell us the material or scope, the quantity or built-up area, and the site location.",
  "We confirm availability, grade or specification, and the delivered rate before anything is committed.",
  "Material is delivered to site, or the build is scheduled against your start date.",
  "For construction, work is billed in stages against progress rather than upfront.",
  "Documentation, including sourcing papers where they apply, is handed over with the material.",
];

function baseFaqs(where, businessPhone) {
  return [
    [
      `Do you deliver to ${where}?`,
      `Yes. Ithihasam supplies construction materials and takes building work across ${where}. Delivery charges depend on load size and distance from the nearest depot, and are quoted before you confirm.`,
    ],
    [
      "How is material priced?",
      "Materials are quoted per unit or per load, delivered. The rate depends on grade, quantity and distance, so it is confirmed against your actual requirement rather than published as a fixed list.",
    ],
    [
      "What is the minimum order?",
      "Sand, aggregate and blocks are supplied by the load, so a part load is charged at the full trip rate. Cement, steel and finishing materials have no practical minimum.",
    ],
    [
      "Do you supply only, or can you build as well?",
      "Both. You can buy materials and use your own contractor, take a labour-only contract where you supply materials, or hand over the whole build turnkey. The four options are set out on the contract options page.",
    ],
    [
      "How do I get a quotation?",
      `Call or WhatsApp ${businessPhone} with the material or scope, quantity or area, and your site location. For construction, share any drawings you have and we will come back with a stage-wise estimate.`,
    ],
  ];
}

export function constructionRoutes({ businessPhone, siteUrl }) {
  const routes = [];
  const districtNames = constructionDistricts.map((d) => d.name).join(", ");

  // ------------------------------------------------------------ section hub
  routes.push({
    path: "/construction",
    title: "Construction Materials & Building Services in Kerala | Ithihasam",
    description: `Construction material supply and building services across ${districtNames}. M-sand, cement, steel, blocks, finishing materials, house and commercial construction.`,
    h1: "Construction Materials and Building Services in Kerala",
    intro: `${constructionBrand.tagline} Ithihasam supplies sand, aggregate, cement, steel, blocks and finishing materials by the load, and takes house, apartment and commercial construction across ${districtNames}.`,
    items: allConstructionServices.map((s) => s.name),
    image: "/og/construction-materials.jpg",
    gallery: galleryFor(),
    banner: { src: "/og/construction-site.jpg", alt: "Building work in progress on an Ithihasam project" },
    priority: "0.95",
    isConstruction: true,
    constructionSteps: howItWorks,
    constructionLinks: [
      ...materialCategories.map((s) => [s.name, `/construction/${s.slug}`]),
      ...siteworkCategories.map((s) => [s.name, `/construction/${s.slug}`]),
      ...buildingCategories.map((s) => [s.name, `/construction/${s.slug}`]),
    ],
    constructionDistrictLinks: constructionDistricts.map((d) => [
      `Construction in ${d.name}`,
      `/construction/${d.slug}`,
    ]),
    breadcrumbs: [["Home", "/"], ["Construction", "/construction"]],
    faqs: baseFaqs("Kerala", businessPhone),
  });

  // ----------------------------------------------------------- service hubs
  for (const service of allConstructionServices) {
    routes.push({
      path: `/construction/${service.slug}`,
      title: `${service.name} in Kerala | Ithihasam`,
      description: `${service.intro.slice(0, 130)}`,
      h1: `${service.name} in Kerala`,
      serviceName: service.name,
      intro: service.intro,
      items: service.items,
      image: cardFor(service),
      gallery: galleryFor(service),
      banner: { src: cardFor(service), alt: `${service.name} from Ithihasam` },
      priority: "0.9",
      isConstruction: true,
      constructionSteps: howItWorks,
      // Named explicitly where a service carries a legal obligation, because a
      // page that stays silent on sand sourcing attracts the wrong enquiries.
      constructionCompliance: service.compliance,
      constructionPartnerNote: service.partner ? PARTNER_NOTE : undefined,
      constructionDistrictLinks: constructionDistricts.map((d) => [
        `${service.name} in ${d.name}`,
        `/${service.slug}-${d.slug}`,
      ]),
      breadcrumbs: [["Home", "/"], ["Construction", "/construction"], [service.name, `/construction/${service.slug}`]],
      faqs: baseFaqs("Kerala", businessPhone),
    });
  }

  // ---------------------------------------------------------- district hubs
  for (const district of constructionDistricts) {
    routes.push({
      path: `/construction/${district.slug}`,
      title: `Construction Materials & Builders in ${district.name} | Ithihasam`,
      description: `Construction material supply and building services across ${district.name} district: M-sand, cement, steel, blocks, and house and commercial construction.`,
      h1: `Construction Materials and Building Services in ${district.name}`,
      areaName: district.name,
      district: `${district.name} district`,
      // Each district leads with what actually shapes building work there, so
      // the six pages are not one page with the name swapped.
      intro: `Ithihasam supplies construction materials and takes building work across ${district.name} district — ${district.context}. Most local demand is for ${district.demand}.`,
      items: allConstructionServices.map((s) => s.name),
      image: "/og/construction-site.jpg",
      gallery: galleryFor(),
      banner: { src: "/og/construction-site.jpg", alt: `Construction work in ${district.name}` },
      priority: "0.9",
      isConstruction: true,
      constructionSteps: howItWorks,
      constructionTowns: district.towns,
      constructionLinks: allConstructionServices.map((s) => [
        `${s.name} in ${district.name}`,
        `/${s.slug}-${district.slug}`,
      ]),
      breadcrumbs: [["Home", "/"], ["Construction", "/construction"], [district.name, `/construction/${district.slug}`]],
      faqs: [
        [
          `Which towns in ${district.name} do you deliver to?`,
          `${district.towns.join(", ")}, and surrounding areas. Share your exact site location when enquiring so the delivery charge can be quoted accurately.`,
        ],
        ...baseFaqs(`${district.name} district`, businessPhone),
      ],
    });
  }

  // ------------------------------------------------- service x district
  for (const service of allConstructionServices) {
    for (const district of constructionDistricts) {
      routes.push({
        path: `/${service.slug}-${district.slug}`,
        title: `${service.name} in ${district.name} | Ithihasam`,
        description: `${service.name} across ${district.name} district. ${service.items.slice(0, 3).join(", ")}. Delivered rate quoted before you confirm.`,
        h1: `${service.name} in ${district.name}`,
        serviceName: service.name,
        areaName: district.name,
        district: `${district.name} district`,
        intro: `${service.intro} In ${district.name} district this mostly serves ${district.demand}, where ${district.context}.`,
        items: service.items,
        image: cardFor(service),
        gallery: galleryFor(service),
        banner: { src: cardFor(service), alt: `${service.name} in ${district.name}` },
        priority: "0.8",
        isConstruction: true,
        constructionSteps: howItWorks,
        constructionCompliance: service.compliance,
        constructionPartnerNote: service.partner ? PARTNER_NOTE : undefined,
        constructionTowns: district.towns,
        constructionParent: [`All ${service.name.toLowerCase()}`, `/construction/${service.slug}`],
        breadcrumbs: [
          ["Home", "/"],
          ["Construction", "/construction"],
          [service.name, `/construction/${service.slug}`],
          [`${service.name} in ${district.name}`, `/${service.slug}-${district.slug}`],
        ],
        faqs: [
          [
            `Do you supply ${service.name.toLowerCase()} across ${district.name}?`,
            `Yes, including ${district.towns.slice(0, 4).join(", ")} and surrounding areas. ${district.name} work is mostly ${district.demand}.`,
          ],
          ...baseFaqs(`${district.name} district`, businessPhone),
        ],
      });
    }
  }

  return routes;
}

export function constructionSummary() {
  return {
    districts: constructionDistricts.length,
    services: allConstructionServices.length,
    pages: 1 + allConstructionServices.length + constructionDistricts.length +
      allConstructionServices.length * constructionDistricts.length,
  };
}
