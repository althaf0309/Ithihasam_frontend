import { createKeywordSet } from "@/lib/seo";
import { serviceAreas, type ServiceAreaEntry } from "@/lib/service-areas";
import { serviceCatalogBySlug } from "@/lib/service-catalog";

type ParentServiceSlug =
  | "electrical-plumbing"
  | "painting"
  | "appliance-servicing"
  | "carpentry"
  | "roofing-fabrication"
  | "deep-cleaning"
  | "pest-control"
  | "smart-home";

export interface LocalServiceTemplate {
  slugPrefix: string;
  serviceName: string;
  parentServiceSlug: ParentServiceSlug;
  intent: string;
  commonJobs: string[];
  searchTerms: string[];
}

export interface LocalServiceLandingPage {
  slug: string;
  path: string;
  area: ServiceAreaEntry;
  template: LocalServiceTemplate;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  keywords: string[];
  parentServicePath: string;
  image: string;
}

export const localServiceAreaSlugs = serviceAreas.map((area) => area.slug);

export const localServiceTemplates: LocalServiceTemplate[] = [
  {
    slugPrefix: "appliance-servicing",
    serviceName: "Appliance Servicing",
    parentServiceSlug: "appliance-servicing",
    intent: "AC service, fridge repair, washing machine repair, microwave service, purifier service, and doorstep appliance maintenance",
    commonJobs: ["AC service", "fridge repair", "washing machine repair", "microwave service", "water purifier service"],
    searchTerms: ["appliance servicing", "appliance repair", "AC fridge washing machine service", "home appliance service", "doorstep appliance repair"],
  },
  {
    slugPrefix: "ac-repair",
    serviceName: "AC Repair",
    parentServiceSlug: "appliance-servicing",
    intent: "AC repair, AC service, cooling issue diagnosis, gas filling, installation, and seasonal maintenance",
    commonJobs: ["AC cooling issue check", "AC gas filling", "split AC service", "AC installation", "AC water leakage repair"],
    searchTerms: ["AC repair", "AC service", "AC technician", "AC gas filling", "split AC service"],
  },
  {
    slugPrefix: "washing-machine-repair",
    serviceName: "Washing Machine Repair",
    parentServiceSlug: "appliance-servicing",
    intent: "front-load and top-load washing machine repair, drainage faults, spinning issues, and noise checks",
    commonJobs: ["washing machine not spinning", "water drainage issue", "front-load service", "top-load service", "washing machine installation"],
    searchTerms: ["washing machine repair", "washing machine service", "front-load washing machine repair", "top-load washing machine repair"],
  },
  {
    slugPrefix: "refrigerator-repair",
    serviceName: "Refrigerator Repair",
    parentServiceSlug: "appliance-servicing",
    intent: "fridge cooling problems, compressor checks, water leakage, unusual noise, and door gasket issues",
    commonJobs: ["fridge cooling issue", "compressor check", "single-door fridge repair", "double-door fridge repair", "fridge noise issue"],
    searchTerms: ["refrigerator repair", "fridge repair", "fridge service", "refrigerator technician"],
  },
  {
    slugPrefix: "fridge-repair",
    serviceName: "Fridge Repair",
    parentServiceSlug: "appliance-servicing",
    intent: "fridge and refrigerator cooling issues, compressor checks, water leakage, unusual noise, and door gasket issues",
    commonJobs: ["fridge cooling issue", "compressor check", "single-door fridge repair", "double-door fridge repair", "fridge noise issue"],
    searchTerms: ["fridge repair", "fridge service", "refrigerator repair", "fridge technician"],
  },
  {
    slugPrefix: "appliance-service",
    serviceName: "Appliance Service",
    parentServiceSlug: "appliance-servicing",
    intent: "doorstep appliance service for AC, fridge, washing machine, microwave, and water purifier needs",
    commonJobs: ["AC service", "fridge repair", "washing machine repair", "microwave repair", "water purifier service"],
    searchTerms: ["appliance service", "AC service", "fridge repair", "washing machine repair", "home appliance technician", "doorstep appliance service"],
  },
  {
    slugPrefix: "electrician",
    serviceName: "Electrician Service",
    parentServiceSlug: "electrical-plumbing",
    intent: "home electrician visits for wiring, switchboard faults, MCB tripping, lighting, and urgent electrical repairs",
    commonJobs: ["switchboard repair", "MCB tripping issue", "house wiring", "fan installation", "light fitting work"],
    searchTerms: ["electrician", "electrician near me", "electrical repair", "wiring work", "switchboard repair"],
  },
  {
    slugPrefix: "plumber",
    serviceName: "Plumber Service",
    parentServiceSlug: "electrical-plumbing",
    intent: "plumbing repair for pipe leaks, tap replacement, bathroom fittings, drainage, and motor connection issues",
    commonJobs: ["pipe leakage repair", "tap replacement", "bathroom fitting work", "drainage issue", "water motor connection"],
    searchTerms: ["plumber", "plumber near me", "plumbing services", "pipe leakage repair", "tap repair"],
  },
  {
    slugPrefix: "electrical-plumbing",
    serviceName: "Electrical and Plumbing Services",
    parentServiceSlug: "electrical-plumbing",
    intent: "combined electrical and plumbing support for homes, shops, rentals, and small offices",
    commonJobs: ["wiring repair", "pipe leakage repair", "geyser installation", "switch and socket work", "bathroom plumbing"],
    searchTerms: ["electrical and plumbing services", "home maintenance electrician plumber", "electrician plumber"],
  },
  {
    slugPrefix: "painting",
    serviceName: "Painting Services",
    parentServiceSlug: "painting",
    intent: "interior painting, exterior painting, full home repainting, putty work, texture painting, and waterproof coatings",
    commonJobs: ["interior painting", "exterior painting", "full home repainting", "wall putty work", "texture painting"],
    searchTerms: ["painting services", "house painting", "home painting", "painting contractors", "wall painting"],
  },
  {
    slugPrefix: "house-painting",
    serviceName: "House Painting",
    parentServiceSlug: "painting",
    intent: "interior painting, exterior painting, repainting, wall putty work, waterproof coating, and neat finishing",
    commonJobs: ["interior painting", "exterior painting", "wall putty work", "waterproof coating", "full home repainting"],
    searchTerms: ["house painting", "painting services", "interior painting", "exterior painting", "home painting"],
  },
  {
    slugPrefix: "interior-painting",
    serviceName: "Interior Painting",
    parentServiceSlug: "painting",
    intent: "room repainting, wall preparation, putty work, primer application, and clean indoor paint finishes",
    commonJobs: ["bedroom painting", "living room painting", "putty and primer", "texture painting", "rental repainting"],
    searchTerms: ["interior painting", "room painting", "wall painting", "texture painting", "interior painters"],
  },
  {
    slugPrefix: "exterior-painting",
    serviceName: "Exterior Painting",
    parentServiceSlug: "painting",
    intent: "outside wall painting, weather-resistant coating, exterior repainting, and waterproof paint support",
    commonJobs: ["outside wall painting", "weatherproof coating", "exterior repainting", "wall crack filling", "waterproof painting"],
    searchTerms: ["exterior painting", "outside wall painting", "waterproof painting", "exterior painters"],
  },
  {
    slugPrefix: "carpentry",
    serviceName: "Carpentry Services",
    parentServiceSlug: "carpentry",
    intent: "door repair, furniture repair, wardrobe work, modular kitchen support, shelf fitting, and custom woodwork",
    commonJobs: ["door repair", "furniture repair", "wardrobe work", "modular kitchen support", "shelf fitting"],
    searchTerms: ["carpentry services", "carpenter", "woodwork", "furniture repair", "home carpenter"],
  },
  {
    slugPrefix: "carpenter",
    serviceName: "Carpenter Service",
    parentServiceSlug: "carpentry",
    intent: "door repair, cupboard repair, furniture fixes, modular kitchen adjustments, and custom woodwork",
    commonJobs: ["door repair", "cupboard repair", "furniture repair", "shelf fitting", "hinge replacement"],
    searchTerms: ["carpenter", "carpenter service", "furniture repair", "woodwork", "home carpenter"],
  },
  {
    slugPrefix: "furniture-repair",
    serviceName: "Furniture Repair",
    parentServiceSlug: "carpentry",
    intent: "bed, sofa, cupboard, drawer, wardrobe, and wooden furniture repair for homes and rentals",
    commonJobs: ["bed repair", "wardrobe repair", "drawer channel repair", "sofa frame repair", "cupboard fixing"],
    searchTerms: ["furniture repair", "wardrobe repair", "cupboard repair", "wood furniture repair"],
  },
  {
    slugPrefix: "modular-kitchen-work",
    serviceName: "Modular Kitchen Work",
    parentServiceSlug: "carpentry",
    intent: "kitchen cabinet repair, shutter alignment, hinge replacement, storage fixes, and modular kitchen carpentry",
    commonJobs: ["cabinet repair", "kitchen shutter alignment", "drawer repair", "hinge replacement", "kitchen storage work"],
    searchTerms: ["modular kitchen work", "kitchen cabinet repair", "kitchen carpenter", "modular kitchen carpenter"],
  },
  {
    slugPrefix: "roofing-fabrication",
    serviceName: "Roofing and Fabrication",
    parentServiceSlug: "roofing-fabrication",
    intent: "roofing sheet work, truss work, aluminium fabrication, steel fabrication, gate work, grill work, and welding support",
    commonJobs: ["roofing sheet work", "truss work", "aluminium fabrication", "steel fabrication", "gate fabrication"],
    searchTerms: ["roofing and fabrication", "fabrication work", "roofing sheet work", "welding work", "gate fabrication"],
  },
  {
    slugPrefix: "aluminium-fabrication",
    serviceName: "Aluminium Fabrication",
    parentServiceSlug: "roofing-fabrication",
    intent: "aluminium fabrication for windows, partitions, frames, shop fronts, and home improvement work",
    commonJobs: ["aluminium window work", "aluminium partition", "shop front fabrication", "frame fitting", "custom aluminium work"],
    searchTerms: ["aluminium fabrication", "aluminium work", "aluminium fabricator", "window fabrication"],
  },
  {
    slugPrefix: "steel-fabrication",
    serviceName: "Steel Fabrication",
    parentServiceSlug: "roofing-fabrication",
    intent: "steel fabrication for grills, railings, frames, supports, and durable home or shop structures",
    commonJobs: ["steel grill work", "railing fabrication", "steel frame work", "staircase support", "custom steel work"],
    searchTerms: ["steel fabrication", "steel fabricator", "welding work", "grill fabrication"],
  },
  {
    slugPrefix: "gate-fabrication",
    serviceName: "Gate Fabrication",
    parentServiceSlug: "roofing-fabrication",
    intent: "custom gate fabrication, gate repair, grill gates, compound gates, and welding support",
    commonJobs: ["compound gate work", "grill gate fabrication", "gate repair", "gate welding", "custom gate design"],
    searchTerms: ["gate fabrication", "gate welding", "gate fabricator", "grill gate work"],
  },
  {
    slugPrefix: "roofing-sheet-work",
    serviceName: "Roofing Sheet Work",
    parentServiceSlug: "roofing-fabrication",
    intent: "roofing sheet installation, shed work, roof repair, truss support, and leakage protection",
    commonJobs: ["roofing sheet installation", "shed roofing", "roof leakage repair", "truss work", "terrace cover work"],
    searchTerms: ["roofing sheet work", "roofing sheet installation", "roof repair", "shed work", "truss work"],
  },
  {
    slugPrefix: "deep-cleaning",
    serviceName: "Deep Cleaning",
    parentServiceSlug: "deep-cleaning",
    intent: "full home deep cleaning, kitchen cleaning, bathroom cleaning, sofa cleaning, and post-construction cleaning",
    commonJobs: ["full home deep cleaning", "kitchen deep cleaning", "bathroom cleaning", "sofa cleaning", "post-construction cleaning"],
    searchTerms: ["deep cleaning", "deep cleaning services", "home cleaning", "house cleaning", "cleaning service"],
  },
  {
    slugPrefix: "home-cleaning",
    serviceName: "Home Cleaning",
    parentServiceSlug: "deep-cleaning",
    intent: "regular and deep home cleaning for apartments, villas, rental homes, and move-in cleaning needs",
    commonJobs: ["apartment cleaning", "villa cleaning", "move-in cleaning", "floor cleaning", "dust removal"],
    searchTerms: ["home cleaning", "house cleaning", "apartment cleaning", "villa cleaning", "home cleaners"],
  },
  {
    slugPrefix: "sofa-cleaning",
    serviceName: "Sofa Cleaning",
    parentServiceSlug: "deep-cleaning",
    intent: "sofa shampooing, upholstery cleaning, stain removal, and fabric-safe cleaning support",
    commonJobs: ["sofa shampooing", "upholstery cleaning", "stain cleaning", "fabric sofa cleaning", "cushion cleaning"],
    searchTerms: ["sofa cleaning", "sofa shampooing", "upholstery cleaning", "sofa cleaners"],
  },
  {
    slugPrefix: "pest-control",
    serviceName: "Pest Control",
    parentServiceSlug: "pest-control",
    intent: "safe pest control for termites, cockroaches, bed bugs, mosquitoes, rodents, homes, shops, and offices",
    commonJobs: ["cockroach treatment", "termite treatment", "bed bug treatment", "mosquito control", "rodent control"],
    searchTerms: ["pest control", "pest control service", "home pest control", "pest control company"],
  },
  {
    slugPrefix: "termite-control",
    serviceName: "Termite Control",
    parentServiceSlug: "pest-control",
    intent: "termite inspection, anti-termite treatment, wooden furniture protection, and follow-up advice",
    commonJobs: ["termite inspection", "anti-termite treatment", "wood protection", "termite spray", "furniture termite control"],
    searchTerms: ["termite control", "termite treatment", "anti termite treatment", "termite pest control"],
  },
  {
    slugPrefix: "cockroach-control",
    serviceName: "Cockroach Control",
    parentServiceSlug: "pest-control",
    intent: "cockroach gel treatment, kitchen pest treatment, apartment pest control, and safe follow-up guidance",
    commonJobs: ["cockroach gel treatment", "kitchen pest control", "apartment cockroach treatment", "pest inspection", "follow-up treatment"],
    searchTerms: ["cockroach control", "cockroach treatment", "cockroach pest control", "kitchen pest control"],
  },
  {
    slugPrefix: "smart-home",
    serviceName: "Smart Home Services",
    parentServiceSlug: "smart-home",
    intent: "CCTV installation, smart lighting, smart locks, Wi-Fi setup, video door phone setup, and home automation",
    commonJobs: ["CCTV installation", "smart lighting", "smart lock installation", "Wi-Fi setup", "home automation"],
    searchTerms: ["smart home services", "smart home setup", "home automation", "CCTV installation", "smart lock installation"],
  },
  {
    slugPrefix: "cctv-installation",
    serviceName: "CCTV Installation",
    parentServiceSlug: "smart-home",
    intent: "CCTV camera installation, camera placement, DVR/NVR setup, mobile viewing, and security camera service",
    commonJobs: ["home CCTV installation", "office CCTV setup", "camera placement", "DVR setup", "mobile viewing setup"],
    searchTerms: ["CCTV installation", "CCTV camera installation", "security camera installation", "CCTV service"],
  },
  {
    slugPrefix: "smart-home-setup",
    serviceName: "Smart Home Setup",
    parentServiceSlug: "smart-home",
    intent: "smart lighting, smart locks, Wi-Fi setup, automation controls, video door phones, and connected home upgrades",
    commonJobs: ["smart lighting setup", "smart lock installation", "Wi-Fi setup", "video door phone installation", "home automation"],
    searchTerms: ["smart home setup", "home automation", "smart lock installation", "smart lighting", "WiFi setup"],
  },
  {
    slugPrefix: "wifi-setup",
    serviceName: "Wi-Fi Setup",
    parentServiceSlug: "smart-home",
    intent: "router setup, Wi-Fi coverage planning, mesh router installation, signal improvement, and smart-device connectivity",
    commonJobs: ["router setup", "mesh Wi-Fi setup", "signal improvement", "Wi-Fi extender setup", "smart device connection"],
    searchTerms: ["WiFi setup", "router setup", "mesh WiFi setup", "WiFi technician", "internet setup"],
  },
];

