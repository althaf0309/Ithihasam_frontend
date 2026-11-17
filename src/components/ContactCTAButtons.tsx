import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackContactClick } from "@/lib/analytics";
import { useLang } from "@/contexts/LangContext";
import { useLocation } from "react-router-dom";
import { BUSINESS_PHONE } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

interface Props {
  size?: "sm" | "default" | "lg";
  showLabels?: boolean;
  /** Service or category name, so the WhatsApp message says what is wanted. */
  service?: string;
  /** Town or district, when the page is location-specific. */
  place?: string;
}

export function ContactCTAButtons({ size = "default", showLabels = false, service, place }: Props) {
  const { t } = useLang();
  const { pathname } = useLocation();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size={size}
        asChild
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        <a href={`tel:${BUSINESS_PHONE}`} onClick={() => trackContactClick("phone")}>
          <Phone size={16} />
          {showLabels && <span className="ml-1">{t("contact.callNow")}</span>}
        </a>
      </Button>
      <Button
        size={size}
        asChild
        className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
      >
        <a
          href={whatsappLink({ service, place, path: pathname })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactClick("whatsapp")}
        >
          <MessageCircle size={16} />
          {showLabels && <span className="ml-1">{t("contact.whatsapp")}</span>}
        </a>
      </Button>
    </div>
  );
}
