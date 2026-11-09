// Construction materials, site work and building services.
//
// Structured as category pages rather than one page per item: a category page
// for "Demolition Services in Kannur" listing all eighteen demolition jobs is
// substantial, where eighteen separate pages would be thin and near-identical.
// The site already carries over a thousand template-generated URLs, so adding
// another five hundred would compound a problem rather than solve one.
//
// Districts are wider than the home-maintenance service area because material
// travels by lorry and a build runs for months, so distance matters far less
// than it does for a same-day repair visit.

export const constructionBrand = {
  sectionSlug: "construction",
  name: "Construction & Materials",
  tagline: "Building materials, site work and construction across Kerala.",
};

export const constructionDistricts = [
  {
    slug: "kannur",
    name: "Kannur",
    towns: ["Thalassery", "Taliparamba", "Payyannur", "Mattannur", "Iritty", "Kuthuparamba", "Panoor", "Chakkarakkal"],
    context:
      "a mix of individual house construction on family plots and steady renovation of older properties, with laterite still widely used alongside concrete blocks",
    demand: "independent houses, compound walls, and renovation of older homes",
  },
  {
    slug: "kozhikode",
    name: "Kozhikode",
    towns: ["Kozhikode City", "Ramanattukara", "Feroke", "Koyilandy", "Vadakara", "Kunnamangalam", "Thamarassery", "Balussery"],
    context:
      "a busy trade-town market where commercial buildings, shop fit-outs and apartment projects run alongside residential work",
    demand: "commercial buildings, apartments, and shop construction",
  },
  {
    slug: "ernakulam",
    name: "Ernakulam",
    towns: ["Kochi", "Kakkanad", "Aluva", "Perumbavoor", "Angamaly", "Muvattupuzha", "Tripunithura", "Kothamangalam"],
    context:
      "Kerala's largest construction market, with apartment projects, IT-corridor commercial builds and villa developments alongside steady residential demand",
    demand: "apartment projects, commercial builds, and villa construction",
  },
  {
    slug: "alappuzha",
    name: "Alappuzha",
    towns: ["Alappuzha Town", "Cherthala", "Kayamkulam", "Mavelikara", "Chengannur", "Haripad", "Ambalappuzha", "Arookutty"],
    context:
      "backwater-belt building where a high water table and soft soil make foundation design and filling material the decisive cost factors",
    demand: "raised foundations, filling work, and flood-resilient construction",
  },
  {
    slug: "pathanamthitta",
    name: "Pathanamthitta",
    towns: ["Pathanamthitta Town", "Adoor", "Thiruvalla", "Pandalam", "Ranni", "Konni", "Mallappally", "Kozhencherry"],
    context:
      "hill-and-midland terrain where sloped plots need retaining walls and levelling before anything is built, and NRI-funded house building is common",
    demand: "hillside house construction, retaining walls, and site development",
  },
  {
    slug: "kollam",
    name: "Kollam",
    towns: ["Kollam City", "Karunagappally", "Punalur", "Kottarakkara", "Paravur", "Chathannoor", "Anchal", "Kundara"],
    context:
      "a mix of coastal and inland building, with cashew-belt commercial property and residential work across town and village plots",
    demand: "residential construction, commercial units, and compound work",
  },
];

/**
 * Service categories.
 *
 *   kind       groups them for the hub page and picks the card image
 *   items      every individual service, listed on the page
 *   compliance a legal obligation stated prominently, never buried
 *   partner    true where the work is coordinated rather than self-performed
 */
