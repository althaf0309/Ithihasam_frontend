import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/BrandLogo";
import { useLang } from "@/contexts/LangContext";
import { footerServiceSlugs, getLocalizedText, serviceCatalogBySlug } from "@/lib/service-catalog";
import { BUSINESS_EMAIL, BUSINESS_LOCATION, BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY, BUSINESS_WHATSAPP } from "@/lib/site";

export function Footer() {
  const { lang, t } = useLang();
  const legalLinks = [
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms & Conditions", to: "/terms-and-conditions" },
  ];

  return (
    <footer id="contact" className="footer-section scroll-mt-24 border-t border-border/50">
      <div className="container grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Link to="/" className="mb-3 inline-flex items-center gap-3" aria-label="Ithihasam home">
            <BrandLogo
              imageClassName="h-10 w-10 rounded-full object-cover shadow-[0_10px_24px_rgba(0,0,0,0.18)] ring-1 ring-white/20"
              titleClassName="text-lg font-bold tracking-tight text-white"
            />
          </Link>
          <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">{t("footer.quickLinks")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="transition-colors hover:text-primary">{t("nav.home")}</Link></li>
            <li><Link to="/services" className="transition-colors hover:text-primary">{t("nav.services")}</Link></li>
            <li><Link to="/blog" className="transition-colors hover:text-primary">{t("nav.blog")}</Link></li>
            <li><Link to="/news" className="transition-colors hover:text-primary">{t("nav.news")}</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-primary">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-primary">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">{t("footer.services")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {footerServiceSlugs.map((slug) => {
              const service = serviceCatalogBySlug[slug];
              return (
                <li key={slug}>
                  <Link to={`/services/${slug}`} className="transition-colors hover:text-primary">
                    {getLocalizedText(service.title, lang)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">{t("footer.contactUs")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-primary" />
              <a href={`tel:${BUSINESS_PHONE}`} className="hover:text-primary">{BUSINESS_PHONE_DISPLAY}</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={14} className="text-whatsapp" />
              <a href={`https://wa.me/${BUSINESS_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:text-whatsapp">
                {t("footer.whatsappUs")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-secondary" /> {BUSINESS_EMAIL}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-primary" /> {BUSINESS_LOCATION}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-4">
        <div className="container flex flex-col items-center justify-between gap-3 text-center text-xs text-muted-foreground md:flex-row md:text-left">
          <span>{t("footer.copyright")}</span>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="transition-colors hover:text-primary">
                {lang === "ml" ? link.label : link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
