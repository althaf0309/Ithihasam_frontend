/**
 * Visitor tracking: page views, clicks, scroll depth and form submissions.
 *
 * Deliberately small and dependency-free. Events are queued and sent in batches
 * so a browsing session makes a handful of requests rather than one per click,
 * and every send is fire-and-forget — a tracking failure must never surface to
 * a customer or block a booking.
 *
 * Nothing identifying is collected. The visitor id is a random string kept in
 * sessionStorage; the server derives a coarse town from the IP and discards it.
 */

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");
const ENDPOINT = `${API_BASE}/analytics/events/`;

const VISITOR_KEY = "ith_visitor";
const SESSION_KEY = "ith_session";

/** A second tap on the same element within this window is one intent. */
const DEDUPE_MS = 2000;
const FLUSH_MS = 4000;
const MAX_BATCH = 20;

export type EventKind = "page_view" | "click" | "form_submit" | "page_exit" | "error";
export type TargetType =
  | "whatsapp" | "phone" | "email" | "maps"
  | "social" | "form" | "internal" | "external" | "other";

interface TrackedEvent {
  kind: EventKind;
  visitor_id: string;
  session_id: string;
  path: string;
  page_title?: string;
  referrer?: string;
  target_type?: TargetType;
  label?: string;
  href?: string;
  section?: string;
  seconds_on_page?: number;
  scroll_depth?: number;
  form_name?: string;
  form_service?: string;
  form_city?: string;
  form_succeeded?: boolean;
}

function randomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 24);
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function storedId(key: string, storage: Storage | undefined) {
  try {
    if (!storage) return randomId();
    const existing = storage.getItem(key);
    if (existing) return existing;
    const fresh = randomId();
    storage.setItem(key, fresh);
    return fresh;
  } catch {
    // Private mode or blocked storage: a per-load id still works, it just
    // cannot link page views within the visit.
    return randomId();
  }
}

let visitorId = "";
let sessionId = "";

function ids() {
  if (!visitorId) {
    visitorId = storedId(VISITOR_KEY, typeof localStorage !== "undefined" ? localStorage : undefined);
    sessionId = storedId(SESSION_KEY, typeof sessionStorage !== "undefined" ? sessionStorage : undefined);
  }
  return { visitorId, sessionId };
}

/**
 * Works out what a link actually opens.
 *
 * For a home-services business the distinction that matters is call vs WhatsApp
 * vs form — those are leads. Everything else is navigation.
 */
export function classifyHref(href: string | null | undefined): TargetType {
  if (!href) return "other";
  const value = href.trim().toLowerCase();

  if (value.startsWith("tel:")) return "phone";
  if (value.startsWith("mailto:")) return "email";
  if (value.includes("wa.me") || value.includes("whatsapp.com") || value.startsWith("whatsapp:")) return "whatsapp";
  if (value.includes("maps.google") || value.includes("goo.gl/maps") || value.includes("maps.app.goo.gl")) return "maps";
  if (/facebook\.com|instagram\.com|twitter\.com|x\.com|youtube\.com|linkedin\.com/.test(value)) return "social";
  if (value.startsWith("/") || value.startsWith("#")) return "internal";

  try {
    if (typeof window !== "undefined" && new URL(href, window.location.origin).origin === window.location.origin) {
      return "internal";
    }
  } catch {
    return "other";
  }

  return "external";
}

/** Nearest meaningful section name, for "where on the page was this". */
function sectionOf(element: Element): string {
  const labelled = element.closest<HTMLElement>("[data-section]");
  if (labelled?.dataset.section) return labelled.dataset.section;

  if (element.closest("header")) return "header";
  if (element.closest("footer")) return "footer";
  if (element.closest("aside")) return "sidebar";
  if (element.closest("form")) return "form";
  if (element.closest("nav")) return "nav";
  return "body";
}

// ----------------------------------------------------------------- transport

let queue: TrackedEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

function send(events: TrackedEvent[], useBeacon = false) {
  if (!events.length) return;
  const body = JSON.stringify({ events });

  try {
    // sendBeacon survives the page unloading, which a fetch does not.
    if (useBeacon && typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
      return;
    }

    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* Analytics must never surface an error to the visitor. */
    });
  } catch {
    /* ignore */
  }
}

function flush(useBeacon = false) {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  const batch = queue;
  queue = [];
  send(batch, useBeacon);
}

function enqueue(event: TrackedEvent) {
  queue.push(event);
  if (queue.length >= MAX_BATCH) {
    flush();
    return;
  }
  if (!timer) {
    timer = setTimeout(() => flush(), FLUSH_MS);
  }
}

// ------------------------------------------------------------------ tracking

const recentClicks = new Map<string, number>();

export function track(kind: EventKind, detail: Partial<TrackedEvent> = {}) {
  if (typeof window === "undefined") return;

  const { visitorId: vid, sessionId: sid } = ids();

  enqueue({
    kind,
    visitor_id: vid,
    session_id: sid,
    path: window.location.pathname,
    page_title: document.title,
    ...detail,
  });
}

export function trackPageView() {
  track("page_view", { referrer: document.referrer || undefined });
}

export function trackFormSubmit(detail: { service?: string; city?: string; succeeded?: boolean; name?: string }) {
  track("form_submit", {
    form_name: detail.name ?? "booking",
    form_service: detail.service,
    form_city: detail.city,
    form_succeeded: detail.succeeded,
  });
  // Leads are the point of the site; send immediately rather than batching.
  flush();
}

function onClick(event: MouseEvent) {
  const target = event.target as Element | null;
  const clickable = target?.closest?.("a, button, [role='button']");
  if (!clickable) return;

  const href = clickable.getAttribute("href");
  const label = (clickable.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120)
    || clickable.getAttribute("aria-label")
    || "";

  const key = `${window.location.pathname}|${label}|${href ?? ""}`;
  const now = Date.now();
  const last = recentClicks.get(key);

  // Browser-side half of the duplicate rule. The server checks too, because a
  // retried request can deliver the same click twice.
  if (last && now - last < DEDUPE_MS) return;
  recentClicks.set(key, now);

  track("click", {
    target_type: href ? classifyHref(href) : "form",
    label,
    href: href ?? undefined,
    section: sectionOf(clickable),
  });

  // A tap that leaves the site would otherwise lose the queued event.
  const type = href ? classifyHref(href) : "form";
  if (type === "phone" || type === "whatsapp" || type === "email" || type === "external") {
    flush(true);
  }
}

let startedAt = 0;
let maxScroll = 0;

function onScroll() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return;
  const percent = Math.round((window.scrollY / scrollable) * 100);
  if (percent > maxScroll) maxScroll = Math.min(100, percent);
}

function onHide() {
  if (document.visibilityState !== "hidden") return;
  track("page_exit", {
    seconds_on_page: Math.round((Date.now() - startedAt) / 1000),
    scroll_depth: maxScroll,
  });
  flush(true);
}

let started = false;

/** Attaches the listeners. Safe to call more than once. */
export function startTracking() {
  if (started || typeof window === "undefined") return () => {};
  started = true;
  startedAt = Date.now();

  document.addEventListener("click", onClick, { capture: true, passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onHide);

  return () => {
    document.removeEventListener("click", onClick, { capture: true });
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onHide);
    started = false;
  };
}

/** Resets per-page counters on a client-side route change. */
export function resetPageTimers() {
  startedAt = Date.now();
  maxScroll = 0;
}