export const constructionCategories = [
  // ------------------------------------------------------------- materials
  {
    slug: "sand-supply",
    name: "Sand Supply",
    kind: "material",
    icon: "materials",
    keywords: ["m sand supply", "p sand supply", "river sand", "sand delivery"],
    intro:
      "M-sand, P-sand and river sand supplied by the load, with the grade matched to the work rather than whatever is nearest. M-sand for concreting, P-sand for plastering.",
    items: [
      "M-sand (manufactured sand) supply",
      "P-sand (plastering sand) supply",
      "River sand from legally authorised sources",
      "Bulk sand delivery by tipper",
      "Part-load supply for small works",
    ],
    compliance:
      "River sand is supplied only from legally authorised sources with the required transit documentation. We will not quote for sand without it.",
  },
  {
    slug: "cement-steel-supply",
    name: "Cement & Steel Supply",
    kind: "material",
    icon: "materials",
    keywords: ["cement supply", "tmt bar supply", "steel supply", "opc ppc cement"],
    intro:
      "Cement and reinforcement steel delivered to site in the grades your structural drawing specifies, scheduled against your pour dates rather than dumped early to sit in the rain.",
    items: [
      "OPC, PPC and PSC cement",
      "TMT reinforcement bars",
      "Binding wire",
      "Structural steel sections",
      "MS plates, angles, channels and pipes",
    ],
  },
  {
    slug: "aggregate-quarry-supply",
    name: "Metal, Stone & Quarry Supply",
    kind: "material",
    icon: "materials",
    keywords: ["blue metal supply", "crusher dust", "quarry dust", "aggregate supply", "boulder supply"],
    intro:
      "Graded aggregate and quarry material by the load: blue metal in 6, 12, 20 and 40 mm, crusher dust, rubble and boulders for foundation and filling work.",
    items: [
      "Blue metal and crushed stone (6, 12, 20 and 40 mm)",
      "Crusher dust and quarry dust",
      "Rubble and boulder stone",
      "Foundation and filling material",
      "Bulk aggregate delivery",
    ],
    partner: true,
  },
  {
    slug: "bricks-blocks-supply",
    name: "Bricks & Blocks Supply",
    kind: "material",
    icon: "materials",
    keywords: ["aac block supply", "concrete block", "red bricks", "hollow blocks", "laterite stone"],
    intro:
      "Masonry materials by the load, including laterite still widely used across north Kerala and AAC blocks where weight and insulation matter more than cost per unit.",
    items: [
      "Red bricks",
      "Solid and hollow concrete blocks",
      "AAC blocks",
      "Cement blocks",
      "Laterite and foundation stones",
      "Interlocking pavers",
    ],
  },
  {
    slug: "roofing-materials-supply",
    name: "Roofing Materials Supply",
    kind: "material",
    icon: "materials",
    keywords: ["roofing sheet supply", "gi sheet", "roofing tiles", "colour coated sheets"],
    intro:
      "Roofing sheets and tiles supplied to site. Colour-coated resists rust far longer than plain GI near the coast, which is worth the difference in most of Kerala.",
    items: [
      "GI roofing sheets",
      "Colour-coated roofing sheets",
      "Roofing tiles",
      "Polycarbonate and UPVC sheets",
      "Ridge, flashing and fixing accessories",
    ],
  },
  {
    slug: "plumbing-electrical-supply",
    name: "Plumbing & Electrical Materials",
    kind: "material",
    icon: "materials",
    keywords: ["pvc pipe supply", "cpvc pipes", "electrical cable supply", "sanitaryware"],
    intro:
      "Plumbing and electrical materials supplied against your MEP layout, so sizes and fittings match the drawing instead of needing return trips mid-work.",
    items: [
      "PVC, CPVC and UPVC pipes and fittings",
      "Electrical wires, cables and conduits",
      "Switches, boards and accessories",
      "Plumbing fixtures and sanitaryware",
      "Water tanks and drainage products",
    ],
  },
  {
    slug: "finishing-materials-supply",
    name: "Flooring & Finishing Materials",
    kind: "material",
    icon: "materials",
    keywords: ["tile supply", "granite supply", "plywood supply", "paint supply", "waterproofing chemicals"],
    intro:
      "Finishing materials for the final stages of a build, sourced to the specification and finish agreed rather than substituted on site.",
    items: [
      "Tiles, granite and marble",
      "Paving blocks and wall cladding",
      "Plywood, timber and shuttering ply",
      "Putty, primers and paints",
      "Waterproofing chemicals",
      "Gypsum boards and ceiling materials",
    ],
  },
  {
    slug: "ready-mix-concrete",
    name: "Ready-Mix Concrete & Precast",
    kind: "material",
    icon: "materials",
    keywords: ["ready mix concrete", "rmc supply", "precast products"],
    intro:
      "Ready-mix concrete delivered to the grade and slump your engineer specifies, plus precast products where casting on site is impractical.",
    items: [
      "Ready-mix concrete (RMC) by grade",
      "Precast concrete products",
      "Concrete for slabs, foundations and columns",
      "Scheduled delivery against pour timing",
    ],
    partner: true,
  },

  // ------------------------------------------------------------- site work
  {
    slug: "demolition-services",
    name: "Demolition Services",
    kind: "sitework",
    icon: "demolition",
    keywords: ["building demolition", "house demolition", "rcc demolition", "wall demolition", "site clearance"],
    intro:
      "Demolition of buildings and structures, with debris removal and site clearance included so the plot is left ready to build on rather than piled with rubble.",
    items: [
      "Residential and old house demolition",
      "Commercial and apartment demolition",
      "Partial and interior demolition",
      "Concrete and RCC structure demolition",
      "Wall, slab and staircase demolition",
      "Foundation and compound wall demolition",
      "Warehouse and industrial demolition",
      "Road and pavement breaking",
      "Debris removal and site clearance",
      "Scrap segregation and recovery",
    ],
    compliance:
      "Demolition needs local-body permission, and adjoining structures must be assessed first. We will tell you which approvals your site requires before any work is scheduled.",
  },
  {
    slug: "earthmoving-excavation",
    name: "Earthmoving & Excavation",
    kind: "sitework",
    icon: "excavation",
    keywords: ["jcb rental", "excavator rental", "land levelling", "foundation digging", "plot cleaning"],
    intro:
      "Excavation and land preparation with machine and operator: foundations, levelling, plot cleaning and site formation before construction begins.",
    items: [
      "JCB and backhoe loader with operator",
      "Excavator and mini-excavator work",
      "Land excavation and plot cleaning",
      "Site levelling and grading",
      "Foundation and basement digging",
      "Pond and well excavation",
      "Hill cutting and rock breaking",
      "Soil removal and earth filling",
      "Road formation and access preparation",
      "Agricultural land clearing",
    ],
    partner: true,
  },
  {
    slug: "construction-transport",
    name: "Construction Transportation",
    kind: "sitework",
    icon: "delivery",
    keywords: ["tipper lorry rental", "sand transportation", "bulk material delivery", "construction waste removal"],
    intro:
      "Material and debris moved by the load. Tipper, truck and tractor transport arranged for deliveries in and waste out, charged per trip against distance.",
    items: [
      "Sand, M-sand and P-sand delivery",
      "Cement, steel and material transport",
      "Metal, aggregate and brick delivery",
      "Soil and rubble transportation",
      "Construction waste removal",
      "Tipper lorry hire",
      "6-wheel and 10-wheel truck hire",
      "Tractor transportation for small loads",
    ],
    partner: true,
  },
  {
    slug: "equipment-rental",
    name: "Equipment & Machinery Rental",
    kind: "sitework",
    icon: "excavation",
    keywords: ["jcb rental", "excavator hire", "tipper rental", "road roller rental", "concrete mixer rental"],
    intro:
      "Site machinery arranged with operators we work with regularly across the district, hourly, daily or for the project depending on the machine.",
    items: [
      "JCB and backhoe loader — hourly or daily",
      "Excavator and mini-excavator — hourly or daily",
      "Tipper and dump truck — per trip or daily",
      "Tractor — daily",
      "Rock breaker — project basis",
      "Road roller — daily",
      "Concrete mixer and vibrator — daily",
      "Scaffolding and shuttering systems",
    ],
    partner: true,
  },

  // -------------------------------------------------------------- building
  {
    slug: "house-construction",
    name: "House Construction",
    kind: "building",
    icon: "building",
    keywords: ["house construction", "home builders", "villa construction", "budget house construction"],
    intro:
      "House construction from foundation to handover, with scope, materials and stage payments agreed in writing before anything starts.",
    items: [
      "Individual house construction",
      "Budget and standard house construction",
      "Luxury house and villa construction",
      "Duplex and multi-generation homes",
      "Foundation and basement work",
      "Additional floors on an existing building",
    ],
  },
  {
    slug: "flat-construction",
    name: "Apartment & Flat Construction",
    kind: "building",
    icon: "building",
    keywords: ["apartment construction", "flat construction", "multi storey building"],
    intro:
      "Apartment and multi-storey residential construction, coordinated with your structural consultant and the local body's approval process.",
    items: [
      "Apartment and flat construction",
      "Multi-storey residential buildings",
      "Additional floors on existing buildings",
    ],
    compliance:
      "Projects requiring RERA registration are advertised for sale only once that registration is in place. We will tell you plainly which approvals your project needs.",
  },
  {
    slug: "commercial-construction",
    name: "Commercial Construction",
    kind: "building",
    icon: "building",
    keywords: ["commercial building construction", "shop construction", "warehouse construction"],
    intro:
      "Commercial construction built around your opening date, sequenced so fit-out trades are not waiting on each other at the end.",
    items: [
      "Office buildings",
      "Retail shops and shopping complexes",
      "Restaurants, cafes and hotels",
      "Clinics and healthcare facilities",
      "Warehouses and industrial buildings",
      "Workshops and factory buildings",
    ],
  },
  {
    slug: "civil-works",
    name: "Civil & Site Works",
    kind: "building",
    icon: "building",
    keywords: ["compound wall construction", "retaining wall", "interlocking tile", "drainage construction", "paving works"],
    intro:
      "The work around a building rather than the building itself: walls, drainage, paving and the levelling that holds a sloped plot in place.",
    items: [
      "Compound wall construction",
      "Retaining wall construction",
      "Road and access construction",
      "Drainage construction",
      "Interlocking tile installation",
      "Paving and hardscape works",
      "Waterproofing",
    ],
  },
  {
    slug: "building-renovation",
    name: "Renovation & Repair",
    kind: "building",
    icon: "building",
    keywords: ["house renovation", "building renovation", "structural repair", "building extension"],
    intro:
      "Renovation and repair of existing buildings, starting with a condition check so the structure is assessed before anything is committed to.",
    items: [
      "Complete house renovation",
      "Flat and apartment renovation",
      "Kitchen and bathroom renovation",
      "Building extension and remodelling",
      "Structural crack repair and assessment",
      "Roof and exterior renovation",
    ],
  },
  {
    slug: "construction-contracts",
    name: "Contract Options",
    kind: "building",
    icon: "building",
    keywords: ["turnkey construction", "labour contract", "material and labour contract"],
    intro:
      "Four ways to contract the same build. Which suits you depends on how much of the sourcing and supervision you want to handle yourself.",
    items: [
      "Turnkey — design, materials, labour and handover",
      "Material-and-labour contract",
      "Labour-only, where you supply materials",
      "Project-based and stage-wise contracts",
    ],
  },
];

export const materialCategories = constructionCategories.filter((c) => c.kind === "material");
export const siteworkCategories = constructionCategories.filter((c) => c.kind === "sitework");
export const buildingCategories = constructionCategories.filter((c) => c.kind === "building");

export const allConstructionServices = constructionCategories;

export const constructionDistrictBySlug = Object.fromEntries(
  constructionDistricts.map((district) => [district.slug, district]),
);
