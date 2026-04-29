import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ServiceAreaEntry } from "@/lib/service-areas";

interface ServiceAreaGridProps {
  title: string;
  description: string;
  areas: ServiceAreaEntry[];
  getCardTitle?: (area: ServiceAreaEntry) => string;
  getCardDescription?: (area: ServiceAreaEntry) => string;
}

export function ServiceAreaGrid({
  title,
  description,
  areas,
  getCardTitle = (area) => area.name,
  getCardDescription = (area) => `All services available in ${area.name}.`,
}: ServiceAreaGridProps) {
  return (
    <section className="rounded-3xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)] md:p-8">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {areas.map((area) => (
          <Link
            key={area.slug}
            to={`/locations/${area.slug}`}
            className="group rounded-2xl border border-border/50 bg-background/70 p-5 transition-all hover:border-primary/30 hover:shadow-[var(--card-shadow-hover)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-foreground">{getCardTitle(area)}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{getCardDescription(area)}</p>
              </div>
              <ArrowRight size={18} className="mt-1 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
