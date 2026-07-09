import fs from "node:fs";
import path from "node:path";

const siteUrl = "https://ithihasam.in";
const businessPhone = "+91 94000 96518";
const businessPhonePlain = "+919400096518";
const businessAddress = "3rd Floor, Disha Building, near Downtown Mall, Thalassery 670101";
const distDir = path.resolve("dist");
const shellPath = path.join(distDir, "index.html");

const serviceAreas = [
  { slug: "thalassery", name: "Thalassery", district: "Kannur district" },
  { slug: "panoor", name: "Panoor", district: "Kannur district" },
  { slug: "nadapuram", name: "Nadapuram", district: "Kozhikode district" },
  { slug: "mahe", name: "Mahe", district: "Mahe region" },
  { slug: "kuthuparamba", name: "Kuthuparamba", district: "Kannur district" },
  { slug: "mattannur", name: "Mattannur", district: "Kannur district" },
  { slug: "iritty", name: "Iritty", district: "Kannur district" },
  { slug: "chakkarakkal", name: "Chakkarakkal", district: "Kannur district" },
  { slug: "anjarakandy", name: "Anjarakandy", district: "Kannur district" },
  { slug: "chalod", name: "Chalode", district: "Kannur district" },
  { slug: "thazhe-chovva", name: "Thazhe Chovva", district: "Kannur district" },
  { slug: "taliparamba", name: "Taliparamba", district: "Kannur district" },
  { slug: "payyannur", name: "Payyannur", district: "Kannur district" },
];

