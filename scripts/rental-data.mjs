// Furniture and appliance rental — data for the rental section of ithihasam.in.
//
// A separate file from site-data.mjs because this is a different business model:
// subscription rental of owned inventory, rather than per-job home maintenance.
// Keeping them apart means a change to rental pricing cannot accidentally alter
// a service page, and the drift checker can validate each on its own terms.
//
// ⚠️ EVERY RATE BELOW IS A PLACEHOLDER (null) UNTIL YOU FILL IT IN.
// The build refuses to publish a product page whose monthlyRate is null, so an
// unpriced item simply does not generate a page. Publishing an invented rate
// would be quoted back by customers and cited as fact by AI search engines.

export const rentalBrand = {
  sectionName: "Furniture & Appliance Rental",
  sectionSlug: "rentals",
  tagline: "Rent furniture and appliances monthly. Delivered, installed, maintained.",
};

/** Cities with real inventory and delivery capability. */
export const rentalCities = [
  {
    slug: "kochi",
    name: "Kochi",
    aka: "Ernakulam",
    district: "Ernakulam district",
    // Why demand exists here, in this city's own terms. Used to keep city pages
    // genuinely different rather than the same page with a name swapped.
    demandDriver:
      "IT employees at Infopark and SmartCity, students, and families relocating into unfurnished flats, where a one- or two-year posting rarely justifies buying a full home of furniture",
    propertyMix:
      "high-rise flats, gated-community apartments, serviced apartments, and shared bachelor accommodation",
    localities: [
      { slug: "kakkanad", name: "Kakkanad", note: "Infopark and SmartCity corridor, heavy IT-employee demand for short postings" },
      { slug: "edappally", name: "Edappally", note: "dense apartment belt around Lulu and the NH bypass" },
      { slug: "vyttila", name: "Vyttila", note: "transport hub with constant short-term tenancies" },
      { slug: "kalamassery", name: "Kalamassery", note: "student housing around CUSAT and the industrial belt" },
      { slug: "aluva", name: "Aluva", note: "airport corridor, transit-heavy rentals" },
      { slug: "palarivattom", name: "Palarivattom", note: "central flats and small offices" },
      { slug: "tripunithura", name: "Tripunithura", note: "established residential, longer tenures" },
      { slug: "fort-kochi", name: "Fort Kochi", note: "homestays and guest houses needing furnished rooms" },
    ],
  },
  {
    slug: "trivandrum",
    name: "Trivandrum",
    aka: "Thiruvananthapuram",
    district: "Thiruvananthapuram district",
    demandDriver:
      "Technopark employees and government-sector staff on transferable postings, plus a large student population, all of whom move frequently enough that buying furniture makes little sense",
    propertyMix:
      "apartments near Technopark, government quarters, hostels, and family homes let unfurnished",
    localities: [
      { slug: "technopark", name: "Technopark", note: "the single largest cluster of short-tenure IT tenants in the city" },
      { slug: "kazhakkoottam", name: "Kazhakkoottam", note: "Technopark's residential belt" },
      { slug: "sreekaryam", name: "Sreekaryam", note: "student and young-professional housing" },
      { slug: "pattom", name: "Pattom", note: "central, mixed residential and office" },
      { slug: "ulloor", name: "Ulloor", note: "university-adjacent rentals" },
      { slug: "kowdiar", name: "Kowdiar", note: "premium residential, higher-end furnishing requests" },
      { slug: "thampanoor", name: "Thampanoor", note: "station area, short stays and guest houses" },
      { slug: "peroorkada", name: "Peroorkada", note: "settled residential with longer tenures" },
    ],
  },
  {
    slug: "kozhikode",
    name: "Kozhikode",
    aka: "Calicut",
    district: "Kozhikode district",
    demandDriver:
      "Cyberpark staff, medical college students and staff, and trading families moving between rented properties, in a city where unfurnished lets are the norm",
    propertyMix:
      "apartments, independent rented houses, hostels, and staff accommodation",
    localities: [
      { slug: "cyberpark", name: "Cyberpark", note: "IT campus with short-posting tenants" },
      { slug: "thondayad", name: "Thondayad", note: "apartment corridor along the bypass" },
      { slug: "mavoor-road", name: "Mavoor Road", note: "central commercial and residential mix" },
      { slug: "nadakkavu", name: "Nadakkavu", note: "established residential, schools nearby" },
      { slug: "medical-college", name: "Medical College", note: "student and junior-doctor accommodation" },
      { slug: "kottooli", name: "Kottooli", note: "newer apartment developments" },
      { slug: "ramanattukara", name: "Ramanattukara", note: "highway junction, staff accommodation" },
      { slug: "west-hill", name: "West Hill", note: "mixed residential with longer tenancies" },
    ],
  },
];

