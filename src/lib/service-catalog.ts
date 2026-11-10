import { Cpu, Factory, Hammer, Paintbrush, Settings, Sparkles, Bug, Zap, type LucideIcon } from "lucide-react";

import bannerElectrical from "@/assets/banner-electrical.jpg";
import bannerPainting from "@/assets/banner-painting.jpg";
import bannerAppliance from "@/assets/banner-appliance.jpg";
import bannerCarpentry from "@/assets/banner-carpentry.jpg";
import bannerFabrication from "@/assets/banner-fabrication.jpg";
import bannerCleaning from "@/assets/banner-cleaning.jpg";
import bannerPest from "@/assets/banner-pest.jpg";
import bannerSmarthome from "@/assets/banner-smarthome.jpg";

type Language = "en" | "ml";

interface LocalizedText {
  en: string;
  ml: string;
}

interface LocalizedFaq {
  q: LocalizedText;
  a: LocalizedText;
}

interface LocalizedReview {
  name: string;
  location: string;
  text: LocalizedText;
  rating: number;
}

/**
 * A group of related sub-services within one service.
 *
 * Used where a single service covers several distinct trades. The fabrication
 * service carries nine, and listing its 118 individual jobs as one flat list
 * would be unreadable. Only services that need it define `itemGroups`.
 */
export interface ServiceItemGroup {
  slug: string;
  name: LocalizedText;
  /** Path under /og/, served from public/. */
  image: string;
  blurb: LocalizedText;
  items: LocalizedText[];
}

export interface ServiceCatalogEntry {
  slug: string;
  icon: LucideIcon;
  cardImage: string;
  bannerImages: string[];
  title: LocalizedText;
  shortDescription: LocalizedText;
  detailDescription: LocalizedText;
  includes: LocalizedText[];
  itemGroups?: ServiceItemGroup[];
  supportedBrands?: string[];
  faqs: LocalizedFaq[];
  reviews: LocalizedReview[];
}

