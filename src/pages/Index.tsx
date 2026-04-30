import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BadgeIndianRupee, ChevronDown, Clock, Heart, Home, MessageCircle, ShieldCheck, Target, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryIconStrip } from "@/components/CategoryIconStrip";
import { ServiceCard } from "@/components/ServiceCard";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { featuredHomeServiceSlugs, getLocalizedText, serviceCatalogBySlug } from "@/lib/service-catalog";
import { createKeywordSet } from "@/lib/seo";
import { useLang } from "@/contexts/LangContext";

import bannerElectrical from "@/assets/banner-electrical.jpg";
import bannerPainting from "@/assets/banner-painting.jpg";
import bannerCarpentry from "@/assets/banner-carpentry.jpg";
import bannerCleaning from "@/assets/banner-cleaning.jpg";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="last:border-0 border-b border-border/50">
      <button
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-foreground transition-colors hover:text-primary"
        onClick={() => setOpen(!open)}
      >
        {question}
        <ChevronDown size={18} className={`shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const aboutImages = [
  { src: bannerElectrical, alt: "Electrical work", height: "h-48" },
  { src: bannerCleaning, alt: "Cleaning service", height: "h-32" },
  { src: bannerPainting, alt: "Painting service", height: "h-32" },
  { src: bannerCarpentry, alt: "Carpentry work", height: "h-48" },
];

export default function Index() {
  const { lang, t } = useLang();
  const homeKeywords = createKeywordSet(
    "home maintenance services Kannur",
    "home maintenance services Thrissur",
    "electrician in Kannur",
    "plumber in Thrissur",
    "house painting services Kannur",
    "AC service Thrissur",
    "deep cleaning services Kannur",
    "pest control Thrissur",
    "CCTV installation Kannur",
    "Ithihasam",
  );

  const whyUs = [
    { icon: ShieldCheck, title: lang === "ml" ? "പരിശോധിച്ച പ്രൊഫഷണലുകൾ" : "Verified Professionals", desc: lang === "ml" ? "ബാക്ക്ഗ്രൗണ്ട് പരിശോധിച്ച് പരിശീലിപ്പിച്ച വിദഗ്ധർ" : "Background-checked and trained experts" },
    { icon: Clock, title: lang === "ml" ? "വേഗത്തിലുള്ള പ്രതികരണം" : "Fast Response", desc: lang === "ml" ? "ബുക്കിംഗിന് ശേഷം അതിവേഗ സേവനം" : "Service within hours of booking" },
    { icon: BadgeIndianRupee, title: lang === "ml" ? "ന്യായമായ നിരക്കുകൾ" : "Affordable Pricing", desc: lang === "ml" ? "ഒളിഞ്ഞ ചാർജുകൾ ഇല്ലാത്ത വ്യക്തമായ നിരക്കുകൾ" : "Transparent rates with no hidden charges" },
    { icon: Home, title: lang === "ml" ? "വീട്ടിലെത്തി സേവനം" : "Doorstep Service", desc: lang === "ml" ? "വീട് വിട്ട് പോകാതെ പ്രൊഫഷണൽ സഹായം" : "Professional help right at your doorstep" },
    { icon: MessageCircle, title: lang === "ml" ? "വാട്ട്സ്ആപ്പ് സപ്പോർട്ട്" : "WhatsApp Support", desc: lang === "ml" ? "ആവശ്യമായപ്പോൾ ഉടൻ സന്ദേശമയക്കാം" : "Quick help on WhatsApp anytime" },
  ];

  const testimonials = [
    {
      name: "Anjana Nair",
      location: "Thalassery",
      text: lang === "ml"
        ? "ഇലക്ട്രീഷ്യനെ ബുക്ക് ചെയ്തു, ഒരു മണിക്കൂറിനകം എത്തി. വളരെ പ്രൊഫഷണൽ സേവനവും ന്യായമായ നിരക്കുമായിരുന്നു."
        : "Booked an electrician and he arrived within an hour. Very professional and the pricing was fair. Highly recommend!",
      rating: 5,
    },
    {
      name: "Shaji Menon",
      location: "Taliparamba",
      text: lang === "ml"
        ? "വീട്ടിന്റെ മുഴുവൻ പെയിന്റിംഗ് ഇത്തിഹാസ വഴി നടത്തി. ജോലിയുടെ നിലവാരം വളരെ നല്ലതായിരുന്നു, സമയത്ത് പൂർത്തിയാക്കി."
        : "Got my entire house painted through Ithihasam. The quality of work was excellent and they finished on time.",
      rating: 5,
    },
    {
      name: "Sreeja Krishnan",
      location: "Payyannur",
      text: lang === "ml"
        ? "ഡീപ് ക്ലീനിംഗ് വളരെ സമഗ്രമായി ചെയ്തു. കിച്ചനും ബാത്ത്റൂമും പുതിയതുപോലെ ആയി."
        : "The deep cleaning service was thorough. My kitchen and bathrooms look brand new. Will definitely book again.",
      rating: 4,
    },
  ];

  const faqs = [
    {
      question: lang === "ml" ? "എങ്ങനെ ഒരു സേവനം ബുക്ക് ചെയ്യാം?" : "How do I book a service?",
      answer: lang === "ml"
        ? "വെബ്സൈറ്റ് ഫോം വഴി, ഫോൺ വഴി, അല്ലെങ്കിൽ വാട്ട്സ്ആപ്പിലൂടെ ബുക്ക് ചെയ്യാം. ഞങ്ങൾ ഉടൻ ബുക്കിംഗ് സ്ഥിരീകരിക്കും."
        : "You can book through our website form, call us directly, or message us on WhatsApp. We'll confirm your booking quickly.",
    },
    {
      question: lang === "ml" ? "നിങ്ങളുടെ പ്രൊഫഷണലുകൾ പരിശോധന നടത്തിയവരാണോ?" : "Are your professionals verified?",
      answer: lang === "ml"
        ? "ഉണ്ട്. എല്ലാ പ്രൊഫഷണലുകളും ബാക്ക്ഗ്രൗണ്ട് ചെക്കും സ്കിൽ അസസ്മെന്റും കഴിഞ്ഞവരാണ്."
        : "Yes, all our professionals go through background checks, skill assessments, and onboarding before joining our network.",
    },
    {
      question: lang === "ml" ? "ഏത് നഗരങ്ങളിലാണ് സേവനം?" : "What cities do you operate in?",
      answer: lang === "ml"
        ? "കേരളം ഉൾപ്പെടെ നിരവധി നഗരങ്ങളിൽ ഞങ്ങൾ സേവനം നൽകുന്നു, കൂടാതെ സേവനപരിധി വികസിപ്പിച്ചു കൊണ്ടിരിക്കുന്നു."
        : "We currently operate across multiple cities and continue expanding our service coverage based on demand.",
    },
    {
      question: lang === "ml" ? "സേവനങ്ങൾക്ക് വാർണ്ടി ഉണ്ടോ?" : "Do you offer warranties on services?",
      answer: lang === "ml"
        ? "മിക്ക അറ്റകുറ്റപ്പണികൾക്കും സർവീസ് വാർണ്ടി ലഭ്യമാണ്. ജോലിയുടെ തരം അനുസരിച്ച് വിശദാംശങ്ങൾ പങ്കിടും."
        : "Yes, many services come with workmanship support and service warranties depending on the type of work completed.",
    },
    {
      question: lang === "ml" ? "പ്രവർത്തന സമയങ്ങൾ എന്തൊക്കെ?" : "What are your working hours?",
      answer: lang === "ml"
        ? "ആഴ്ചയിലെ എല്ലാ ദിവസവും സേവനം ലഭ്യമാണ്. അടിയന്തര സേവനങ്ങൾക്ക് പ്രത്യേക പിന്തുണയും ഉണ്ട്."
        : "We operate throughout the week, and urgent services are prioritized as quickly as possible.",
    },
  ];

  const featuredServices = featuredHomeServiceSlugs.map((slug) => serviceCatalogBySlug[slug]);

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="Ithihasam Home Maintenance Services in Kannur & Thrissur"
        description="Book trusted home maintenance services in Kannur and Thrissur with Ithihasam for electrical, plumbing, painting, appliance repair, carpentry, roofing, deep cleaning, pest control, and smart home setup."
        keywords={homeKeywords}
        image={bannerElectrical}
        canonicalPath="/"
      />
      <Header />
      <HeroSection />
      <CategoryIconStrip />

      <section id="services" className="scroll-mt-24 py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              {t("services.badge")}
            </span>
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{t("services.title")}</h2>
            <p className="mx-auto max-w-lg text-muted-foreground">{t("services.subtitle")}</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                <ServiceCard
                  title={getLocalizedText(service.title, lang)}
                  description={getLocalizedText(service.shortDescription, lang)}
                  icon={service.icon}
                  slug={service.slug}
                  image={service.cardImage}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative scroll-mt-24 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
        <div className="container relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="mb-3 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary">
                {t("home.aboutBadge")}
              </span>
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                {t("home.aboutTitle")}
              </h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">{t("home.aboutParagraph1")}</p>
              <p className="mb-8 leading-relaxed text-muted-foreground">{t("home.aboutParagraph2")}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, value: "10,000+", label: t("home.aboutStatCustomers") },
                  { icon: Award, value: "500+", label: t("home.aboutStatPros") },
                  { icon: Target, value: "15+", label: t("home.aboutStatCities") },
                  { icon: Heart, value: "98%", label: t("home.aboutStatSatisfaction") },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.3 + index * 0.12, duration: 0.5, ease: "easeOut" }}
                    className="rounded-xl border border-border/50 bg-card p-4"
                  >
                    <stat.icon size={20} className="mb-2 text-primary" />
                    <div className="text-xl font-bold text-gradient">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {aboutImages.slice(0, 2).map((image, index) => (
                    <motion.div
                      key={image.alt}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      className="overflow-hidden rounded-2xl"
                    >
                      <img src={image.src} alt={image.alt} className={`${image.height} w-full object-cover transition-transform duration-700 hover:scale-110`} loading="lazy" />
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-4 pt-8">
                  {aboutImages.slice(2).map((image, index) => (
                    <motion.div
                      key={image.alt}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="overflow-hidden rounded-2xl"
                    >
                      <img src={image.src} alt={image.alt} className={`${image.height} w-full object-cover transition-transform duration-700 hover:scale-110`} loading="lazy" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 h-40 w-40 rounded-full bg-primary/5 blur-[60px]" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="why-us" className="scroll-mt-24 py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              {t("why.badge")}
            </span>
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{t("why.title")}</h2>
            <p className="text-muted-foreground">{t("why.subtitle")}</p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {whyUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                className="group flex flex-col items-center rounded-2xl border border-border/50 bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-[var(--card-shadow-hover)]"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 transition-all group-hover:from-primary/25 group-hover:to-secondary/25">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h4 className="mb-1 text-sm font-bold text-foreground">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="scroll-mt-24 py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="mb-3 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary">
                {t("faq.badge")}
              </span>
              <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{t("faq.title")}</h2>
              <p className="mb-6 text-muted-foreground">{t("faq.subtitle")}</p>
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card px-6">
                {faqs.map((faq) => (
                  <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              <div className="sticky top-24">
                <QuickBookingForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              {t("testimonials.badge")}
            </span>
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{t("testimonials.title")}</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
              >
                <TestimonialCard {...item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
