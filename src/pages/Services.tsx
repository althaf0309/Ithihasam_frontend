import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { CategoryIconStrip } from "@/components/CategoryIconStrip";
import { ContactCTAButtons } from "@/components/ContactCTAButtons";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { ServiceAreaGrid } from "@/components/ServiceAreaGrid";
import { ServiceCard } from "@/components/ServiceCard";
import { useLang } from "@/contexts/LangContext";
import { createKeywordSet } from "@/lib/seo";
import { serviceAreaCoverageLine, serviceAreaNames, serviceAreas } from "@/lib/service-areas";
import { getLocalizedText, serviceCatalog } from "@/lib/service-catalog";

import bannerElectrical from "@/assets/banner-electrical.jpg";

export default function Services() {
  const { lang, t } = useLang();

  const pageKeywords = createKeywordSet(
    serviceCatalog.map((service) => service.title.en),
    "home maintenance services Kannur",
    "home maintenance services Thrissur",
    "electrical plumbing painting appliance carpentry cleaning pest control smart home",
    "Ithihasam services",
    serviceAreaNames.map((areaName) => `home services in ${areaName}`),
  );

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="All Services | Ithihasam Home Maintenance"
        description="Explore all Ithihasam home maintenance services including electrical, plumbing, painting, appliance servicing, carpentry, roofing, deep cleaning, pest control, and smart home setup."
        keywords={pageKeywords}
        image={bannerElectrical}
        canonicalPath="/services"
      />
      <Header />

      <section className="relative overflow-hidden border-b border-border/50 py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container relative">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              All Services
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Home maintenance services for everyday residential needs
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Browse every Ithihasam service in one place and choose the right support for repairs, upgrades, cleaning, fabrication, and smart home work across {serviceAreaCoverageLine}.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactCTAButtons size="lg" showLabels />
              <a
                href="#service-list"
                className="inline-flex items-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <CategoryIconStrip />

      <section className="border-b border-border/50 bg-muted/20 py-14">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Broad service coverage",
                description: "Electrical, plumbing, painting, appliance repair, carpentry, fabrication, cleaning, pest control, and smart home setup in one platform.",
              },
              {
                title: "Kannur and Thrissur focus",
                description: `Our current service content and booking flow now also covers practical local demand across ${serviceAreaCoverageLine}.`,
              },
              {
                title: "Fast booking support",
                description: "Call, WhatsApp, or submit the booking form and we will help coordinate the right professional for the job.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)]"
              >
                <h2 className="text-lg font-bold text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <ServiceAreaGrid
            title="Areas We Currently Cover"
            description={`We now have dedicated location pages for ${serviceAreaCoverageLine}. Each page is focused on all core services available in that area, along with local booking-intent content for home maintenance searches.`}
            areas={serviceAreas}
            getCardDescription={(area) => `Explore electrical, plumbing, painting, AC service, cleaning, pest control, and smart home support in ${area.name}.`}
          />
        </div>
      </section>

      <section id="service-list" className="scroll-mt-24 py-16">
        <div className="container">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t("services.badge")}</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">{t("services.title")}</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">{t("services.subtitle")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {serviceCatalog.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
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

      <section id="booking" className="scroll-mt-24 border-t border-border/50 py-16">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Need Help Choosing?</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">Book the right service with one request</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              If you are not sure which service fits your need, send a quick booking request and we will guide you to the correct category before scheduling the job.
            </p>
          </div>
          <div className="lg:sticky lg:top-24">
            <QuickBookingForm compact />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
