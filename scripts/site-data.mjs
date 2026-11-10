// Single source of truth for build-time SEO generation.
//
// Consumed by scripts/prerender-seo.mjs (static HTML + sitemap.xml).
// Keep in sync with src/lib/service-areas.ts and src/lib/local-service-pages.ts;
// scripts/check-seo-data.mjs fails the build if they drift apart.

export const siteUrl = "https://ithihasam.in";
export const businessName = "Ithihasam Home Services";
export const businessPhone = "+91 94000 96518";
export const businessPhonePlain = "+919400096518";
export const businessEmail = "services@ithihasam.in";
export const businessStreet = "3rd Floor, Disha Building, near Downtown Mall";
export const businessLocality = "Thalassery";
export const businessRegion = "Kerala";
export const businessPostalCode = "670101";
export const businessAddress = `${businessStreet}, ${businessLocality} ${businessPostalCode}`;

// Canonical URL style for the whole site: no trailing slash.
// Internal <Link>s, canonicals, prerendered file paths and sitemap entries
// must all agree, otherwise Google reports "alternate page with proper canonical".
export function canonicalPath(path) {
  if (path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}


// Office coordinates, used for LocalBusiness geo. Google Maps ranks local
// businesses largely by distance, so this must match the real office.
export const businessGeo = { latitude: 11.7480, longitude: 75.4929 };

/**
 * Profiles that corroborate the business exists.
 *
 * schema.org sameAs is how you tell Google these listings are the same entity.
 * Add each URL only once the profile is live and its name, address and phone
 * match this file exactly — mismatched details weaken Maps ranking rather than
 * helping it, and a URL to a profile that does not exist is worse than none.
 */
export const businessSameAs = [
  // "https://www.google.com/maps/place/...",   // Google Business Profile
  // "https://www.facebook.com/...",
  // "https://www.instagram.com/...",
  // "https://www.justdial.com/...",
  // "https://www.sulekha.com/...",
];

export const serviceAreas = [
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
    nearbySlugs: ["thalassery", "mattannur", "chalode"],
  },
  {
    slug: "chalode",
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
    nearbySlugs: ["chalode", "anjarakandy", "taliparamba"],
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

export const areaNames = serviceAreas.map((area) => area.name);
export const areaCoverageLine = areaNames.join(", ");

export const services = [
  {
    slug: "electrical-plumbing",
    name: "Electrical and Plumbing Services",
    title: "Electrician and Plumber Services in Kerala | Ithihasam",
    description:
      "Book electricians and plumbers in Kerala for wiring, switchboard repair, pipe leakage repair, bathroom fittings, drainage, and home maintenance.",
    intro:
      "Ithihasam coordinates practical electrical and plumbing support for homes, shops, offices, and apartments across the Kannur, Thrissur, and Ernakulam districts of Kerala. Customers can request help for wiring faults, switchboard work, pipe leakage, bathroom fittings, motor connections, and drainage issues.",
    items: ["Switchboard repair", "House wiring", "MCB and DB checks", "Pipe leakage repair", "Tap replacement", "Bathroom plumbing"],
    faqs: [
      ["How soon can an electrician or plumber reach me?", "Urgent faults such as a total power loss, a tripping MCB, or a burst pipe are prioritised over routine work. Same-day visits depend on technician availability in your area that day, which we confirm when you call rather than promising a slot we cannot keep."],
      ["Do you repair concealed wiring and hidden pipe leaks?", "Yes. Concealed faults need tracing before any wall is opened, so the visit begins with a diagnosis. We show you what was found and agree the repair scope before breaking any surface."],
      ["Can you work in an apartment with society restrictions?", "Yes. Most apartment associations limit working hours and require prior permission. Tell us your building when booking and we will schedule inside the permitted window and carry ID for the gate."],
      ["Do you provide a bill for insurance or landlord claims?", "Yes. A written bill listing the work carried out and materials used is provided on request, which is normally what a landlord or insurer needs."],
      ["What if the fault returns after the repair?", "Workmanship is covered for a period agreed in your quote. If the same fault recurs within that period the revisit is free; a different fault is quoted separately."],
      ["Do you handle emergency electrical faults?", "Yes. Urgent electrical faults such as MCB tripping, short circuits, and total power loss are prioritised based on technician availability in your area."],
      ["Can I book an electrician and a plumber in one visit?", "Yes. Mention both requirements in the booking form and the team will try to schedule them together where the job scope allows."],
    ],
  },
  {
    slug: "painting",
    name: "Painting Services",
    title: "House Painting Services in Kerala | Ithihasam",
    description:
      "Professional house painting services in Kerala for interior painting, exterior painting, putty work, waterproof coating, and repainting.",
    intro:
      "Ithihasam supports interior painting, exterior painting, wall putty, primer, waterproof coating, rental repainting, and full home repainting requirements across the Kannur, Thrissur, and Ernakulam districts of Kerala.",
    items: ["Interior painting", "Exterior painting", "Wall putty work", "Primer application", "Waterproof coating", "Full home repainting"],
    faqs: [
      ["How long does painting a 2BHK take?", "A standard 2BHK repaint usually takes 4 to 7 days depending on surface condition, how much putty and primer is needed, and drying time between coats. Monsoon humidity slows drying, so timelines run longer between June and September."],
      ["Do I need to move out while painting?", "Usually not. Work is staged room by room so the house stays usable, with furniture moved to the centre and covered. A full-house job on a tight deadline is faster if the property is empty."],
      ["What preparation is included?", "Surface cleaning, crack filling, sanding, putty where needed, and primer are part of the quoted scope. Skipping preparation is why cheap paint jobs peel within a year, so it is not treated as optional."],
      ["Can you match an existing colour?", "Yes. Bring a chip of the existing paint or share the shade code and the team will match it at the dealer. An exact match on a sun-faded wall is not always possible, and we will say so before starting."],
      ["How is waterproof coating different from normal exterior paint?", "Waterproof coating is a thicker elastomeric layer that bridges hairline cracks and resists driven rain, which matters on Kerala's west-facing walls. It costs more per square foot but lasts considerably longer on exposed elevations."],
      ["How is painting work priced?", "Painting is usually quoted per square foot or per room after a site check, based on surface condition, putty and primer requirements, and the paint brand selected."],
      ["Do you supply the paint?", "Both options are supported. Customers can supply their own paint, or the team can source it and include the material cost in the quote."],
    ],
  },
  {
    slug: "appliance-servicing",
    name: "Home Appliance Repair and Servicing",
    title: "Home Appliance Repair & Service in Kerala | Ithihasam",
    description:
      "Doorstep AC, fridge, washing machine, microwave, TV, purifier, chimney, and geyser service support in Kerala. Call Ithihasam to book.",
    intro:
      "Ithihasam brings appliance service coordination to your doorstep across the Kannur, Thrissur, and Ernakulam districts of Kerala. Whether your AC is not cooling, your refrigerator is making unusual noise, or your washing machine has stopped working, you can book trained technician support for major household appliances.",
    items: ["AC repair and service", "Fridge and refrigerator repair", "Washing machine repair", "Microwave oven repair", "TV repair", "Water purifier service", "Kitchen chimney cleaning", "Geyser and water heater support"],
    brands: ["LG", "Samsung", "Whirlpool", "Godrej", "Haier", "Daikin", "Voltas", "Bosch", "IFB", "Panasonic", "Sony", "Blue Star"],
    faqs: [
      ["Is it worth repairing, or should I replace the appliance?", "The technician will tell you honestly. As a rule, a repair costing more than about half the price of a new unit, on an appliance over eight years old, is rarely worth it, and we will say so rather than carry out the work."],
      ["Do you carry spare parts to the visit?", "Common parts for frequent faults are carried. Brand-specific boards, compressors and drums are ordered after diagnosis, so those repairs need a second visit, which is scheduled before the technician leaves."],
      ["How often should an AC be serviced in Kerala?", "Twice a year suits most homes here, and coastal properties benefit from more frequent checks because salt air corrodes coils and fittings faster. Regular servicing keeps cooling efficient and lowers the electricity bill."],
      ["Which areas in Kannur does Ithihasam cover for appliance servicing?", "Ithihasam supports appliance service bookings around Kannur, Thalassery, Taliparamba, Payyannur, Mattannur, Iritty, Panoor, Chakkarakkal, and nearby localities."],
      ["What brands does Ithihasam repair?", "Customers commonly request support for LG, Samsung, Whirlpool, Godrej, Haier, Daikin, Voltas, Bosch, IFB, Panasonic, Sony, Blue Star, and other major appliance brands."],
      ["How do I book an appliance repair?", `You can book through ithihasam.in or call ${businessPhone}. Share your appliance type, issue, location, and preferred date so the team can coordinate the right technician.`],
      ["Can I book washing machine and fridge repair at home?", "Yes. Customers can request doorstep washing machine, fridge, AC, microwave, purifier, TV, chimney, and geyser support through the appliance servicing page."],
    ],
  },
  {
    slug: "carpentry",
    name: "Carpentry and Woodwork",
    title: "Carpenter Services in Kerala | Ithihasam",
    description:
      "Hire carpenters in Kerala for door repair, furniture repair, wardrobe work, modular kitchen support, shelf fitting, and woodwork.",
    intro:
      "Ithihasam helps customers book carpentry support for door repair, furniture repair, wardrobes, shelves, modular kitchen adjustments, cupboard fixes, and custom woodwork.",
    items: ["Door and window repair", "Furniture repair", "Wardrobe work", "Modular kitchen support", "Shelf fitting", "Wood polish and finishing"],
    faqs: [
      ["Do you make new furniture or only repair?", "Both. The team handles repairs and adjustments as well as custom work such as wardrobes, shelving and modular kitchen units built to your measurements."],
      ["Which wood or board do you use?", "Plywood, MDF and solid wood are all available, and the right choice depends on where the piece goes. Marine ply is recommended for kitchen and bathroom units in Kerala's humidity, where MDF swells within a few monsoons."],
      ["How long does a fitted wardrobe take?", "Typically 5 to 10 days from measurement to installation, depending on size, finish and material availability. Repairs to existing furniture are usually completed the same day."],
      ["Can you fix a door that sticks in the monsoon?", "Yes. Doors swelling in the wet season is one of the commonest requests here. The fix is planing and resealing the edge, which stops it recurring rather than only easing it for one season."],
      ["Do you make new furniture or only repair?", "Both. The team handles repairs and adjustments as well as custom woodwork such as wardrobes, shelves, and modular kitchen units."],
      ["Do you charge for a site visit?", "Site visit and measurement charges depend on job size and location, and are confirmed with you before the visit is scheduled."],
    ],
  },
  {
    slug: "roofing-fabrication",
    name: "Roofing and Fabrication",
    title: "Roofing Sheet Work and Fabrication in Kerala | Ithihasam",
    description:
      "Welding, aluminium and steel fabrication, roofing and sheds, gates and automatic gate systems, glass and ACP works, rolling shutters and fencing across Kerala.",
    intro:
      "Metal, aluminium and roofing work across nine areas: welding, aluminium fabrication, steel and iron work, roofing and sheds, gates, automatic gate systems, glass and ACP, rolling shutters, and outdoor fencing. Work is measured on site and fabricated to the opening rather than to a standard size.",
    items: [
      "Roofing sheet work",
      "Gate fabrication",
      "Window grill work",
      "Staircase railing",
      "Truss work",
      "Aluminium partition work",
      "Welding services",
      "Steel and iron fabrication",
      "Automatic gate systems",
      "Glass, ACP and partition works",
      "Rolling shutters",
      "Fencing and outdoor metal work",
    ],
    // Grouped detail for the metal, aluminium and roofing work. The flat
    // `items` list above stays as the short summary used in cards and in the
    // ItemList schema; these groups are the full scope, rendered as sections
    // on the service page. Only this service defines itemGroups, and the
    // other seven are unaffected.
    itemGroups: [
      {
        slug: "welding",
        name: "Welding Services",
        image: "/og/fabrication/welding.jpg",
        blurb: "Arc, MIG, TIG and stainless steel welding, in the workshop or on site.",
        items: [
          "Arc welding",
          "MIG welding",
          "TIG welding",
          "Gas welding",
          "Spot welding",
          "Stainless steel welding",
          "Mild steel welding",
          "Aluminium welding",
          "Structural welding",
          "On-site welding",
          "Pipe welding",
          "Metal repair welding",
          "Custom welding fabrication",
        ],
      },
      {
        slug: "aluminium-fabrication",
        name: "Aluminium Fabrication",
        image: "/og/fabrication/aluminium-fabrication.jpg",
        blurb: "Doors, windows, partitions and frames, made to the opening rather than to a standard size.",
        items: [
          "Aluminium doors",
          "Aluminium windows",
          "Sliding doors and windows",
          "Office and room partitions",
          "Aluminium kitchen cabinets",
          "Wardrobe fabrication",
          "Glass doors and windows",
          "Aluminium railings",
          "Ventilators",
          "Shopfront fabrication",
          "Facade fabrication",
          "Pergolas and louvers",
          "Mosquito mesh doors",
          "Repair and maintenance",
        ],
      },
      {
        slug: "steel-iron-fabrication",
        name: "Steel & Iron Fabrication",
        image: "/og/fabrication/steel-iron-fabrication.jpg",
        blurb: "Railings, grills, staircases and structural steel in mild steel, stainless or wrought iron.",
        items: [
          "Mild steel fabrication",
          "Stainless steel fabrication",
          "Structural steel fabrication",
          "Steel and spiral staircases",
          "Balcony railings",
          "Staircase handrails",
          "Safety grills",
          "Window grills",
          "Security doors",
          "Metal partitions",
          "Steel frames",
          "Metal storage racks",
          "Custom metal furniture",
          "Industrial fabrication and repair",
        ],
      },
      {
        slug: "roofing-shed",
        name: "Roofing & Shed Works",
        image: "/og/fabrication/roofing-shed.jpg",
        blurb: "GI, colour-coated, UPVC and polycarbonate roofing, plus trusses and sheds.",
        items: [
          "Residential and commercial roofing",
          "Industrial roofing",
          "GI sheet roofing",
          "Colour-coated roofing sheets",
          "Polycarbonate roofing",
          "UPVC roofing",
          "Roofing tile installation",
          "Roof truss fabrication",
          "Terrace roofing",
          "Car parking sheds",
          "Garage and warehouse sheds",
          "Industrial sheds",
          "Roof waterproofing and repair",
          "Roof replacement",
          "Rainwater gutter installation",
        ],
      },
      {
        slug: "gate-fabrication",
        name: "Gate Fabrication",
        image: "/og/fabrication/gate-fabrication.jpg",
        blurb: "Sliding, swing and designer gates in steel, stainless or wrought iron.",
        items: [
          "Main entrance gates",
          "Sliding gates",
          "Swing gates",
          "Double-leaf gates",
          "Stainless steel gates",
          "Mild steel gates",
          "Wrought iron gates",
          "Designer and villa gates",
          "Compound wall gates",
          "Pedestrian gates",
          "Folding and collapsible gates",
          "Custom-designed gates",
          "Gate painting and polishing",
          "Gate repair and maintenance",
        ],
      },
      {
        slug: "automatic-gates",
        name: "Automatic & Smart Gate Systems",
        image: "/og/fabrication/automatic-gates.jpg",
        blurb: "Motorised gates with remote, app, RFID or sensor control, fitted to a new or an existing gate.",
        items: [
          "Automatic sliding gates",
          "Automatic swing gates",
          "Remote-controlled gates",
          "Electric gate motors",
          "App-controlled gates",
          "RFID access control",
          "Sensor-based automatic gates",
          "Boom barriers",
          "Automatic garage doors",
          "Gate motor replacement",
          "Gate automation repair",
          "Safety sensor installation",
          "Video intercom integration",
        ],
      },
      {
        slug: "glass-acp",
        name: "Glass, ACP & Partition Works",
        image: "/og/fabrication/glass-acp.jpg",
        blurb: "Toughened glass, frameless partitions, facades and aluminium composite cladding.",
        items: [
          "Toughened glass installation",
          "Frameless glass partitions",
          "Glass office partitions",
          "Shower enclosures",
          "Glass balcony railings",
          "Glass staircase railings",
          "Glass facade installation",
          "Structural glazing",
          "Aluminium curtain walls",
          "Glass canopies",
          "Shopfront glass",
          "ACP cladding",
          "Glass repair and replacement",
        ],
      },
      {
        slug: "rolling-shutters",
        name: "Rolling Shutters",
        image: "/og/fabrication/rolling-shutters.jpg",
        blurb: "Manual, motorised and industrial shutters, including motor fitting and repair.",
        items: [
          "Manual rolling shutters",
          "Automatic rolling shutters",
          "Motorised shutters",
          "Shop shutters",
          "Industrial shutters",
          "Security grills",
          "Collapsible shutters",
          "Garage shutters",
          "Shutter motor installation",
          "Shutter repair and maintenance",
        ],
      },
      {
        slug: "outdoor-metal",
        name: "Fencing & Outdoor Metal Works",
        image: "/og/fabrication/outdoor-metal.jpg",
        blurb: "Compound fencing, pergolas, car sheds and outdoor structures.",
        items: [
          "Metal pergolas",
          "Garden metal structures",
          "Outdoor metal furniture",
          "Compound fencing",
          "Chain-link fencing",
          "Barbed wire fencing",
          "Security fencing",
          "Car parking structures",
          "Steel balconies",
          "Metal canopies",
          "Decorative metal panels",
          "Custom metal signage",
        ],
      },
    ],
    faqs: [
      ["Can you find a roof leak with no visible damage?", "Yes. Leaks often travel along a beam and appear far from where the water enters, so the inspection traces the path rather than patching where the stain shows. Patching the wrong spot is why many leaks come back."],
      ["Is roofing work possible during the monsoon?", "Emergency leak repairs are carried out between showers, but sheet replacement and sealing need dry weather to cure properly. Pre-monsoon, February to May, is the right window for planned roof work."],
      ["What is the difference between GI and colour-coated sheets?", "Colour-coated sheets carry a protective paint layer that resists rust far longer, which matters near the coast. Plain GI costs less upfront but corrodes faster in salt air, so the cheaper sheet is often the more expensive choice."],
      ["Do you fabricate to a custom design?", "Yes. Share measurements, a photo or a drawing with your enquiry and the team will confirm feasibility and pricing after a site check."],
      ["Do you handle roof leakage repair?", "Yes. Roof leakage checks, sheet replacement, and sealing work can be requested through the roofing and fabrication booking flow."],
      ["Can you fabricate to a custom design?", "Yes. Share measurements, photos, or a drawing with your enquiry and the team will confirm feasibility and pricing before starting."],
    ],
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning Services",
    title: "Deep Cleaning Services in Kerala | Ithihasam",
    description:
      "Book deep cleaning services in Kerala for home cleaning, kitchen cleaning, bathroom cleaning, sofa cleaning, and move-in cleaning.",
    intro:
      "Ithihasam coordinates deep cleaning for apartments, villas, rental homes, offices, kitchens, bathrooms, sofas, move-in requirements, and post-construction spaces.",
    items: ["Full home deep cleaning", "Kitchen deep cleaning", "Bathroom cleaning", "Sofa cleaning", "Post-construction cleaning", "Move-in cleaning"],
    faqs: [
      ["How long does a full home deep clean take?", "A typical 2BHK takes 4 to 8 hours depending on property condition, the number of bathrooms, and whether kitchen degreasing is included. Post-construction cleaning takes considerably longer."],
      ["Do you bring your own machines and chemicals?", "Yes. The team brings vacuum equipment, scrubbing machines, chemicals and consumables for the booked scope. You need only provide water and power."],
      ["What is included in kitchen deep cleaning?", "Degreasing of the chimney, hob, tiles and cabinet exteriors, shelf wiping, sink descaling and floor scrubbing. Cabinet interiors are included if they are emptied before the team arrives."],
      ["Is the cleaning safe for children and pets?", "The chemicals used are intended for occupied homes. We will tell you if a room should stay clear while a surface dries, which is usually an hour or two rather than a day."],
      ["How long does a full home deep clean take?", "A typical 2BHK deep clean takes 4 to 8 hours depending on property condition, number of bathrooms, and whether kitchen degreasing is included."],
      ["Do you bring your own cleaning materials?", "Yes. The cleaning team brings standard machines, chemicals, and consumables required for the booked scope of work."],
    ],
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    title: "Pest Control Services in Kerala | Ithihasam",
    description:
      "Safe pest control services in Kerala for termite treatment, cockroach control, bed bug treatment, mosquito control, and rodents.",
    intro:
      "Ithihasam helps customers request pest control for homes, apartments, offices, shops, and rental properties, including termite, cockroach, bed bug, mosquito, and rodent concerns.",
    items: ["Termite treatment", "Cockroach control", "Bed bug treatment", "Mosquito control", "Rodent control", "Home and office pest checks"],
    faqs: [
      ["How long before the treatment works?", "Cockroach gel and spray treatments show a clear reduction within a few days and peak at about two weeks. Termite and bed bug work is staged in cycles, with the follow-up schedule set out in your quote."],
      ["Do I need to empty the kitchen before treatment?", "For a kitchen cockroach treatment, clearing food from exposed surfaces and opening the cabinets is enough. A full empty is not needed for gel-based work."],
      ["Why do termites keep coming back?", "Termites return when the colony survives or when moisture keeps feeding it. A treatment that only sprays visible damage will fail, so the inspection looks for the nest and the damp source before any chemical is applied."],
      ["Is the treatment safe for children and pets?", "The team uses treatments intended for occupied homes and will advise on any vacancy or ventilation period needed before you re-enter treated rooms."],
      ["Do treatments include a follow-up visit?", "Several treatments, particularly bed bug and termite work, are scheduled in cycles. The follow-up schedule is confirmed as part of your quote."],
    ],
  },
  {
    slug: "smart-home",
    name: "Smart Home Services",
    title: "CCTV Installation and Smart Home Setup in Kerala | Ithihasam",
    description:
      "Professional CCTV installation, smart lock setup, Wi-Fi setup, home automation, video door phone, and security camera support in Kerala.",
    intro:
      "Ithihasam coordinates CCTV installation, smart lighting, smart locks, Wi-Fi setup, video door phones, and basic home automation for homes, offices, shops, and apartments.",
    items: ["CCTV installation", "Smart lighting", "Smart lock setup", "Wi-Fi setup", "Home automation", "Video door phone support"],
    faqs: [
      ["Can I view my CCTV on a phone while travelling?", "Yes. Mobile app setup and remote viewing are part of a standard installation. Remote viewing needs a stable broadband connection at the property, which is checked during the site visit."],
      ["How many cameras does a typical home need?", "Most homes are covered by four: front gate, main door, rear access and one interior. Placement matters more than count, so a site check decides this rather than a fixed package."],
      ["Do you supply the equipment, or can I buy my own?", "Either. Customers can supply their own hardware, or the team can recommend and source a kit suited to the property size and the connection available."],
      ["What happens to CCTV during a power cut?", "The system keeps recording during a power cut only if the DVR and router are on a UPS or inverter. We will tell you whether your existing backup covers them, because many do not."],
      ["Can you set up mobile viewing for CCTV?", "Yes. Mobile app configuration and remote viewing setup are included in a standard CCTV installation booking."],
      ["Do you supply the cameras and recorder?", "Customers can supply their own hardware, or the team can recommend and source a suitable kit for the property size."],
    ],
  },
];

export const servicesBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));

