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

export interface ServiceCatalogEntry {
  slug: string;
  icon: LucideIcon;
  cardImage: string;
  bannerImages: string[];
  title: LocalizedText;
  shortDescription: LocalizedText;
  detailDescription: LocalizedText;
  includes: LocalizedText[];
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
        name: "Ramesh Nair",
        location: "Thalassery",
        text: {
          en: "Fixed my entire home wiring in just one day. Very professional team from Ithihasam!",
          ml: "ഒരു ദിവസത്തിനകം മുഴുവൻ വീട്ടിലെ വയറിംഗ് ശരിയാക്കി. ഇത്തിഹാസ ടീം വളരെ പ്രൊഫഷണലായിരുന്നു.",
        },
        rating: 5,
      },
      {
        name: "Fathima Rahman",
        location: "Panoor",
        text: {
          en: "Quick response for a plumbing emergency at midnight. Lifesavers!",
          ml: "അർദ്ധരാത്രിയിലെ പ്ലമ്പിംഗ് എമർജൻസിക്ക് വളരെ വേഗത്തിൽ എത്തിയിരുന്നു. രക്ഷകരായിരുന്നു!",
        },
        rating: 5,
      },
      {
        name: "Pradeep Kumar",
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
        name: "Anu Mohan",
        location: "Taliparamba",
        text: {
          en: "Beautiful texture painting done on our living room walls. The team was very neat.",
          ml: "ലിവിംഗ് റൂമിലെ ടെക്സ്ചർ പെയിന്റിംഗ് അതിമനോഹരമായി ചെയ്തു. ടീം വളരെ വൃത്തിയായി ജോലിചെയ്തു.",
        },
        rating: 5,
      },
      {
        name: "Nikhil Das",
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
        name: "Deepa Nair",
        location: "Iritty",
        text: {
          en: "AC was cooling perfectly after the service. Very knowledgeable technician.",
          ml: "സർവീസിന് ശേഷം എസി വളരെ നന്നായി പ്രവർത്തിച്ചു. ടെക്നീഷ്യൻ വളരെ പരിചയസമ്പന്നനായിരുന്നു.",
        },
        rating: 5,
      },
      {
        name: "Jithin Raj",
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
        name: "Manoj Menon",
        location: "Anjarakandy",
        text: {
          en: "Beautiful custom wardrobe built exactly as designed. Top quality wood.",
          ml: "ഡിസൈൻ ചെയ്തതുപോലെ തന്നെ മനോഹരമായ വാർഡ്രോബ് നിർമ്മിച്ചു. മികച്ച ഗുണമേന്മയുള്ള ജോലി.",
        },
        rating: 5,
      },
      {
        name: "Lakshmi Krishnan",
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
        name: "Suresh Babu",
        location: "Chalode",
        text: {
          en: "Installed a beautiful SS gate for our home. Excellent finish and sturdy construction.",
          ml: "വീട്ടിന് മനോഹരമായ എസ്‌എസ് ഗേറ്റ് ഇൻസ്റ്റാൾ ചെയ്തു. മികച്ച ഫിനിഷും ഉറപ്പുള്ള നിർമാണവുമായിരുന്നു.",
        },
        rating: 5,
      },
      {
        name: "Riyas Mohammed",
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
        name: "Kavitha Nair",
        location: "Payyannur",
        text: {
          en: "My bathroom tiles are gleaming white again! Incredible deep cleaning team.",
          ml: "ബാത്ത്റൂം ടൈലുകൾ വീണ്ടും പുതിയത് പോലെ തിളങ്ങുന്നു. അത്ഭുതകരമായ ക്ലീനിംഗ് ടീം.",
        },
        rating: 5,
      },
      {
        name: "Vishnu Prasad",
        location: "Iritty",
        text: {
          en: "Post-construction cleaning was thorough. Saved us so much time.",
          ml: "പോസ്റ്റ്-കൺസ്ട്രക്ഷൻ ക്ലീനിംഗ് വളരെ നന്നായി ചെയ്തു. ഞങ്ങളുടെ സമയം വളരെ ലാഭമായി.",
        },
        rating: 5,
      },
      {
        name: "Sajitha Rahman",
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
        name: "Arun Kumar",
        location: "Kuthuparamba",
        text: {
          en: "No more cockroaches since the treatment 3 months ago. Excellent service!",
          ml: "3 മാസം മുൻപ് ചെയ്ത ട്രീറ്റ്മെന്റിന് ശേഷം കോകരോച്ചുകൾ ഒന്നുമില്ല. മികച്ച സേവനം!",
        },
        rating: 5,
      },
      {
        name: "Bindu Menon",
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
        name: "Ajay Nambiar",
        location: "Thalassery",
        text: {
          en: "Love controlling everything from my phone now. Professional installation.",
          ml: "ഇപ്പോൾ മൊബൈലിൽ നിന്ന് എല്ലാം നിയന്ത്രിക്കാൻ കഴിയുന്നത് വളരെ ഇഷ്ടമായി. വളരെ പ്രൊഫഷണൽ ഇൻസ്റ്റലേഷൻ.",
        },
        rating: 5,
      },
      {
        name: "Divya Suresh",
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
