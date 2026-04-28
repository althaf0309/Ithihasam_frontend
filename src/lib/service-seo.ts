export interface ServiceSeoEntry {
  metaTitle: string;
  metaDescription: string;
  sectionTitle: string;
  paragraphs: string[];
  keywords: string[];
  localAreas: string[];
}

const sharedAreas = [
  "Kannur Town",
  "Thalassery",
  "Taliparamba",
  "Payyanur",
  "Mattannur",
  "Iritty",
  "Thrissur Town",
  "Irinjalakuda",
  "Guruvayur",
  "Kodungallur",
  "Kunnamkulam",
  "Chalakudy",
];

export const serviceSeoBySlug: Record<string, ServiceSeoEntry> = {
  "electrical-plumbing": {
    metaTitle: "Electrician and Plumber Services in Kannur & Thrissur | Ithihasam",
    metaDescription:
      "Book electricians and plumbers in Kannur and Thrissur for wiring, switchboard repair, pipe leakage repair, bathroom fittings, geyser work, drainage, and emergency home maintenance.",
    sectionTitle: "Doorstep electrical and plumbing services for Kannur and Thrissur homes",
    paragraphs: [
      "People searching for an electrician in Kannur, plumber in Kannur, electrician in Thrissur, or plumber in Thrissur usually need fast help for leakage, tripping issues, motor problems, bathroom fittings, and water line work. Ithihasam handles same-day home maintenance for houses, flats, villas, shops, and offices across both districts.",
      "This page targets high-intent local searches such as electrical services near me, plumbing services near me, switch board repair, pipe leakage repair, tap installation, drainage work, geyser installation, and emergency electrician service in Kannur and Thrissur.",
    ],
    keywords: [
      "electrician in Kannur",
      "plumber in Kannur",
      "electrician in Thrissur",
      "plumber in Thrissur",
      "electrical services near me",
      "plumbing services near me",
      "switch board repair Kannur",
      "pipe leakage repair Thrissur",
      "geyser installation Kannur",
      "bathroom plumbing work Thrissur",
    ],
    localAreas: sharedAreas,
  },
  painting: {
    metaTitle: "House Painting Services in Kannur & Thrissur | Interior and Exterior Painting",
    metaDescription:
      "Professional house painting services in Kannur and Thrissur for interior painting, exterior painting, putty work, waterproof coating, texture painting, and apartment repainting.",
    sectionTitle: "High-intent house painting keywords for Kannur and Thrissur",
    paragraphs: [
      "Homeowners looking for house painting services in Kannur and house painting services in Thrissur often compare interior painters, exterior painting contractors, putty work teams, and waterproof coating specialists before booking. Ithihasam is positioned for those ready-to-book home painting searches.",
      "The copy on this page is built around terms with strong purchase intent, including home painting near me, interior painting Kannur, exterior painting Thrissur, wall putty painting, texture painting, repainting contractors, and waterproof painting services for villas, flats, and commercial buildings.",
    ],
    keywords: [
      "house painting services Kannur",
      "house painting services Thrissur",
      "interior painting Kannur",
      "exterior painting Thrissur",
      "home painting near me",
      "wall putty painting Kannur",
      "texture painting Thrissur",
      "waterproof painting Kannur",
      "apartment painting Thrissur",
      "painting contractors Kannur",
    ],
    localAreas: sharedAreas,
  },
  "appliance-servicing": {
    metaTitle: "AC, Fridge and Washing Machine Repair in Kannur & Thrissur | Ithihasam",
    metaDescription:
      "Book AC service, washing machine repair, refrigerator repair, microwave repair, and water purifier service in Kannur and Thrissur with trained doorstep technicians.",
    sectionTitle: "Appliance repair content focused on the searches people use in Kannur and Thrissur",
    paragraphs: [
      "Current local demand clusters heavily around AC service Kannur, AC repair Thrissur, washing machine repair Kannur, refrigerator repair Thrissur, and doorstep appliance service near me. This section helps the page match those exact service-intent searches instead of generic maintenance terms.",
      "We also include supporting phrases people use before booking, such as fridge service near me, microwave oven repair, water purifier service, AC gas filling, AC installation, front load washing machine repair, and same-day appliance technician in Kannur and Thrissur.",
    ],
    keywords: [
      "AC service Kannur",
      "AC repair Thrissur",
      "washing machine repair Kannur",
      "refrigerator repair Thrissur",
      "fridge service near me",
      "microwave oven repair Kannur",
      "water purifier service Thrissur",
      "AC installation Kannur",
      "AC gas filling Thrissur",
      "appliance repair near me",
    ],
    localAreas: sharedAreas,
  },
  carpentry: {
    metaTitle: "Carpenter Services in Kannur & Thrissur | Furniture, Door and Wardrobe Work",
    metaDescription:
      "Hire carpenters in Kannur and Thrissur for furniture repair, wardrobe work, modular kitchen support, door repair, wood polishing, and custom woodwork.",
    sectionTitle: "Local carpenter search intent from Kannur to Thrissur",
    paragraphs: [
      "Customers who search for carpenter in Kannur or carpenter in Thrissur are usually looking for immediate home jobs like door repair, cupboard fixing, kitchen cabinet work, bed repair, lock alignment, and shelf installation. This page now mirrors that district-level buying intent more clearly.",
      "The content includes practical keyword combinations such as furniture repair near me, modular kitchen carpenter, wardrobe repair, wooden door repair, custom woodwork, and wood polishing service in Kannur and Thrissur so the page reads closer to what people actually search before they call.",
    ],
    keywords: [
      "carpenter in Kannur",
      "carpenter in Thrissur",
      "furniture repair near me",
      "wardrobe repair Kannur",
      "modular kitchen work Thrissur",
      "wooden door repair Kannur",
      "cupboard repair Thrissur",
      "wood polish service Kannur",
      "custom woodwork Thrissur",
      "home carpenter service near me",
    ],
    localAreas: sharedAreas,
  },
  "roofing-fabrication": {
    metaTitle: "Roofing Sheet Work and Aluminium Fabrication in Kannur & Thrissur | Ithihasam",
    metaDescription:
      "Expert roofing sheet installation, roof repair, grill work, gate fabrication, truss work, steel fabrication, and aluminium fabrication in Kannur and Thrissur.",
    sectionTitle: "Kannur and Thrissur roofing, welding, and fabrication keywords with booking intent",
    paragraphs: [
      "Search results in these districts consistently surface roofing sheet work, aluminium fabrication, steel fabrication, truss work, and gate or grill fabrication terms. Ithihasam now reflects those commercial and residential keywords so the service page speaks directly to customers looking for fabrication contractors in Kannur and Thrissur.",
      "We target phrases like roofing sheet installation, roof leakage repair, aluminium fabrication near me, grill work, gate fabrication, shed work, truss fabrication, and welding services in Kannur and Thrissur for homes, shops, warehouses, and renovation projects.",
    ],
    keywords: [
      "roofing sheet work Kannur",
      "roof repair Thrissur",
      "aluminium fabrication Kannur",
      "steel fabrication Thrissur",
      "gate fabrication Kannur",
      "grill work Thrissur",
      "truss work Kannur",
      "welding service Thrissur",
      "shed work Kannur",
      "fabrication work near me",
    ],
    localAreas: sharedAreas,
  },
  "deep-cleaning": {
    metaTitle: "Deep Cleaning Services in Kannur & Thrissur | Home, Kitchen and Sofa Cleaning",
    metaDescription:
      "Book deep cleaning services in Kannur and Thrissur for full home cleaning, kitchen deep cleaning, bathroom cleaning, sofa shampooing, move-in cleaning, and post-construction cleaning.",
    sectionTitle: "Deep cleaning content aligned to local home-service searches",
    paragraphs: [
      "District-level search patterns show strong commercial intent around deep cleaning services Kannur, deep cleaning services Thrissur, home cleaning near me, sofa cleaning, and kitchen deep cleaning. This page now includes those phrases naturally inside the service copy instead of generic cleaning language.",
      "That helps the content align better with people searching for apartment cleaning, bathroom deep cleaning, villa cleaning, move-in cleaning, post-construction cleaning, and same-day cleaning teams in Kannur and Thrissur.",
    ],
    keywords: [
      "deep cleaning services Kannur",
      "deep cleaning services Thrissur",
      "home cleaning near me",
      "kitchen deep cleaning Kannur",
      "bathroom cleaning Thrissur",
      "sofa cleaning Kannur",
      "apartment cleaning Thrissur",
      "villa deep cleaning Kannur",
      "post construction cleaning Thrissur",
      "move in cleaning near me",
    ],
    localAreas: sharedAreas,
  },
  "pest-control": {
    metaTitle: "Pest Control in Kannur & Thrissur | Termite, Cockroach and Rodent Treatment",
    metaDescription:
      "Safe pest control services in Kannur and Thrissur for termite treatment, cockroach control, bed bug removal, mosquito control, rodent control, and annual pest management.",
    sectionTitle: "Pest control keywords with high local intent in Kannur and Thrissur",
    paragraphs: [
      "Local service pages and listings strongly emphasize pest control in Thrissur, termite treatment, cockroach control, mosquito control, and rodent control. We used that search behavior to strengthen this page for customers actively comparing pest control companies in Kannur and Thrissur.",
      "The copy also includes transaction-focused phrases like termite control Kannur, cockroach control Thrissur, bed bug treatment near me, home pest control, office pest control, mosquito treatment, and annual pest control contract so the page matches both home and commercial enquiries.",
    ],
    keywords: [
      "pest control Kannur",
      "pest control Thrissur",
      "termite control Kannur",
      "cockroach control Thrissur",
      "bed bug treatment Kannur",
      "rodent control Thrissur",
      "mosquito control Kannur",
      "home pest control near me",
      "office pest control Thrissur",
      "annual pest control contract Kannur",
    ],
    localAreas: sharedAreas,
  },
  "smart-home": {
    metaTitle: "CCTV Installation and Smart Home Setup in Kannur & Thrissur | Ithihasam",
    metaDescription:
      "Professional CCTV installation, smart lock setup, Wi-Fi networking, home automation, video door phone installation, and camera service in Kannur and Thrissur.",
    sectionTitle: "Smart home and CCTV keywords for Kannur and Thrissur districts",
    paragraphs: [
      "Recent local pages in these districts are heavily built around CCTV installation, home automation, security systems, and camera service. This page now targets those same high-intent search phrases for homeowners and businesses in Kannur and Thrissur.",
      "We include commercial and residential queries such as CCTV installation Kannur, CCTV installation Thrissur, smart lock installation, home automation near me, Wi-Fi setup, video door phone installation, office CCTV service, and security camera repair to capture broader local demand.",
    ],
    keywords: [
      "CCTV installation Kannur",
      "CCTV installation Thrissur",
      "smart lock installation Kannur",
      "home automation Thrissur",
      "WiFi setup Kannur",
      "video door phone installation Thrissur",
      "security camera repair Kannur",
      "smart home setup near me",
      "office CCTV service Thrissur",
      "camera installation near me",
    ],
    localAreas: sharedAreas,
  },
};
