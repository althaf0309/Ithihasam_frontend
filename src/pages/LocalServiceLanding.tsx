import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { CategoryIconStrip } from "@/components/CategoryIconStrip";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { ContactCTAButtons } from "@/components/ContactCTAButtons";
import { ServiceAreaGrid } from "@/components/ServiceAreaGrid";
import { TestimonialCard } from "@/components/TestimonialCard";
import { getLocalizedText, serviceCatalogBySlug } from "@/lib/service-catalog";
import { localServiceLandingPageBySlug, localServiceLandingPages } from "@/lib/local-service-pages";
import { getNearbyServiceAreas } from "@/lib/service-areas";
import { useLang } from "@/contexts/LangContext";
import NotFound from "@/pages/NotFound";

function getRelatedPages(currentSlug: string) {
  const current = localServiceLandingPageBySlug[currentSlug];
  if (!current) {
    return [];
  }

  return localServiceLandingPages
    .filter((page) => page.slug !== current.slug && page.template.slugPrefix === current.template.slugPrefix)
    .slice(0, 6);
}

export default function LocalServiceLanding() {
  const { landingSlug = "" } = useParams<{ landingSlug: string }>();
  const { lang } = useLang();
  const page = localServiceLandingPageBySlug[landingSlug];

  if (!page) {
    return <NotFound />;
  }

  const parentService = serviceCatalogBySlug[page.template.parentServiceSlug];
  const nearbyAreas = getNearbyServiceAreas(page.area);
  const relatedPages = getRelatedPages(page.slug);
  const faqItems = page.template.faqs?.length
    ? page.template.faqs
    : parentService.faqs.slice(0, 4).map((faq) => ({
        question: getLocalizedText(faq.q, lang),
        answer: getLocalizedText(faq.a, lang),
      }));
  const reviewItems = parentService.reviews.slice(0, 3);
  const problemItems = page.template.commonProblems ?? page.template.commonJobs;
  const serviceItems = page.template.serviceItems ?? page.template.commonJobs;
  const whyChooseItems = [
    `Doorstep coordination for ${page.area.name} and nearby localities`,
    "Skilled professionals matched to the requested service type",
    "Clear job scope and pricing discussion before work starts",
    "Support for homes, apartments, shops, offices, and rental properties",
    "Call and WhatsApp booking support for faster scheduling",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title={page.metaTitle}
        description={page.metaDescription}
        keywords={page.keywords}
        image={page.image}
        canonicalPath={page.path}
      />
      <Header />

      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0">
          <img src={page.image} alt={page.h1} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="container relative py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <MapPin size={14} />
              {page.area.name}
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              {page.metaDescription}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactCTAButtons size="lg" showLabels />
              <Link
                to="#booking"
                className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book {page.template.serviceName}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CategoryIconStrip />

      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div className="space-y-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{parentService.title.en}</p>
              <h2 className="mt-3 text-3xl font-bold text-foreground">
                Doorstep {page.template.serviceName.toLowerCase()} support in {page.area.name}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  Customers searching for {page.template.searchTerms.slice(0, 3).join(", ")} in {page.area.name} can use Ithihasam to request practical doorstep support for {page.template.intent}.
                </p>
                <p>
                  Share the issue, exact property location, preferred date, and any photos or notes through the booking form. The team can then coordinate the right professional for {page.area.propertyMix} in {page.area.name} and nearby service pockets.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={page.parentServicePath}
                  className="inline-flex items-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  View main {parentService.title.en} page
                </Link>
                <Link
                  to={`/locations/${page.area.slug}`}
                  className="inline-flex items-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  View {page.area.name} location page
                </Link>
              </div>
            </div>

            <section className="rounded-3xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)] md:p-8">
              <h2 className="text-2xl font-bold text-foreground">Why {page.area.name} customers choose Ithihasam</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {whyChooseItems.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-border/50 bg-background/70 p-4">
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-primary" />
                    <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                Common {page.template.serviceName} problems we handle in {page.area.name}
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {problemItems.map((problem) => (
                  <div key={problem} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4">
                    <CheckCircle2 size={18} className="shrink-0 text-whatsapp" />
                    <span className="text-sm font-semibold text-foreground">{problem}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Services included in {page.area.name}</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                These are the common jobs customers can request through this page.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[...serviceItems, ...parentService.includes.slice(0, 4).map((item) => item.en)]
                  .filter((job, index, jobs) => jobs.indexOf(job) === index)
                  .map((job, index) => (
                    <motion.div
                      key={job}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04 }}
                      className="flex gap-3 rounded-2xl border border-border/50 bg-card p-5 shadow-[var(--card-shadow)]"
                    >
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                      <div>
                        <h3 className="text-base font-bold text-foreground">{job}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Available as part of {page.template.serviceName.toLowerCase()} bookings in {page.area.name}.
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </section>

            {page.template.brands?.length ? (
              <section className="rounded-3xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)] md:p-8">
                <h2 className="text-2xl font-bold text-foreground">Popular brands and materials</h2>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  These are common brands or material names customers mention while booking {page.template.serviceName.toLowerCase()} in {page.area.name}.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {page.template.brands.map((brand) => (
                    <span key={brand} className="rounded-full border border-border/70 bg-background px-3 py-1.5 text-sm font-semibold text-foreground">
                      {brand}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {faqItems.length > 0 && (
              <section className="rounded-3xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)] md:p-8">
                <h2 className="text-2xl font-bold text-foreground">FAQs for {page.title}</h2>
                <div className="mt-6 divide-y divide-border/60">
                  {faqItems.map((faq) => (
                    <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                      <h3 className="text-base font-bold text-foreground">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {nearbyAreas.length > 0 && (
              <ServiceAreaGrid
                title={`Nearby areas around ${page.area.name}`}
                description={`Customers close to ${page.area.name} can also use Ithihasam booking support in these nearby locations.`}
                areas={nearbyAreas}
                getCardDescription={(area) => `${page.template.serviceName} and related home-service bookings are supported around ${area.name}.`}
              />
            )}

            {reviewItems.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground">Customer reviews</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {reviewItems.map((review) => (
                    <TestimonialCard
                      key={review.name}
                      name={review.name}
                      location={review.location}
                      text={getLocalizedText(review.text, lang)}
                      rating={review.rating}
                    />
                  ))}
                </div>
              </section>
            )}

            {relatedPages.length > 0 && (
              <section className="rounded-3xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)] md:p-8">
                <h2 className="text-2xl font-bold text-foreground">More {page.template.serviceName} location pages</h2>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  Browse nearby dedicated pages for the same service category.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {relatedPages.map((related) => (
                    <Link
                      key={related.slug}
                      to={related.path}
                      className="group flex items-center justify-between rounded-xl border border-border/50 bg-background/70 p-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      {related.title}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside id="booking" className="scroll-mt-24 lg:sticky lg:top-24">
            <QuickBookingForm compact preselectedService={page.template.serviceName} showMessageField />
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