/**
 * Rental catalogue.
 *
 * FILL IN monthlyRate, deposit and minTenureMonths for every item you actually
 * stock. Leave an item's monthlyRate as null and it is skipped entirely — no
 * page, no sitemap entry, no schema. That is deliberate: a rental page without
 * a real price is not useful to a customer and not credible to Google.
 *
 *   monthlyRate       — rupees per month, number, no symbol
 *   deposit           — refundable deposit in rupees
 *   minTenureMonths   — minimum rental period
 *   cities            — which rentalCities slugs stock this item
 */
export const rentalCatalogue = [
  // ---------------------------------------------------------------- bedroom
  { slug: "bed-on-rent", name: "Bed on Rent", category: "bedroom", keywords: ["bed on rent", "bed rental", "cot on rent"],
    description: "Single, double, queen and king beds with storage options.",
    monthlyRate: null, deposit: null, minTenureMonths: null, cities: ["kochi", "trivandrum", "kozhikode"] },

  { slug: "mattress-on-rent", name: "Mattress on Rent", category: "bedroom", keywords: ["mattress on rent", "mattress rental"],
    description: "Foam and spring mattresses in single, double, queen and king sizes.",
    monthlyRate: null, deposit: null, minTenureMonths: null, cities: ["kochi", "trivandrum", "kozhikode"] },

  { slug: "wardrobe-on-rent", name: "Wardrobe on Rent", category: "bedroom", keywords: ["wardrobe on rent", "cupboard rental"],
    description: "Two- and three-door wardrobes with hanging and shelf storage.",
    monthlyRate: null, deposit: null, minTenureMonths: null, cities: ["kochi", "trivandrum", "kozhikode"] },

  // ------------------------------------------------------------ living room
  { slug: "sofa-on-rent", name: "Sofa on Rent", category: "living", keywords: ["sofa on rent", "sofa rental", "couch on rent"],
    description: "Two-seater, three-seater and L-shaped sofas in fabric and leatherette.",
    monthlyRate: null, deposit: null, minTenureMonths: null, cities: ["kochi", "trivandrum", "kozhikode"] },

  { slug: "tv-unit-on-rent", name: "TV Unit on Rent", category: "living", keywords: ["TV unit on rent", "TV stand rental"],
    description: "TV stands and entertainment units with storage.",
    monthlyRate: null, deposit: null, minTenureMonths: null, cities: ["kochi", "trivandrum", "kozhikode"] },

  { slug: "dining-table-on-rent", name: "Dining Table on Rent", category: "living", keywords: ["dining table on rent", "dining set rental"],
    description: "Four- and six-seater dining sets with chairs.",
    monthlyRate: null, deposit: null, minTenureMonths: null, cities: ["kochi", "trivandrum", "kozhikode"] },

  { slug: "study-table-on-rent", name: "Study Table on Rent", category: "living", keywords: ["study table on rent", "office desk rental"],
    description: "Study and work-from-home desks, with ergonomic chair options.",
    monthlyRate: null, deposit: null, minTenureMonths: null, cities: ["kochi", "trivandrum", "kozhikode"] },

  // ------------------------------------------------------------- appliances
  { slug: "refrigerator-on-rent", name: "Refrigerator on Rent", category: "appliance", keywords: ["refrigerator on rent", "fridge rental"],
    description: "Single-door and double-door refrigerators, delivered and installed.",
    monthlyRate: null, deposit: null, minTenureMonths: null, cities: ["kochi", "trivandrum", "kozhikode"] },

  { slug: "washing-machine-on-rent", name: "Washing Machine on Rent", category: "appliance", keywords: ["washing machine on rent", "washing machine rental"],
    description: "Top-load and front-load washing machines with inlet fitting.",
    monthlyRate: null, deposit: null, minTenureMonths: null, cities: ["kochi", "trivandrum", "kozhikode"] },

  { slug: "ac-on-rent", name: "AC on Rent", category: "appliance", keywords: ["AC on rent", "air conditioner rental"],
    description: "Split and window air conditioners, including installation and servicing.",
    monthlyRate: null, deposit: null, minTenureMonths: null, cities: ["kochi", "trivandrum", "kozhikode"] },

  { slug: "microwave-on-rent", name: "Microwave on Rent", category: "appliance", keywords: ["microwave on rent", "microwave rental"],
    description: "Solo and convection microwave ovens.",
    monthlyRate: null, deposit: null, minTenureMonths: null, cities: ["kochi", "trivandrum", "kozhikode"] },

  { slug: "water-purifier-on-rent", name: "Water Purifier on Rent", category: "appliance", keywords: ["water purifier on rent", "RO rental"],
    description: "RO and UV water purifiers with filter changes included.",
    monthlyRate: null, deposit: null, minTenureMonths: null, cities: ["kochi", "trivandrum", "kozhikode"] },
];