// [slugPrefix, serviceName, parentServiceSlug, commonJobs]
export const localTemplates = [
  ["appliance-servicing", "Appliance Servicing", "appliance-servicing", ["AC service", "fridge repair", "washing machine repair", "microwave service", "water purifier service"]],
  ["ac-repair", "AC Repair", "appliance-servicing", ["AC cooling issue check", "AC gas filling coordination", "split AC service", "AC installation", "AC water leakage repair"]],
  ["tv-repair", "TV Repair Service", "appliance-servicing", ["LED TV issue check", "smart TV setup", "TV no sound", "TV not turning on", "wall-mount fitting"]],
  ["washing-machine-repair", "Washing Machine Repair", "appliance-servicing", ["washing machine not spinning", "water drainage issue", "front-load service", "top-load service", "washing machine installation"]],
  ["refrigerator-repair", "Refrigerator Repair", "appliance-servicing", ["fridge cooling issue", "compressor check", "single-door fridge repair", "double-door fridge repair", "fridge noise issue"]],
  ["fridge-repair", "Fridge Repair", "appliance-servicing", ["fridge cooling issue", "compressor check", "single-door fridge repair", "double-door fridge repair", "fridge noise issue"]],
  ["appliance-service", "Appliance Service", "appliance-servicing", ["AC service", "fridge repair", "washing machine repair", "microwave repair", "water purifier service"]],
  ["electrician", "Electrician Service", "electrical-plumbing", ["switchboard repair", "MCB tripping issue", "house wiring", "fan installation", "light fitting work"]],
  ["electrical-work", "Electrical Work", "electrical-plumbing", ["wiring repair", "switchboard work", "MCB checks", "fan installation", "light fitting"]],
  ["plumber", "Plumber Service", "electrical-plumbing", ["pipe leakage repair", "tap replacement", "bathroom fitting work", "drainage support", "flush tank repair"]],
  ["plumbing", "Plumbing Services", "electrical-plumbing", ["pipe leakage repair", "tap replacement", "bathroom fitting work", "drainage issue", "flush tank repair"]],
  ["electrical-plumbing", "Electrical and Plumbing Services", "electrical-plumbing", ["wiring repair", "pipe leakage repair", "geyser installation", "switch and socket work", "bathroom plumbing"]],
  ["painting", "Painting Services", "painting", ["interior painting", "exterior painting", "full home repainting", "wall putty work", "texture painting"]],
  ["house-painting", "House Painting", "painting", ["interior painting", "exterior painting", "wall putty work", "waterproof coating", "full home repainting"]],
  ["interior-painting", "Interior Painting", "painting", ["bedroom painting", "living room painting", "putty and primer", "texture painting", "rental repainting"]],
  ["exterior-painting", "Exterior Painting", "painting", ["outside wall painting", "weatherproof coating", "exterior repainting", "wall crack filling", "waterproof painting"]],
  ["carpentry", "Carpentry Services", "carpentry", ["door repair", "furniture repair", "wardrobe work", "modular kitchen support", "shelf fitting"]],
  ["carpenter", "Carpenter Service", "carpentry", ["door repair", "cupboard repair", "furniture repair", "shelf fitting", "hinge replacement"]],
  ["furniture-repair", "Furniture Repair", "carpentry", ["bed repair", "wardrobe repair", "drawer channel repair", "sofa frame repair", "cupboard fixing"]],
  ["modular-kitchen-work", "Modular Kitchen Work", "carpentry", ["cabinet repair", "kitchen shutter alignment", "drawer repair", "hinge replacement", "kitchen storage work"]],
  ["roofing-fabrication", "Roofing and Fabrication", "roofing-fabrication", ["roofing sheet work", "truss work", "aluminium fabrication", "steel fabrication", "gate fabrication"]],
  ["fabrication", "Fabrication Works", "roofing-fabrication", ["MS gate fabrication", "window grill work", "staircase railing", "roofing sheet work", "aluminium partition"]],
  ["aluminium-fabrication", "Aluminium Fabrication", "roofing-fabrication", ["aluminium window work", "aluminium partition", "shop front fabrication", "frame fitting", "custom aluminium work"]],
  ["steel-fabrication", "Steel Fabrication", "roofing-fabrication", ["steel grill work", "railing fabrication", "steel frame work", "staircase support", "custom steel work"]],
  ["gate-fabrication", "Gate Fabrication", "roofing-fabrication", ["compound gate work", "grill gate fabrication", "gate repair", "gate welding", "custom gate design"]],
  ["roofing-sheet-work", "Roofing Sheet Work", "roofing-fabrication", ["roofing sheet installation", "shed roofing", "roof leakage repair", "truss work", "terrace cover work"]],
  ["deep-cleaning", "Deep Cleaning", "deep-cleaning", ["full home deep cleaning", "kitchen deep cleaning", "bathroom cleaning", "sofa cleaning", "post-construction cleaning"]],
  ["home-cleaning", "Home Cleaning", "deep-cleaning", ["apartment cleaning", "villa cleaning", "move-in cleaning", "floor cleaning", "dust removal"]],
  ["sofa-cleaning", "Sofa Cleaning", "deep-cleaning", ["sofa shampooing", "upholstery cleaning", "stain cleaning", "fabric sofa cleaning", "cushion cleaning"]],
  ["pest-control", "Pest Control", "pest-control", ["cockroach treatment", "termite treatment", "bed bug treatment", "mosquito control", "rodent control"]],
  ["termite-control", "Termite Control", "pest-control", ["termite inspection", "anti-termite treatment", "wood protection", "termite spray", "furniture termite control"]],
  ["cockroach-control", "Cockroach Control", "pest-control", ["cockroach gel treatment", "kitchen pest control", "apartment cockroach treatment", "pest inspection", "follow-up treatment"]],
  ["smart-home", "Smart Home Services", "smart-home", ["CCTV installation", "smart lighting", "smart lock installation", "Wi-Fi setup", "home automation"]],
  ["cctv-installation", "CCTV Installation", "smart-home", ["home CCTV installation", "office CCTV setup", "camera placement", "DVR setup", "mobile viewing setup"]],
  ["smart-home-setup", "Smart Home Setup", "smart-home", ["smart lighting setup", "smart lock installation", "Wi-Fi setup", "video door phone installation", "home automation"]],
  ["wifi-setup", "Wi-Fi Setup", "smart-home", ["router setup", "mesh Wi-Fi setup", "signal improvement", "Wi-Fi extender setup", "smart device connection"]],
];

