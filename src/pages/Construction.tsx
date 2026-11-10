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
  constructionTowns,
  constructionTownBySlug,
  materialServices,
  siteworkServices,
  CONSTRUCTION_PARTNER_NOTE,
  type ConstructionService,
} from "@/lib/construction-catalogue";
// Each category has its own card, so a sand page does not show a welder. The
// page previously hardcoded a fabrication banner and a stock team photo on all
// 997 construction pages, with alt text that said "construction materials"
// over a picture of someone welding.
const CARD_BY_ICON: Record<string, string> = {
  materials: "/og/construction-materials.jpg",
  building: "/og/construction-site.jpg",
  delivery: "/og/construction-delivery.jpg",
  demolition: "/og/construction-demolition.jpg",
  excavation: "/og/construction-excavation.jpg",
  steel: "/og/construction-steel.jpg",
  aggregate: "/og/construction-aggregate.jpg",
};

function cardFor(service?: ConstructionService) {
  return (service && CARD_BY_ICON[service.icon]) || CARD_BY_ICON.materials;
}


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
  image,
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
  /** The category card for this page. Falls back to the materials card. */
  image?: string;
  children: React.ReactNode;
}) {
  const banner = image ?? CARD_BY_ICON.materials;
  const galleryImages = [
    { src: banner, alt: h1 },
    { src: CARD_BY_ICON.building, alt: "Building work on an Ithihasam project" },
    { src: CARD_BY_ICON.delivery, alt: "Bulk material delivery across Kerala" },
  ].filter((img, i, all) => all.findIndex((o) => o.src === img.src) === i);
  return (
    <div className="min-h-screen bg-background">
      <SeoMeta title={title} description={description} keywords={keywords} canonicalPath={canonicalPath} image={banner} />
      <Header />

      <div className="relative h-[280px] w-full overflow-hidden md:h-[360px]">
        <ResponsiveImage
          src={banner}
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
          <RentalGallery images={galleryImages} className="mb-10" />
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

// A district hub covers every category, so its town links need one to point at.
// Sand is the highest-volume search of the eighteen, and every town page links
// on to the rest of the categories from there.
const TOWN_ENTRY_SERVICE = "sand-supply";

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
        image={cardFor(service)}
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

        <h2 className="mt-12 text-2xl font-bold text-foreground">Towns we cover in {district.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          What the ground and the access do to a job, town by town.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {constructionTowns
            .filter((town) => town.districtSlug === district.slug)
            .map((town) => (
              <Link
                key={town.slug}
                to={`/${TOWN_ENTRY_SERVICE}-${town.slug}`}
                className="rounded-xl border bg-card p-4 transition-colors hover:border-primary"
              >
                <p className="flex items-center gap-1.5 font-semibold text-foreground">
                  <MapPin size={15} className="text-primary" />
                  {town.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{town.note}</p>
              </Link>
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

  // Towns are checked first. A district slug is never the suffix of a town
  // slug (asserted in the catalogue test), so the two cannot be confused, but
  // matching towns first keeps the intent obvious.
  const town = constructionTowns.find((t) => slug.endsWith(`-${t.slug}`));
  const district = town
    ? constructionDistrictBySlug[town.districtSlug]
    : constructionDistricts.find((d) => slug.endsWith(`-${d.slug}`));

  const placeSlug = town ? town.slug : district?.slug;
  const service = placeSlug
    ? constructionServiceBySlug[slug.slice(0, -(placeSlug.length + 1))]
    : undefined;

  if (!district || !service) {
    return <Navigate to="/404" replace />;
  }

  // ---------------------------------------------------------- town page
  if (town) {
    const nearby = constructionTowns
      .filter((other) => other.districtSlug === town.districtSlug && other.slug !== town.slug)
      .slice(0, 5);

    return (
      <Shell
        title={`${service.name} in ${town.name}, ${district.name} | Ithihasam`}
        description={`${service.name} in ${town.name}. ${town.note}`}
        keywords={createKeywordSet(
          `${service.name.toLowerCase()} ${town.name}`,
          `${service.name.toLowerCase()} in ${town.name}`,
          `${service.name.toLowerCase()} ${district.name}`,
        )}
        canonicalPath={`/${service.slug}-${town.slug}`}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Construction", to: "/construction" },
          { label: service.name, to: `/construction/${service.slug}` },
          { label: district.name, to: `/${service.slug}-${district.slug}` },
          { label: town.name },
        ]}
        badge={`${town.name}, ${district.name}`}
        h1={`${service.name} in ${town.name}`}
        intro={`${service.intro} ${town.name} sits on ${town.terrain}, and ${town.access}. Local building is mostly ${town.building}.`}
        compliance={service.compliance}
        partner={service.partner}
        image={cardFor(service)}
      >
        <ItemList service={service} />

        {/* The section that makes this page worth having rather than being the
            district page with a different name at the top. */}
        <h2 className="mt-12 text-2xl font-bold text-foreground">Working in {town.name}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{town.note}</p>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-4">
            <dt className="text-sm font-semibold text-foreground">Ground</dt>
            <dd className="mt-1 text-sm text-muted-foreground">{town.terrain}</dd>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <dt className="text-sm font-semibold text-foreground">Site access</dt>
            <dd className="mt-1 text-sm text-muted-foreground">{town.access}</dd>
          </div>
        </dl>

        {nearby.length > 0 && (
          <>
            <h2 className="mt-12 text-2xl font-bold text-foreground">
              Nearby in {district.name}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {nearby.map((other) => (
                <Link
                  key={other.slug}
                  to={`/${service.slug}-${other.slug}`}
                  className="rounded-xl border bg-card p-4 transition-colors hover:border-primary"
                >
                  <p className="flex items-center gap-1.5 font-semibold text-foreground">
                    <MapPin size={15} className="text-primary" />
                    {service.name} in {other.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{other.building}</p>
                </Link>
              ))}
            </div>
          </>
        )}

        <p className="mt-8">
          <Link to={`/${service.slug}-${district.slug}`} className="text-primary underline">
            {service.name} across {district.name} district
          </Link>
        </p>
      </Shell>
    );
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
      image={cardFor(service)}
    >
      <ItemList service={service} />

      {/* These link to the town pages. They were plain <span> text, which left
          all 864 town pages orphaned: nothing on the site pointed at them, so
          the only route in was the sitemap. */}
      <h2 className="mt-12 text-2xl font-bold text-foreground">
        {service.name} by town in {district.name}
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {constructionTowns
          .filter((town) => town.districtSlug === district.slug)
          .map((town) => (
            <Link
              key={town.slug}
              to={`/${service.slug}-${town.slug}`}
              className="rounded-xl border bg-card p-4 transition-colors hover:border-primary"
            >
              <p className="flex items-center gap-1.5 font-semibold text-foreground">
                <MapPin size={15} className="text-primary" />
                {service.name} in {town.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{town.note}</p>
            </Link>
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
