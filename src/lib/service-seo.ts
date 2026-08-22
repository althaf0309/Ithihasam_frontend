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
  "Kuthuparamba",
  "Panoor",
  "Mahe",
  "Chakkarakkal",
  "Anjarakandy",
  "Thazhe Chovva",
];

export const serviceSeoBySlug: Record<string, ServiceSeoEntry> = {
  "electrical-plumbing": {
    metaTitle: "Electrician and Plumber Services in Kannur | Ithihasam",
    metaDescription:
      "Book electricians and plumbers in Kannur for wiring, switchboard repair, pipe leakage repair, bathroom fittings, geyser work, drainage, and emergency home maintenance.",
    sectionTitle: "Doorstep electrical and plumbing services for Kannur homes",
    paragraphs: [
      "People searching for an electrician in Kannur, plumber in Kannur, electrician in Thalassery, or plumber in Taliparamba usually need fast help for leakage, tripping issues, motor problems, bathroom fittings, and water line work. Ithihasam handles same-day home maintenance for houses, flats, villas, shops, and offices across Kannur district.",
      "This page targets high-intent local searches such as electrical services near me, plumbing services near me, switch board repair, pipe leakage repair, tap installation, drainage work, geyser installation, and emergency electrician service in Kannur.",
    ],
    keywords: [
      "electrician in Kannur",
      "plumber in Kannur",
      "electrician in Taliparamba",
      "plumber in Thalassery",
      "electrical services near me",
      "plumbing services near me",
      "switch board repair Kannur",
      "pipe leakage repair Payyannur",
      "geyser installation Kannur",
      "bathroom plumbing work Mattannur",
    ],
    localAreas: sharedAreas,
  },
  painting: {
    metaTitle: "House Painting Services in Kannur | Interior and Exterior Painting",
    metaDescription:
      "Professional house painting services in Kannur for interior painting, exterior painting, putty work, waterproof coating, texture painting, and apartment repainting.",
    sectionTitle: "High-intent house painting keywords for Kannur",
    paragraphs: [
      "Homeowners looking for house painting services in Kannur and house painting services in Kuthuparamba often compare interior painters, exterior painting contractors, putty work teams, and waterproof coating specialists before booking. Ithihasam is positioned for those ready-to-book home painting searches.",
      "The copy on this page is built around terms with strong purchase intent, including home painting near me, interior painting Kannur, exterior painting Panoor, wall putty painting, texture painting, repainting contractors, and waterproof painting services for villas, flats, and commercial buildings.",
    ],
    keywords: [
      "house painting services Kannur",
      "house painting services Iritty",
      "interior painting Kannur",
      "exterior painting Thalassery",
      "home painting near me",
      "wall putty painting Kannur",
      "texture painting Taliparamba",
      "waterproof painting Kannur",
      "apartment painting Payyannur",
      "painting contractors Kannur",
    ],
    localAreas: sharedAreas,
  },
  "appliance-servicing": {
    metaTitle: "AC, Fridge and Washing Machine Repair in Kannur | Ithihasam",
    metaDescription:
      "Book AC service, washing machine repair, refrigerator repair, microwave repair, and water purifier service in Kannur with trained doorstep technicians.",
    sectionTitle: "Appliance repair content focused on the searches people use in Kannur",
    paragraphs: [
      "Current local demand clusters heavily around AC service Kannur, AC repair Mattannur, washing machine repair Kannur, refrigerator repair Kuthuparamba, and doorstep appliance service near me. This section helps the page match those exact service-intent searches instead of generic maintenance terms.",
      "We also include supporting phrases people use before booking, such as fridge service near me, microwave oven repair, water purifier service, AC gas filling, AC installation, front load washing machine repair, and same-day appliance technician in Kannur.",
    ],
    keywords: [
      "AC service Kannur",
      "AC repair Panoor",
      "washing machine repair Kannur",
      "refrigerator repair Iritty",
      "fridge service near me",
      "microwave oven repair Kannur",
      "water purifier service Thalassery",
      "AC installation Kannur",
      "AC gas filling Taliparamba",
      "appliance repair near me",
    ],
    localAreas: sharedAreas,
  },
  carpentry: {
    metaTitle: "Carpenter Services in Kannur | Furniture, Door and Wardrobe Work",
    metaDescription:
      "Hire carpenters in Kannur for furniture repair, wardrobe work, modular kitchen support, door repair, wood polishing, and custom woodwork.",
    sectionTitle: "Local carpenter search intent from Kannur to Payyannur",
    paragraphs: [
      "Customers who search for carpenter in Kannur or carpenter in Mattannur are usually looking for immediate home jobs like door repair, cupboard fixing, kitchen cabinet work, bed repair, lock alignment, and shelf installation. This page now mirrors that district-level buying intent more clearly.",
      "The content includes practical keyword combinations such as furniture repair near me, modular kitchen carpenter, wardrobe repair, wooden door repair, custom woodwork, and wood polishing service in Kannur so the page reads closer to what people actually search before they call.",
    ],
    keywords: [
      "carpenter in Kannur",
      "carpenter in Kuthuparamba",
      "furniture repair near me",
      "wardrobe repair Kannur",
      "modular kitchen work Panoor",
      "wooden door repair Kannur",
      "cupboard repair Iritty",
      "wood polish service Kannur",
      "custom woodwork Thalassery",
      "home carpenter service near me",
    ],
    localAreas: sharedAreas,
  },
  "roofing-fabrication": {
    metaTitle: "Roofing Sheet Work and Aluminium Fabrication in Kannur | Ithihasam",
    metaDescription:
      "Expert roofing sheet installation, roof repair, grill work, gate fabrication, truss work, steel fabrication, and aluminium fabrication in Kannur.",
    sectionTitle: "Kannur roofing, welding, and fabrication keywords with booking intent",
    paragraphs: [
      "Search results in these districts consistently surface roofing sheet work, aluminium fabrication, steel fabrication, truss work, and gate or grill fabrication terms. Ithihasam now reflects those commercial and residential keywords so the service page speaks directly to customers looking for fabrication contractors in Kannur.",
      "We target phrases like roofing sheet installation, roof leakage repair, aluminium fabrication near me, grill work, gate fabrication, shed work, truss fabrication, and welding services in Kannur for homes, shops, warehouses, and renovation projects.",
    ],
    keywords: [
      "roofing sheet work Kannur",
      "roof repair Taliparamba",
      "aluminium fabrication Kannur",
      "steel fabrication Payyannur",
      "gate fabrication Kannur",
      "grill work Mattannur",
      "truss work Kannur",
      "welding service Kuthuparamba",
      "shed work Kannur",
      "fabrication work near me",
    ],
    localAreas: sharedAreas,
  },
  "deep-cleaning": {
    metaTitle: "Deep Cleaning Services in Kannur | Home, Kitchen and Sofa Cleaning",
    metaDescription:
      "Book deep cleaning services in Kannur for full home cleaning, kitchen deep cleaning, bathroom cleaning, sofa shampooing, move-in cleaning, and post-construction cleaning.",
    sectionTitle: "Deep cleaning content aligned to local home-service searches",
    paragraphs: [
      "District-level search patterns show strong commercial intent around deep cleaning services Kannur, deep cleaning services Panoor, home cleaning near me, sofa cleaning, and kitchen deep cleaning. This page now includes those phrases naturally inside the service copy instead of generic cleaning language.",
      "That helps the content align better with people searching for apartment cleaning, bathroom deep cleaning, villa cleaning, move-in cleaning, post-construction cleaning, and same-day cleaning teams in Kannur.",
    ],
    keywords: [
      "deep cleaning services Kannur",
      "deep cleaning services Iritty",
      "home cleaning near me",
      "kitchen deep cleaning Kannur",
      "bathroom cleaning Thalassery",
      "sofa cleaning Kannur",
      "apartment cleaning Taliparamba",
      "villa deep cleaning Kannur",
      "post construction cleaning Payyannur",
      "move in cleaning near me",
    ],
    localAreas: sharedAreas,
  },
  "pest-control": {
    metaTitle: "Pest Control in Kannur | Termite, Cockroach and Rodent Treatment",
    metaDescription:
      "Safe pest control services in Kannur for termite treatment, cockroach control, bed bug removal, mosquito control, rodent control, and annual pest management.",
    sectionTitle: "Pest control keywords with high local intent in Kannur",
    paragraphs: [
      "Local service pages and listings strongly emphasize pest control in Mattannur, termite treatment, cockroach control, mosquito control, and rodent control. We used that search behavior to strengthen this page for customers actively comparing pest control companies in Kannur.",
      "The copy also includes transaction-focused phrases like termite control Kannur, cockroach control Kuthuparamba, bed bug treatment near me, home pest control, office pest control, mosquito treatment, and annual pest control contract so the page matches both home and commercial enquiries.",
    ],
    keywords: [
      "pest control Kannur",
      "pest control Thalassery",
      "termite control Kannur",
      "cockroach control Panoor",
      "bed bug treatment Kannur",
      "rodent control Iritty",
      "mosquito control Kannur",
      "home pest control near me",
      "office pest control Thalassery",
      "annual pest control contract Kannur",
    ],
    localAreas: sharedAreas,
  },
  "smart-home": {
    metaTitle: "CCTV Installation and Smart Home Setup in Kannur | Ithihasam",
    metaDescription:
      "Professional CCTV installation, smart lock setup, Wi-Fi networking, home automation, video door phone installation, and camera service in Kannur.",
    sectionTitle: "Smart home and CCTV keywords for Kannur district",
    paragraphs: [
      "Recent local pages in these districts are heavily built around CCTV installation, home automation, security systems, and camera service. This page now targets those same high-intent search phrases for homeowners and businesses in Kannur.",
      "We include commercial and residential queries such as CCTV installation Kannur, CCTV installation Thalassery, smart lock installation, home automation near me, Wi-Fi setup, video door phone installation, office CCTV service, and security camera repair to capture broader local demand.",
    ],
    keywords: [
      "CCTV installation Kannur",
      "CCTV installation Taliparamba",
      "smart lock installation Kannur",
      "home automation Payyannur",
      "WiFi setup Kannur",
      "video door phone installation Mattannur",
      "security camera repair Kannur",
      "smart home setup near me",
      "office CCTV service Kuthuparamba",
      "camera installation near me",
    ],
    localAreas: sharedAreas,
  },
};
