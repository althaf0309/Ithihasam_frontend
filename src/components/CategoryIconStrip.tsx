import { Zap, Paintbrush, Settings, Hammer, Factory, Sparkles, Bug, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Electrical & Plumbing", icon: Zap, slug: "electrical-plumbing" },
  { name: "Painting", icon: Paintbrush, slug: "painting" },
  { name: "Appliance Repair", icon: Settings, slug: "appliance-servicing" },
  { name: "Carpentry", icon: Hammer, slug: "carpentry" },
  { name: "Roofing & Fabrication", icon: Factory, slug: "roofing-fabrication" },
  { name: "Deep Cleaning", icon: Sparkles, slug: "deep-cleaning" },
  { name: "Pest Control", icon: Bug, slug: "pest-control" },
  { name: "Smart Home", icon: Cpu, slug: "smart-home" },
];

export function CategoryIconStrip() {
  return (
    <section className="border-y border-border/50 bg-card/50 py-6">
      <div className="container">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/services/${cat.slug}`}
              className="group flex min-w-[100px] flex-col items-center gap-2 rounded-xl p-4 transition-all hover:bg-muted"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 transition-all group-hover:border-primary/40 group-hover:shadow-[var(--glow-primary)]">
                <cat.icon size={24} className="text-primary" />
              </div>
              <span className="text-center text-xs font-medium text-muted-foreground group-hover:text-foreground">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
