/**
 * Analytics and conversion tracking.
 *
 * The site previously had none: no GA4, no pixel, no events. That made it
 * impossible to tell which of the ~409 pages produced a booking, which is
 * exactly the data needed to judge whether the generated local pages earn their
 * place. Booking submissions in particular went completely unmeasured.
 *
 * Inert until VITE_GA_MEASUREMENT_ID is set, so nothing loads and no cookie is
 * written unless the site owner opts in.
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

type GtagArgs = [string, ...unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

let initialised = false;

export function isAnalyticsEnabled() {
  return Boolean(MEASUREMENT_ID) && typeof window !== "undefined";
}

export function initAnalytics() {
  if (!isAnalyticsEnabled() || initialised) {
    return;
  }
  initialised = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: GtagArgs) {
    window.dataLayer!.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    // The SPA sends its own page_view on route change, so the automatic one
    // would double-count every navigation.
    send_page_view: false,
    anonymize_ip: true,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function trackPageView(path: string, title: string) {
  if (!isAnalyticsEnabled()) return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

/** Fired when a booking is accepted by the backend — the site's one conversion. */
export function trackBookingSubmitted(details: { service: string; city: string; source: string }) {
  if (!isAnalyticsEnabled()) return;
  window.gtag?.("event", "generate_lead", {
    currency: "INR",
    service: details.service,
    city: details.city,
    // Which page the lead came from is the whole point: it tells you whether
    // the generated local pages convert or merely exist.
    source_page: details.source,
  });
}

export function trackContactClick(method: "phone" | "whatsapp" | "email") {
  if (!isAnalyticsEnabled()) return;
  window.gtag?.("event", "contact_click", { method });
}
