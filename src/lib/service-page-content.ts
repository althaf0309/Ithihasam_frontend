export interface ServicePageFaqOverride {
  q: string;
  a: string;
}

export interface ServicePageContentOverride {
  detailDescriptionEn: string;
  faqsEn: ServicePageFaqOverride[];
}

export const servicePageContentBySlug: Record<string, ServicePageContentOverride> = {
  "electrical-plumbing": {
    detailDescriptionEn:
      "If you are searching for an electrician in Kannur, plumber in Kannur, electrician in Thrissur, or plumbing services near me, Ithihasam provides doorstep support for houses, flats, villas, shops, and offices across both districts. We handle house wiring, switchboard repair, MCB tripping, motor connection, pipe leakage repair, tap replacement, bathroom fitting work, tank plumbing, and emergency electrical or plumbing maintenance with fast local scheduling.",
    faqsEn: [
      {
        q: "Do you provide electrician and plumber service across Kannur and Thrissur districts?",
        a: "Yes. We cover core areas such as Kannur Town, Thalassery, Taliparamba, Payyanur, Mattannur, Iritty, Thrissur Town, Irinjalakuda, Guruvayur, Kodungallur, Kunnamkulam, and Chalakudy, subject to slot availability.",
      },
      {
        q: "Can you attend urgent leakage or tripping issues on the same day?",
        a: "For common jobs like pipe leakage repair, motor issues, switchboard faults, MCB trips, and tap replacement, we try to offer same-day or next-available support in Kannur and Thrissur.",
      },
      {
        q: "What are the most booked electrical and plumbing jobs in these districts?",
        a: "The most frequent requests are switch and socket replacement, bathroom plumbing, water tank line work, geyser installation, pipe leakage repair, drainage correction, wiring upgrades, and small electrical maintenance for apartments and villas.",
      },
      {
        q: "Do you handle both home and commercial maintenance jobs?",
        a: "Yes. We take up work for homes, rental apartments, villas, shops, clinics, offices, and small commercial spaces in Kannur and Thrissur.",
      },
    ],
  },
  painting: {
    detailDescriptionEn:
      "Ithihasam offers house painting services in Kannur and Thrissur for interior walls, exterior walls, apartment repainting, villa painting, putty work, waterproof coating, texture finishes, and wood polishing. If you are comparing painting contractors near you, we focus on clean surface preparation, proper masking, premium paint application, and neat handover for homes and commercial spaces across both districts.",
    faqsEn: [
      {
        q: "Do you do both interior and exterior painting in Kannur and Thrissur?",
        a: "Yes. We handle interior painting, exterior painting, repainting, fresh paint work, putty correction, texture finishes, and waterproof top coats for houses, flats, villas, and shops.",
      },
      {
        q: "Can you help me choose paint colors for my home?",
        a: "Yes. We support color selection based on light, room size, wall condition, and maintenance needs. This is especially useful for apartment painting and full-home repainting jobs in Kannur and Thrissur.",
      },
      {
        q: "How long will a typical 2BHK or 3BHK painting job take?",
        a: "Most 2BHK jobs take around 3 to 5 days and larger 3BHK or villa projects can take longer, depending on surface repairs, putty work, waterproofing, and the number of coats required.",
      },
      {
        q: "Do you protect furniture and clean up after the work?",
        a: "Yes. Our team covers furniture, masks edges, manages dust during prep work, and completes a cleanup process before handover.",
      },
    ],
  },
  "appliance-servicing": {
    detailDescriptionEn:
      "Customers searching for AC service in Kannur, AC repair in Thrissur, washing machine repair near me, refrigerator repair, microwave repair, or water purifier service can book Ithihasam for doorstep appliance support across both districts. We diagnose cooling issues, unusual noise, drainage problems, startup failures, performance drops, and installation requirements for major household appliances with trained technicians and transparent job assessment.",
    faqsEn: [
      {
        q: "Which appliances do you service most often in Kannur and Thrissur?",
        a: "The most common bookings are AC service and repair, washing machine repair, refrigerator cooling issues, microwave repair, and water purifier maintenance.",
      },
      {
        q: "Do you provide same-day AC service or fridge repair?",
        a: "For many routine jobs, yes. Same-day support depends on technician routes, spare-part needs, and your location within Kannur or Thrissur district.",
      },
      {
        q: "Can you handle both servicing and installation jobs?",
        a: "Yes. We cover preventive servicing, breakdown diagnosis, part replacement guidance, AC installation support, and appliance reinstallation after shifting.",
      },
      {
        q: "What issues should I mention while booking appliance service?",
        a: "Please mention symptoms like not cooling, water leakage, heavy vibration, power failure, bad smell, drum not spinning, unusual noise, or error code display so we can route the right technician.",
      },
    ],
  },
  carpentry: {
    detailDescriptionEn:
      "For homeowners looking for a carpenter in Kannur or carpenter in Thrissur, Ithihasam handles practical home carpentry jobs such as door repair, cupboard repair, wardrobe fitting, bed repair, shelf installation, modular kitchen adjustments, hinge replacement, and wood polishing. The service is designed for apartments, villas, rental homes, and small commercial interiors that need reliable finishing and faster local support.",
    faqsEn: [
      {
        q: "Do you take up small carpentry jobs as well as full custom work?",
        a: "Yes. We handle both small jobs like door alignment, lock fitting, drawer repair, and shelf mounting, as well as larger woodwork and modular storage support.",
      },
      {
        q: "Can you repair existing wardrobes, beds, and kitchen cabinets?",
        a: "Yes. Many bookings in Kannur and Thrissur involve wardrobe shutters, bed frames, cabinet hinges, drawer channels, and kitchen unit repairs rather than full replacement.",
      },
      {
        q: "Do you provide carpenter service for apartments and villas?",
        a: "Yes. Our carpentry work is suitable for apartments, villas, independent homes, offices, and small retail interiors across both districts.",
      },
      {
        q: "Do you also offer polishing and finishing work?",
        a: "Yes. We can support wood polishing, minor finishing touch-ups, and restoration-oriented carpentry depending on the material condition and scope.",
      },
    ],
  },
  "roofing-fabrication": {
    detailDescriptionEn:
      "Ithihasam supports customers searching for roofing sheet work in Kannur, roof repair in Thrissur, aluminium fabrication near me, steel fabrication, grill work, gate fabrication, truss work, and shed installation. We take up residential and commercial fabrication requirements for homes, terraces, shops, warehouses, and renovation sites across both districts with a focus on durability, fit, and clean finishing.",
    faqsEn: [
      {
        q: "What types of roofing and fabrication work do you handle?",
        a: "We cover roofing sheet installation, roof leakage correction, gate fabrication, grill work, handrails, metal frames, shed work, and selected aluminium or steel fabrication jobs.",
      },
      {
        q: "Do you work for homes as well as shops and small commercial spaces?",
        a: "Yes. We handle fabrication work for houses, villas, apartment common areas, workshops, retail shops, offices, and light commercial structures in Kannur and Thrissur.",
      },
      {
        q: "Can you visit the site before giving a final quote?",
        a: "Yes. Roofing, shed, grill, and fabrication jobs usually need a site check for measurement, material choice, support structure, and access conditions before final pricing.",
      },
      {
        q: "Do you support repair jobs or only new fabrication?",
        a: "We do both. Customers often book us for roof sheet replacement, grill repair, welding correction, gate alignment, and strengthening older structures.",
      },
    ],
  },
  "deep-cleaning": {
    detailDescriptionEn:
      "If you are looking for deep cleaning services in Kannur or deep cleaning services in Thrissur, Ithihasam provides full home cleaning, kitchen deep cleaning, bathroom cleaning, sofa cleaning, apartment cleaning, move-in cleaning, and post-construction cleaning. The service is built for busy households, rentals, and newly occupied homes that need detailed cleaning beyond routine sweeping and mopping.",
    faqsEn: [
      {
        q: "What is included in a full home deep cleaning service?",
        a: "Most deep cleaning bookings include dust removal, fan and fixture cleaning, floor scrubbing, bathroom detailing, kitchen surface cleaning, glass wiping, and focused cleaning for corners, switches, and frequently missed areas.",
      },
      {
        q: "Do you provide kitchen, bathroom, and sofa cleaning separately?",
        a: "Yes. In Kannur and Thrissur, many customers book kitchen deep cleaning, bathroom cleaning, or sofa shampooing as standalone services depending on the need.",
      },
      {
        q: "Is post-construction cleaning available?",
        a: "Yes. We support post-construction and move-in cleaning for homes, flats, villas, and renovation handovers where dust, residue, and paint marks need extra attention.",
      },
      {
        q: "How often should a home be professionally deep cleaned?",
        a: "For most households, once every 3 to 4 months works well. Homes with children, pets, rentals, or heavy usage may benefit from more frequent deep cleaning.",
      },
    ],
  },
  "pest-control": {
    detailDescriptionEn:
      "Ithihasam provides pest control in Kannur and Thrissur for termite treatment, cockroach control, bed bug treatment, mosquito control, rodent control, and general pest management for homes, apartments, offices, and shops. The focus is on safe treatment planning, practical follow-up advice, and local scheduling for customers comparing pest control companies in both districts.",
    faqsEn: [
      {
        q: "Which pest control services are most commonly booked in Kannur and Thrissur?",
        a: "The highest-demand services are termite control, cockroach treatment, mosquito control, rodent control, and bed bug treatment for homes and commercial spaces.",
      },
      {
        q: "Are the pest control treatments safe for children and pets?",
        a: "We use approved treatment methods and share post-service safety guidance. The exact process depends on the pest type, treatment area, and intensity of infestation.",
      },
      {
        q: "Do you provide termite treatment for houses with wooden furniture and wardrobes?",
        a: "Yes. Termite treatment is one of the most requested services in both districts, especially for wardrobes, door frames, wooden fittings, and ground-level structures.",
      },
      {
        q: "Can I book one-time treatment as well as annual pest control plans?",
        a: "Yes. We support both one-time pest removal jobs and recurring maintenance plans for homes, offices, restaurants, and other commercial spaces.",
      },
    ],
  },
  "smart-home": {
    detailDescriptionEn:
      "For customers searching for CCTV installation in Kannur, CCTV installation in Thrissur, smart home setup near me, smart lock installation, Wi-Fi setup, or home automation service, Ithihasam provides practical security and connectivity upgrades for houses, flats, villas, offices, and shops. We help with camera placement, router planning, device integration, smart lighting, intercoms, and user-friendly setup based on the property layout.",
    faqsEn: [
      {
        q: "Do you provide CCTV installation for homes and small businesses?",
        a: "Yes. We support CCTV camera installation for houses, apartments, villas, shops, offices, clinics, and other small commercial properties across Kannur and Thrissur.",
      },
      {
        q: "Can you set up smart locks, video door phones, and Wi-Fi together?",
        a: "Yes. Many customers book combined smart home packages that include CCTV, smart locks, video door phones, router setup, and basic home automation controls.",
      },
      {
        q: "Will smart home devices work in older homes too?",
        a: "In many cases, yes. Older homes in Kannur and Thrissur can often be upgraded with minimal rewiring depending on the device type and existing electrical layout.",
      },
      {
        q: "Do you help after installation if the app or device setup feels confusing?",
        a: "Yes. We guide customers through usage, pairing, app setup, and basic troubleshooting so the system remains practical after installation.",
      },
    ],
  },
};
