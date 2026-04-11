import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
}

const PHONE = "+911234567890";
const WHATSAPP = "911234567890";

export function ServiceCard({ title, description, icon: Icon, slug }: Props) {
  return (
    <div className="group rounded-xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)] transition-all hover:border-primary/30 hover:shadow-[var(--card-shadow-hover)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
        <Icon size={24} className="text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-2">
        <Button asChild size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90">
          <Link to={`/services/${slug}`}>
            Book Now <ArrowRight size={14} className="ml-1" />
          </Link>
        </Button>
        <Button size="sm" variant="outline" asChild className="border-secondary/50 text-secondary hover:bg-secondary hover:text-secondary-foreground">
          <a href={`tel:${PHONE}`}><Phone size={14} /></a>
        </Button>
        <Button size="sm" asChild className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} /></a>
        </Button>
      </div>
    </div>
  );
}