const services = [
  {
    slug: "electrical-plumbing",
    name: "Electrical and Plumbing Services",
    shortName: "Electrical and Plumbing",
    title: "Electrician and Plumber Services in Kannur & Thrissur | Ithihasam",
    description:
      "Book electricians and plumbers in Kannur and Thrissur for wiring, switchboard repair, pipe leakage repair, bathroom fittings, drainage, and home maintenance.",
    intro:
      "Ithihasam coordinates practical electrical and plumbing support for homes, shops, offices, and apartments across Kannur and Thrissur. Customers can request help for wiring faults, switchboard work, pipe leakage, bathroom fittings, motor connections, and drainage issues.",
    items: ["Switchboard repair", "House wiring", "MCB and DB checks", "Pipe leakage repair", "Tap replacement", "Bathroom plumbing"],
  },
  {
    slug: "painting",
    name: "Painting Services",
    shortName: "Painting",
    title: "House Painting Services in Kannur & Thrissur | Ithihasam",
    description:
      "Professional house painting services in Kannur and Thrissur for interior painting, exterior painting, putty work, waterproof coating, and repainting.",
    intro:
      "Ithihasam supports interior painting, exterior painting, wall putty, primer, waterproof coating, rental repainting, and full home repainting requirements across Kannur and Thrissur.",
    items: ["Interior painting", "Exterior painting", "Wall putty work", "Primer application", "Waterproof coating", "Full home repainting"],
  },
  {
    slug: "appliance-servicing",
    name: "Home Appliance Repair and Servicing",
    shortName: "Appliance Servicing",
    title: "Home Appliance Repair & Service in Kannur & Thrissur | Ithihasam",
    description:
      "Doorstep AC, fridge, washing machine, microwave, TV, purifier, chimney, and geyser service support in Kannur and Thrissur. Call Ithihasam to book.",
    intro:
      "Ithihasam brings appliance service coordination to your doorstep across Kannur and Thrissur districts. Whether your AC is not cooling, your refrigerator is making unusual noise, or your washing machine has stopped working, you can book trained technician support for major household appliances.",
    items: ["AC repair and service", "Fridge and refrigerator repair", "Washing machine repair", "Microwave oven repair", "TV repair", "Water purifier service", "Kitchen chimney cleaning", "Geyser and water heater support"],
    brands: ["LG", "Samsung", "Whirlpool", "Godrej", "Haier", "Daikin", "Voltas", "Bosch", "IFB", "Panasonic", "Sony", "Blue Star"],
    faqs: [
      ["Which areas in Kannur does Ithihasam cover for appliance servicing?", "Ithihasam supports appliance service bookings around Kannur, Thalassery, Taliparamba, Payyanur, Mattannur, Iritty, Panoor, Chakkarakkal, and nearby localities."],
      ["What brands does Ithihasam repair?", "Customers commonly request support for LG, Samsung, Whirlpool, Godrej, Haier, Daikin, Voltas, Bosch, IFB, Panasonic, Sony, Blue Star, and other major appliance brands."],
      ["How do I book an appliance repair?", `You can book through ithihasam.in or call ${businessPhone}. Share your appliance type, issue, location, and preferred date so the team can coordinate the right technician.`],
      ["Can I book washing machine and fridge repair at home?", "Yes. Customers can request doorstep washing machine, fridge, AC, microwave, purifier, TV, chimney, and geyser support through the appliance servicing page."],
    ],
  },
  {
    slug: "carpentry",
    name: "Carpentry and Woodwork",
    shortName: "Carpentry",
    title: "Carpenter Services in Kannur & Thrissur | Ithihasam",
    description:
      "Hire carpenters in Kannur and Thrissur for door repair, furniture repair, wardrobe work, modular kitchen support, shelf fitting, and woodwork.",
    intro:
      "Ithihasam helps customers book carpentry support for door repair, furniture repair, wardrobes, shelves, modular kitchen adjustments, cupboard fixes, and custom woodwork.",
    items: ["Door and window repair", "Furniture repair", "Wardrobe work", "Modular kitchen support", "Shelf fitting", "Wood polish and finishing"],
  },
  {
    slug: "roofing-fabrication",
    name: "Roofing and Fabrication",
    shortName: "Roofing and Fabrication",
    title: "Roofing Sheet Work and Fabrication in Kannur & Thrissur | Ithihasam",
    description:
      "Book roofing sheet work, roof repair, grill work, gate fabrication, truss work, steel fabrication, and aluminium fabrication in Kannur and Thrissur.",
    intro:
      "Ithihasam supports roofing, welding, aluminium fabrication, steel fabrication, gate work, grill work, railings, truss work, and shed installation for residential and light commercial needs.",
    items: ["Roofing sheet work", "Gate fabrication", "Window grill work", "Staircase railing", "Truss work", "Aluminium partition work"],
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning Services",
    shortName: "Deep Cleaning",
    title: "Deep Cleaning Services in Kannur & Thrissur | Ithihasam",
    description:
      "Book deep cleaning services in Kannur and Thrissur for home cleaning, kitchen cleaning, bathroom cleaning, sofa cleaning, and move-in cleaning.",
    intro:
      "Ithihasam coordinates deep cleaning for apartments, villas, rental homes, offices, kitchens, bathrooms, sofas, move-in requirements, and post-construction spaces.",
    items: ["Full home deep cleaning", "Kitchen deep cleaning", "Bathroom cleaning", "Sofa cleaning", "Post-construction cleaning", "Move-in cleaning"],
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    shortName: "Pest Control",
    title: "Pest Control in Kannur & Thrissur | Ithihasam",
    description:
      "Safe pest control services in Kannur and Thrissur for termite treatment, cockroach control, bed bug treatment, mosquito control, and rodents.",
    intro:
      "Ithihasam helps customers request pest control for homes, apartments, offices, shops, and rental properties, including termite, cockroach, bed bug, mosquito, and rodent concerns.",
    items: ["Termite treatment", "Cockroach control", "Bed bug treatment", "Mosquito control", "Rodent control", "Home and office pest checks"],
  },
  {
    slug: "smart-home",
    name: "Smart Home Services",
    shortName: "Smart Home",
    title: "CCTV Installation and Smart Home Setup in Kannur & Thrissur | Ithihasam",
    description:
      "Professional CCTV installation, smart lock setup, Wi-Fi setup, home automation, video door phone, and security camera support in Kannur and Thrissur.",
    intro:
      "Ithihasam coordinates CCTV installation, smart lighting, smart locks, Wi-Fi setup, video door phones, and basic home automation for homes, offices, shops, and apartments.",
    items: ["CCTV installation", "Smart lighting", "Smart lock setup", "Wi-Fi setup", "Home automation", "Video door phone support"],
  },
];

const localTemplates = [
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function stripManagedHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/i, "")
    .replace(/<meta\s+name=["']author["'][^>]*>/i, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>/i, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/i, "")
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "");
}

function headFor(route) {
  const canonical = `${siteUrl}${route.path}`;
  return `
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}">
    <meta name="author" content="Ithihasam">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Ithihasam">
    <meta property="og:title" content="${escapeHtml(route.title)}">
    <meta property="og:description" content="${escapeHtml(route.description)}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:image" content="${siteUrl}/ithihasa-logo.jpeg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(route.title)}">
    <meta name="twitter:description" content="${escapeHtml(route.description)}">
    <meta name="twitter:image" content="${siteUrl}/ithihasa-logo.jpeg">`;
}

