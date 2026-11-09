// GENERATED FILE — do not edit.
//
// Written by scripts/generate-construction-catalogue.mjs from
// scripts/construction-data.mjs, which the build also uses to prerender these
// pages. Edit the data file and re-run `npm run build` (or
// `node scripts/generate-construction-catalogue.mjs`) instead of editing here.

export interface ConstructionDistrict {
  slug: string;
  name: string;
  towns: string[];
  context: string;
  demand: string;
}

export type ConstructionKind = "material" | "sitework" | "building";

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

export const constructionDistricts: ConstructionDistrict[] = [
  {
    "slug": "kannur",
    "name": "Kannur",
    "towns": [
      "Thalassery",
      "Taliparamba",
      "Payyannur",
      "Mattannur",
      "Iritty",
      "Kuthuparamba",
      "Panoor",
      "Chakkarakkal"
    ],
    "context": "a mix of individual house construction on family plots and steady renovation of older properties, with laterite still widely used alongside concrete blocks",
    "demand": "independent houses, compound walls, and renovation of older homes"
  },
  {
    "slug": "kozhikode",
    "name": "Kozhikode",
    "towns": [
      "Kozhikode City",
      "Ramanattukara",
      "Feroke",
      "Koyilandy",
      "Vadakara",
      "Kunnamangalam",
      "Thamarassery",
      "Balussery"
    ],
    "context": "a busy trade-town market where commercial buildings, shop fit-outs and apartment projects run alongside residential work",
    "demand": "commercial buildings, apartments, and shop construction"
  },
  {
    "slug": "ernakulam",
    "name": "Ernakulam",
    "towns": [
      "Kochi",
      "Kakkanad",
      "Aluva",
      "Perumbavoor",
      "Angamaly",
      "Muvattupuzha",
      "Tripunithura",
      "Kothamangalam"
    ],
    "context": "Kerala's largest construction market, with apartment projects, IT-corridor commercial builds and villa developments alongside steady residential demand",
    "demand": "apartment projects, commercial builds, and villa construction"
  },
  {
    "slug": "alappuzha",
    "name": "Alappuzha",
    "towns": [
      "Alappuzha Town",
      "Cherthala",
      "Kayamkulam",
      "Mavelikara",
      "Chengannur",
      "Haripad",
      "Ambalappuzha",
      "Arookutty"
    ],
    "context": "backwater-belt building where a high water table and soft soil make foundation design and filling material the decisive cost factors",
    "demand": "raised foundations, filling work, and flood-resilient construction"
  },
  {
    "slug": "pathanamthitta",
    "name": "Pathanamthitta",
    "towns": [
      "Pathanamthitta Town",
      "Adoor",
      "Thiruvalla",
      "Pandalam",
      "Ranni",
      "Konni",
      "Mallappally",
      "Kozhencherry"
    ],
    "context": "hill-and-midland terrain where sloped plots need retaining walls and levelling before anything is built, and NRI-funded house building is common",
    "demand": "hillside house construction, retaining walls, and site development"
  },
  {
    "slug": "kollam",
    "name": "Kollam",
    "towns": [
      "Kollam City",
      "Karunagappally",
      "Punalur",
      "Kottarakkara",
      "Paravur",
      "Chathannoor",
      "Anchal",
      "Kundara"
    ],
    "context": "a mix of coastal and inland building, with cashew-belt commercial property and residential work across town and village plots",
    "demand": "residential construction, commercial units, and compound work"
  }
];

