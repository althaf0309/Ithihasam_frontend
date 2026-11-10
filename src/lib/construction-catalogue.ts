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
    "icon": "steel",
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
    "icon": "aggregate",
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

export const constructionTowns: ConstructionTown[] = [
  {
    "slug": "thalassery",
    "name": "Thalassery",
    "districtSlug": "kannur",
    "districtName": "Kannur",
    "terrain": "coastal laterite with a firm base close to the surface",
    "access": "narrow older town roads near the fort and beach side, which decide tipper size more than distance does",
    "building": "individual houses, shop buildings and renovation of older tiled-roof homes",
    "note": "Laterite blocks cut locally are still common here, so a build often mixes laterite walls with concrete framing."
  },
  {
    "slug": "taliparamba",
    "name": "Taliparamba",
    "districtSlug": "kannur",
    "districtName": "Kannur",
    "terrain": "midland laterite, mostly level plots with firm bearing",
    "access": "good highway access off NH-66, so full loads reach most sites",
    "building": "independent houses on family plots and commercial buildings along the highway",
    "note": "Highway frontage means full 10-wheel loads are practical, which brings the per-unit rate down on larger orders."
  },
  {
    "slug": "payyannur",
    "name": "Payyannur",
    "districtSlug": "kannur",
    "districtName": "Kannur",
    "terrain": "coastal belt with sandy topsoil over laterite",
    "access": "town roads are workable but coastal lanes can limit a loaded lorry",
    "building": "houses, compound walls and small commercial units",
    "note": "Salt-laden air near the coast is the reason colour-coated roofing outlasts plain GI here by years."
  },
  {
    "slug": "mattannur",
    "name": "Mattannur",
    "districtSlug": "kannur",
    "districtName": "Kannur",
    "terrain": "midland with gentle slopes and firm laterite",
    "access": "improved roads around the airport corridor take full loads",
    "building": "new houses and commercial plots, with airport-corridor activity",
    "note": "Plot development around the airport road has made levelling and compound-wall work steady demand."
  },
  {
    "slug": "iritty",
    "name": "Iritty",
    "districtSlug": "kannur",
    "districtName": "Kannur",
    "terrain": "hill-edge terrain with sloped plots and rocky sections",
    "access": "ghat-side approaches, where gradient and turning room cap vehicle size",
    "building": "hillside houses, retaining walls and site levelling",
    "note": "Sloped plots here usually need retaining work and filling before the foundation can be set out."
  },
  {
    "slug": "kuthuparamba",
    "name": "Kuthuparamba",
    "districtSlug": "kannur",
    "districtName": "Kannur",
    "terrain": "midland laterite with mixed level and sloped plots",
    "access": "town roads are adequate; interior lanes may need a smaller tipper",
    "building": "residential construction and renovation",
    "note": "A mix of level and sloped plots means the filling quantity varies widely from site to site."
  },
  {
    "slug": "panoor",
    "name": "Panoor",
    "districtSlug": "kannur",
    "districtName": "Kannur",
    "terrain": "midland laterite, generally firm",
    "access": "narrow interior roads in parts of the town",
    "building": "houses and small commercial buildings",
    "note": "Interior lanes often mean part-load delivery, which is charged at the full trip rate."
  },
  {
    "slug": "chakkarakkal",
    "name": "Chakkarakkal",
    "districtSlug": "kannur",
    "districtName": "Kannur",
    "terrain": "laterite midland with level plots",
    "access": "reasonable road access for standard tippers",
    "building": "residential building and compound work",
    "note": "Level plots keep excavation modest, so material cost dominates the budget here."
  },
  {
    "slug": "kozhikode-city",
    "name": "Kozhikode City",
    "districtSlug": "kozhikode",
    "districtName": "Kozhikode",
    "terrain": "coastal plain with made-up ground in parts of the old town",
    "access": "city traffic restrictions make delivery timing matter as much as distance",
    "building": "commercial buildings, apartments and shop fit-outs",
    "note": "City deliveries are usually scheduled early morning, because loading restrictions apply through the day."
  },
  {
    "slug": "ramanattukara",
    "name": "Ramanattukara",
    "districtSlug": "kozhikode",
    "districtName": "Kozhikode",
    "terrain": "level midland with firm bearing",
    "access": "junction location with strong highway access for full loads",
    "building": "commercial units, warehouses and houses",
    "note": "The highway junction makes this one of the easier places in the district for bulk delivery."
  },
  {
    "slug": "feroke",
    "name": "Feroke",
    "districtSlug": "kozhikode",
    "districtName": "Kozhikode",
    "terrain": "riverside flats with clay-bearing soil in places",
    "access": "river-side roads and bridge approaches limit some routes",
    "building": "houses and small industrial units",
    "note": "Feroke's tile-making history reflects the clay in the ground, which matters for foundation design."
  },
  {
    "slug": "koyilandy",
    "name": "Koyilandy",
    "districtSlug": "kozhikode",
    "districtName": "Kozhikode",
    "terrain": "coastal belt with sandy soil near the shore",
    "access": "coastal road access is workable for standard loads",
    "building": "residential construction and commercial frontage",
    "note": "Sandy coastal soil usually calls for a wider footing than the same house inland would need."
  },
  {
    "slug": "vadakara",
    "name": "Vadakara",
    "districtSlug": "kozhikode",
    "districtName": "Kozhikode",
    "terrain": "coastal and midland mix with varied bearing",
    "access": "good main-road access, narrower interior lanes",
    "building": "houses, shops and renovation work",
    "note": "Bearing varies noticeably between coastal and inland plots, so soil condition is worth checking first."
  },
  {
    "slug": "kunnamangalam",
    "name": "Kunnamangalam",
    "districtSlug": "kozhikode",
    "districtName": "Kozhikode",
    "terrain": "midland with gentle slopes and firm laterite",
    "access": "good access on the main corridor",
    "building": "houses, hostels and institutional buildings",
    "note": "Institutional and rental-housing demand near the campuses keeps multi-room construction steady."
  },
  {
    "slug": "thamarassery",
    "name": "Thamarassery",
    "districtSlug": "kozhikode",
    "districtName": "Kozhikode",
    "terrain": "hill-approach terrain, sloped and rocky in parts",
    "access": "ghat road approaches restrict vehicle size on the climb",
    "building": "hillside houses and retaining structures",
    "note": "On the ghat approach, gradient decides the vehicle, so loads are often split into smaller trips."
  },
  {
    "slug": "balussery",
    "name": "Balussery",
    "districtSlug": "kozhikode",
    "districtName": "Kozhikode",
    "terrain": "midland with undulating plots",
    "access": "adequate road access for standard tippers",
    "building": "residential construction and compound walls",
    "note": "Undulating plots here usually need levelling before the plinth can be set out."
  },
  {
    "slug": "kochi",
    "name": "Kochi",
    "districtSlug": "ernakulam",
    "districtName": "Ernakulam",
    "terrain": "coastal and reclaimed ground with a high water table",
    "access": "city congestion and timing restrictions govern delivery windows",
    "building": "apartments, commercial buildings and villa projects",
    "note": "A high water table and made-up ground are why pile or raft foundations are common rather than exceptional."
  },
  {
    "slug": "kakkanad",
    "name": "Kakkanad",
    "districtSlug": "ernakulam",
    "districtName": "Ernakulam",
    "terrain": "midland with firmer bearing than the island side",
    "access": "good access on the IT-corridor roads",
    "building": "apartments, offices and villa developments",
    "note": "IT-corridor work runs to tighter programmes, so material scheduling matters more than unit rate."
  },
  {
    "slug": "aluva",
    "name": "Aluva",
    "districtSlug": "ernakulam",
    "districtName": "Ernakulam",
    "terrain": "riverside flats with sandy and alluvial soil",
    "access": "good road and rail-corridor access",
    "building": "apartments, houses and commercial buildings",
    "note": "Riverside plots near the Periyar need the flood level checked before plinth height is fixed."
  },
  {
    "slug": "perumbavoor",
    "name": "Perumbavoor",
    "districtSlug": "ernakulam",
    "districtName": "Ernakulam",
    "terrain": "midland with firm bearing",
    "access": "strong lorry access, being a timber and trade hub",
    "building": "houses, commercial units and industrial sheds",
    "note": "As a long-standing timber trade centre, heavy-vehicle access here is better than most towns of its size."
  },
  {
    "slug": "angamaly",
    "name": "Angamaly",
    "districtSlug": "ernakulam",
    "districtName": "Ernakulam",
    "terrain": "level midland, firm plots",
    "access": "excellent highway access on NH-544",
    "building": "houses, commercial buildings and warehouses",
    "note": "Highway access makes full-load delivery straightforward, which helps on large concreting orders."
  },
  {
    "slug": "muvattupuzha",
    "name": "Muvattupuzha",
    "districtSlug": "ernakulam",
    "districtName": "Ernakulam",
    "terrain": "midland with river-adjacent low ground in parts",
    "access": "good main-road access, narrower interior roads",
    "building": "houses and commercial buildings",
    "note": "River-adjacent plots need plinth height set against the known flood line, not just the road level."
  },
  {
    "slug": "tripunithura",
    "name": "Tripunithura",
    "districtSlug": "ernakulam",
    "districtName": "Ernakulam",
    "terrain": "midland with moderate water table",
    "access": "older town roads in the heritage area restrict larger vehicles",
    "building": "houses, apartments and renovation",
    "note": "Heritage-area streets often cap vehicle size, so part loads are more common here than elsewhere in the district."
  },
  {
    "slug": "kothamangalam",
    "name": "Kothamangalam",
    "districtSlug": "ernakulam",
    "districtName": "Ernakulam",
    "terrain": "hill-edge midland, sloped in parts",
    "access": "reasonable access, with gradient limits on the hill side",
    "building": "houses and small commercial buildings",
    "note": "Hill-side plots here usually need retaining walls before the main build starts."
  },
  {
    "slug": "alappuzha-town",
    "name": "Alappuzha Town",
    "districtSlug": "alappuzha",
    "districtName": "Alappuzha",
    "terrain": "backwater belt with soft soil and a high water table",
    "access": "canal-side and narrow town roads restrict vehicle size",
    "building": "houses on raised plinths and commercial frontage",
    "note": "A high water table makes plinth height and filling quantity the two numbers that decide the budget."
  },
  {
    "slug": "cherthala",
    "name": "Cherthala",
    "districtSlug": "alappuzha",
    "districtName": "Alappuzha",
    "terrain": "coastal sandy soil with low bearing",
    "access": "reasonable main-road access, narrower interior lanes",
    "building": "houses, compound walls and small commercial units",
    "note": "Low-bearing sandy soil usually means wider footings and more filling than an inland plot of the same size."
  },
  {
    "slug": "kayamkulam",
    "name": "Kayamkulam",
    "districtSlug": "alappuzha",
    "districtName": "Alappuzha",
    "terrain": "coastal and backwater mix with soft ground",
    "access": "good highway access, narrower approaches near the backwaters",
    "building": "houses and commercial buildings",
    "note": "Filling material is often the single largest delivery on a plot here, ahead of sand or metal."
  },
  {
    "slug": "mavelikara",
    "name": "Mavelikara",
    "districtSlug": "alappuzha",
    "districtName": "Alappuzha",
    "terrain": "midland with firmer bearing than the coastal belt",
    "access": "good road access for standard loads",
    "building": "houses and renovation work",
    "note": "Firmer ground inland means less filling, so budgets here run closer to a standard midland build."
  },
  {
    "slug": "chengannur",
    "name": "Chengannur",
    "districtSlug": "alappuzha",
    "districtName": "Alappuzha",
    "terrain": "midland near the Pamba with flood-prone low ground",
    "access": "good access on main roads",
    "building": "houses built with flood level in mind",
    "note": "After the 2018 floods, plinth heights here are commonly set well above the old road-level practice."
  },
  {
    "slug": "haripad",
    "name": "Haripad",
    "districtSlug": "alappuzha",
    "districtName": "Alappuzha",
    "terrain": "coastal plain with soft topsoil",
    "access": "adequate main-road access",
    "building": "houses and compound walls",
    "note": "Soft topsoil usually has to be cut back to firm ground before the foundation is laid."
  },
  {
    "slug": "ambalappuzha",
    "name": "Ambalappuzha",
    "districtSlug": "alappuzha",
    "districtName": "Alappuzha",
    "terrain": "coastal and paddy-belt ground with a very high water table",
    "access": "narrow roads through paddy areas limit loaded vehicles",
    "building": "raised-plinth houses and small buildings",
    "note": "Paddy-belt plots often need substantial filling and a waiting period before construction starts."
  },
  {
    "slug": "arookutty",
    "name": "Arookutty",
    "districtSlug": "alappuzha",
    "districtName": "Alappuzha",
    "terrain": "backwater edge with waterlogged ground",
    "access": "narrow approaches, often needing smaller vehicles or part loads",
    "building": "raised houses and waterfront structures",
    "note": "Waterlogged ground here makes foundation design, not material choice, the decisive cost factor."
  },
  {
    "slug": "pathanamthitta-town",
    "name": "Pathanamthitta Town",
    "districtSlug": "pathanamthitta",
    "districtName": "Pathanamthitta",
    "terrain": "midland and hill-edge with sloped plots",
    "access": "town road access is workable; gradient limits some approaches",
    "building": "houses, often NRI-funded, and commercial buildings",
    "note": "Sloped plots mean levelling and retaining work are usually priced before the building itself."
  },
  {
    "slug": "adoor",
    "name": "Adoor",
    "districtSlug": "pathanamthitta",
    "districtName": "Pathanamthitta",
    "terrain": "midland with firm laterite",
    "access": "good highway access for full loads",
    "building": "houses and commercial units",
    "note": "Firm laterite and good access make this one of the more straightforward towns in the district to build in."
  },
  {
    "slug": "thiruvalla",
    "name": "Thiruvalla",
    "districtSlug": "pathanamthitta",
    "districtName": "Pathanamthitta",
    "terrain": "midland with low-lying ground near the river",
    "access": "good road access for standard and full loads",
    "building": "houses, apartments and commercial buildings",
    "note": "Low-lying river-side plots need plinth level checked against flood history before design is finalised."
  },
  {
    "slug": "pandalam",
    "name": "Pandalam",
    "districtSlug": "pathanamthitta",
    "districtName": "Pathanamthitta",
    "terrain": "midland with mixed level and sloped plots",
    "access": "reasonable access on main roads",
    "building": "houses and renovation",
    "note": "Plot-to-plot variation here is wide, so a site visit changes the estimate more than it would elsewhere."
  },
  {
    "slug": "ranni",
    "name": "Ranni",
    "districtSlug": "pathanamthitta",
    "districtName": "Pathanamthitta",
    "terrain": "hill terrain with rocky and steeply sloped plots",
    "access": "hill roads restrict vehicle size; part loads are common",
    "building": "hillside houses and retaining structures",
    "note": "Rock is often met during excavation here, which can need breaking rather than ordinary digging."
  },
  {
    "slug": "konni",
    "name": "Konni",
    "districtSlug": "pathanamthitta",
    "districtName": "Pathanamthitta",
    "terrain": "forest-edge hill terrain, sloped and rocky",
    "access": "narrow hill approaches cap vehicle size",
    "building": "houses and site development work",
    "note": "Access is usually the binding constraint here, not material availability."
  },
  {
    "slug": "mallappally",
    "name": "Mallappally",
    "districtSlug": "pathanamthitta",
    "districtName": "Pathanamthitta",
    "terrain": "midland with undulating plots",
    "access": "adequate road access, narrower interior lanes",
    "building": "houses, many NRI-funded",
    "note": "Undulating plots typically need levelling and a retaining section on at least one boundary."
  },
  {
    "slug": "kozhencherry",
    "name": "Kozhencherry",
    "districtSlug": "pathanamthitta",
    "districtName": "Pathanamthitta",
    "terrain": "midland near the Pamba with low-lying sections",
    "access": "good main-road access",
    "building": "houses and small commercial buildings",
    "note": "Proximity to the Pamba makes flood level a standard check before plinth height is set."
  },
  {
    "slug": "kollam-city",
    "name": "Kollam City",
    "districtSlug": "kollam",
    "districtName": "Kollam",
    "terrain": "coastal plain with a moderate to high water table",
    "access": "city roads with timing constraints on larger vehicles",
    "building": "houses, commercial buildings and apartments",
    "note": "City-centre deliveries are usually scheduled outside peak hours to avoid vehicle restrictions."
  },
  {
    "slug": "karunagappally",
    "name": "Karunagappally",
    "districtSlug": "kollam",
    "districtName": "Kollam",
    "terrain": "coastal belt with sandy soil",
    "access": "good highway access, narrower coastal lanes",
    "building": "houses and commercial units",
    "note": "Sandy coastal ground generally needs a wider footing than the same design inland."
  },
  {
    "slug": "punalur",
    "name": "Punalur",
    "districtSlug": "kollam",
    "districtName": "Kollam",
    "terrain": "hill-edge terrain with rocky sections",
    "access": "hill road approaches limit vehicle size on some routes",
    "building": "houses and small commercial buildings",
    "note": "Rock in the ground can turn a routine excavation into breaking work, which is priced separately."
  },
  {
    "slug": "kottarakkara",
    "name": "Kottarakkara",
    "districtSlug": "kollam",
    "districtName": "Kollam",
    "terrain": "midland with firm laterite",
    "access": "good junction access for full loads",
    "building": "houses, shops and commercial buildings",
    "note": "Being a junction town, material reaches site here with fewer access constraints than most of the district."
  },
  {
    "slug": "paravur",
    "name": "Paravur",
    "districtSlug": "kollam",
    "districtName": "Kollam",
    "terrain": "coastal and backwater edge with soft ground",
    "access": "narrow approaches near the backwaters",
    "building": "houses and compound work",
    "note": "Backwater-edge plots often need filling and a raised plinth before anything else is costed."
  },
  {
    "slug": "chathannoor",
    "name": "Chathannoor",
    "districtSlug": "kollam",
    "districtName": "Kollam",
    "terrain": "midland with generally firm bearing",
    "access": "good highway access",
    "building": "houses and commercial frontage",
    "note": "Firm ground and highway access keep both excavation and delivery costs predictable here."
  },
  {
    "slug": "anchal",
    "name": "Anchal",
    "districtSlug": "kollam",
    "districtName": "Kollam",
    "terrain": "midland with undulating and partly rocky plots",
    "access": "adequate access, narrower interior roads",
    "building": "houses and renovation work",
    "note": "Undulating plots usually need levelling, and rock is met often enough to be worth checking early."
  },
  {
    "slug": "kundara",
    "name": "Kundara",
    "districtSlug": "kollam",
    "districtName": "Kollam",
    "terrain": "midland with firm bearing",
    "access": "reasonable road access for standard loads",
    "building": "houses and small industrial units",
    "note": "Firm midland ground keeps foundation work straightforward on most plots here."
  }
];

export const constructionTownBySlug = Object.fromEntries(
  constructionTowns.map((t) => [t.slug, t]),
) as Record<string, ConstructionTown>;

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
