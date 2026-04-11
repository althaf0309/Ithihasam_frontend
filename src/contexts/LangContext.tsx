import React, { createContext, useContext, useState, useCallback } from "react";

type Lang = "en" | "hi";

const translations: Record<string, Record<Lang, string>> = {
  "nav.home": { en: "Home", hi: "होम" },
  "nav.services": { en: "Services", hi: "सेवाएं" },
  "nav.blog": { en: "Blog", hi: "ब्लॉग" },
  "nav.news": { en: "News", hi: "समाचार" },
  "nav.about": { en: "About", hi: "हमारे बारे में" },
  "nav.contact": { en: "Contact", hi: "संपर्क" },
  "nav.bookNow": { en: "Book Now", hi: "अभी बुक करें" },
  "hero.badge": { en: "Trusted by 10,000+ Homeowners", hi: "10,000+ घर मालिकों द्वारा विश्वसनीय" },
  "hero.title1": { en: "Reliable Home Services", hi: "विश्वसनीय गृह सेवाएं" },
  "hero.title2": { en: "at Your Doorstep", hi: "आपके दरवाजे पर" },
  "hero.subtitle": { en: "From electrical repairs to deep cleaning — book verified professionals in minutes. Fast, affordable, and hassle-free.", hi: "इलेक्ट्रिकल मरम्मत से लेकर डीप क्लीनिंग तक — मिनटों में सत्यापित पेशेवरों को बुक करें।" },
  "hero.whatsapp": { en: "WhatsApp Us", hi: "व्हाट्सएप करें" },
  "services.title": { en: "Our Services", hi: "हमारी सेवाएं" },
  "services.subtitle": { en: "Professional home services tailored to your needs", hi: "आपकी जरूरतों के अनुसार पेशेवर गृह सेवाएं" },
  "why.title": { en: "Why Choose Us", hi: "हमें क्यों चुनें" },
  "why.subtitle": { en: "What makes Ithihasa different", hi: "इतिहासा को क्या अलग बनाता है" },
  "booking.title": { en: "Book a Service", hi: "सेवा बुक करें" },
  "booking.subtitle": { en: "Fill in the form below and we'll get back to you", hi: "नीचे फॉर्म भरें और हम आपसे संपर्क करेंगे" },
  "testimonials.title": { en: "What Our Customers Say", hi: "हमारे ग्राहक क्या कहते हैं" },
  "footer.copyright": { en: "© 2026 Ithihasa. All rights reserved.", hi: "© 2026 इतिहासा। सर्वाधिकार सुरक्षित।" },
  "footer.tagline": { en: "Professional home services at your doorstep. Trusted by thousands.", hi: "आपके दरवाजे पर पेशेवर गृह सेवाएं। हज़ारों लोगों द्वारा विश्वसनीय।" },
  "footer.quickLinks": { en: "Quick Links", hi: "त्वरित लिंक" },
  "footer.services": { en: "Services", hi: "सेवाएं" },
  "footer.contactUs": { en: "Contact Us", hi: "संपर्क करें" },
};

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = useCallback((key: string) => translations[key]?.[lang] || key, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