export const constructionServices: ConstructionService[] = [
  {
    "slug": "sand-supply",
    "name": "Sand Supply",
    "kind": "material",
    "icon": "materials",
    "items": [
      "M-sand (manufactured sand) supply",
      "P-sand (plastering sand) supply",
      "River sand from legally authorised sources",
      "Bulk sand delivery by tipper",
      "Part-load supply for small works"
    ],
    "intro": "M-sand, P-sand and river sand supplied by the load, with the grade matched to the work rather than whatever is nearest. M-sand for concreting, P-sand for plastering.",
    "compliance": "River sand is supplied only from legally authorised sources with the required transit documentation. We will not quote for sand without it."
  },
  {
    "slug": "cement-steel-supply",
    "name": "Cement & Steel Supply",
    "kind": "material",
    "icon": "materials",
    "items": [
      "OPC, PPC and PSC cement",
      "TMT reinforcement bars",
      "Binding wire",
      "Structural steel sections",
      "MS plates, angles, channels and pipes"
    ],
    "intro": "Cement and reinforcement steel delivered to site in the grades your structural drawing specifies, scheduled against your pour dates rather than dumped early to sit in the rain."
  },
  {
    "slug": "aggregate-quarry-supply",
    "name": "Metal, Stone & Quarry Supply",
    "kind": "material",
    "icon": "materials",
    "items": [
      "Blue metal and crushed stone (6, 12, 20 and 40 mm)",
      "Crusher dust and quarry dust",
      "Rubble and boulder stone",
      "Foundation and filling material",
      "Bulk aggregate delivery"
    ],
    "intro": "Graded aggregate and quarry material by the load: blue metal in 6, 12, 20 and 40 mm, crusher dust, rubble and boulders for foundation and filling work.",
    "partner": true
  },
  {
    "slug": "bricks-blocks-supply",
    "name": "Bricks & Blocks Supply",
    "kind": "material",
    "icon": "materials",
    "items": [
      "Red bricks",
      "Solid and hollow concrete blocks",
      "AAC blocks",
      "Cement blocks",
      "Laterite and foundation stones",
      "Interlocking pavers"
    ],
    "intro": "Masonry materials by the load, including laterite still widely used across north Kerala and AAC blocks where weight and insulation matter more than cost per unit."
  },
  {
    "slug": "roofing-materials-supply",
    "name": "Roofing Materials Supply",
    "kind": "material",
    "icon": "materials",
    "items": [
      "GI roofing sheets",
      "Colour-coated roofing sheets",
      "Roofing tiles",
      "Polycarbonate and UPVC sheets",
      "Ridge, flashing and fixing accessories"
    ],
    "intro": "Roofing sheets and tiles supplied to site. Colour-coated resists rust far longer than plain GI near the coast, which is worth the difference in most of Kerala."
  },
  {
    "slug": "plumbing-electrical-supply",
    "name": "Plumbing & Electrical Materials",
    "kind": "material",
    "icon": "materials",
    "items": [
      "PVC, CPVC and UPVC pipes and fittings",
      "Electrical wires, cables and conduits",
      "Switches, boards and accessories",
      "Plumbing fixtures and sanitaryware",
      "Water tanks and drainage products"
    ],
    "intro": "Plumbing and electrical materials supplied against your MEP layout, so sizes and fittings match the drawing instead of needing return trips mid-work."
  },
  {
    "slug": "finishing-materials-supply",
    "name": "Flooring & Finishing Materials",
    "kind": "material",
    "icon": "materials",
    "items": [
      "Tiles, granite and marble",
      "Paving blocks and wall cladding",
      "Plywood, timber and shuttering ply",
      "Putty, primers and paints",
      "Waterproofing chemicals",
      "Gypsum boards and ceiling materials"
    ],
    "intro": "Finishing materials for the final stages of a build, sourced to the specification and finish agreed rather than substituted on site."
  },
  {
    "slug": "ready-mix-concrete",
    "name": "Ready-Mix Concrete & Precast",
    "kind": "material",
    "icon": "materials",
    "items": [
      "Ready-mix concrete (RMC) by grade",
      "Precast concrete products",
      "Concrete for slabs, foundations and columns",
      "Scheduled delivery against pour timing"
    ],
    "intro": "Ready-mix concrete delivered to the grade and slump your engineer specifies, plus precast products where casting on site is impractical.",
    "partner": true
  },
  {
    "slug": "demolition-services",
    "name": "Demolition Services",
    "kind": "sitework",
    "icon": "demolition",
    "items": [
      "Residential and old house demolition",
      "Commercial and apartment demolition",
      "Partial and interior demolition",
      "Concrete and RCC structure demolition",
      "Wall, slab and staircase demolition",
      "Foundation and compound wall demolition",
      "Warehouse and industrial demolition",
      "Road and pavement breaking",
      "Debris removal and site clearance",
      "Scrap segregation and recovery"
    ],
    "intro": "Demolition of buildings and structures, with debris removal and site clearance included so the plot is left ready to build on rather than piled with rubble.",
    "compliance": "Demolition needs local-body permission, and adjoining structures must be assessed first. We will tell you which approvals your site requires before any work is scheduled."
  },
  {
    "slug": "earthmoving-excavation",
    "name": "Earthmoving & Excavation",
    "kind": "sitework",
    "icon": "excavation",
    "items": [
      "JCB and backhoe loader with operator",
      "Excavator and mini-excavator work",
      "Land excavation and plot cleaning",
      "Site levelling and grading",
      "Foundation and basement digging",
      "Pond and well excavation",
      "Hill cutting and rock breaking",
      "Soil removal and earth filling",
      "Road formation and access preparation",
      "Agricultural land clearing"
    ],
    "intro": "Excavation and land preparation with machine and operator: foundations, levelling, plot cleaning and site formation before construction begins.",
    "partner": true
  },
  {
    "slug": "construction-transport",
    "name": "Construction Transportation",
    "kind": "sitework",
    "icon": "delivery",
    "items": [
      "Sand, M-sand and P-sand delivery",
      "Cement, steel and material transport",
      "Metal, aggregate and brick delivery",
      "Soil and rubble transportation",
      "Construction waste removal",
      "Tipper lorry hire",
      "6-wheel and 10-wheel truck hire",
      "Tractor transportation for small loads"
    ],
    "intro": "Material and debris moved by the load. Tipper, truck and tractor transport arranged for deliveries in and waste out, charged per trip against distance.",
    "partner": true
  },
  {
    "slug": "equipment-rental",
    "name": "Equipment & Machinery Rental",
    "kind": "sitework",
    "icon": "excavation",
    "items": [
      "JCB and backhoe loader — hourly or daily",
      "Excavator and mini-excavator — hourly or daily",
      "Tipper and dump truck — per trip or daily",
      "Tractor — daily",
      "Rock breaker — project basis",
      "Road roller — daily",
      "Concrete mixer and vibrator — daily",
      "Scaffolding and shuttering systems"
    ],
    "intro": "Site machinery arranged with operators we work with regularly across the district, hourly, daily or for the project depending on the machine.",
    "partner": true
  },
  {
    "slug": "house-construction",
    "name": "House Construction",
    "kind": "building",
    "icon": "building",
    "items": [
      "Individual house construction",
      "Budget and standard house construction",
      "Luxury house and villa construction",
      "Duplex and multi-generation homes",
      "Foundation and basement work",
      "Additional floors on an existing building"
    ],
    "intro": "House construction from foundation to handover, with scope, materials and stage payments agreed in writing before anything starts."
  },
  {
    "slug": "flat-construction",
    "name": "Apartment & Flat Construction",
    "kind": "building",
    "icon": "building",
    "items": [
      "Apartment and flat construction",
      "Multi-storey residential buildings",
      "Additional floors on existing buildings"
    ],
    "intro": "Apartment and multi-storey residential construction, coordinated with your structural consultant and the local body's approval process.",
    "compliance": "Projects requiring RERA registration are advertised for sale only once that registration is in place. We will tell you plainly which approvals your project needs."
  },
  {
    "slug": "commercial-construction",
    "name": "Commercial Construction",
    "kind": "building",
    "icon": "building",
    "items": [
      "Office buildings",
      "Retail shops and shopping complexes",
      "Restaurants, cafes and hotels",
      "Clinics and healthcare facilities",
      "Warehouses and industrial buildings",
      "Workshops and factory buildings"
    ],
    "intro": "Commercial construction built around your opening date, sequenced so fit-out trades are not waiting on each other at the end."
  },
  {
    "slug": "civil-works",
    "name": "Civil & Site Works",
    "kind": "building",
    "icon": "building",
    "items": [
      "Compound wall construction",
      "Retaining wall construction",
      "Road and access construction",
      "Drainage construction",
      "Interlocking tile installation",
      "Paving and hardscape works",
      "Waterproofing"
    ],
    "intro": "The work around a building rather than the building itself: walls, drainage, paving and the levelling that holds a sloped plot in place."
  },
  {
    "slug": "building-renovation",
    "name": "Renovation & Repair",
    "kind": "building",
    "icon": "building",
    "items": [
      "Complete house renovation",
      "Flat and apartment renovation",
      "Kitchen and bathroom renovation",
      "Building extension and remodelling",
      "Structural crack repair and assessment",
      "Roof and exterior renovation"
    ],
    "intro": "Renovation and repair of existing buildings, starting with a condition check so the structure is assessed before anything is committed to."
  },
  {
    "slug": "construction-contracts",
    "name": "Contract Options",
    "kind": "building",
    "icon": "building",
    "items": [
      "Turnkey — design, materials, labour and handover",
      "Material-and-labour contract",
      "Labour-only, where you supply materials",
      "Project-based and stage-wise contracts"
    ],
    "intro": "Four ways to contract the same build. Which suits you depends on how much of the sourcing and supervision you want to handle yourself."
  }
];

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
  value: `Construction — ${service.name}`,
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
