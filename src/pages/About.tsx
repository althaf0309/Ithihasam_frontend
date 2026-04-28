import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, HeartHandshake, ShieldCheck, Target, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { CategoryIconStrip } from "@/components/CategoryIconStrip";
import { ContactCTAButtons } from "@/components/ContactCTAButtons";
import { useLang } from "@/contexts/LangContext";

import bannerElectrical from "@/assets/banner-electrical.jpg";
import bannerPainting from "@/assets/banner-painting.jpg";
import bannerCarpentry from "@/assets/banner-carpentry.jpg";
import bannerCleaning from "@/assets/banner-cleaning.jpg";

const aboutImages = [
  { src: bannerElectrical, alt: "Electrical work", height: "h-56" },
  { src: bannerCleaning, alt: "Cleaning service", height: "h-40" },
  { src: bannerPainting, alt: "Painting service", height: "h-40" },
  { src: bannerCarpentry, alt: "Carpentry work", height: "h-56" },
];

export default function About() {
  const { lang } = useLang();

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy customers served" },
    { icon: Award, value: "500+", label: "Verified professionals" },
    { icon: Target, value: "15+", label: "Cities and growing" },
    { icon: HeartHandshake, value: "98%", label: "Customer satisfaction" },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Trusted professionals",
      description: "We focus on background-checked, skilled, and dependable service partners who represent the brand well at the customer doorstep.",
    },
    {
      icon: Target,
      title: "Clear service standards",
      description: "From booking to job completion, we aim to keep pricing, communication, and service expectations transparent for every household.",
    },
    {
      icon: HeartHandshake,
      title: "Customer-first support",
      description: "Quick call and WhatsApp coordination helps us stay responsive when a customer needs urgent repairs or reliable follow-up.",
    },
  ];

  const paragraphs = [
    "Ithihasam was built to make home maintenance simpler, faster, and more dependable for everyday households. Instead of customers searching separately for electricians, plumbers, painters, appliance technicians, carpenters, cleaning teams, or smart home installers, we bring trusted services into one platform.",
    "We are especially focused on practical local support for customers in Kannur and Thrissur, while continuing to build a broader service network. The goal is straightforward: reduce confusion, improve response time, and make it easier to book quality home service help with confidence.",
    "Our team cares about service quality, professional behavior, and honest communication. Whether the requirement is a small repair, a scheduled maintenance job, or a bigger home improvement task, we want the booking experience to feel organized and dependable from start to finish.",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="About Ithihasam | Trusted Home Maintenance Services"
        description="Learn about Ithihasam, our mission, service standards, local focus in Kannur and Thrissur, and how we connect households with trusted home maintenance professionals."
        keywords={[
          "about Ithihasam",
          "home maintenance company Kerala",
          "Kannur home services",
          "Thrissur home services",
          "trusted electricians plumbers painters Kerala",
        ]}
        image={bannerElectrical}
        canonicalPath="/about"
      />
      <Header />

      <section className="relative overflow-hidden border-b border-border/50 py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container relative">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              About Ithihasam
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Building trust in home services, one booking at a time
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              A service brand designed to make home maintenance easier for busy families, homeowners, tenants, and property managers.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactCTAButtons size="lg" showLabels />
              <Link
                to="/#booking"
                className="inline-flex items-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Book a Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CategoryIconStrip />

      <section className="py-16">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Our Story</p>
            <div className="mt-5 space-y-5 text-base leading-8 text-muted-foreground">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{lang === "ml" ? paragraph : paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {aboutImages.slice(0, 2).map((image) => (
                <div key={image.alt} className="overflow-hidden rounded-3xl border border-border/40 bg-card shadow-[var(--card-shadow)]">
                  <img src={image.src} alt={image.alt} className={`${image.height} w-full object-cover`} loading="lazy" />
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-8">
              {aboutImages.slice(2).map((image) => (
                <div key={image.alt} className="overflow-hidden rounded-3xl border border-border/40 bg-card shadow-[var(--card-shadow)]">
                  <img src={image.src} alt={image.alt} className={`${image.height} w-full object-cover`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-muted/20 py-16">
        <div className="container">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Our Impact</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">A growing service network built around reliability</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)]"
              >
                <stat.icon size={22} className="mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What We Stand For</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">The principles behind the platform</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <value.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-foreground">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container">
          <div className="rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-8 shadow-[var(--card-shadow)] md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Local Focus</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">Focused on real service demand in Kannur and Thrissur</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
              Our current content, service pages, and lead flow are strongly optimized for households and businesses searching for electricians, plumbers, painters, cleaners, appliance technicians, carpenters, fabrication workers, pest control, and smart home support in Kannur and Thrissur.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
