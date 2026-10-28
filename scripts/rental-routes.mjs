// Generates every rental route for the prerenderer.
//
// Page families, and why each exists:
//
//   /rentals                          section hub
//   /rentals/<city>                   city hub          "furniture rental Kochi"
//   /rentals/<city>/<locality>        locality          "furniture rental Kakkanad"
//   /<product>-<city>                 product + city    "sofa on rent Kochi"
//   /rentals/packages/<pkg>           whole-home        "2 BHK furniture rental"
//   /rentals/for/<audience>           intent            "furniture rental for students"
//
// Product and package pages are only generated when a real monthlyRate exists.
// An unpriced rental page tells a customer nothing and gives Google a thin page
// to judge the whole section by, so it is better not to publish it at all.

import {
  rentalBrand,
  rentalCities,
  rentalCatalogue,
  rentalPackages,
  rentalAudiences,
  pricedCatalogue,
  pricedPackages,
} from "./rental-data.mjs";

const inr = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

/** Images per page. The prerenderer renders these as a gallery with srcset. */
function galleryFor(kind, slug) {
  return [
    { src: `/og/rental-${kind}-${slug}.jpg`, alt: `${slug.replace(/-/g, " ")} available on monthly rent from Ithihasam` },
    { src: `/og/rental-${kind}-${slug}-2.jpg`, alt: `Delivery and installation included with every Ithihasam rental` },
    { src: `/og/rental-${kind}-${slug}-3.jpg`, alt: `Cleaned and inspected before every new rental` },
  ];
}

const howItWorks = [
  "Choose what you need and tell us your city, locality and rental period.",
  "We confirm availability, the monthly rate, and the refundable deposit before anything is booked.",
  "Delivery and installation are scheduled at a time that suits you.",
  "Maintenance is included for the whole rental period at no extra cost.",
  "When you are done, we collect the items — no disposal, no resale hassle.",
];

function baseFaqs(cityName, phone) {
  return [
    [
      `Is there a minimum rental period in ${cityName}?`,
      `Yes. Each item carries a minimum tenure, shown on its page. Shorter stays can usually be arranged at a different rate — ask when you enquire and we will confirm before you commit.`,
    ],
    [
      "Is delivery and installation included?",
      `Delivery, installation and setup are arranged by Ithihasam across ${cityName}. Any charge that applies to your address is confirmed upfront, before the booking is placed.`,
    ],
    [
      "What happens if something breaks?",
      "Maintenance is included for the whole rental period. Report a fault and we repair or replace the item — normal wear is never charged to you.",
    ],
    [
      "Is a deposit required?",
      "Yes, a refundable deposit applies per item and is returned after collection, less any damage beyond normal wear. The exact amount is shown with each item's rate.",
    ],
    [
      "How do I book?",
      `Call or WhatsApp ${phone}, or submit the enquiry form. Tell us the items, your locality, and your rental period, and we confirm availability the same day.`,
    ],
  ];
}

