import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Package, Truck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactCTAButtons } from "@/components/ContactCTAButtons";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { RentalGallery } from "@/components/RentalGallery";
import { createKeywordSet } from "@/lib/seo";
import {
  formatInr,
  howRentingWorks,
  rentalAudiences,
  rentalCatalogue,
  rentalCities,
  rentalCityBySlug,
  rentalPackages,
  type RentalCity,
} from "@/lib/rental-catalogue";

function Shell({
  title,
  description,
  keywords,
  canonicalPath,
  crumbs,
  badge,
  h1,
  intro,
  gallery,
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
  gallery: { src: string; alt: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SeoMeta title={title} description={description} keywords={keywords} canonicalPath={canonicalPath} image="/og/default.jpg" />
      <Header />

      <section className="border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container py-10 md:py-14">
          <Breadcrumbs items={crumbs} />
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Package size={13} />
              {badge}
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">{h1}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>
            <div className="mt-6">
              <ContactCTAButtons size="lg" showLabels />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
        <div>
          <RentalGallery images={gallery} className="mb-10" />
          {children}

          <h2 className="mt-12 text-2xl font-bold text-foreground">How renting works</h2>
          <ol className="mt-4 space-y-3">
            {howRentingWorks.map((step, index) => (
              <li key={step} className="flex gap-3 text-muted-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-xl border bg-primary/5 p-5">
            <p className="flex items-center gap-2 font-semibold text-foreground">
              <Truck size={17} className="text-primary" />
              Delivery, installation and maintenance included
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              A refundable deposit and a minimum rental period apply to each item. Both are confirmed
              before you book — call or WhatsApp us and we will quote for your exact requirement.
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

function CatalogueList({ cityName }: { cityName?: string }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-foreground">
        Available on rent{cityName ? ` in ${cityName}` : ""}
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {rentalCatalogue.map((item) => (
          <div key={item.slug} className="rounded-xl border bg-card p-4">
            <p className="font-semibold text-foreground">{item.name}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
            {/* Rates appear here only once real figures are configured. */}
            {typeof item.monthlyRate === "number" && (
              <p className="mt-2 text-sm font-semibold text-primary">
                From {formatInr(item.monthlyRate)}/month
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function CityLinks({ heading }: { heading: string }) {
  return (
    <>
      <h2 className="mt-12 text-2xl font-bold text-foreground">{heading}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {rentalCities.map((city) => (
          <Link key={city.slug} to={`/rentals/${city.slug}`} className="rounded-xl border bg-card p-4 transition-colors hover:border-primary">
            <p className="flex items-center gap-1.5 font-semibold text-foreground">
              <MapPin size={15} className="text-primary" />
              {city.name}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">{city.aka}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

const gallery = (kind: string, slug: string) => [
  { src: `/og/rental-${kind}-${slug}.jpg`, alt: `${slug.replace(/-/g, " ")} available on monthly rent from Ithihasam` },
  { src: `/og/rental-${kind}-${slug}-2.jpg`, alt: "Delivery and installation included with every Ithihasam rental" },
  { src: `/og/rental-${kind}-${slug}-3.jpg`, alt: "Cleaned and inspected before every new rental" },
];

/** /rentals */
export function RentalsHub() {
  return (
    <Shell
      title="Furniture & Appliance Rental in Kerala | Ithihasam"
      description="Rent furniture and appliances monthly in Kochi, Trivandrum and Kozhikode. Beds, sofas, wardrobes, fridges, washing machines and ACs — delivered, installed and maintained."
      keywords={createKeywordSet("furniture rental Kerala", "furniture on rent", "monthly furniture rental", "appliance rental Kerala", "furniture subscription")}
      canonicalPath="/rentals"
      crumbs={[{ label: "Home", to: "/" }, { label: "Rentals" }]}
      badge="Monthly rental"
      h1="Furniture and Appliance Rental in Kerala"
      intro="Rent furniture and appliances monthly instead of buying. Ithihasam delivers, installs and maintains everything for the whole rental period across Kochi, Trivandrum and Kozhikode."
      gallery={gallery("hub", "kerala")}
    >
      <CatalogueList />
      <CityLinks heading="Choose your city" />

      <h2 className="mt-12 text-2xl font-bold text-foreground">Whole-home packages</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {rentalPackages.map((pkg) => (
          <div key={pkg.slug} className="rounded-xl border bg-card p-4">
            <p className="font-semibold text-foreground">{pkg.name}</p>
            <ul className="mt-2 space-y-1">
              {pkg.includes.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-bold text-foreground">Who we rent to</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {rentalAudiences.map((audience) => (
          <Link key={audience.slug} to={`/rentals/for/${audience.slug}`} className="rounded-full border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
            {audience.name}
          </Link>
        ))}
      </div>
    </Shell>
  );
}

/** /rentals/:citySlug */
export function RentalCityPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city: RentalCity | undefined = citySlug ? rentalCityBySlug[citySlug] : undefined;

  if (!city) return <Navigate to="/404" replace />;

  return (
    <Shell
      title={`Furniture Rental in ${city.name} | Ithihasam`}
      description={`Rent furniture and appliances monthly in ${city.name}. Beds, sofas, wardrobes, fridges, washing machines and ACs, delivered and installed across ${city.district}.`}
      keywords={createKeywordSet(`furniture rental ${city.name}`, `furniture on rent ${city.name}`, `appliance rental ${city.name}`, `monthly furniture rental ${city.name}`, `furniture rental ${city.aka}`)}
      canonicalPath={`/rentals/${city.slug}`}
      crumbs={[{ label: "Home", to: "/" }, { label: "Rentals", to: "/rentals" }, { label: city.name }]}
      badge={city.district}
      h1={`Furniture and Appliance Rental in ${city.name}`}
      intro={`Ithihasam rents furniture and appliances on a monthly subscription across ${city.name} (${city.aka}). Demand here comes from ${city.demandDriver}. Most of our ${city.name} rentals go into ${city.propertyMix}.`}
      gallery={gallery("city", city.slug)}
    >
      <CatalogueList cityName={city.name} />

      <h2 className="mt-12 text-2xl font-bold text-foreground">Areas we deliver to in {city.name}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {city.localities.map((loc) => (
          <Link key={loc.slug} to={`/rentals/${city.slug}/${loc.slug}`} className="rounded-xl border bg-card p-4 transition-colors hover:border-primary">
            <p className="font-semibold text-foreground">{loc.name}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{loc.note}</p>
          </Link>
        ))}
      </div>

      <CityLinks heading="Other rental cities" />
    </Shell>
  );
}

/** /rentals/:citySlug/:localitySlug */
export function RentalLocalityPage() {
  const { citySlug, localitySlug } = useParams<{ citySlug: string; localitySlug: string }>();
  const city = citySlug ? rentalCityBySlug[citySlug] : undefined;
  const locality = city?.localities.find((loc) => loc.slug === localitySlug);

  if (!city || !locality) return <Navigate to="/404" replace />;

  return (
    <Shell
      title={`Furniture Rental in ${locality.name}, ${city.name} | Ithihasam`}
      description={`Monthly furniture and appliance rental in ${locality.name}, ${city.name}. Beds, sofas, wardrobes and appliances delivered and installed.`}
      keywords={createKeywordSet(`furniture rental ${locality.name}`, `furniture on rent ${locality.name}`, `furniture rental ${city.name}`, `appliance rental ${locality.name}`)}
      canonicalPath={`/rentals/${city.slug}/${locality.slug}`}
      crumbs={[{ label: "Home", to: "/" }, { label: "Rentals", to: "/rentals" }, { label: city.name, to: `/rentals/${city.slug}` }, { label: locality.name }]}
      badge={`${city.name} · ${city.district}`}
      h1={`Furniture Rental in ${locality.name}`}
      intro={`Ithihasam rents furniture and appliances monthly in ${locality.name}, ${city.name} — an area known for ${locality.note}. Delivery, installation and maintenance are included for the whole rental period.`}
      gallery={gallery("city", city.slug)}
    >
      <CatalogueList cityName={locality.name} />

      <h2 className="mt-12 text-2xl font-bold text-foreground">Nearby areas</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {city.localities
          .filter((other) => other.slug !== locality.slug)
          .map((other) => (
            <Link key={other.slug} to={`/rentals/${city.slug}/${other.slug}`} className="rounded-full border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
              {other.name}
            </Link>
          ))}
      </div>

      <p className="mt-8">
        <Link to={`/rentals/${city.slug}`} className="text-primary underline">
          All furniture rental in {city.name}
        </Link>
      </p>
    </Shell>
  );
}

/** /rentals/for/:audienceSlug */
export function RentalAudiencePage() {
  const { audienceSlug } = useParams<{ audienceSlug: string }>();
  const audience = rentalAudiences.find((item) => item.slug === audienceSlug);

  if (!audience) return <Navigate to="/404" replace />;

  return (
    <Shell
      title={`Furniture Rental for ${audience.name} in Kerala | Ithihasam`}
      description={`Monthly furniture and appliance rental for ${audience.name.toLowerCase()} in Kochi, Trivandrum and Kozhikode. Delivered, installed and maintained.`}
      keywords={createKeywordSet(`furniture rental for ${audience.name.toLowerCase()}`, "furniture rental Kerala", "monthly furniture rental", "furniture on rent")}
      canonicalPath={`/rentals/for/${audience.slug}`}
      crumbs={[{ label: "Home", to: "/" }, { label: "Rentals", to: "/rentals" }, { label: audience.name }]}
      badge="Rental plans"
      h1={`Furniture Rental for ${audience.name}`}
      intro={`Ithihasam rents furniture and appliances monthly to ${audience.name.toLowerCase()} across Kochi, Trivandrum and Kozhikode, where the common requirement is ${audience.need}.`}
      gallery={gallery("hub", "kerala")}
    >
      <CatalogueList />
      <CityLinks heading="Available in" />
    </Shell>
  );
}
