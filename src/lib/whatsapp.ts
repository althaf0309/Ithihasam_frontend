import { BUSINESS_WHATSAPP } from "@/lib/site";

/**
 * Builds a click-to-chat link that arrives with the enquiry already written out.
 *
 * A bare link opens an empty chat, so the customer has to type what they
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
  /**
   * The same service in Malayalam. Without it the Malayalam sentence embeds an
   * English name, which reads as half-translated.
   */
  serviceMl?: string;
  /** Town, district or area, when the page is location-specific. */
  place?: string;
  /** Page path, so we can tell which page produced the enquiry. */
  path?: string;
}

/**
 * The Malayalam half of the prefilled message.
 *
 * Falls back to the English service name when no Malayalam one is supplied,
 * which is still better than dropping the service from the sentence.
 */
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
export function whatsappMessage({ service, serviceMl, place, path }: WhatsAppEnquiry = {}) {
  const lines = [malayalamLine(serviceMl ?? service, place), englishLine(service, place)];

  if (path && path !== "/") {
    lines.push("", `(ithihasam.in${path})`);
  }

  return lines.join("\n");
}

/**
 * A click-to-chat URL with the message prefilled.
 *
 * Uses api.whatsapp.com/send rather than wa.me. Both work on the mobile app,
 * but wa.me frequently drops the ?text= payload on WhatsApp Web and the
 * desktop client, which opened an empty chat even though the link was correct.
 * api.whatsapp.com is the documented click-to-chat endpoint and carries the
 * text through on all three.
 *
 * Passing no enquiry gives the generic greeting, so a header or footer button
 * still opens a chat with something in it rather than a blank box.
 */
export function whatsappLink(enquiry: WhatsAppEnquiry = {}) {
  const text = encodeURIComponent(whatsappMessage(enquiry));
  return `https://api.whatsapp.com/send?phone=${BUSINESS_WHATSAPP}&text=${text}`;
}
