import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { BUSINESS_PHONE, BUSINESS_WHATSAPP } from "@/lib/site";
import { useLang } from "@/contexts/LangContext";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
  image?: string;
}

export function ServiceCard({ title, description, icon: Icon, slug, image }: Props) {
  const { t } = useLang();

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-[var(--card-shadow)] transition-all hover:border-primary/30 hover:shadow-[var(--card-shadow-hover)]">
      {image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/90 shadow-lg shadow-primary/30">
            <Icon size={20} className="text-primary-foreground" />
          </div>
        </div>
      )}

      <div className="p-5">
        {!image && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 transition-all group-hover:from-primary/30 group-hover:to-secondary/30">
            <Icon size={24} className="text-primary" />
          </div>
        )}
        <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90">
            <Link to={`/services/${slug}`}>
              {t("nav.bookNow")} <ArrowRight size={14} className="ml-1" />
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild className="border-secondary/50 text-secondary hover:bg-secondary hover:text-secondary-foreground">
            <a href={`tel:${BUSINESS_PHONE}`}><Phone size={14} /></a>
          </Button>
          <Button size="sm" asChild className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
            <a href={`https://wa.me/${BUSINESS_WHATSAPP}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} /></a>
          </Button>
        </div>
      </div>
    </div>
  );
}
