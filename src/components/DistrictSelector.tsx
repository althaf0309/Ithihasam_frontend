import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { serviceDistricts } from "@/lib/service-areas";

interface Props {
  /**
   * Local-page slug prefix for the current service, e.g. "appliance-servicing".
   * Each district button links to that service's page for the district, which is
   * where the city-specific title, copy, and schema live.
   */
  slugPrefix: string;
  serviceName: string;
  className?: string;
}

/**
 * District picker shown beside the Call / WhatsApp buttons on a service page.
 *
 * The service hub page is deliberately district-neutral so it does not compete
 * with its own city pages. That leaves a visitor from Thrissur or Ernakulam
 * without an obvious next step, so this routes them to the page written for
 * their district — and gives search engines a crawlable link from the hub to
 * each district page, which is how the hub passes authority down.
 */
export function DistrictSelector({ slugPrefix, serviceName, className = "" }: Props) {
  return (
    <div className={className}>
      <p className="mb-2 text-center text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Choose your district
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {serviceDistricts.map((district) => (
          <Link
            key={district.slug}
            to={`/${slugPrefix}-${district.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
            aria-label={`${serviceName} in ${district.name}`}
          >
            <MapPin size={14} className="text-primary" />
            {district.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
