import { Navigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactCTAButtons } from "@/components/ContactCTAButtons";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { createKeywordSet } from "@/lib/seo";
import { districtLandingBySlug } from "@/lib/service-areas";
import { getLocalizedText, serviceCatalog } from "@/lib/service-catalog";
import { useLang } from "@/contexts/LangContext";

/**
 * Root-level district landing page: /kochi, /thrissur, /kannur.
 *
 * These carry the district-level search intent ("home services Kochi") that the
 * per-service local pages are too narrow for and the service hub pages are too
 * broad for. The short URL is the canonical one; /locations/<slug> points here.
 */
export default function DistrictLanding() {
  // Registered as static routes (/kochi, /thrissur, /kannur) rather than a
  // param, so the slug comes from the path instead of useParams.
  const { pathname } = useLocation();
  const { lang } = useLang();
  const entry = districtLandingBySlug[pathname.replace(/^\/|\/$/g, "")];

  if (!entry) {
    return <Navigate to="/404" replace />;
  }

  const keywords = createKeywordSet(
    `home services ${entry.name}`,
    `home maintenance ${entry.name}`,
    `electrician ${entry.name}`,
    `plumber ${entry.name}`,
    `AC service ${entry.name}`,
    `appliance repair ${entry.name}`,
    `house painting ${entry.name}`,
    `deep cleaning ${entry.name}`,
    `pest control ${entry.name}`,
    `CCTV installation ${entry.name}`,
    `home services ${entry.aka}`,
    `Ithihasam ${entry.name}`,
  );

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title={`Home Services in ${entry.name} | Electrician, Plumber, AC & Cleaning | Ithihasam`}
        description={`Book trusted home maintenance in ${entry.name}. Electricians, plumbers, painters, AC and appliance repair, carpentry, deep cleaning, pest control, and CCTV installation across ${entry.district}.`}
        keywords={keywords}
        canonicalPath={`/${entry.slug}`}
        image="/og/default.jpg"
      />
      <Header />

      <section className="border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: entry.name },
            ]}
          />

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <MapPin size={13} />
              {entry.district}
            </span>

            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
              Home Maintenance Services in <span className="text-gradient">{entry.name}</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Ithihasam coordinates verified electricians, plumbers, painters, carpenters, appliance
              technicians, cleaners, pest control teams, and smart home installers across {entry.name} and{" "}
              {entry.district}. One booking flow for homes, apartments, shops, and offices.
            </p>

            <div className="mt-6">
              <ContactCTAButtons size="lg" showLabels />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Services available in {entry.name}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {serviceCatalog.map((service) => (
              <Link
                key={service.slug}
                to={`/${service.slug}-${entry.areaSlug}`}
                className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary">
                    {getLocalizedText(service.title, lang)}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {getLocalizedText(service.shortDescription, lang)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold text-foreground">Areas we cover in {entry.district}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {entry.name} and surrounding towns, subject to technician availability on the day.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.towns.map((town) => (
              <span key={town} className="rounded-full border bg-card px-3 py-1.5 text-sm text-foreground">
                {town}
              </span>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold text-foreground">Why book Ithihasam in {entry.name}</h2>
          <ul className="mt-4 space-y-3">
            {[
              "Doorstep service for homes, flats, shops, and offices.",
              "Background-checked professionals matched to the job type.",
              "Scope and pricing confirmed before work starts, with no hidden charges.",
              "Call and WhatsApp booking, in English or Malayalam.",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-xl border bg-primary/5 p-5">
            <p className="flex items-center gap-2 font-semibold text-foreground">
              <Phone size={17} className="text-primary" />
              Need someone in {entry.name} today?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Urgent electrical, plumbing, and appliance faults are prioritised. Call or WhatsApp and
              we will tell you the earliest slot available in your area.
            </p>
            <div className="mt-4">
              <ContactCTAButtons showLabels />
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <QuickBookingForm compact />
        </aside>
      </section>

      <Footer />
    </div>
  );
}