export function rentalRoutes({ businessPhone, siteUrl }) {
  const routes = [];
  const priced = pricedCatalogue();
  const packages = pricedPackages();

  // ------------------------------------------------------------- section hub
  routes.push({
    path: "/rentals",
    title: `Furniture & Appliance Rental in Kerala | Ithihasam`,
    description: `Rent furniture and appliances monthly in Kochi, Trivandrum and Kozhikode. Beds, sofas, wardrobes, fridges, washing machines and ACs — delivered, installed and maintained by Ithihasam.`,
    h1: "Furniture and Appliance Rental in Kerala",
    intro: `${rentalBrand.tagline} Ithihasam rents beds, mattresses, wardrobes, sofas, dining sets, refrigerators, washing machines and air conditioners on a monthly subscription across Kochi, Trivandrum and Kozhikode. Delivery, installation and maintenance are included for the whole rental period.`,
    items: rentalCatalogue.map((item) => item.name),
    image: "/og/rental-hub.jpg",
    gallery: galleryFor("hub", "kerala"),
    priority: "0.95",
    isRental: true,
    rentalHowItWorks: howItWorks,
    rentalCities: rentalCities.map((city) => [`Furniture rental in ${city.name}`, `/rentals/${city.slug}`]),
    breadcrumbs: [["Home", "/"], ["Rentals", "/rentals"]],
    faqs: baseFaqs("Kerala", businessPhone),
  });

  // -------------------------------------------------------------- city hubs
  for (const city of rentalCities) {
    const cityProducts = priced.filter((item) => item.cities.includes(city.slug));

    routes.push({
      path: `/rentals/${city.slug}`,
      title: `Furniture Rental in ${city.name} | Ithihasam`,
      description: `Rent furniture and appliances monthly in ${city.name}. Beds, sofas, wardrobes, fridges, washing machines and ACs, delivered and installed across ${city.district}.`,
      h1: `Furniture and Appliance Rental in ${city.name}`,
      areaName: city.name,
      district: city.district,
      // Each city leads with why demand exists there specifically, so the three
      // city pages are not one page with the name swapped.
      intro: `Ithihasam rents furniture and appliances on a monthly subscription across ${city.name} (${city.aka}). Demand here comes from ${city.demandDriver}. Most of our ${city.name} rentals go into ${city.propertyMix}.`,
      items: cityProducts.length ? cityProducts.map((item) => `${item.name} — from ${inr(item.monthlyRate)}/month`) : rentalCatalogue.map((item) => item.name),
      image: `/og/rental-city-${city.slug}.jpg`,
      gallery: galleryFor("city", city.slug),
      priority: "0.9",
      isRental: true,
      rentalHowItWorks: howItWorks,
      rentalLocalities: city.localities.map((loc) => [
        `Furniture rental in ${loc.name}`,
        `/rentals/${city.slug}/${loc.slug}`,
      ]),
      rentalProducts: cityProducts.map((item) => [
        `${item.name} in ${city.name}`,
        `/${item.slug}-${city.slug}`,
      ]),
      breadcrumbs: [["Home", "/"], ["Rentals", "/rentals"], [city.name, `/rentals/${city.slug}`]],
      faqs: [
        [
          `Which areas of ${city.name} do you deliver to?`,
          `Ithihasam delivers across ${city.name}, including ${city.localities.map((l) => l.name).join(", ")}. Share your exact locality when you enquire and we will confirm the delivery slot.`,
        ],
        ...baseFaqs(city.name, businessPhone),
      ],
    });

    // ---------------------------------------------------------- localities
    for (const loc of city.localities) {
      routes.push({
        path: `/rentals/${city.slug}/${loc.slug}`,
        title: `Furniture Rental in ${loc.name}, ${city.name} | Ithihasam`,
        description: `Monthly furniture and appliance rental in ${loc.name}, ${city.name}. Beds, sofas, wardrobes and appliances delivered and installed.`,
        h1: `Furniture Rental in ${loc.name}`,
        areaName: loc.name,
        district: city.district,
        // The locality note is what makes each of these 24 pages distinct.
        intro: `Ithihasam rents furniture and appliances monthly in ${loc.name}, ${city.name} — an area known for ${loc.note}. Delivery, installation and maintenance are included for the whole rental period.`,
        items: cityProducts.length ? cityProducts.map((item) => item.name) : rentalCatalogue.map((item) => item.name),
        image: `/og/rental-city-${city.slug}.jpg`,
        gallery: galleryFor("city", city.slug),
        priority: "0.7",
        isRental: true,
        rentalHowItWorks: howItWorks,
        rentalParent: [`All furniture rental in ${city.name}`, `/rentals/${city.slug}`],
        rentalNearby: city.localities
          .filter((other) => other.slug !== loc.slug)
          .slice(0, 4)
          .map((other) => [`Furniture rental in ${other.name}`, `/rentals/${city.slug}/${other.slug}`]),
        breadcrumbs: [["Home", "/"], ["Rentals", "/rentals"], [city.name, `/rentals/${city.slug}`], [loc.name, `/rentals/${city.slug}/${loc.slug}`]],
        faqs: [
          [
            `Do you deliver to ${loc.name}?`,
            `Yes. ${loc.name} is within our ${city.name} delivery area. Tell us your building or street when enquiring and we will confirm the earliest delivery slot.`,
          ],
          ...baseFaqs(loc.name, businessPhone),
        ],
      });
    }
  }

  // ----------------------------------------------- product × city (priced only)
  for (const item of priced) {
    for (const citySlug of item.cities) {
      const city = rentalCities.find((c) => c.slug === citySlug);
      if (!city) continue;

      routes.push({
        path: `/${item.slug}-${city.slug}`,
        title: `${item.name} in ${city.name} — from ${inr(item.monthlyRate)}/month | Ithihasam`,
        description: `${item.name} in ${city.name} from ${inr(item.monthlyRate)} per month. ${item.description} Delivery, installation and maintenance included.`,
        h1: `${item.name} in ${city.name}`,
        areaName: city.name,
        district: city.district,
        intro: `${item.description} Available on monthly rent across ${city.name} from ${inr(item.monthlyRate)} per month, with a refundable deposit of ${inr(item.deposit)} and a minimum rental period of ${item.minTenureMonths} months.`,
        items: [
          `Monthly rent: ${inr(item.monthlyRate)}`,
          `Refundable deposit: ${inr(item.deposit)}`,
          `Minimum period: ${item.minTenureMonths} months`,
          "Delivery and installation arranged",
          "Maintenance included for the whole period",
          "Free collection at the end of the rental",
        ],
        image: `/og/rental-product-${item.slug}.jpg`,
        gallery: galleryFor("product", item.slug),
        priority: "0.8",
        isRental: true,
        rentalProduct: item,
        rentalCity: city,
        rentalHowItWorks: howItWorks,
        rentalParent: [`All rentals in ${city.name}`, `/rentals/${city.slug}`],
        breadcrumbs: [["Home", "/"], ["Rentals", "/rentals"], [city.name, `/rentals/${city.slug}`], [`${item.name} in ${city.name}`, `/${item.slug}-${city.slug}`]],
        faqs: [
          [
            `How much does a ${item.name.toLowerCase()} cost per month in ${city.name}?`,
            `${item.name} starts at ${inr(item.monthlyRate)} per month in ${city.name}, with a refundable deposit of ${inr(item.deposit)} and a minimum rental period of ${item.minTenureMonths} months. Delivery, installation and maintenance are included.`,
          ],
          ...baseFaqs(city.name, businessPhone),
        ],
      });
    }
  }

  // ---------------------------------------------------- packages (priced only)
  for (const pkg of packages) {
    routes.push({
      path: `/rentals/packages/${pkg.slug}`,
      title: `${pkg.name} — from ${inr(pkg.monthlyRate)}/month | Ithihasam`,
      description: `${pkg.name} on monthly rent from ${inr(pkg.monthlyRate)}. Complete ${pkg.bhk} furnishing delivered, installed and maintained across Kochi, Trivandrum and Kozhikode.`,
      h1: pkg.name,
      intro: `A complete ${pkg.bhk} setup on one monthly rental, from ${inr(pkg.monthlyRate)} per month with a refundable deposit of ${inr(pkg.deposit)} and a minimum period of ${pkg.minTenureMonths} months. One delivery, one installation, one invoice.`,
      items: pkg.includes,
      image: `/og/rental-package-${pkg.slug}.jpg`,
      gallery: galleryFor("package", pkg.slug),
      priority: "0.85",
      isRental: true,
      rentalPackage: pkg,
      rentalHowItWorks: howItWorks,
      rentalCities: rentalCities.map((city) => [`${pkg.name} in ${city.name}`, `/rentals/${city.slug}`]),
      breadcrumbs: [["Home", "/"], ["Rentals", "/rentals"], ["Packages", "/rentals"], [pkg.name, `/rentals/packages/${pkg.slug}`]],
      faqs: baseFaqs("Kerala", businessPhone),
    });
  }

  // ------------------------------------------------------------- audiences
  for (const audience of rentalAudiences) {
    routes.push({
      path: `/rentals/for/${audience.slug}`,
      title: `Furniture Rental for ${audience.name} in Kerala | Ithihasam`,
      description: `Monthly furniture and appliance rental for ${audience.name.toLowerCase()} in Kochi, Trivandrum and Kozhikode. Delivered, installed and maintained.`,
      h1: `Furniture Rental for ${audience.name}`,
      intro: `Ithihasam rents furniture and appliances monthly to ${audience.name.toLowerCase()} across Kochi, Trivandrum and Kozhikode, where the common requirement is ${audience.need}.`,
      items: rentalCatalogue.map((item) => item.name),
      image: "/og/rental-hub.jpg",
      gallery: galleryFor("hub", "kerala"),
      priority: "0.7",
      isRental: true,
      rentalHowItWorks: howItWorks,
      rentalCities: rentalCities.map((city) => [`Furniture rental in ${city.name}`, `/rentals/${city.slug}`]),
      breadcrumbs: [["Home", "/"], ["Rentals", "/rentals"], [audience.name, `/rentals/for/${audience.slug}`]],
      faqs: baseFaqs("Kerala", businessPhone),
    });
  }

  return routes;
}

export function rentalSummary() {
  const priced = pricedCatalogue().length;
  const total = rentalCatalogue.length;
  const pkgPriced = pricedPackages().length;
  return { priced, total, pkgPriced, pkgTotal: rentalPackages.length };
}