// News articles. Slugs and dates must match src/pages/News.tsx — check-seo-data.mjs
// enforces it. Kept here so the build can prerender each article with NewsArticle
// markup instead of serving an empty shell to crawlers.
export const newsArticles = [
  {
    slug: "itihasam-expands-to-5-new-cities",
    date: "2026-04-08",
    category: "Company News",
    title: "Ithihasam Expands Services to 5 New Cities Across India",
    excerpt: "We're excited to announce our expansion to Jaipur, Lucknow, Indore, Bhopal, and Coimbatore.",
    image: "/og/electrical-plumbing.jpg",
  },
  {
    slug: "annual-home-cleaning-drive-2026",
    date: "2026-03-25",
    category: "Community",
    title: "Ithihasam Launches Annual Home Cleaning Drive 2026",
    excerpt: "Join our community initiative. Free deep cleaning for 100 homes this summer.",
    image: "/og/deep-cleaning.jpg",
  },
  {
    slug: "new-carpentry-workshop-program",
    date: "2026-03-10",
    category: "Training",
    title: "Ithihasam Partners with ITIs for Carpentry Skill Development",
    excerpt: "Our partnership with ITIs will train aspiring carpenters with industry-ready skills.",
    image: "/og/carpentry.jpg",
  },
];


/**
 * Short, root-level district landing pages: /kochi, /kannur, /thrissur.
 *
 * These are the pages marketing links to and customers remember, so they are
 * the canonical district page. The matching /locations/<slug> page still
 * renders, but points its canonical here so the two do not compete.
 *
 * `areaSlug` ties each one back to a real serviceArea, which is what supplies
 * the local service pages (/ac-repair-ernakulam and friends).
 */
