// Rental data for the React side.
//
// Mirrors scripts/rental-data.mjs, which the build uses to prerender the same
// pages. Two copies exist because the build runs in Node before React is bundled;
// scripts/check-seo-data.mjs fails the build if they drift apart.
//
// Prices are intentionally null until real figures are supplied. A product page
// is not rendered at all while its monthlyRate is null, so the site can never
// advertise a rental without a genuine price behind it.

export interface RentalLocality {
  slug: string;
  name: string;
  note: string;
}

export interface RentalCity {
  slug: string;
  name: string;
  aka: string;
  district: string;
  demandDriver: string;
  propertyMix: string;
  localities: RentalLocality[];
}

export interface RentalItem {
  slug: string;
  name: string;
  category: "bedroom" | "living" | "appliance";
  description: string;
  monthlyRate: number | null;
  deposit: number | null;
  minTenureMonths: number | null;
  cities: string[];
}

export interface RentalPackage {
  slug: string;
  name: string;
  bhk: string;
  includes: string[];
  monthlyRate: number | null;
  deposit: number | null;
  minTenureMonths: number | null;
}

export interface RentalAudience {
  slug: string;
  name: string;
  need: string;
}

export const rentalCities: RentalCity[] = [
  {
    slug: "kochi",
    name: "Kochi",
    aka: "Ernakulam",
    district: "Ernakulam district",
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
    propertyMix: "apartments, independent rented houses, hostels, and staff accommodation",
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

const allCities = ["kochi", "trivandrum", "kozhikode"];

export const rentalCatalogue: RentalItem[] = [
  { slug: "bed-on-rent", name: "Bed on Rent", category: "bedroom", description: "Single, double, queen and king beds with storage options.", monthlyRate: null, deposit: null, minTenureMonths: null, cities: allCities },
  { slug: "mattress-on-rent", name: "Mattress on Rent", category: "bedroom", description: "Foam and spring mattresses in single, double, queen and king sizes.", monthlyRate: null, deposit: null, minTenureMonths: null, cities: allCities },
  { slug: "wardrobe-on-rent", name: "Wardrobe on Rent", category: "bedroom", description: "Two- and three-door wardrobes with hanging and shelf storage.", monthlyRate: null, deposit: null, minTenureMonths: null, cities: allCities },
  { slug: "sofa-on-rent", name: "Sofa on Rent", category: "living", description: "Two-seater, three-seater and L-shaped sofas in fabric and leatherette.", monthlyRate: null, deposit: null, minTenureMonths: null, cities: allCities },
  { slug: "tv-unit-on-rent", name: "TV Unit on Rent", category: "living", description: "TV stands and entertainment units with storage.", monthlyRate: null, deposit: null, minTenureMonths: null, cities: allCities },
  { slug: "dining-table-on-rent", name: "Dining Table on Rent", category: "living", description: "Four- and six-seater dining sets with chairs.", monthlyRate: null, deposit: null, minTenureMonths: null, cities: allCities },
  { slug: "study-table-on-rent", name: "Study Table on Rent", category: "living", description: "Study and work-from-home desks, with ergonomic chair options.", monthlyRate: null, deposit: null, minTenureMonths: null, cities: allCities },
  { slug: "refrigerator-on-rent", name: "Refrigerator on Rent", category: "appliance", description: "Single-door and double-door refrigerators, delivered and installed.", monthlyRate: null, deposit: null, minTenureMonths: null, cities: allCities },
  { slug: "washing-machine-on-rent", name: "Washing Machine on Rent", category: "appliance", description: "Top-load and front-load washing machines with inlet fitting.", monthlyRate: null, deposit: null, minTenureMonths: null, cities: allCities },
  { slug: "ac-on-rent", name: "AC on Rent", category: "appliance", description: "Split and window air conditioners, including installation and servicing.", monthlyRate: null, deposit: null, minTenureMonths: null, cities: allCities },
  { slug: "microwave-on-rent", name: "Microwave on Rent", category: "appliance", description: "Solo and convection microwave ovens.", monthlyRate: null, deposit: null, minTenureMonths: null, cities: allCities },
  { slug: "water-purifier-on-rent", name: "Water Purifier on Rent", category: "appliance", description: "RO and UV water purifiers with filter changes included.", monthlyRate: null, deposit: null, minTenureMonths: null, cities: allCities },
];

export const rentalPackages: RentalPackage[] = [
  { slug: "1-bhk-furniture-package", name: "1 BHK Furniture Package", bhk: "1 BHK", includes: ["Double bed with mattress", "Wardrobe", "Two-seater sofa", "Dining table with two chairs", "Study table"], monthlyRate: null, deposit: null, minTenureMonths: null },
  { slug: "2-bhk-furniture-package", name: "2 BHK Furniture Package", bhk: "2 BHK", includes: ["Two double beds with mattresses", "Two wardrobes", "Three-seater sofa", "Four-seater dining set", "TV unit", "Study table"], monthlyRate: null, deposit: null, minTenureMonths: null },
  { slug: "3-bhk-furniture-package", name: "3 BHK Furniture Package", bhk: "3 BHK", includes: ["Three double beds with mattresses", "Three wardrobes", "L-shaped sofa", "Six-seater dining set", "TV unit", "Two study tables"], monthlyRate: null, deposit: null, minTenureMonths: null },
  { slug: "home-appliance-package", name: "Home Appliance Package", bhk: "Appliances", includes: ["Refrigerator", "Washing machine", "Microwave", "Water purifier"], monthlyRate: null, deposit: null, minTenureMonths: null },
];

export const rentalAudiences: RentalAudience[] = [
  { slug: "students", name: "Students", need: "affordable single-room furnishing on short tenures that match an academic year" },
  { slug: "it-employees", name: "IT Employees", need: "quick full-home setup near the tech parks, often for one- or two-year postings" },
  { slug: "bachelors", name: "Bachelors", need: "shared-flat essentials — beds, wardrobes and a washing machine — split across tenants" },
  { slug: "families", name: "Families", need: "complete home furnishing when relocating into an unfurnished flat" },
  { slug: "corporate", name: "Corporate & Staff Accommodation", need: "bulk furnishing for employee accommodation and guest houses, on invoice with GST" },
];

export const rentalCityBySlug = Object.fromEntries(rentalCities.map((c) => [c.slug, c])) as Record<string, RentalCity>;
export const rentalItemBySlug = Object.fromEntries(rentalCatalogue.map((i) => [i.slug, i])) as Record<string, RentalItem>;
export const rentalPackageBySlug = Object.fromEntries(rentalPackages.map((p) => [p.slug, p])) as Record<string, RentalPackage>;
export const rentalAudienceBySlug = Object.fromEntries(rentalAudiences.map((a) => [a.slug, a])) as Record<string, RentalAudience>;

export const formatInr = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export const howRentingWorks = [
  "Choose what you need and tell us your city, locality and rental period.",
  "We confirm availability, the monthly rate, and the refundable deposit before anything is booked.",
  "Delivery and installation are scheduled at a time that suits you.",
  "Maintenance is included for the whole rental period at no extra cost.",
  "When you are done, we collect the items — no disposal, no resale hassle.",
];