function buildLandingPage(template: LocalServiceTemplate, area: ServiceAreaEntry): LocalServiceLandingPage {
  const parentService = serviceCatalogBySlug[template.parentServiceSlug];
  const slug = `${template.slugPrefix}-${area.slug}`;
  const title = `${template.serviceName} in ${area.name}`;
  const metaDescription = `Book ${template.serviceName.toLowerCase()} in ${area.name} with Ithihasam. Doorstep support for ${template.intent} across ${area.district}.`;

  return {
    slug,
    path: `/${slug}/`,
    area,
    template,
    title,
    metaTitle: `${title} | Ithihasam`,
    metaDescription,
    h1: `${title}`,
    keywords: createKeywordSet(
      template.searchTerms.map((term) => `${term} in ${area.name}`),
      template.searchTerms.map((term) => `${term} ${area.name}`),
      title,
      area.name,
      area.district,
      "Ithihasam",
      "Kannur district home services",
    ),
    parentServicePath: `/services/${template.parentServiceSlug}`,
    image: parentService.cardImage,
  };
}

export const localServiceLandingPages = serviceAreas.flatMap((area) =>
  localServiceTemplates.map((template) => buildLandingPage(template, area)),
);

export const localServiceLandingPageBySlug = Object.fromEntries(
  localServiceLandingPages.map((page) => [page.slug, page]),
) as Record<string, LocalServiceLandingPage>;

export const localServiceLandingPaths = localServiceLandingPages.map((page) => page.path);