/**
 * Whole-home packages.
 *
 * These are the highest-intent searches in the keyword bank ("2 BHK furniture
 * rental Kochi") and the largest basket size, so they get their own pages.
 */
export const rentalPackages = [
  { slug: "1-bhk-furniture-package", name: "1 BHK Furniture Package", bhk: "1 BHK",
    includes: ["Double bed with mattress", "Wardrobe", "Two-seater sofa", "Dining table with two chairs", "Study table"],
    monthlyRate: null, deposit: null, minTenureMonths: null },
  { slug: "2-bhk-furniture-package", name: "2 BHK Furniture Package", bhk: "2 BHK",
    includes: ["Two double beds with mattresses", "Two wardrobes", "Three-seater sofa", "Four-seater dining set", "TV unit", "Study table"],
    monthlyRate: null, deposit: null, minTenureMonths: null },
  { slug: "3-bhk-furniture-package", name: "3 BHK Furniture Package", bhk: "3 BHK",
    includes: ["Three double beds with mattresses", "Three wardrobes", "L-shaped sofa", "Six-seater dining set", "TV unit", "Two study tables"],
    monthlyRate: null, deposit: null, minTenureMonths: null },
  { slug: "home-appliance-package", name: "Home Appliance Package", bhk: "Appliances",
    includes: ["Refrigerator", "Washing machine", "Microwave", "Water purifier"],
    monthlyRate: null, deposit: null, minTenureMonths: null },
];

/** Audience-intent pages, straight from the keyword bank's customer segments. */
export const rentalAudiences = [
  { slug: "students", name: "Students", need: "affordable single-room furnishing on short tenures that match an academic year" },
  { slug: "it-employees", name: "IT Employees", need: "quick full-home setup near the tech parks, often for one- or two-year postings" },
  { slug: "bachelors", name: "Bachelors", need: "shared-flat essentials — beds, wardrobes and a washing machine — split across tenants" },
  { slug: "families", name: "Families", need: "complete home furnishing when relocating into an unfurnished flat" },
  { slug: "corporate", name: "Corporate & Staff Accommodation", need: "bulk furnishing for employee accommodation and guest houses, on invoice with GST" },
];

/** Items with a real price. Everything else is skipped at build time. */
export const pricedCatalogue = () => rentalCatalogue.filter((item) => typeof item.monthlyRate === "number");
export const pricedPackages = () => rentalPackages.filter((pkg) => typeof pkg.monthlyRate === "number");