export const districtLandings = [
  {
    slug: "kochi",
    areaSlug: "ernakulam",
    name: "Kochi",
    district: "Ernakulam district",
    // Kochi is the city people search for; Ernakulam is the district and the
    // area slug already used across the local service pages.
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


/**
 * Multi-service bundles for milestone events.
 *
 * Ithihasam covers trades, cleaning, and appliance work with one team, so jobs
 * that normally need three separate vendors can be booked once. Single-trade
 * competitors cannot answer "moving into a new flat, what do I need?" at all,
 * and that is the query an answer engine is asked — not "electrician near me".
 */
export const serviceBundles = [
  {
    slug: "move-in",
    name: "Move-In Package",
    occasion: "moving into a new home",
    summary:
      "Deep cleaning, electrical and plumbing checks, and appliance installation before you move in, booked as one job instead of three separate vendors.",
    includes: [
      "Full-home deep cleaning, including kitchen degreasing and bathroom sanitising",
      "Electrical safety check: switchboards, MCB, earthing, and fan or light fitting",
      "Plumbing check: taps, flush tanks, drainage, and leak inspection",
      "AC installation or servicing, and washing machine connection",
      "Pest control treatment before furniture arrives",
    ],
  },
  {
    slug: "villa-handover",
    name: "New Villa Handover Check",
    occasion: "taking handover of a newly built house",
    summary:
      "Post-construction cleaning plus the electrical, plumbing, and finish checks worth doing before you sign off a handover and lose your leverage with the builder.",
    includes: [
      "Post-construction deep cleaning and debris removal",
      "Water tank cleaning and plumbing pressure check",
      "Full electrical load and earthing verification",
      "Paint touch-ups and putty finishing where needed",
      "Door, window, and cabinet alignment by a carpenter",
    ],
  },
  {
    slug: "office-setup",
    name: "Office Setup and Relocation",
    occasion: "setting up or relocating an office",
    summary:
      "Electrical points, network and CCTV installation, AC commissioning, and a full clean, sequenced so the space is ready on your move-in date.",
    includes: [
      "Electrical points, switchboards, and cabling for workstations",
      "CCTV installation with mobile viewing setup",
      "Wi-Fi and network point setup",
      "AC installation, relocation, or servicing",
      "Deep cleaning before occupancy",
    ],
  },
  {
    slug: "monsoon-prep",
    name: "Monsoon Readiness Check",
    occasion: "preparing a home for the monsoon",
    summary:
      "Roof, drainage, electrical, and damp checks done before the rain starts, when the same faults cost far more to fix.",
    includes: [
      "Roof leak inspection and sheet or sealing repair",
      "Gutter and drainage clearing",
      "Electrical earthing and damp-point safety check",
      "Exterior waterproof coating where needed",
      "Pest and termite treatment ahead of the wet season",
    ],
  },
];

// Templates that are search-synonym duplicates of a stronger sibling. These keep
// their URL (so existing links and rankings survive) but carry a canonical
// pointing at the primary page, which is what Google asks for instead of
// publishing near-identical pages at scale.
export const duplicateTemplateCanonicals = {
  "fridge-repair": "refrigerator-repair",
  "appliance-service": "appliance-servicing",
  "electrical-work": "electrician",
  plumbing: "plumber",
  "house-painting": "painting",
  carpenter: "carpentry",
  "smart-home-setup": "smart-home",
};
