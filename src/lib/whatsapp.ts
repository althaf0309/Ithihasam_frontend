import { BUSINESS_WHATSAPP } from "@/lib/site";

/**
 * Builds a wa.me link that arrives with the enquiry already written out.
 *
 * A bare wa.me link opens an empty chat, so the customer has to type what they
 * want and we have no idea which page they came from. Prefilling the message
 * means the first thing we see is the service and the location, which is most
 * of what is needed to quote.
 *
 * The message is sent in Malayalam and English together rather than in the
 * page's current language. Whoever answers may not be the person who set the
 * language, and a customer who switched to Malayalam still usually reads the
 * English service name — sending both removes the guesswork for everyone.
 */

export interface WhatsAppEnquiry {
  /** The service or category, as shown on the page. */
  service?: string;
  /** Town, district or area, when the page is location-specific. */
  place?: string;
  /** Page path, so we can tell which page produced the enquiry. */
  path?: string;
}

/** The Malayalam half of the prefilled message. */
function malayalamLine(service?: string, place?: string) {
  if (service && place) {
    return `എനിക്ക് ${place}-ൽ ${service} വേണം.`;
  }
  if (service) {
    return `എനിക്ക് ${service} സംബന്ധിച്ച് അന്വേഷിക്കണം.`;
  }
  return "എനിക്ക് ഇത്തിഹാസത്തിന്റെ സേവനങ്ങളെക്കുറിച്ച് അറിയണം.";
}

/** The English half. */
function englishLine(service?: string, place?: string) {
  if (service && place) {
    return `I need ${service} in ${place}.`;
  }
  if (service) {
    return `I would like to enquire about ${service}.`;
  }
  return "I would like to know more about Ithihasam services.";
}

/**
 * The message body, bilingual, with the source page appended so an enquiry can
 * be traced back to the page that produced it.
 */
export function whatsappMessage({ service, place, path }: WhatsAppEnquiry = {}) {
  const lines = [malayalamLine(service, place), englishLine(service, place)];

  if (path && path !== "/") {
    lines.push("", `(ithihasam.in${path})`);
  }

  return lines.join("\n");
}

/**
 * A wa.me URL with the message prefilled.
 *
 * Passing no enquiry gives the generic greeting, so a header or footer button
 * still opens a chat with something in it rather than a blank box.
 */
export function whatsappLink(enquiry: WhatsAppEnquiry = {}) {
  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(whatsappMessage(enquiry))}`;
}
