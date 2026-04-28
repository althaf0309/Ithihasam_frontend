import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "ml";

const STORAGE_KEY = "ithihasa-language";

const translations: Record<string, Record<Lang, string>> = {
  "nav.home": { en: "Home", ml: "ഹോം" },
  "nav.services": { en: "Services", ml: "സേവനങ്ങൾ" },
  "nav.blog": { en: "Blog", ml: "ബ്ലോഗ്" },
  "nav.news": { en: "News", ml: "ന്യൂസ്" },
  "nav.about": { en: "About", ml: "ഞങ്ങളെക്കുറിച്ച്" },
  "nav.contact": { en: "Contact", ml: "ബന്ധപ്പെടുക" },
  "nav.bookNow": { en: "Book Now", ml: "ഇപ്പോൾ ബുക്ക് ചെയ്യൂ" },

  "header.language": { en: "Malayalam", ml: "English" },
  "header.lightMode": { en: "Light Mode", ml: "ലൈറ്റ് മോഡ്" },
  "header.darkMode": { en: "Dark Mode", ml: "ഡാർക്ക് മോഡ്" },

  "hero.badge": { en: "Trusted by 10,000+ Homeowners", ml: "10,000+ വീടുടമകളുടെ വിശ്വാസം നേടിയ സേവനം" },
  "hero.whatsapp": { en: "WhatsApp Us", ml: "വാട്ട്സ്ആപ്പിൽ ബന്ധപ്പെടൂ" },
  "hero.slide1.title": { en: "Expert Electrical & Plumbing", ml: "വിദഗ്ധ ഇലക്ട്രിക്കൽ & പ്ലമ്പിംഗ്" },
  "hero.slide1.subtitle": { en: "Certified professionals for all your home needs", ml: "വീട്ടിലെ എല്ലാ ആവശ്യങ്ങൾക്കും സർട്ടിഫൈഡ് പ്രൊഫഷണലുകൾ" },
  "hero.slide2.title": { en: "Transform Your Space", ml: "നിങ്ങളുടെ ഇടം പുതുക്കാം" },
  "hero.slide2.subtitle": { en: "Premium painting services with flawless finishes", ml: "പ്രീമിയം പെയിന്റിംഗ് സേവനം, മനോഹരമായ ഫിനിഷോടെ" },
  "hero.slide3.title": { en: "Appliance Care Experts", ml: "അപ്ലയൻസ് സർവീസ് വിദഗ്ധർ" },
  "hero.slide3.subtitle": { en: "AC, washing machine & refrigerator servicing", ml: "എസി, വാഷിംഗ് മെഷീൻ, ഫ്രിഡ്ജ് സർവിസിംഗ്" },
  "hero.slide4.title": { en: "Custom Carpentry & Woodwork", ml: "കസ്റ്റം കാർപെൻട്രി & മരപ്പണി" },
  "hero.slide4.subtitle": { en: "Furniture, modular kitchens & expert repairs", ml: "ഫർണിച്ചർ, മോഡുലാർ കിച്ചൻ, വിദഗ്ധ അറ്റകുറ്റപ്പണികൾ" },
  "hero.slide5.title": { en: "Deep Cleaning Services", ml: "ഡീപ് ക്ലീനിംഗ് സേവനങ്ങൾ" },
  "hero.slide5.subtitle": { en: "Make every corner of your home spotless", ml: "വീട്ടിലെ ഓരോ കോണും വൃത്തിയായി മാറ്റാം" },
  "hero.slide6.title": { en: "Smart Home Setup", ml: "സ്മാർട്ട് ഹോം സെറ്റപ്പ്" },
  "hero.slide6.subtitle": { en: "Automate your home with modern technology", ml: "ആധുനിക സാങ്കേതികവിദ്യയിലൂടെ വീട്ടിനെ സ്മാർട്ടാക്കൂ" },
  "hero.stats.customers": { en: "Happy Customers", ml: "സന്തുഷ്ട ഉപഭോക്താക്കൾ" },
  "hero.stats.professionals": { en: "Professionals", ml: "പ്രൊഫഷണലുകൾ" },
  "hero.stats.cities": { en: "Cities", ml: "നഗരങ്ങൾ" },

  "services.badge": { en: "What We Offer", ml: "ഞങ്ങൾ നൽകുന്നത്" },
  "services.title": { en: "Our Services", ml: "ഞങ്ങളുടെ സേവനങ്ങൾ" },
  "services.subtitle": { en: "Professional home services tailored to your needs", ml: "നിങ്ങളുടെ ആവശ്യങ്ങൾക്ക് അനുയോജ്യമായ പ്രൊഫഷണൽ ഹോം സർവീസുകൾ" },

  "home.aboutBadge": { en: "About Ithihasam", ml: "ഇത്തിഹാസയെക്കുറിച്ച്" },
  "home.aboutTitle": { en: "Building Trust, One Service at a Time", ml: "ഓരോ സേവനത്തിലൂടെയും വിശ്വാസം നിർമ്മിക്കുന്നു" },
  "home.aboutParagraph1": {
    en: "Ithihasam was founded with a simple mission: make quality home services accessible, affordable, and reliable for every household.",
    ml: "ഓരോ കുടുംബത്തിനും ഗുണമേന്മയുള്ള ഹോം സർവീസുകൾ എളുപ്പത്തിൽ, ന്യായമായ നിരക്കിൽ, വിശ്വാസ്യതയോടെ എത്തിക്കുക എന്ന ലക്ഷ്യത്തോടെ ഇത്തിഹാസ ആരംഭിച്ചു.",
  },
  "home.aboutParagraph2": {
    en: "From urgent repairs to complete home upgrades, we connect you with verified professionals who treat your space with care.",
    ml: "അടിയന്തര അറ്റകുറ്റപ്പണികളിൽ നിന്ന് മുഴുവൻ വീട് പുതുക്കുന്നതുവരെ, നിങ്ങളുടെ ഇടം കരുതലോടെ കൈകാര്യം ചെയ്യുന്ന പ്രൊഫഷണലുകളുമായി ഞങ്ങൾ നിങ്ങളെ ബന്ധിപ്പിക്കുന്നു.",
  },
  "home.aboutStatCustomers": { en: "Happy Customers", ml: "സന്തുഷ്ട ഉപഭോക്താക്കൾ" },
  "home.aboutStatPros": { en: "Verified Pros", ml: "പരിശോധിച്ച പ്രൊഫഷണലുകൾ" },
  "home.aboutStatCities": { en: "Cities Covered", ml: "സേവനം ലഭ്യമായ നഗരങ്ങൾ" },
  "home.aboutStatSatisfaction": { en: "Satisfaction Rate", ml: "തൃപ്തി നിരക്ക്" },

  "why.badge": { en: "Why Ithihasam", ml: "എന്തുകൊണ്ട് ഇത്തിഹാസ" },
  "why.title": { en: "Why Choose Us", ml: "എന്തുകൊണ്ട് ഞങ്ങളെ തിരഞ്ഞെടുക്കണം" },
  "why.subtitle": { en: "What makes Ithihasam different", ml: "ഇത്തിഹാസയെ വേറിട്ട് നിർത്തുന്നത്" },

  "faq.badge": { en: "FAQs", ml: "സാധാരണ ചോദ്യങ്ങൾ" },
  "faq.title": { en: "Frequently Asked Questions", ml: "പതിവ് ചോദ്യങ്ങൾ" },
  "faq.subtitle": {
    en: "Everything you need to know about our services. Can't find what you're looking for? Reach out on WhatsApp.",
    ml: "ഞങ്ങളുടെ സേവനങ്ങളെക്കുറിച്ച് അറിയേണ്ട പ്രധാന വിവരങ്ങൾ ഇവിടെ. കൂടുതൽ സഹായം വേണമെങ്കിൽ വാട്ട്സ്ആപ്പിൽ ബന്ധപ്പെടൂ.",
  },

  "testimonials.badge": { en: "Testimonials", ml: "ഉപഭോക്തൃ അഭിപ്രായങ്ങൾ" },
  "testimonials.title": { en: "What Our Customers Say", ml: "ഞങ്ങളുടെ ഉപഭോക്താക്കൾ പറയുന്നത്" },

  "booking.bookService": { en: "Book a Service", ml: "ഒരു സേവനം ബുക്ക് ചെയ്യൂ" },
  "booking.quickEnquiry": { en: "Quick Enquiry", ml: "ത്വരിത എൻക്വയറി" },
  "booking.fullName": { en: "Full Name *", ml: "പൂർണ്ണ പേര് *" },
  "booking.email": { en: "Email Address", ml: "ഇമെയിൽ വിലാസം" },
  "booking.phone": { en: "Phone Number *", ml: "ഫോൺ നമ്പർ *" },
  "booking.whatsapp": { en: "WhatsApp Number", ml: "വാട്ട്സ്ആപ്പ് നമ്പർ" },
  "booking.service": { en: "Service Required *", ml: "ആവശ്യമായ സേവനം *" },
  "booking.city": { en: "City / Area *", ml: "നഗരം / പ്രദേശം *" },
  "booking.date": { en: "Preferred Date", ml: "ഇഷ്ടപ്പെടുന്ന തീയതി" },
  "booking.message": { en: "Message (optional)", ml: "സന്ദേശം (ഐച്ഛികം)" },
  "booking.submit": { en: "Submit Booking", ml: "ബുക്കിംഗ് സമർപ്പിക്കുക" },
  "booking.submitting": { en: "Submitting...", ml: "സമർപ്പിക്കുന്നു..." },
  "booking.success": { en: "Booking submitted successfully. We'll contact you shortly.", ml: "ബുക്കിംഗ് വിജയകരമായി സമർപ്പിച്ചു. ഉടൻ തന്നെ ഞങ്ങൾ നിങ്ങളെ ബന്ധപ്പെടും." },
  "booking.error": { en: "We couldn't submit your booking right now. Please try again.", ml: "ഇപ്പോൾ ബുക്കിംഗ് സമർപ്പിക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കൂ." },

  "contact.callNow": { en: "Call Now", ml: "ഇപ്പോൾ വിളിക്കൂ" },
  "contact.whatsapp": { en: "WhatsApp", ml: "വാട്ട്സ്ആപ്പ്" },

  "footer.tagline": { en: "Professional home services at your doorstep. Trusted by thousands.", ml: "നിങ്ങളുടെ വീട്ടുമുറ്റത്ത് പ്രൊഫഷണൽ ഹോം സർവീസുകൾ. ആയിരങ്ങൾ വിശ്വസിക്കുന്ന സേവനം." },
  "footer.quickLinks": { en: "Quick Links", ml: "ദ്രുത ലിങ്കുകൾ" },
  "footer.services": { en: "Services", ml: "സേവനങ്ങൾ" },
  "footer.contactUs": { en: "Contact Us", ml: "ബന്ധപ്പെടുക" },
  "footer.whatsappUs": { en: "WhatsApp Us", ml: "വാട്ട്സ്ആപ്പിൽ ബന്ധപ്പെടൂ" },
  "footer.copyright": { en: "© 2026 Ithihasam. All rights reserved.", ml: "© 2026 ഇത്തിഹാസ. എല്ലാ അവകാശങ്ങളും സംരക്ഷിതമാണ്." },

  "blog.title": { en: "Blog & Tips", ml: "ബ്ലോഗ് & ടിപ്പുകൾ" },
  "blog.subtitle": { en: "Expert advice and home improvement tips from Ithihasam", ml: "ഇത്തിഹാസയുടെ വിദഗ്ധ നിർദേശങ്ങളും ഹോം മെച്ചപ്പെടുത്തൽ ടിപ്പുകളും" },
  "blog.readMore": { en: "Read More", ml: "കൂടുതൽ വായിക്കുക" },
  "blog.back": { en: "Back to Blog", ml: "ബ്ലോഗിലേക്ക് മടങ്ങുക" },
  "blog.loading": { en: "Loading blog posts...", ml: "ബ്ലോഗ് പോസ്റ്റുകൾ ലോഡ് ചെയ്യുന്നു..." },
  "blog.error": { en: "We couldn't load the blog right now.", ml: "ഇപ്പോൾ ബ്ലോഗ് ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല." },
  "blog.notFound": { en: "Post not found", ml: "പോസ്റ്റ് കണ്ടെത്തിയില്ല" },
  "blog.readTime": { en: "min read", ml: "മിനിറ്റ് വായന" },

  "news.title": { en: "News & Updates", ml: "ന്യൂസ് & അപ്‌ഡേറ്റുകൾ" },
  "news.subtitle": { en: "Stay updated with the latest from Ithihasam", ml: "ഇത്തിഹാസയിലെ ഏറ്റവും പുതിയ അപ്‌ഡേറ്റുകൾ അറിയൂ" },
  "news.readMore": { en: "Read Full Story", ml: "മുഴുവൻ വാർത്ത വായിക്കുക" },
  "news.back": { en: "Back to News", ml: "ന്യൂസിലേക്ക് മടങ്ങുക" },
  "news.notFound": { en: "Article not found", ml: "ലേഖനം കണ്ടെത്തിയില്ല" },

  "service.included": { en: "What's Included", ml: "ഇതിൽ ഉൾപ്പെടുന്നത്" },
  "service.faq": { en: "Frequently Asked Questions", ml: "പതിവ് ചോദ്യങ്ങൾ" },
  "service.reviews": { en: "Customer Reviews", ml: "ഉപഭോക്തൃ അവലോകനങ്ങൾ" },
  "service.notFound": { en: "Service not found", ml: "സേവനം കണ്ടെത്തിയില്ല" },
  "service.backHome": { en: "Back to Home", ml: "ഹോമിലേയ്ക്ക് മടങ്ങുക" },

  "notFound.title": { en: "Oops! Page not found", ml: "ക്ഷമിക്കണം! ഈ പേജ് കണ്ടെത്തിയില്ല" },
  "notFound.action": { en: "Return to Home", ml: "ഹോമിലേക്ക് മടങ്ങുക" },

  "common.loading": { en: "Loading...", ml: "ലോഡ് ചെയ്യുന്നു..." },
};

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  locale: string;
  t: (key: string) => string;
  formatDate: (value: string | Date, options?: Intl.DateTimeFormatOptions) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  locale: "en-IN",
  t: (key) => key,
  formatDate: (value) => new Date(value).toLocaleDateString("en-IN"),
});

function getStoredLanguage(): Lang {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "ml" ? "ml" : "en";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getStoredLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => {
    setLangState((current) => (current === "en" ? "ml" : "en"));
  }, []);

  const locale = lang === "ml" ? "ml-IN" : "en-IN";
  const t = useCallback((key: string) => translations[key]?.[lang] || translations[key]?.en || key, [lang]);
  const formatDate = useCallback(
    (value: string | Date, options?: Intl.DateTimeFormatOptions) =>
      new Date(value).toLocaleDateString(locale, options || { day: "numeric", month: "short", year: "numeric" }),
    [locale],
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      locale,
      t,
      formatDate,
    }),
    [formatDate, lang, locale, setLang, t, toggleLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
