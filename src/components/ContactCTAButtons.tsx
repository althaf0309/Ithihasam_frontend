import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LangContext";
import { BUSINESS_PHONE, BUSINESS_WHATSAPP } from "@/lib/site";

interface Props {
  size?: "sm" | "default" | "lg";
  showLabels?: boolean;
}

export function ContactCTAButtons({ size = "default", showLabels = false }: Props) {
  const { t } = useLang();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size={size}
        asChild
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        <a href={`tel:${BUSINESS_PHONE}`}>
          <Phone size={16} />
          {showLabels && <span className="ml-1">{t("contact.callNow")}</span>}
        </a>
      </Button>
      <Button
        size={size}
        asChild
        className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
      >
        <a href={`https://wa.me/${BUSINESS_WHATSAPP}`} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={16} />
          {showLabels && <span className="ml-1">{t("contact.whatsapp")}</span>}
        </a>
      </Button>
    </div>
  );
}
