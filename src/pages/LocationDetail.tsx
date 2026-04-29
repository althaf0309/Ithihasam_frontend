import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { CategoryIconStrip } from "@/components/CategoryIconStrip";
import { ContactCTAButtons } from "@/components/ContactCTAButtons";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceAreaGrid } from "@/components/ServiceAreaGrid";
import { useLang } from "@/contexts/LangContext";
import {
  getNearbyServiceAreas,
  getServiceAreaHighlights,
  getServiceAreaIntro,
  getServiceAreaKeywords,
  getServiceAreaMetaDescription,
  getServiceAreaMetaTitle,
  serviceAreaBySlug,
} from "@/lib/service-areas";
import { getLocalizedText, serviceCatalog } from "@/lib/service-catalog";

const areaPageText = {
  badge: { en: "Service Area", ml: "സേവന മേഖല" },
  notFound: { en: "Location page not found.", ml: "ലൊക്കേഷൻ പേജ് കണ്ടെത്താനായില്ല." },
  backServices: { en: "Back to services", ml: "സേവനങ്ങളിലേക്ക് മടങ്ങുക" },
  heroTitle: { en: "Home services in", ml: "ഈ സ്ഥലത്തെ ഹോം സർവീസുകൾ" },
  heroSubtitle: {
    en: "Location-focused support for home repairs, cleaning, upgrades, and smart installations.",
    ml: "വീട്ടുപണി, ക്ലീനിംഗ്, അപ്ഗ്രേഡ്, സ്മാർട്ട് ഇൻസ്റ്റലേഷൻ ആവശ്യങ്ങൾക്ക് ലൊക്കേഷൻ അടിസ്ഥാനത്തിലുള്ള സഹായം.",
  },
  serviceSectionTitle: { en: "All services available here", ml: "ഇവിടെ ലഭ്യമായ എല്ലാ സേവനങ്ങളും" },
  serviceSectionDescription: {
    en: "Choose the service category you need in this location and continue to the dedicated service page for booking support.",
    ml: "ഈ ലൊക്കേഷനിൽ ആവശ്യമായ സേവനവിഭാഗം തിരഞ്ഞെടുക്കി ബുക്കിംഗിനായി അതത് സേവനപേജിലേക്ക് പോകാം.",
  },
  bookingTitle: { en: "Book a service for this area", ml: "ഈ പ്രദേശത്തിനായി സേവനം ബുക്ക് ചെയ്യുക" },
  bookingDescription: {
    en: "Mention the exact property area inside the booking form and our team will coordinate the right service request.",
    ml: "ബുക്കിംഗ് ഫോമിൽ കൃത്യമായ സ്ഥല വിവരം ചേർക്കൂ, ഞങ്ങളുടെ ടീം ശരിയായ സേവന അഭ്യർത്ഥന ക്രമീകരിക്കും.",
  },
  nearbyTitle: { en: "Nearby service areas", ml: "സമീപ സേവന മേഖലകൾ" },
  nearbyDescription: {
    en: "We also handle multi-service requests around these nearby locations.",
    ml: "ഈ സമീപ പ്രദേശങ്ങളിലെയും മൾട്ടി-സർവീസ് അഭ്യർത്ഥനകൾ ഞങ്ങൾ കൈകാര്യം ചെയ്യുന്നു.",
  },
};

function getUiText(lang: "en" | "ml", key: keyof typeof areaPageText) {
  return areaPageText[key][lang];
}

export default function LocationDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const area = serviceAreaBySlug[slug];

  if (!area) {
    return (
      <div className="min-h-screen bg-background">
        <SeoMeta
          title="Location Not Found | Ithihasam"
          description="The requested Ithihasam location page could not be found."
          keywords={["location not found", "Ithihasam locations", "home services Kerala"]}
          robots="noindex, nofollow"
        />
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">{getUiText(lang, "notFound")}</h1>
          <Link to="/services" className="mt-4 inline-block text-primary underline">
            {getUiText(lang, "backServices")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const introParagraphs = getServiceAreaIntro(area);
  const highlightCards = getServiceAreaHighlights(area);
  const nearbyAreas = getNearbyServiceAreas(area);

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title={getServiceAreaMetaTitle(area)}
        description={getServiceAreaMetaDescription(area)}
        keywords={getServiceAreaKeywords(area)}
        canonicalPath={`/locations/${area.slug}`}
      />
      <Header />

      <section className="relative overflow-hidden border-b border-border/50 py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container relative">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {getUiText(lang, "badge")}
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {getUiText(lang, "heroTitle")} {area.name}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
              {getServiceAreaMetaDescription(area)}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm text-foreground">
                <MapPin size={14} className="text-primary" />
                {area.district}
              </span>
              <span className="inline-flex rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm text-foreground">
                {getUiText(lang, "heroSubtitle")}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactCTAButtons size="lg" showLabels />
            </div>
          </div>
        </div>
      </section>

      <CategoryIconStrip />

      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div className="space-y-6">
            {introParagraphs.map((paragraph, index) => (
              <motion.p
                key={`${area.slug}-intro-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-base leading-8 text-muted-foreground md:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
          <div className="lg:sticky lg:top-24">
            <div className="mb-4 rounded-3xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)]">
              <h2 className="text-2xl font-bold text-foreground">{getUiText(lang, "bookingTitle")}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{getUiText(lang, "bookingDescription")}</p>
            </div>
            <QuickBookingForm compact />
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-muted/20 py-16">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground">{getUiText(lang, "serviceSectionTitle")}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{getUiText(lang, "serviceSectionDescription")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {serviceCatalog.map((service, index) => (
              <motion.div
                key={`${area.slug}-${service.slug}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <ServiceCard
                  title={getLocalizedText(service.title, lang)}
                  description={`${getLocalizedText(service.shortDescription, lang)} ${area.name} bookings available.`}
                  icon={service.icon}
                  slug={service.slug}
                  image={service.cardImage}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-6 md:grid-cols-3">
          {highlightCards.map((item, index) => (
            <motion.div
              key={`${area.slug}-${item.title}`}
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
      </section>

      <div className="container pb-16">
        <ServiceAreaGrid
          title={getUiText(lang, "nearbyTitle")}
          description={getUiText(lang, "nearbyDescription")}
          areas={nearbyAreas}
          getCardDescription={(nearbyArea) => `All core Ithihasam services are available for customers around ${nearbyArea.name}.`}
        />
      </div>

      <Footer />
    </div>
  );
}
