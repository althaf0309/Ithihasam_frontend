import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LangContext";

const PHONE = "+911234567890";
const WHATSAPP = "911234567890";

export function Footer() {
  const { t } = useLang();

  return (
    <footer id="contact" className="border-t border-border/50 bg-[hsl(222,22%,10%)] text-gray-300 dark:bg-card dark:text-inherit">
      <div className="container grid gap-8 py-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <span className="text-xs font-bold text-primary-foreground">IT</span>
            </div>
            <span className="text-lg font-bold text-foreground">Ithihasa</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("footer.tagline")}
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">{t("footer.quickLinks")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="transition-colors hover:text-primary">{t("nav.home")}</Link></li>
            <li><Link to="/#services" className="transition-colors hover:text-primary">{t("nav.services")}</Link></li>
            <li><Link to="/blog" className="transition-colors hover:text-primary">{t("nav.blog")}</Link></li>
            <li><Link to="/news" className="transition-colors hover:text-primary">{t("nav.news")}</Link></li>
            <li><Link to="/#why-us" className="transition-colors hover:text-primary">{t("nav.about")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">{t("footer.services")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services/electrical-plumbing" className="transition-colors hover:text-primary">Electrical & Plumbing</Link></li>
            <li><Link to="/services/painting" className="transition-colors hover:text-primary">Painting Services</Link></li>
            <li><Link to="/services/appliance-servicing" className="transition-colors hover:text-primary">Appliance Servicing</Link></li>
            <li><Link to="/services/carpentry" className="transition-colors hover:text-primary">Carpentry & Woodwork</Link></li>
            <li><Link to="/services/deep-cleaning" className="transition-colors hover:text-primary">Deep Cleaning</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">{t("footer.contactUs")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-primary" /> <a href={`tel:${PHONE}`} className="hover:text-primary">+91 12345 67890</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={14} className="text-whatsapp" />
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:text-whatsapp">WhatsApp Us</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-secondary" /> info@ithihasa.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-primary" /> Mumbai, India
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">
        {t("footer.copyright")}
      </div>
    </footer>
  );
}
