import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, HardHat, Handshake, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactCTAButtons } from "@/components/ContactCTAButtons";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { RentalGallery } from "@/components/RentalGallery";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { createKeywordSet } from "@/lib/seo";
import {
  buildingServices,
  constructionDistricts,
  constructionDistrictBySlug,
  constructionHowItWorks,
  constructionServiceBySlug,
  constructionServiceOptions,
  materialServices,
  siteworkServices,
  CONSTRUCTION_PARTNER_NOTE,
  type ConstructionService,
} from "@/lib/construction-catalogue";
import bannerFabrication from "@/assets/banner-fabrication.jpg";
import heroProfessionals from "@/assets/hero-professionals.jpg";

const GALLERY = [
  { src: bannerFabrication, alt: "Construction materials supplied to site by Ithihasam" },
  { src: heroProfessionals, alt: "Ithihasam team on a building project" },
];

function Shell({
  title,
  description,
  keywords,
  canonicalPath,
  crumbs,
  badge,
  h1,
  intro,
  compliance,
  partner,
  children,
}: {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  crumbs: { label: string; to?: string }[];
  badge: string;
  h1: string;
  intro: string;
  compliance?: string;
  /** True where the work is coordinated through partners rather than performed in-house. */
  partner?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SeoMeta title={title} description={description} keywords={keywords} canonicalPath={canonicalPath} image="/og/construction-site.jpg" />
      <Header />

      <div className="relative h-[280px] w-full overflow-hidden md:h-[360px]">
        <ResponsiveImage
          src={bannerFabrication}
          alt={h1}
          className="absolute inset-0 h-full w-full object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-8">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                <HardHat size={13} />
                {badge}
              </span>
              <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-foreground drop-shadow-sm md:text-5xl">
                {h1}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <section className="border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container py-8 md:py-10">
          <Breadcrumbs items={crumbs} />
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>

          {/* Legal obligations are stated up front, not buried. Sand sourcing and
              RERA registration are the two that attract the wrong enquiries if
              a page stays silent on them. */}
          {compliance && (
            <div className="mt-5 flex max-w-3xl gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-sm leading-relaxed text-foreground">{compliance}</p>
            </div>
          )}

          {/* Said plainly where Ithihasam arranges the machine rather than owning
              it. Implying an owned fleet would bring in enquiries the business
              cannot honour on its own terms. */}
          {partner && (
            <div className="mt-5 flex max-w-3xl gap-3 rounded-xl border bg-muted/50 p-4">
              <Handshake size={18} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">{CONSTRUCTION_PARTNER_NOTE}</p>
            </div>
          )}

          <div className="mt-6">
            <ContactCTAButtons size="lg" showLabels />
          </div>
        </div>
      </section>

      <section className="container grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
        <div>
          <RentalGallery images={GALLERY} className="mb-10" />
          {children}

          <h2 className="mt-12 text-2xl font-bold text-foreground">How it works</h2>
          <ol className="mt-4 space-y-3">
            {constructionHowItWorks.map((step, index) => (
              <li key={step} className="flex gap-3 text-muted-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <QuickBookingForm compact formName="construction" serviceOptions={constructionServiceOptions} />
        </aside>
      </section>

      <Footer />
    </div>
  );
}

/**
 * Eighteen categories in one flat list is a wall. Grouping them into what is
 * supplied, what happens on site, and what gets built matches how a customer
 * actually arrives: they know which of the three they need before they know the
 * category name.
 */
const SERVICE_GROUPS: { heading: string; blurb: string; services: ConstructionService[] }[] = [
  {
    heading: "Material supply",
    blurb: "Delivered to site by the load, with the grade matched to the work.",
    services: materialServices,
  },
  {
    heading: "Site work & machinery",
    blurb: "Demolition, excavation, transport and machinery hire, arranged with operators in the district.",
    services: siteworkServices,
  },
  {
    heading: "Building & construction",
    blurb: "Houses, apartments, commercial buildings, renovation and civil works.",
    services: buildingServices,
  },
];

function ServiceGrid({ districtSlug }: { districtSlug?: string }) {
  return (
    <>
      {SERVICE_GROUPS.map((group, groupIndex) => (
        <section key={group.heading} className={groupIndex === 0 ? "" : "mt-10"}>
          <h2 className="text-2xl font-bold text-foreground">{group.heading}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{group.blurb}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {group.services.map((service) => (
              <Link
                key={service.slug}
                to={districtSlug ? `/${service.slug}-${districtSlug}` : `/construction/${service.slug}`}
                className="rounded-xl border bg-card p-4 transition-colors hover:border-primary"
              >
                <p className="font-semibold text-foreground">{service.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{service.intro.slice(0, 90)}…</p>
                <p className="mt-2 text-xs font-medium text-primary">
                  {service.items.length} {service.items.length === 1 ? "option" : "options"}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function DistrictGrid({ serviceSlug }: { serviceSlug?: string }) {
  return (
    <>
      <h2 className="mt-12 text-2xl font-bold text-foreground">Districts we cover</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {constructionDistricts.map((district) => (
          <Link
            key={district.slug}
            to={serviceSlug ? `/${serviceSlug}-${district.slug}` : `/construction/${district.slug}`}
            className="rounded-xl border bg-card p-4 transition-colors hover:border-primary"
          >
            <p className="flex items-center gap-1.5 font-semibold text-foreground">
              <MapPin size={15} className="text-primary" />
              {district.name}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

const ITEM_HEADING: Record<ConstructionService["kind"], string> = {
  material: "What we supply",
  sitework: "Work we take on",
  building: "What this covers",
};

function ItemList({ service }: { service: ConstructionService }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-foreground">{ITEM_HEADING[service.kind]}</h2>
      <ul className="mt-4 space-y-2">
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-muted-foreground">
            <CheckCircle2 size={16} className="mt-1 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

const DISTRICT_NAMES = constructionDistricts.map((d) => d.name).join(", ");

const BADGE: Record<ConstructionService["kind"], string> = {
  material: "Material supply",
  sitework: "Site work",
  building: "Building service",
};

/** /construction */
export function ConstructionHub() {
  return (
    <Shell
      title="Construction Materials & Building Services in Kerala | Ithihasam"
      description={`Construction material supply and building services across ${DISTRICT_NAMES}. M-sand, cement, steel, blocks, finishing materials, house and commercial construction.`}
      keywords={createKeywordSet("construction materials Kerala", "m sand supply", "cement supply", "house construction Kerala", "building contractors Kerala")}
      canonicalPath="/construction"
      crumbs={[{ label: "Home", to: "/" }, { label: "Construction" }]}
      badge="Materials & building"
      h1="Construction Materials and Building Services in Kerala"
      intro={`Ithihasam supplies sand, aggregate, cement, steel, blocks and finishing materials by the load, and takes house, apartment and commercial construction across ${DISTRICT_NAMES}.`}
    >
      <ServiceGrid />
      <DistrictGrid />
    </Shell>
  );
}

/** /construction/:slug — either a service hub or a district hub. */
export function ConstructionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? constructionServiceBySlug[slug] : undefined;
  const district = slug ? constructionDistrictBySlug[slug] : undefined;

  if (service) {
    return (
      <Shell
        title={`${service.name} in Kerala | Ithihasam`}
        description={service.intro.slice(0, 150)}
        keywords={createKeywordSet(service.name.toLowerCase(), `${service.name.toLowerCase()} Kerala`, "construction materials Kerala")}
        canonicalPath={`/construction/${service.slug}`}
        crumbs={[{ label: "Home", to: "/" }, { label: "Construction", to: "/construction" }, { label: service.name }]}
        badge={BADGE[service.kind]}
        h1={`${service.name} in Kerala`}
        intro={service.intro}
        compliance={service.compliance}
        partner={service.partner}
      >
        <ItemList service={service} />
        <DistrictGrid serviceSlug={service.slug} />
      </Shell>
    );
  }

  if (district) {
    return (
      <Shell
        title={`Construction Materials & Builders in ${district.name} | Ithihasam`}
        description={`Construction material supply and building services across ${district.name} district: M-sand, cement, steel, blocks, and house and commercial construction.`}
        keywords={createKeywordSet(`construction materials ${district.name}`, `builders ${district.name}`, `m sand ${district.name}`, `house construction ${district.name}`)}
        canonicalPath={`/construction/${district.slug}`}
        crumbs={[{ label: "Home", to: "/" }, { label: "Construction", to: "/construction" }, { label: district.name }]}
        badge={`${district.name} district`}
        h1={`Construction Materials and Building Services in ${district.name}`}
        intro={`Ithihasam supplies construction materials and takes building work across ${district.name} district — ${district.context}. Most local demand is for ${district.demand}.`}
      >
        <ServiceGrid districtSlug={district.slug} />

        <h2 className="mt-12 text-2xl font-bold text-foreground">Towns we deliver to</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {district.towns.map((town) => (
            <span key={town} className="rounded-full border bg-card px-3 py-1.5 text-sm text-foreground">
              {town}
            </span>
          ))}
        </div>
      </Shell>
    );
  }

  return <Navigate to="/404" replace />;
}

/**
 * /:service-:district — e.g. /sand-aggregates-ernakulam
 *
 * Matched from the pathname rather than a route param, because the slug joins
 * two values with a hyphen and both halves themselves contain hyphens.
 */
export function ConstructionServiceDistrict() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/|\/$/g, "");

  const district = constructionDistricts.find((d) => slug.endsWith(`-${d.slug}`));
  const service = district ? constructionServiceBySlug[slug.slice(0, -(district.slug.length + 1))] : undefined;

  if (!district || !service) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Shell
      title={`${service.name} in ${district.name} | Ithihasam`}
      description={`${service.name} across ${district.name} district. ${service.items.slice(0, 3).join(", ")}. Delivered rate quoted before you confirm.`}
      keywords={createKeywordSet(
        `${service.name.toLowerCase()} ${district.name}`,
        `${service.name.toLowerCase()} in ${district.name}`,
        `construction materials ${district.name}`,
      )}
      canonicalPath={`/${service.slug}-${district.slug}`}
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Construction", to: "/construction" },
        { label: service.name, to: `/construction/${service.slug}` },
        { label: district.name },
      ]}
      badge={`${district.name} district`}
      h1={`${service.name} in ${district.name}`}
      intro={`${service.intro} In ${district.name} district this mostly serves ${district.demand}, where ${district.context}.`}
      compliance={service.compliance}
      partner={service.partner}
    >
      <ItemList service={service} />

      <h2 className="mt-12 text-2xl font-bold text-foreground">Towns we deliver to in {district.name}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {district.towns.map((town) => (
          <span key={town} className="rounded-full border bg-card px-3 py-1.5 text-sm text-foreground">
            {town}
          </span>
        ))}
      </div>

      <DistrictGrid serviceSlug={service.slug} />

      <p className="mt-8">
        <Link to={`/construction/${service.slug}`} className="text-primary underline">
          All {service.name.toLowerCase()} across Kerala
        </Link>
      </p>
    </Shell>
  );
}