function jsonLd(route) {
  const graph = [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: "Ithihasam Home Services",
      url: siteUrl,
      logo: `${siteUrl}/ithihasa-logo.jpeg`,
      telephone: businessPhonePlain,
      priceRange: "INR",
      address: {
        "@type": "PostalAddress",
        streetAddress: businessAddress,
        addressLocality: "Thalassery",
        addressRegion: "Kerala",
        postalCode: "670101",
        addressCountry: "IN",
      },
      areaServed: ["Kannur", "Thrissur", "Thalassery", "Panoor", "Mahe", "Mattannur", "Iritty"],
    },
  ];

  if (route.serviceName) {
    graph.push({
      "@type": "Service",
      "@id": `${siteUrl}${route.path}#service`,
      name: route.serviceName,
      description: route.description,
      provider: { "@id": `${siteUrl}/#business` },
      areaServed: route.areaName ? [route.areaName, route.district || "Kannur district"] : ["Kannur", "Thrissur", "Kerala"],
      serviceType: route.serviceName,
    });
  }

  if (route.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: route.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }

  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>`;
}

function contentFor(route) {
  const items = route.items || [];
  const brands = route.brands || [];
  const faqs = route.faqs || [];

  return `
    <main class="seo-prerender" style="max-width:1120px;margin:0 auto;padding:32px 20px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.65">
      <h1>${escapeHtml(route.h1 || route.serviceName || "Ithihasam Home Services")}</h1>
      <p>${escapeHtml(route.intro || route.description)}</p>
      ${items.length ? `<h2>Services We Cover</h2><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
      ${brands.length ? `<h2>Popular Brands</h2><p>${brands.map(escapeHtml).join(", ")}</p>` : ""}
      <h2>Service Areas</h2>
      <p>Book Ithihasam services around Kannur, Thalassery, Panoor, Mahe, Kuthuparamba, Mattannur, Iritty, Chakkarakkal, Taliparamba, Payyanur, and nearby Kerala locations.</p>
      <h2>Why Choose Ithihasam?</h2>
      <ul>
        <li>Doorstep service coordination for homes, shops, offices, and apartments.</li>
        <li>Clear scope and pricing discussion before work starts.</li>
        <li>Call and WhatsApp booking support at ${escapeHtml(businessPhone)}.</li>
        <li>Local service pages for exact service and location searches.</li>
      </ul>
      ${faqs.length ? `<h2>Frequently Asked Questions</h2>${faqs.map(([question, answer]) => `<h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p>`).join("")}` : ""}
    </main>`;
}

function routeHtml(shell, route) {
  const clean = stripManagedHead(shell);
  const withHead = clean.replace("</head>", `${headFor(route)}\n  </head>`);
  const withRoot = withHead.replace('<div id="root"></div>', `<div id="root">${contentFor(route)}</div>`);
  return withRoot.replace("</body>", `${jsonLd(route)}\n  </body>`);
}

function outputPath(routePath) {
  const normalized = routePath.replace(/^\/|\/$/g, "");
  return normalized ? path.join(distDir, normalized, "index.html") : path.join(distDir, "index.html");
}

function writeRoute(shell, route) {
  const target = outputPath(route.path);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, routeHtml(shell, route), "utf8");
}

function buildRoutes() {
  const routes = services.map((service) => ({
    path: `/services/${service.slug}`,
    title: service.title,
    description: service.description,
    h1: service.slug === "appliance-servicing" ? "Home Appliance Repair & Servicing in Kannur and Thrissur" : service.name,
    serviceName: service.name,
    intro: service.intro,
    items: service.items,
    brands: service.brands,
    faqs: service.faqs,
  }));

  for (const [prefix, serviceName, parentSlug, jobs] of localTemplates) {
    for (const area of serviceAreas) {
      const parent = services.find((service) => service.slug === parentSlug);
      routes.push({
        path: `/${prefix}-${area.slug}/`,
        title: `${serviceName} in ${area.name} | Ithihasam`,
        description: `Book ${serviceName.toLowerCase()} in ${area.name} with Ithihasam. Doorstep support for ${jobs.slice(0, 3).join(", ")} across ${area.district}.`,
        h1: `${serviceName} in ${area.name}`,
        serviceName,
        areaName: area.name,
        district: area.district,
        intro: `Ithihasam helps customers book ${serviceName.toLowerCase()} in ${area.name}. Share your issue, exact location, and preferred date so the team can coordinate the right professional for ${area.district}.`,
        items: jobs,
        brands: parent?.brands,
        faqs: [
          [`Can I book ${serviceName.toLowerCase()} in ${area.name}?`, `Yes. Ithihasam supports ${serviceName.toLowerCase()} booking requests in ${area.name} and nearby localities, subject to slot and technician availability.`],
          ["How do I book?", `Use the website enquiry form, WhatsApp, or call ${businessPhone}. Share the service needed, location, and preferred date.`],
        ],
      });
    }
  }

  return routes;
}

if (!fs.existsSync(shellPath)) {
  throw new Error("dist/index.html not found. Run vite build before prerendering SEO pages.");
}

const shell = fs.readFileSync(shellPath, "utf8");
const routes = buildRoutes();

for (const route of routes) {
  writeRoute(shell, route);
}

console.log(`Generated prerendered SEO HTML for ${routes.length} routes.`);