export const serviceCatalog: ServiceCatalogEntry[] = [
  {
    slug: "electrical-plumbing",
    icon: Zap,
    cardImage: bannerElectrical,
    bannerImages: [bannerElectrical],
    title: {
      en: "Electrical & Plumbing",
      ml: "ഇലക്ട്രിക്കൽ & പ്ലമ്പിംഗ്",
    },
    shortDescription: {
      en: "Expert electricians and plumbers for wiring, fixtures, pipe repairs, and urgent home fixes.",
      ml: "വയർിംഗ്, ഫിറ്റിംഗുകൾ, പൈപ്പ് അറ്റകുറ്റപ്പണി, അടിയന്തര വീട്ടുപണികൾ എന്നിവയ്ക്ക് പരിചയസമ്പന്നരായ ടെക്നീഷ്യൻമാർ.",
    },
    detailDescription: {
      en: "Complete electrical and plumbing solutions for your home. From wiring upgrades to pipe repairs, our verified professionals handle every job with speed and care.",
      ml: "വയർിംഗ് അപ്‌ഗ്രേഡ് മുതൽ പൈപ്പ് അറ്റകുറ്റപ്പണി വരെ നിങ്ങളുടെ വീട്ടിനുള്ള സമ്പൂർണ്ണ ഇലക്ട്രിക്കൽ, പ്ലമ്പിംഗ് പരിഹാരങ്ങൾ. പരിശീലനം ലഭിച്ച വിദഗ്ധർ വേഗത്തിലും ശ്രദ്ധയോടെയും ജോലി നിർവഹിക്കും.",
    },
    includes: [
      { en: "Wiring & Rewiring", ml: "വയർിംഗ് & റീവയർിംഗ്" },
      { en: "Switch & Socket Installation", ml: "സ്വിച്ച് & സോക്കറ്റ് ഇൻസ്റ്റലേഷൻ" },
      { en: "MCB & DB Box Repair", ml: "എംസിബി & ഡിബി ബോക്സ് റിപെയർ" },
      { en: "Pipe Fitting & Repair", ml: "പൈപ്പ് ഫിറ്റിംഗ് & റിപെയർ" },
      { en: "Tap & Faucet Installation", ml: "ടാപ്പ് & ഫോസറ്റ് ഇൻസ്റ്റലേഷൻ" },
      { en: "Water Tank Installation", ml: "വാട്ടർ ടാങ്ക് ഇൻസ്റ്റലേഷൻ" },
      { en: "Geyser Installation", ml: "ഗീസർ ഇൻസ്റ്റലേഷൻ" },
      { en: "Drainage Solutions", ml: "ഡ്രെയിനേജ് പരിഹാരങ്ങൾ" },
    ],
    faqs: [
      {
        q: { en: "How quickly can I get an electrician?", ml: "ഒരു ഇലക്ട്രീഷ്യൻ എത്ര വേഗത്തിൽ ലഭിക്കും?" },
        a: { en: "We typically dispatch a professional within 2 hours of booking.", ml: "ബുക്കിംഗ് കഴിഞ്ഞ് സാധാരണയായി 2 മണിക്കൂറിനുള്ളിൽ ടെക്നീഷ്യനെ അയക്കും." },
      },
      {
        q: { en: "Do you provide warranty on repairs?", ml: "റിപ്പയറിന് വാർണ്ടി ഉണ്ടോ?" },
        a: { en: "Yes, all repairs come with a 30-day service warranty.", ml: "ഉണ്ട്. എല്ലാ അറ്റകുറ്റപ്പണികൾക്കും 30 ദിവസത്തെ സർവീസ് വാർണ്ടിയുണ്ട്." },
      },
      {
        q: { en: "Are your electricians licensed?", ml: "നിങ്ങളുടെ ഇലക്ട്രീഷ്യൻമാർ സർട്ടിഫൈഡ് ആണോ?" },
        a: { en: "All our professionals are verified, trained, and certified.", ml: "ഞങ്ങളുടെ എല്ലാ പ്രൊഫഷണലുകളും പരിശോധിച്ചും പരിശീലിപ്പിച്ചും സർട്ടിഫൈ ചെയ്തവരാണ്." },
      },
      {
        q: { en: "Do you handle emergency repairs?", ml: "എമർജൻസി റിപ്പയറുകൾ കൈകാര്യം ചെയ്യുന്നുണ്ടോ?" },
        a: { en: "Yes, we offer 24/7 emergency electrical and plumbing services at a nominal extra charge.", ml: "ഉണ്ട്. ചെറിയ അധിക ചാർജോടെ 24/7 എമർജൻസി സേവനം ലഭ്യമാണ്." },
      },
    ],
    reviews: [
      {
        name: "Ramesh K.",
        location: "Thalassery",
        text: {
          en: "Fixed my entire home wiring in just one day. Very professional team from Ithihasam!",
          ml: "ഒരു ദിവസത്തിനകം മുഴുവൻ വീട്ടിലെ വയറിംഗ് ശരിയാക്കി. ഇത്തിഹാസ ടീം വളരെ പ്രൊഫഷണലായിരുന്നു.",
        },
        rating: 5,
      },
      {
        name: "Fathima R.",
        location: "Panoor",
        text: {
          en: "Quick response for a plumbing emergency at midnight. Lifesavers!",
          ml: "അർദ്ധരാത്രിയിലെ പ്ലമ്പിംഗ് എമർജൻസിക്ക് വളരെ വേഗത്തിൽ എത്തിയിരുന്നു. രക്ഷകരായിരുന്നു!",
        },
        rating: 5,
      },
      {
        name: "Pradeep K.",
        location: "Kuthuparamba",
        text: {
          en: "Fair pricing and excellent workmanship. Will definitely use again.",
          ml: "ന്യായമായ വിലയും മികച്ച ജോലിയും. വീണ്ടും ഉപയോഗിക്കും.",
        },
        rating: 4,
      },
    ],
  },
  {
    slug: "painting",
    icon: Paintbrush,
    cardImage: bannerPainting,
    bannerImages: [bannerPainting],
    title: {
      en: "Painting Services",
      ml: "പെയിന്റിംഗ് സേവനങ്ങൾ",
    },
    shortDescription: {
      en: "Professional interior and exterior painting for a cleaner, brighter, and longer-lasting finish.",
      ml: "ഇന്റീരിയർ, എക്സ്റ്റീരിയർ പെയിന്റിംഗിന് ഗുണമേന്മയുള്ള ഫിനിഷോടുകൂടിയ പ്രൊഫഷണൽ സേവനം.",
    },
    detailDescription: {
      en: "Professional painting services for interior and exterior walls. We use premium paints, protect your space carefully, and deliver clean finishes on schedule.",
      ml: "ഇന്റീരിയർ, എക്സ്റ്റീരിയർ മതിലുകൾക്കായി പ്രൊഫഷണൽ പെയിന്റിംഗ് സേവനം. മികച്ച പെയിന്റുകളും ശ്രദ്ധാപൂർവ്വമായ കവർ-അപ്പും സമയബന്ധിതമായ ഫിനിഷും ഞങ്ങൾ ഉറപ്പാക്കുന്നു.",
    },
    includes: [
      { en: "Interior Wall Painting", ml: "ഇന്റീരിയർ വാൾ പെയിന്റിംഗ്" },
      { en: "Exterior Wall Painting", ml: "എക്സ്റ്റീരിയർ വാൾ പെയിന്റിംഗ്" },
      { en: "Texture Painting", ml: "ടെക്സ്ചർ പെയിന്റിംഗ്" },
      { en: "Wood Polishing", ml: "വുഡ് പോളിഷിംഗ്" },
      { en: "Waterproofing Coating", ml: "വാട്ടർപ്രൂഫിംഗ് കോറ്റിംഗ്" },
      { en: "Color Consultation", ml: "കലർ കൺസൾട്ടേഷൻ" },
    ],
    faqs: [
      {
        q: { en: "Do you provide paint or should I buy?", ml: "പെയിന്റ് നിങ്ങൾ തന്നെയോ നൽകുന്നത്?" },
        a: { en: "We can provide premium quality paint or work with your preferred brand.", ml: "മികച്ച നിലവാരമുള്ള പെയിന്റ് ഞങ്ങൾ നൽകാമോ, അല്ലെങ്കിൽ നിങ്ങൾക്ക് ഇഷ്ടമുള്ള ബ്രാൻഡും ഉപയോഗിക്കാം." },
      },
      {
        q: { en: "How long does a 2BHK take?", ml: "ഒരു 2BHK പൂർത്തിയാക്കാൻ എത്ര ദിവസം লাগে?" },
        a: { en: "Usually 3 to 5 days depending on wall condition and scope.", ml: "മതിലുകളുടെ അവസ്ഥയും ജോലിയുടെ വലിപ്പവും ആശ്രയിച്ച് സാധാരണയായി 3 മുതൽ 5 ദിവസം വരെ." },
      },
      {
        q: { en: "Do you move furniture before painting?", ml: "പെയിന്റിംഗ് മുൻപ് ഫർണിച്ചർ മാറ്റുമോ?" },
        a: { en: "Yes, our team handles furniture shifting and protective covering.", ml: "ഉണ്ട്. ഫർണിച്ചർ മാറ്റുകയും സംരക്ഷണ കവർ ഇടുകയും ചെയ്യും." },
      },
      {
        q: { en: "Is there a warranty on painting work?", ml: "പെയിന്റിംഗ് ജോലിക്ക് വാർണ്ടി ഉണ്ടോ?" },
        a: { en: "Yes, we provide up to 1 year of workmanship warranty depending on the package.", ml: "ഉണ്ട്. പാക്കേജിനെ ആശ്രയിച്ച് 1 വർഷം വരെ വാർണ്ടി ലഭിക്കും." },
      },
    ],
    reviews: [
      {
        name: "Anu M.",
        location: "Taliparamba",
        text: {
          en: "Beautiful texture painting done on our living room walls. The team was very neat.",
          ml: "ലിവിംഗ് റൂമിലെ ടെക്സ്ചർ പെയിന്റിംഗ് അതിമനോഹരമായി ചെയ്തു. ടീം വളരെ വൃത്തിയായി ജോലിചെയ്തു.",
        },
        rating: 5,
      },
      {
        name: "Nikhil D.",
        location: "Mattannur",
        text: {
          en: "Excellent color consultation. The house looks brand new!",
          ml: "മികച്ച കലർ കൺസൾട്ടേഷൻ. വീട് പുത്തൻ പോലെ തോന്നുന്നു.",
        },
        rating: 5,
      },
    ],
  },
  {
    slug: "appliance-servicing",
    icon: Settings,
    cardImage: bannerAppliance,
    bannerImages: [bannerAppliance],
    title: {
      en: "Appliance Servicing",
      ml: "അപ്ലയൻസ് സർവിസിംഗ്",
    },
    shortDescription: {
      en: "AC, fridge, washing machine, microwave, and purifier servicing by trained technicians.",
      ml: "എസി, വാഷിംഗ് മെഷീൻ, ഫ്രിഡ്ജ്, മൈക്രോവേവ്, പ്യൂരിഫയർ എന്നിവയ്ക്ക് പരിശീലനം ലഭിച്ച ടെക്നീഷ്യൻ സേവനം.",
    },
    detailDescription: {
      en: "Expert repair and maintenance for all major home appliances including ACs, fridges and refrigerators, washing machines, microwaves, and water purifiers.",
      ml: "എസി, വാഷിംഗ് മെഷീൻ, ഫ്രിഡ്ജ്, മൈക്രോവേവ്, വാട്ടർ പ്യൂരിഫയർ തുടങ്ങി പ്രധാന ഗൃഹോപകരണങ്ങൾക്കുള്ള വിദഗ്ധ സർവീസും റിപ്പയറും.",
    },
    includes: [
      { en: "AC Service & Repair", ml: "എസി സർവീസ് & റിപെയർ" },
      { en: "Fridge / Refrigerator Repair", ml: "റഫ്രിജറേറ്റർ റിപെയർ" },
      { en: "Washing Machine Repair", ml: "വാഷിംഗ് മെഷീൻ റിപെയർ" },
      { en: "Microwave Repair", ml: "മൈക്രോവേവ് റിപെയർ" },
      { en: "Water Purifier Service", ml: "വാട്ടർ പ്യൂരിഫയർ സർവീസ്" },
      { en: "Chimney Cleaning", ml: "ചിമ്നി ക്ലീനിംഗ്" },
    ],
    supportedBrands: [
      "LG",
      "Samsung",
      "Whirlpool",
      "Bosch",
      "IFB",
      "Godrej",
      "Haier",
      "Panasonic",
      "Sony",
      "Onida",
      "Voltas",
      "Blue Star",
      "Daikin",
      "Hitachi",
      "Carrier",
      "Lloyd",
      "O General",
      "Mitsubishi",
      "Electrolux",
      "Kelvinator",
      "Videocon",
      "BPL",
      "Philips",
      "Bajaj",
      "Havells",
      "V-Guard",
      "Kent",
      "Eureka Forbes",
      "Faber",
      "Elica",
      "Kaff",
      "Prestige",
      "Butterfly",
      "Usha",
      "Crompton",
    ],
    faqs: [
      {
        q: { en: "Do you service all brands?", ml: "എല്ലാ ബ്രാൻഡുകളും സർവീസ് ചെയ്യുമോ?" },
        a: { en: "Yes, our technicians are trained for all major brands.", ml: "ഉണ്ട്. പ്രധാന ബ്രാൻഡുകളുടെ ഉപകരണങ്ങൾ എല്ലാം സർവീസ് ചെയ്യാൻ ടെക്നീഷ്യൻമാർ പരിശീലനം നേടിയവരാണ്." },
      },
      {
        q: { en: "How much does AC servicing cost?", ml: "എസി സർവീസിംഗിന് എത്ര ചെലവ് വരും?" },
        a: { en: "Basic AC servicing starts from Rs. 499. Deep cleaning and gas refill are extra.", ml: "ബേസിക് എസി സർവീസ് Rs. 499 മുതൽ. ഡീപ് ക്ലീനിംഗിനും ഗ്യാസ് റീഫില്ലിനും അധിക നിരക്കുണ്ട്." },
      },
      {
        q: { en: "Do you carry spare parts?", ml: "സ്പെയർ പാർട്സ് കൈവശമുണ്ടാകുമോ?" },
        a: { en: "Our technicians carry common spare parts and arrange special parts quickly when needed.", ml: "സാധാരണ സ്പെയർ പാർട്സ് കൈവശമുണ്ടാകും. പ്രത്യേക ഭാഗങ്ങൾ ആവശ്യമെങ്കിൽ വേഗത്തിൽ ക്രമീകരിക്കും." },
      },
      {
        q: { en: "Is there a diagnosis charge?", ml: "പരിശോധനയ്ക്കായി വേറെ ചാർജ് ഉണ്ടോ?" },
        a: { en: "A small visit fee is charged and adjusted against the final service bill.", ml: "ചെറിയ വിസിറ്റ് ഫീ ഈടാക്കുകയും പിന്നീട് സർവീസ് ബില്ലിൽ ക്രമീകരിക്കുകയും ചെയ്യും." },
      },
    ],
    reviews: [
      {
        name: "Deepa P.",
        location: "Iritty",
        text: {
          en: "AC was cooling perfectly after the service. Very knowledgeable technician.",
          ml: "സർവീസിന് ശേഷം എസി വളരെ നന്നായി പ്രവർത്തിച്ചു. ടെക്നീഷ്യൻ വളരെ പരിചയസമ്പന്നനായിരുന്നു.",
        },
        rating: 5,
      },
      {
        name: "Jithin R.",
        location: "Payyannur",
        text: {
          en: "Fixed my washing machine on the spot. Great service!",
          ml: "വാഷിംഗ് മെഷീൻ ഉടനെ തന്നെ ശരിയാക്കി. മികച്ച സേവനം!",
        },
        rating: 4,
      },
    ],
  },
  {
    slug: "carpentry",
    icon: Hammer,
    cardImage: bannerCarpentry,
    bannerImages: [bannerCarpentry],
    title: {
      en: "Carpentry & Woodwork",
      ml: "കാർപെൻട്രി & മരപ്പണി",
    },
    shortDescription: {
      en: "Custom furniture, door repairs, modular installations, and polished woodwork for your home.",
      ml: "കസ്റ്റം ഫർണിച്ചർ, വാതിൽ അറ്റകുറ്റപ്പണി, മോഡുലാർ ഇൻസ്റ്റലേഷൻ, മരപ്പണി എന്നിവയ്ക്കുള്ള വിശ്വാസ്യതയുള്ള സേവനം.",
    },
    detailDescription: {
      en: "Custom furniture, repairs, modular installations, and polished woodwork by experienced carpenters who focus on finish, fit, and durability.",
      ml: "പരിചയസമ്പന്നരായ കാർപെൻറർമാർ നിർവഹിക്കുന്ന കസ്റ്റം ഫർണിച്ചർ, അറ്റകുറ്റപ്പണി, മോഡുലാർ ഇൻസ്റ്റലേഷൻ, ഗുണമേന്മയുള്ള മരപ്പണി സേവനങ്ങൾ.",
    },
    includes: [
      { en: "Custom Furniture", ml: "കസ്റ്റം ഫർണിച്ചർ" },
      { en: "Modular Kitchen", ml: "മോഡുലാർ കിച്ചൻ" },
      { en: "Wardrobe Installation", ml: "വാർഡ്രോബ് ഇൻസ്റ്റലേഷൻ" },
      { en: "Door & Window Repair", ml: "വാതിൽ & ജനൽ റിപെയർ" },
      { en: "Bed & Sofa Repair", ml: "കിടക്ക & സോഫ റിപെയർ" },
      { en: "Wood Polishing", ml: "മരപ്പണി പോളിഷിംഗ്" },
    ],
    faqs: [
      {
        q: { en: "Can you build custom furniture?", ml: "കസ്റ്റം ഫർണിച്ചർ നിർമിക്കുമോ?" },
        a: { en: "Absolutely. We can build custom pieces based on your size, style, and storage needs.", ml: "തീർച്ചയായും. നിങ്ങളുടെ അളവും സ്റ്റൈലും ആവശ്യങ്ങളും അനുസരിച്ച് കസ്റ്റം ഫർണിച്ചർ നിർമിക്കും." },
      },
      {
        q: { en: "What wood types do you work with?", ml: "ഏത് തരത്തിലുള്ള വുഡ് ഉപയോഗിക്കുന്നു?" },
        a: { en: "We work with teak, plywood, MDF, engineered wood, and more.", ml: "ടീക്ക്, പ്ലൈവുഡ്, എംഡിഎഫ്, എഞ്ചിനീയർഡ് വുഡ് തുടങ്ങി പലതരത്തിലുള്ള മെറ്റീരിയലുകളുമായി ജോലി ചെയ്യുന്നു." },
      },
      {
        q: { en: "How long does a modular kitchen take?", ml: "മോഡുലാർ കിച്ചൻ പൂർത്തിയാക്കാൻ എത്ര സമയം লাগে?" },
        a: { en: "A standard modular kitchen usually takes 15 to 20 working days.", ml: "സാധാരണ ഒരു മോഡുലാർ കിച്ചൻ പൂർത്തിയാക്കാൻ 15 മുതൽ 20 പ്രവൃത്തി ദിവസങ്ങൾ വരെ വേണം." },
      },
      {
        q: { en: "Do you provide design consultation?", ml: "ഡിസൈൻ കൺസൾട്ടേഷൻ ഉണ്ടോ?" },
        a: { en: "Yes, our team can guide you on layout, storage, and finish options.", ml: "ഉണ്ട്. ലേയൗട്ട്, സ്റ്റോറേജ്, ഫിനിഷ് ഓപ്ഷനുകൾ സംബന്ധിച്ച് ഞങ്ങളുടെ ടീം മാർഗനിർദേശം നൽകും." },
      },
    ],
    reviews: [
      {
        name: "Manoj M.",
        location: "Anjarakandy",
        text: {
          en: "Beautiful custom wardrobe built exactly as designed. Top quality wood.",
          ml: "ഡിസൈൻ ചെയ്തതുപോലെ തന്നെ മനോഹരമായ വാർഡ്രോബ് നിർമ്മിച്ചു. മികച്ച ഗുണമേന്മയുള്ള ജോലി.",
        },
        rating: 5,
      },
      {
        name: "Lakshmi K.",
        location: "Thazhe Chovva",
        text: {
          en: "Modular kitchen turned out amazing. Highly recommend Ithihasam carpentry.",
          ml: "മോഡുലാർ കിച്ചൻ അതിമനോഹരമായി ആയി. ഇത്തിഹാസ കാർപെൻട്രി നിർബന്ധമായും ശുപാർശ ചെയ്യും.",
        },
        rating: 5,
      },
    ],
  },
  {
    slug: "roofing-fabrication",
    icon: Factory,
    cardImage: bannerFabrication,
    bannerImages: [bannerFabrication],
    title: {
      en: "Metal Fabrication & Roofing",
      ml: "മെറ്റൽ ഫാബ്രിക്കേഷൻ & റൂഫിംഗ്",
    },
    shortDescription: {
      en: "Gates, grills, roofing sheets, railings, and structural fabrication work by expert teams.",
      ml: "ഗേറ്റുകൾ, ഗ്രില്ലുകൾ, റൂഫിംഗ് ഷീറ്റ്, റെയിലിംഗ്, സ്ട്രക്ചറൽ ഫാബ്രിക്കേഷൻ എന്നിവയ്ക്കുള്ള വിദഗ്ധ സേവനം.",
    },
    detailDescription: {
      en: "Durable gates, grills, roofing sheets, railings, and structural metalwork delivered by experienced fabricators with strong finishing standards.",
      ml: "പരിചയസമ്പന്നരായ ഫാബ്രിക്കേറ്റർമാർ നിർവഹിക്കുന്ന ഗേറ്റുകൾ, ഗ്രില്ലുകൾ, റൂഫിംഗ് ഷീറ്റ്, റെയിലിംഗ്, സ്ട്രക്ചറൽ മെറ്റൽ വർക്ക് എന്നിവയ്ക്കുള്ള വിശ്വാസ്യതയുള്ള സേവനം.",
    },
    includes: [
      { en: "MS/SS Gates & Grills", ml: "എംഎസ്/എസ്‌എസ് ഗേറ്റുകളും ഗ്രില്ലുകളും" },
      { en: "Roofing Sheet Installation", ml: "റൂഫിംഗ് ഷീറ്റ് ഇൻസ്റ്റലേഷൻ" },
      { en: "Railing Fabrication", ml: "റെയിലിംഗ് ഫാബ്രിക്കേഷൻ" },
      { en: "Shed Construction", ml: "ഷെഡ് നിർമാണം" },
      { en: "Welding Repairs", ml: "വെൽഡിംഗ് റിപെയറുകൾ" },
      { en: "Structural Steelwork", ml: "സ്ട്രക്ചറൽ സ്റ്റീൽവർക്ക്" },
    ],
    // The full scope, grouped by trade. Mirrors scripts/site-data.mjs, which
    // the build uses to prerender the same sections; check-seo-data.mjs fails
    // the build if the two drift apart.
    itemGroups: [
      {
        slug: "welding",
        name: { en: "Welding Services", ml: "വെൽഡിംഗ് സേവനങ്ങൾ" },
        image: "/og/fabrication/welding.jpg",
        blurb: {
          en: "Arc, MIG, TIG and stainless steel welding, in the workshop or on site.",
          ml: "ആർക്ക്, MIG, TIG, സ്റ്റെയിൻലെസ് സ്റ്റീൽ വെൽഡിംഗ് — വർക്ക്ഷോപ്പിലോ സൈറ്റിലോ.",
        },
        items: [
          { en: "Arc welding", ml: "ആർക്ക് വെൽഡിംഗ്" },
          { en: "MIG welding", ml: "MIG വെൽഡിംഗ്" },
          { en: "TIG welding", ml: "TIG വെൽഡിംഗ്" },
          { en: "Gas welding", ml: "ഗ്യാസ് വെൽഡിംഗ്" },
          { en: "Spot welding", ml: "സ്പോട്ട് വെൽഡിംഗ്" },
          { en: "Stainless steel welding", ml: "സ്റ്റെയിൻലെസ് സ്റ്റീൽ വെൽഡിംഗ്" },
          { en: "Mild steel welding", ml: "മൈൽഡ് സ്റ്റീൽ വെൽഡിംഗ്" },
          { en: "Aluminium welding", ml: "അലുമിനിയം വെൽഡിംഗ്" },
          { en: "Structural welding", ml: "സ്ട്രക്ചറൽ വെൽഡിംഗ്" },
          { en: "On-site welding", ml: "ഓൺ-സൈറ്റ് വെൽഡിംഗ്" },
          { en: "Pipe welding", ml: "പൈപ്പ് വെൽഡിംഗ്" },
          { en: "Metal repair welding", ml: "മെറ്റൽ റിപ്പയർ വെൽഡിംഗ്" },
          { en: "Custom welding fabrication", ml: "കസ്റ്റം വെൽഡിംഗ് ഫാബ്രിക്കേഷൻ" },
        ],
      },
      {
        slug: "aluminium-fabrication",
        name: { en: "Aluminium Fabrication", ml: "അലുമിനിയം ഫാബ്രിക്കേഷൻ" },
        image: "/og/fabrication/aluminium-fabrication.jpg",
        blurb: {
          en: "Doors, windows, partitions and frames, made to the opening rather than to a standard size.",
          ml: "വാതിലുകൾ, ജനലുകൾ, പാർട്ടീഷനുകൾ, ഫ്രെയിമുകൾ — സ്റ്റാൻഡേർഡ് അളവിലല്ല, ഓപ്പണിംഗിന് അനുസരിച്ച്.",
        },
        items: [
          { en: "Aluminium doors", ml: "അലുമിനിയം വാതിലുകൾ" },
          { en: "Aluminium windows", ml: "അലുമിനിയം ജനലുകൾ" },
          { en: "Sliding doors and windows", ml: "സ്ലൈഡിംഗ് വാതിലുകളും ജനലുകളും" },
          { en: "Office and room partitions", ml: "ഓഫീസ്, റൂം പാർട്ടീഷനുകൾ" },
          { en: "Aluminium kitchen cabinets", ml: "അലുമിനിയം കിച്ചൻ കാബിനറ്റുകൾ" },
          { en: "Wardrobe fabrication", ml: "വാർഡ്രോബ് ഫാബ്രിക്കേഷൻ" },
          { en: "Glass doors and windows", ml: "ഗ്ലാസ് വാതിലുകളും ജനലുകളും" },
          { en: "Aluminium railings", ml: "അലുമിനിയം റെയിലിംഗുകൾ" },
          { en: "Ventilators", ml: "വെന്റിലേറ്ററുകൾ" },
          { en: "Shopfront fabrication", ml: "ഷോപ്പ്ഫ്രണ്ട് ഫാബ്രിക്കേഷൻ" },
          { en: "Facade fabrication", ml: "ഫസാഡ് ഫാബ്രിക്കേഷൻ" },
          { en: "Pergolas and louvers", ml: "പെർഗോളകളും ലൂവറുകളും" },
          { en: "Mosquito mesh doors", ml: "കൊതുകുവല വാതിലുകൾ" },
          { en: "Repair and maintenance", ml: "റിപ്പയറും മെയിന്റനൻസും" },
        ],
      },
      {
        slug: "steel-iron-fabrication",
        name: { en: "Steel & Iron Fabrication", ml: "സ്റ്റീൽ & അയൺ ഫാബ്രിക്കേഷൻ" },
        image: "/og/fabrication/steel-iron-fabrication.jpg",
        blurb: {
          en: "Railings, grills, staircases and structural steel in mild steel, stainless or wrought iron.",
          ml: "റെയിലിംഗ്, ഗ്രിൽ, സ്റ്റെയർകേസ്, സ്ട്രക്ചറൽ സ്റ്റീൽ — മൈൽഡ് സ്റ്റീൽ, സ്റ്റെയിൻലെസ്, റോട്ട് അയൺ.",
        },
        items: [
          { en: "Mild steel fabrication", ml: "മൈൽഡ് സ്റ്റീൽ ഫാബ്രിക്കേഷൻ" },
          { en: "Stainless steel fabrication", ml: "സ്റ്റെയിൻലെസ് സ്റ്റീൽ ഫാബ്രിക്കേഷൻ" },
          { en: "Structural steel fabrication", ml: "സ്ട്രക്ചറൽ സ്റ്റീൽ ഫാബ്രിക്കേഷൻ" },
          { en: "Steel and spiral staircases", ml: "സ്റ്റീൽ, സ്പൈറൽ സ്റ്റെയർകേസുകൾ" },
          { en: "Balcony railings", ml: "ബാൽക്കണി റെയിലിംഗുകൾ" },
          { en: "Staircase handrails", ml: "സ്റ്റെയർകേസ് ഹാൻഡ്‌റെയിലുകൾ" },
          { en: "Safety grills", ml: "സേഫ്റ്റി ഗ്രില്ലുകൾ" },
          { en: "Window grills", ml: "ജനൽ ഗ്രില്ലുകൾ" },
          { en: "Security doors", ml: "സെക്യൂരിറ്റി വാതിലുകൾ" },
          { en: "Metal partitions", ml: "മെറ്റൽ പാർട്ടീഷനുകൾ" },
          { en: "Steel frames", ml: "സ്റ്റീൽ ഫ്രെയിമുകൾ" },
          { en: "Metal storage racks", ml: "മെറ്റൽ സ്റ്റോറേജ് റാക്കുകൾ" },
          { en: "Custom metal furniture", ml: "കസ്റ്റം മെറ്റൽ ഫർണിച്ചർ" },
          { en: "Industrial fabrication and repair", ml: "ഇൻഡസ്ട്രിയൽ ഫാബ്രിക്കേഷനും റിപ്പയറും" },
        ],
      },
      {
        slug: "roofing-shed",
        name: { en: "Roofing & Shed Works", ml: "റൂഫിംഗ് & ഷെഡ് വർക്കുകൾ" },
        image: "/og/fabrication/roofing-shed.jpg",
        blurb: {
          en: "GI, colour-coated, UPVC and polycarbonate roofing, plus trusses and sheds.",
          ml: "GI, കളർ-കോട്ടഡ്, UPVC, പോളികാർബണേറ്റ് റൂഫിംഗ്, ട്രസ്സുകളും ഷെഡുകളും.",
        },
        items: [
          { en: "Residential and commercial roofing", ml: "വീടുകൾക്കും വാണിജ്യ കെട്ടിടങ്ങൾക്കും റൂഫിംഗ്" },
          { en: "Industrial roofing", ml: "ഇൻഡസ്ട്രിയൽ റൂഫിംഗ്" },
          { en: "GI sheet roofing", ml: "GI ഷീറ്റ് റൂഫിംഗ്" },
          { en: "Colour-coated roofing sheets", ml: "കളർ-കോട്ടഡ് റൂഫിംഗ് ഷീറ്റുകൾ" },
          { en: "Polycarbonate roofing", ml: "പോളികാർബണേറ്റ് റൂഫിംഗ്" },
          { en: "UPVC roofing", ml: "UPVC റൂഫിംഗ്" },
          { en: "Roofing tile installation", ml: "റൂഫിംഗ് ടൈൽ ഇൻസ്റ്റലേഷൻ" },
          { en: "Roof truss fabrication", ml: "റൂഫ് ട്രസ് ഫാബ്രിക്കേഷൻ" },
          { en: "Terrace roofing", ml: "ടെറസ് റൂഫിംഗ്" },
          { en: "Car parking sheds", ml: "കാർ പാർക്കിംഗ് ഷെഡുകൾ" },
          { en: "Garage and warehouse sheds", ml: "ഗാരേജ്, വെയർഹൗസ് ഷെഡുകൾ" },
          { en: "Industrial sheds", ml: "ഇൻഡസ്ട്രിയൽ ഷെഡുകൾ" },
          { en: "Roof waterproofing and repair", ml: "റൂഫ് വാട്ടർപ്രൂഫിംഗും റിപ്പയറും" },
          { en: "Roof replacement", ml: "റൂഫ് മാറ്റിസ്ഥാപിക്കൽ" },
          { en: "Rainwater gutter installation", ml: "മഴവെള്ള ഗട്ടർ ഇൻസ്റ്റലേഷൻ" },
        ],
      },
      {
        slug: "gate-fabrication",
        name: { en: "Gate Fabrication", ml: "ഗേറ്റ് ഫാബ്രിക്കേഷൻ" },
        image: "/og/fabrication/gate-fabrication.jpg",
        blurb: {
          en: "Sliding, swing and designer gates in steel, stainless or wrought iron.",
          ml: "സ്ലൈഡിംഗ്, സ്വിംഗ്, ഡിസൈനർ ഗേറ്റുകൾ — സ്റ്റീൽ, സ്റ്റെയിൻലെസ്, റോട്ട് അയൺ.",
        },
        items: [
          { en: "Main entrance gates", ml: "മെയിൻ എൻട്രൻസ് ഗേറ്റുകൾ" },
          { en: "Sliding gates", ml: "സ്ലൈഡിംഗ് ഗേറ്റുകൾ" },
          { en: "Swing gates", ml: "സ്വിംഗ് ഗേറ്റുകൾ" },
          { en: "Double-leaf gates", ml: "ഡബിൾ-ലീഫ് ഗേറ്റുകൾ" },
          { en: "Stainless steel gates", ml: "സ്റ്റെയിൻലെസ് സ്റ്റീൽ ഗേറ്റുകൾ" },
          { en: "Mild steel gates", ml: "മൈൽഡ് സ്റ്റീൽ ഗേറ്റുകൾ" },
          { en: "Wrought iron gates", ml: "റോട്ട് അയൺ ഗേറ്റുകൾ" },
          { en: "Designer and villa gates", ml: "ഡിസൈനർ, വില്ല ഗേറ്റുകൾ" },
          { en: "Compound wall gates", ml: "കോമ്പൗണ്ട് വാൾ ഗേറ്റുകൾ" },
          { en: "Pedestrian gates", ml: "പെഡസ്ട്രിയൻ ഗേറ്റുകൾ" },
          { en: "Folding and collapsible gates", ml: "ഫോൾഡിംഗ്, കൊളാപ്സിബിൾ ഗേറ്റുകൾ" },
          { en: "Custom-designed gates", ml: "കസ്റ്റം ഡിസൈൻ ഗേറ്റുകൾ" },
          { en: "Gate painting and polishing", ml: "ഗേറ്റ് പെയിന്റിംഗും പോളിഷിംഗും" },
          { en: "Gate repair and maintenance", ml: "ഗേറ്റ് റിപ്പയറും മെയിന്റനൻസും" },
        ],
      },
      {
        slug: "automatic-gates",
        name: { en: "Automatic & Smart Gate Systems", ml: "ഓട്ടോമാറ്റിക് & സ്മാർട്ട് ഗേറ്റ് സിസ്റ്റങ്ങൾ" },
        image: "/og/fabrication/automatic-gates.jpg",
        blurb: {
          en: "Motorised gates with remote, app, RFID or sensor control, fitted to a new or an existing gate.",
          ml: "റിമോട്ട്, ആപ്പ്, RFID, സെൻസർ നിയന്ത്രണമുള്ള മോട്ടോർ ഗേറ്റുകൾ — പുതിയതോ നിലവിലുള്ളതോ ആയ ഗേറ്റിൽ.",
        },
        items: [
          { en: "Automatic sliding gates", ml: "ഓട്ടോമാറ്റിക് സ്ലൈഡിംഗ് ഗേറ്റുകൾ" },
          { en: "Automatic swing gates", ml: "ഓട്ടോമാറ്റിക് സ്വിംഗ് ഗേറ്റുകൾ" },
          { en: "Remote-controlled gates", ml: "റിമോട്ട് നിയന്ത്രിത ഗേറ്റുകൾ" },
          { en: "Electric gate motors", ml: "ഇലക്ട്രിക് ഗേറ്റ് മോട്ടോറുകൾ" },
          { en: "App-controlled gates", ml: "ആപ്പ് നിയന്ത്രിത ഗേറ്റുകൾ" },
          { en: "RFID access control", ml: "RFID ആക്സസ് കൺട്രോൾ" },
          { en: "Sensor-based automatic gates", ml: "സെൻസർ അധിഷ്ഠിത ഓട്ടോമാറ്റിക് ഗേറ്റുകൾ" },
          { en: "Boom barriers", ml: "ബൂം ബാരിയറുകൾ" },
          { en: "Automatic garage doors", ml: "ഓട്ടോമാറ്റിക് ഗാരേജ് വാതിലുകൾ" },
          { en: "Gate motor replacement", ml: "ഗേറ്റ് മോട്ടോർ മാറ്റിസ്ഥാപിക്കൽ" },
          { en: "Gate automation repair", ml: "ഗേറ്റ് ഓട്ടോമേഷൻ റിപ്പയർ" },
          { en: "Safety sensor installation", ml: "സേഫ്റ്റി സെൻസർ ഇൻസ്റ്റലേഷൻ" },
          { en: "Video intercom integration", ml: "വീഡിയോ ഇന്റർകോം ഇന്റഗ്രേഷൻ" },
        ],
      },
      {
        slug: "glass-acp",
        name: { en: "Glass, ACP & Partition Works", ml: "ഗ്ലാസ്, ACP & പാർട്ടീഷൻ വർക്കുകൾ" },
        image: "/og/fabrication/glass-acp.jpg",
        blurb: {
          en: "Toughened glass, frameless partitions, facades and aluminium composite cladding.",
          ml: "ടഫൻഡ് ഗ്ലാസ്, ഫ്രെയിംലെസ് പാർട്ടീഷനുകൾ, ഫസാഡുകൾ, അലുമിനിയം കോമ്പോസിറ്റ് ക്ലാഡിംഗ്.",
        },
        items: [
          { en: "Toughened glass installation", ml: "ടഫൻഡ് ഗ്ലാസ് ഇൻസ്റ്റലേഷൻ" },
          { en: "Frameless glass partitions", ml: "ഫ്രെയിംലെസ് ഗ്ലാസ് പാർട്ടീഷനുകൾ" },
          { en: "Glass office partitions", ml: "ഗ്ലാസ് ഓഫീസ് പാർട്ടീഷനുകൾ" },
          { en: "Shower enclosures", ml: "ഷവർ എൻക്ലോഷറുകൾ" },
          { en: "Glass balcony railings", ml: "ഗ്ലാസ് ബാൽക്കണി റെയിലിംഗുകൾ" },
          { en: "Glass staircase railings", ml: "ഗ്ലാസ് സ്റ്റെയർകേസ് റെയിലിംഗുകൾ" },
          { en: "Glass facade installation", ml: "ഗ്ലാസ് ഫസാഡ് ഇൻസ്റ്റലേഷൻ" },
          { en: "Structural glazing", ml: "സ്ട്രക്ചറൽ ഗ്ലേസിംഗ്" },
          { en: "Aluminium curtain walls", ml: "അലുമിനിയം കർട്ടൻ വാളുകൾ" },
          { en: "Glass canopies", ml: "ഗ്ലാസ് കനോപ്പികൾ" },
          { en: "Shopfront glass", ml: "ഷോപ്പ്ഫ്രണ്ട് ഗ്ലാസ്" },
          { en: "ACP cladding", ml: "ACP ക്ലാഡിംഗ്" },
          { en: "Glass repair and replacement", ml: "ഗ്ലാസ് റിപ്പയറും മാറ്റിസ്ഥാപിക്കലും" },
        ],
      },
      {
        slug: "rolling-shutters",
        name: { en: "Rolling Shutters", ml: "റോളിംഗ് ഷട്ടറുകൾ" },
        image: "/og/fabrication/rolling-shutters.jpg",
        blurb: {
          en: "Manual, motorised and industrial shutters, including motor fitting and repair.",
          ml: "മാനുവൽ, മോട്ടോർ, ഇൻഡസ്ട്രിയൽ ഷട്ടറുകൾ — മോട്ടോർ ഫിറ്റിംഗും റിപ്പയറും ഉൾപ്പെടെ.",
        },
        items: [
          { en: "Manual rolling shutters", ml: "മാനുവൽ റോളിംഗ് ഷട്ടറുകൾ" },
          { en: "Automatic rolling shutters", ml: "ഓട്ടോമാറ്റിക് റോളിംഗ് ഷട്ടറുകൾ" },
          { en: "Motorised shutters", ml: "മോട്ടോറൈസ്ഡ് ഷട്ടറുകൾ" },
          { en: "Shop shutters", ml: "ഷോപ്പ് ഷട്ടറുകൾ" },
          { en: "Industrial shutters", ml: "ഇൻഡസ്ട്രിയൽ ഷട്ടറുകൾ" },
          { en: "Security grills", ml: "സെക്യൂരിറ്റി ഗ്രില്ലുകൾ" },
          { en: "Collapsible shutters", ml: "കൊളാപ്സിബിൾ ഷട്ടറുകൾ" },
          { en: "Garage shutters", ml: "ഗാരേജ് ഷട്ടറുകൾ" },
          { en: "Shutter motor installation", ml: "ഷട്ടർ മോട്ടോർ ഇൻസ്റ്റലേഷൻ" },
          { en: "Shutter repair and maintenance", ml: "ഷട്ടർ റിപ്പയറും മെയിന്റനൻസും" },
        ],
      },
      {
        slug: "outdoor-metal",
        name: { en: "Fencing & Outdoor Metal Works", ml: "ഫെൻസിംഗ് & ഔട്ട്ഡോർ മെറ്റൽ വർക്കുകൾ" },
        image: "/og/fabrication/outdoor-metal.jpg",
        blurb: {
          en: "Compound fencing, pergolas, car sheds and outdoor structures.",
          ml: "കോമ്പൗണ്ട് ഫെൻസിംഗ്, പെർഗോളകൾ, കാർ ഷെഡുകൾ, ഔട്ട്ഡോർ സ്ട്രക്ചറുകൾ.",
        },
        items: [
          { en: "Metal pergolas", ml: "മെറ്റൽ പെർഗോളകൾ" },
          { en: "Garden metal structures", ml: "ഗാർഡൻ മെറ്റൽ സ്ട്രക്ചറുകൾ" },
          { en: "Outdoor metal furniture", ml: "ഔട്ട്ഡോർ മെറ്റൽ ഫർണിച്ചർ" },
          { en: "Compound fencing", ml: "കോമ്പൗണ്ട് ഫെൻസിംഗ്" },
          { en: "Chain-link fencing", ml: "ചെയിൻ-ലിങ്ക് ഫെൻസിംഗ്" },
          { en: "Barbed wire fencing", ml: "ബാർബഡ് വയർ ഫെൻസിംഗ്" },
          { en: "Security fencing", ml: "സെക്യൂരിറ്റി ഫെൻസിംഗ്" },
          { en: "Car parking structures", ml: "കാർ പാർക്കിംഗ് സ്ട്രക്ചറുകൾ" },
          { en: "Steel balconies", ml: "സ്റ്റീൽ ബാൽക്കണികൾ" },
          { en: "Metal canopies", ml: "മെറ്റൽ കനോപ്പികൾ" },
          { en: "Decorative metal panels", ml: "ഡെക്കറേറ്റീവ് മെറ്റൽ പാനലുകൾ" },
          { en: "Custom metal signage", ml: "കസ്റ്റം മെറ്റൽ സൈനേജ്" },
        ],
      },
    ],
    faqs: [
      {
        q: { en: "What materials do you use?", ml: "ഏത് മെറ്റീരിയലുകൾ ഉപയോഗിക്കുന്നു?" },
        a: { en: "We work with mild steel, stainless steel, and aluminum based on the project need.", ml: "ജോലിയുടെ ആവശ്യത്തിന് അനുസരിച്ച് മൈൽഡ് സ്റ്റീൽ, സ്റ്റെയിൻലെസ് സ്റ്റീൽ, അലുമിനിയം എന്നിവ ഉപയോഗിക്കുന്നു." },
      },
      {
        q: { en: "Do you provide on-site welding?", ml: "ഓൺ-സൈറ്റ് വെൽഡിംഗ് ലഭ്യമാണോ?" },
        a: { en: "Yes, our teams come equipped for on-site fabrication and welding work.", ml: "ഉണ്ട്. ഓൺ-സൈറ്റ് ഫാബ്രിക്കേഷൻ, വെൽഡിംഗ് ജോലികൾക്കായി ഞങ്ങളുടെ ടീം ആവശ്യമായ ഉപകരണങ്ങളുമായി എത്തും." },
      },
      {
        q: { en: "Can you fabricate custom designs?", ml: "കസ്റ്റം ഡിസൈൻ പ്രകാരം ഫാബ്രിക്കേഷൻ ചെയ്യുമോ?" },
        a: { en: "Yes, we regularly build custom gates, grills, and railings to your design.", ml: "ഉണ്ട്. നിങ്ങളുടെ ഡിസൈൻ അനുസരിച്ച് കസ്റ്റം ഗേറ്റുകൾ, ഗ്രില്ലുകൾ, റെയിലിംഗുകൾ നിർമ്മിക്കുന്നു." },
      },
      {
        q: { en: "What is the durability of your work?", ml: "നിങ്ങളുടെ ജോലിയുടെ ദൈർഘ്യം എത്ര?" },
        a: { en: "Our fabrication work includes protective finishing and strong structural support for long-term use.", ml: "ദീർഘകാല ഉപയോഗത്തിനായി സംരക്ഷണ ഫിനിഷും ശക്തമായ സ്ട്രക്ചറൽ പിന്തുണയും നൽകുന്നു." },
      },
    ],
    reviews: [
      {
        name: "Suresh B.",
        location: "Chalode",
        text: {
          en: "Installed a beautiful SS gate for our home. Excellent finish and sturdy construction.",
          ml: "വീട്ടിന് മനോഹരമായ എസ്‌എസ് ഗേറ്റ് ഇൻസ്റ്റാൾ ചെയ്തു. മികച്ച ഫിനിഷും ഉറപ്പുള്ള നിർമാണവുമായിരുന്നു.",
        },
        rating: 5,
      },
      {
        name: "Riyas M.",
        location: "Mattannur",
        text: {
          en: "Roofing sheet installation was done within a day. Very professional.",
          ml: "റൂഫിംഗ് ഷീറ്റ് ഇൻസ്റ്റലേഷൻ ഒരു ദിവസത്തിനകം പൂർത്തിയാക്കി. വളരെ പ്രൊഫഷണൽ സേവനം.",
        },
        rating: 4,
      },
    ],
  },
  {
    slug: "deep-cleaning",
    icon: Sparkles,
    cardImage: bannerCleaning,
    bannerImages: [bannerCleaning],
    title: {
      en: "Deep Cleaning Services",
      ml: "ഡീപ് ക്ലീനിംഗ് സേവനങ്ങൾ",
    },
    shortDescription: {
      en: "Full home, kitchen, bathroom, sofa, office, and post-construction cleaning for spotless spaces.",
      ml: "മുഴുവൻ വീട്, കിച്ചൻ, ബാത്ത്റൂം, സോഫ, ഓഫീസ്, പോസ്റ്റ്-കൺസ്ട്രക്ഷൻ ക്ലീനിംഗ് എന്നിവയ്ക്കുള്ള സമഗ്ര സേവനം.",
    },
    detailDescription: {
      en: "Comprehensive deep cleaning for homes and offices. We clean high-touch surfaces, hidden corners, kitchens, bathrooms, furniture, and floors thoroughly.",
      ml: "വീട്, ഓഫീസ് എന്നിവയ്ക്കുള്ള സമ്പൂർണ്ണ ഡീപ് ക്ലീനിംഗ്. അടുക്കള, ബാത്ത്റൂം, ഫർണിച്ചർ, നിലം, ഒളിഞ്ഞിരിക്കുന്ന കോണുകൾ എല്ലാം വളരെ ശ്രദ്ധാപൂർവ്വം വൃത്തിയാക്കും.",
    },
    includes: [
      { en: "Full Home Deep Clean", ml: "മുഴുവൻ വീട്ടിന്റെ ഡീപ് ക്ലീൻ" },
      { en: "Kitchen Deep Clean", ml: "കിച്ചൻ ഡീപ് ക്ലീൻ" },
      { en: "Bathroom Deep Clean", ml: "ബാത്ത്റൂം ഡീപ് ക്ലീൻ" },
      { en: "Sofa & Carpet Cleaning", ml: "സോഫ & കാർപ്പറ്റ് ക്ലീനിംഗ്" },
      { en: "Office Cleaning", ml: "ഓഫീസ് ക്ലീനിംഗ്" },
      { en: "Post-Construction Cleaning", ml: "പോസ്റ്റ്-കൺസ്ട്രക്ഷൻ ക്ലീനിംഗ്" },
    ],
    faqs: [
      {
        q: { en: "How long does a full home cleaning take?", ml: "മുഴുവൻ വീട്ടു വൃത്തിയാക്കാൻ എത്ര സമയം লাগে?" },
        a: { en: "A 2BHK typically takes 4 to 6 hours depending on the condition.", ml: "വീട്ടിന്റെ അവസ്ഥ അനുസരിച്ച് ഒരു 2BHK സാധാരണയായി 4 മുതൽ 6 മണിക്കൂർ വരെ എടുക്കും." },
      },
      {
        q: { en: "What cleaning products do you use?", ml: "ഏത് ക്ലീനിംഗ് പ്രോഡക്റ്റുകളാണ് ഉപയോഗിക്കുന്നത്?" },
        a: { en: "We use effective, home-safe products suitable for families, children, and pets.", ml: "കുടുംബങ്ങൾക്കും കുട്ടികൾക്കും വളർത്തുമൃഗങ്ങൾക്കും അനുയോജ്യമായ സുരക്ഷിത പ്രോഡക്റ്റുകൾ ഉപയോഗിക്കുന്നു." },
      },
      {
        q: { en: "Do I need to be present during cleaning?", ml: "ക്ലീനിംഗ് സമയത്ത് ഞാൻ വീട്ടിലുണ്ടാകണമോ?" },
        a: { en: "It is not mandatory, but we recommend being present for the first service.", ml: "അവശ്യമായില്ല, പക്ഷേ ആദ്യ സർവീസിന് വീട്ടിലുണ്ടാകുന്നത് നല്ലതാണ്." },
      },
      {
        q: { en: "How often should I deep clean?", ml: "എത്ര ഇടവേളയ്ക്ക് ഡീപ് ക്ലീനിംഗ് വേണം?" },
        a: { en: "We recommend a professional deep clean every 3 to 4 months.", ml: "3 മുതൽ 4 മാസം ഇടവേളയ്ക്ക് ഒരിക്കൽ ഡീപ് ക്ലീനിംഗ് ചെയ്യുന്നത് നല്ലതാണ്." },
      },
    ],
    reviews: [
      {
        name: "Kavitha P.",
        location: "Payyannur",
        text: {
          en: "My bathroom tiles are gleaming white again! Incredible deep cleaning team.",
          ml: "ബാത്ത്റൂം ടൈലുകൾ വീണ്ടും പുതിയത് പോലെ തിളങ്ങുന്നു. അത്ഭുതകരമായ ക്ലീനിംഗ് ടീം.",
        },
        rating: 5,
      },
      {
        name: "Vishnu P.",
        location: "Iritty",
        text: {
          en: "Post-construction cleaning was thorough. Saved us so much time.",
          ml: "പോസ്റ്റ്-കൺസ്ട്രക്ഷൻ ക്ലീനിംഗ് വളരെ നന്നായി ചെയ്തു. ഞങ്ങളുടെ സമയം വളരെ ലാഭമായി.",
        },
        rating: 5,
      },
      {
        name: "Sajitha R.",
        location: "Panoor",
        text: {
          en: "Sofa looks brand new after their cleaning. Amazing results.",
          ml: "ക്ലീനിംഗിന് ശേഷം സോഫ പുത്തൻ പോലെ ആയി. അത്ഭുതകരമായ ഫലം.",
        },
        rating: 4,
      },
    ],
  },
  {
    slug: "pest-control",
    icon: Bug,
    cardImage: bannerPest,
    bannerImages: [bannerPest],
    title: {
      en: "Pest Control",
      ml: "പെസ്റ്റ് കൺട്രോൾ",
    },
    shortDescription: {
      en: "Safe treatments for termites, cockroaches, mosquitoes, rodents, and common pest problems.",
      ml: "തേൾ, കോകരോച്ച്, കൊതുക്, എലി തുടങ്ങിയ സാധാരണ കീടപ്രശ്നങ്ങൾക്കുള്ള സുരക്ഷിത പരിഹാരങ്ങൾ.",
    },
    detailDescription: {
      en: "Safe and effective pest control treatments for homes and offices, including termite, cockroach, mosquito, rodent, and bed bug solutions.",
      ml: "വീട്, ഓഫീസ് എന്നിവയ്ക്കുള്ള സുരക്ഷിതവും ഫലപ്രദവുമായ പെസ്റ്റ് കൺട്രോൾ. തേൾ, കോകരോച്ച്, കൊതുക്, എലി, ബെഡ് ബഗ് എന്നിവയ്ക്കുള്ള പരിഹാരങ്ങൾ ലഭ്യമാണ്.",
    },
    includes: [
      { en: "Cockroach Treatment", ml: "കോകരോച്ച് ട്രീറ്റ്മെന്റ്" },
      { en: "Termite Treatment", ml: "തേൾ ട്രീറ്റ്മെന്റ്" },
      { en: "Bed Bug Treatment", ml: "ബെഡ് ബഗ് ട്രീറ്റ്മെന്റ്" },
      { en: "Mosquito Control", ml: "കൊതുക് നിയന്ത്രണം" },
      { en: "Rodent Control", ml: "എലി നിയന്ത്രണം" },
      { en: "General Pest Control", ml: "ജനറൽ പെസ്റ്റ് കൺട്രോൾ" },
    ],
    faqs: [
      {
        q: { en: "Is the treatment safe for children and pets?", ml: "കുട്ടികൾക്കും വളർത്തുമൃഗങ്ങൾക്കും ഇത് സുരക്ഷിതമാണോ?" },
        a: { en: "Yes, we use approved low-toxicity products and provide safety guidance after treatment.", ml: "ഉണ്ട്. അംഗീകൃത കുറഞ്ഞ വിഷാംശമുള്ള ഉൽപ്പന്നങ്ങൾ ഉപയോഗിക്കുകയും സുരക്ഷാ നിർദേശങ്ങൾ നൽകുകയും ചെയ്യും." },
      },
      {
        q: { en: "How long does the treatment last?", ml: "ട്രീറ്റ്മെന്റ് എത്രകാലം ഫലം കാണും?" },
        a: { en: "Most treatments remain effective for 3 to 6 months depending on the pest type.", ml: "കീടത്തിന്റെ തരം ആശ്രയിച്ച് സാധാരണയായി 3 മുതൽ 6 മാസം വരെ ഫലം നിലനിൽക്കും." },
      },
      {
        q: { en: "Do I need to vacate during treatment?", ml: "ട്രീറ്റ്മെന്റ് സമയത്ത് വീട് ഒഴിയണോ?" },
        a: { en: "For most treatments no, but for stronger fumigation jobs a short vacant period may be advised.", ml: "മിക്ക ട്രീറ്റ്മെന്റുകൾക്കും വേണ്ട. എന്നാൽ ഫ്യൂമിഗേഷൻ പോലുള്ള ജോലികൾക്ക് കുറച്ച് സമയം ഒഴിവാക്കാൻ പറയാം." },
      },
      {
        q: { en: "Do you offer annual plans?", ml: "വാർഷിക പ്ലാനുകൾ ഉണ്ടോ?" },
        a: { en: "Yes, annual maintenance plans are available for regular protection.", ml: "ഉണ്ട്. സ്ഥിരമായ സംരക്ഷണത്തിനായി വാർഷിക മെയിന്റനൻസ് പ്ലാനുകൾ ലഭ്യമാണ്." },
      },
    ],
    reviews: [
      {
        name: "Arun K.",
        location: "Kuthuparamba",
        text: {
          en: "No more cockroaches since the treatment 3 months ago. Excellent service!",
          ml: "3 മാസം മുൻപ് ചെയ്ത ട്രീറ്റ്മെന്റിന് ശേഷം കോകരോച്ചുകൾ ഒന്നുമില്ല. മികച്ച സേവനം!",
        },
        rating: 5,
      },
      {
        name: "Bindu M.",
        location: "Taliparamba",
        text: {
          en: "Termite treatment saved our wooden furniture. Very effective.",
          ml: "തേൾ ട്രീറ്റ്മെന്റ് ഞങ്ങളുടെ മരഫർണിച്ചർ രക്ഷപ്പെടുത്തി. വളരെ ഫലപ്രദമായ സേവനം.",
        },
        rating: 5,
      },
    ],
  },
  {
    slug: "smart-home",
    icon: Cpu,
    cardImage: bannerSmarthome,
    bannerImages: [bannerSmarthome],
    title: {
      en: "Smart Home Setup",
      ml: "സ്മാർട്ട് ഹോം സജ്ജീകരണം",
    },
    shortDescription: {
      en: "Smart lighting, CCTV, smart locks, Wi-Fi setup, and automation systems installed professionally.",
      ml: "സ്മാർട്ട് ലൈറ്റിംഗ്, സിസിടിവി, സ്മാർട്ട് ലോക്ക്, വൈ-ഫൈ സെറ്റപ്പ്, ഓട്ടോമേഷൻ സംവിധാനങ്ങൾക്കുള്ള പ്രൊഫഷണൽ ഇൻസ്റ്റലേഷൻ.",
    },
    detailDescription: {
      en: "Transform your home with smart lighting, security cameras, smart locks, automation controls, and reliable Wi-Fi setup tailored to your space.",
      ml: "സ്മാർട്ട് ലൈറ്റിംഗ്, സുരക്ഷാ ക്യാമറ, സ്മാർട്ട് ലോക്ക്, ഹോം ഓട്ടോമേഷൻ, സ്ഥിരതയുള്ള വൈ-ഫൈ സജ്ജീകരണം എന്നിവയിലൂടെ നിങ്ങളുടെ വീട് കൂടുതൽ സ്മാർട്ടാക്കാം.",
    },
    includes: [
      { en: "Smart Lighting", ml: "സ്മാർട്ട് ലൈറ്റിംഗ്" },
      { en: "CCTV Installation", ml: "സിസിടിവി ഇൻസ്റ്റലേഷൻ" },
      { en: "Smart Lock Setup", ml: "സ്മാർട്ട് ലോക്ക് സജ്ജീകരണം" },
      { en: "Home Automation", ml: "ഹോം ഓട്ടോമേഷൻ" },
      { en: "Wi-Fi Setup", ml: "വൈ-ഫൈ സജ്ജീകരണം" },
      { en: "Intercom Installation", ml: "ഇന്റർകോം ഇൻസ്റ്റലേഷൻ" },
    ],
    faqs: [
      {
        q: { en: "Do you support all smart home brands?", ml: "എല്ലാ സ്മാർട്ട് ഹോം ബ്രാൻഡുകളും പിന്തുണയ്ക്കുമോ?" },
        a: { en: "We work with Alexa, Google Home, Apple HomeKit, and most major ecosystems.", ml: "അലക്സ, ഗൂഗിൾ ഹോം, ആപ്പിൾ ഹോംകിറ്റ് ഉൾപ്പെടെ പ്രധാന സിസ്റ്റങ്ങളുമായി പ്രവർത്തിക്കുന്നു." },
      },
      {
        q: { en: "Can you retrofit an old home?", ml: "പഴയ വീട്ടിൽ സ്മാർട്ട് സിസ്റ്റം ചേർക്കാമോ?" },
        a: { en: "Yes, many smart devices can be added without major rewiring.", ml: "ഉണ്ട്. വലിയ റീവയർിംഗ് ഇല്ലാതെയും പല സ്മാർട്ട് ഉപകരണങ്ങളും ചേർക്കാം." },
      },
      {
        q: { en: "How much does a basic setup cost?", ml: "ബേസിക് സജ്ജീകരണത്തിന് എത്ര ചെലവ്?" },
        a: { en: "A basic smart lighting setup starts from Rs. 5,000 and varies by the devices selected.", ml: "ഒരു ബേസിക് സ്മാർട്ട് ലൈറ്റിംഗ് സജ്ജീകരണം Rs. 5,000 മുതൽ ആരംഭിക്കുന്നു. ഉപകരണങ്ങളെ ആശ്രയിച്ച് നിരക്ക് മാറും." },
      },
      {
        q: { en: "Do you provide after-sales support?", ml: "ഇൻസ്റ്റലേഷനിന് ശേഷം സപ്പോർട്ട് ഉണ്ടോ?" },
        a: { en: "Yes, we provide support for setup guidance, troubleshooting, and follow-up checks.", ml: "ഉണ്ട്. സെറ്റപ്പ് ഗൈഡൻസ്, ട്രബിൾഷൂട്ടിംഗ്, ഫോളോ-അപ്പ് പരിശോധനകൾ എന്നിവയ്ക്കായി പിന്തുണ നൽകുന്നു." },
      },
    ],
    reviews: [
      {
        name: "Ajay A.",
        location: "Thalassery",
        text: {
          en: "Love controlling everything from my phone now. Professional installation.",
          ml: "ഇപ്പോൾ മൊബൈലിൽ നിന്ന് എല്ലാം നിയന്ത്രിക്കാൻ കഴിയുന്നത് വളരെ ഇഷ്ടമായി. വളരെ പ്രൊഫഷണൽ ഇൻസ്റ്റലേഷൻ.",
        },
        rating: 5,
      },
      {
        name: "Divya S.",
        location: "Payyannur",
        text: {
          en: "CCTV and smart lock installation was seamless. Feel much safer now.",
          ml: "സിസിടിവിയും സ്മാർട്ട് ലോക്കും വളരെ സ്മൂത്തിൽ ഇൻസ്റ്റാൾ ചെയ്തു. ഇപ്പോൾ കൂടുതൽ സുരക്ഷിതമായി തോന്നുന്നു.",
        },
        rating: 5,
      },
    ],
  },
];

export const featuredHomeServiceSlugs = [
  "electrical-plumbing",
  "painting",
  "appliance-servicing",
  "carpentry",
  "roofing-fabrication",
  "deep-cleaning",
];

export const footerServiceSlugs = [
  "electrical-plumbing",
  "painting",
  "appliance-servicing",
  "carpentry",
  "deep-cleaning",
];

export const serviceCatalogBySlug = Object.fromEntries(
  serviceCatalog.map((service) => [service.slug, service]),
) as Record<string, ServiceCatalogEntry>;

export function getLocalizedText(text: LocalizedText, lang: Language) {
  return text[lang];
}
