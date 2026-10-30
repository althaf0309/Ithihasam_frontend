import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { classifyHref } from "@/lib/tracker";

describe("classifyHref", () => {
  it("separates the links that are actually leads", () => {
    // Call and WhatsApp taps are the lead for a home-services business, so
    // these must never be lumped in with ordinary navigation.
    expect(classifyHref("tel:+919400096518")).toBe("phone");
    expect(classifyHref("https://wa.me/919400096518")).toBe("whatsapp");
    expect(classifyHref("mailto:services@ithihasam.in")).toBe("email");
  });

  it("recognises maps and social links", () => {
    expect(classifyHref("https://maps.app.goo.gl/abc123")).toBe("maps");
    expect(classifyHref("https://www.instagram.com/ithihasam")).toBe("social");
  });

  it("treats same-origin links as internal", () => {
    expect(classifyHref("/rentals/kochi")).toBe("internal");
    expect(classifyHref("#booking")).toBe("internal");
  });

  it("treats other hosts as external", () => {
    expect(classifyHref("https://example.com/page")).toBe("external");
  });

  it("is case-insensitive and tolerates whitespace", () => {
    expect(classifyHref("  TEL:+919400096518 ")).toBe("phone");
    expect(classifyHref("HTTPS://WA.ME/919400096518")).toBe("whatsapp");
  });

  it("returns other for a missing href rather than throwing", () => {
    expect(classifyHref(null)).toBe("other");
    expect(classifyHref(undefined)).toBe("other");
    expect(classifyHref("")).toBe("other");
  });
});

describe("click tracking", () => {
  let sent: unknown[];

  beforeEach(async () => {
    vi.resetModules();
    sent = [];
    vi.stubGlobal(
      "fetch",
      vi.fn((_url: string, init: RequestInit) => {
        sent.push(JSON.parse(String(init.body)));
        return Promise.resolve({ ok: true, status: 204 });
      }),
    );
    document.body.innerHTML = "";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("drops a second identical click within the dedupe window", async () => {
    vi.useFakeTimers();
    const { startTracking } = await import("@/lib/tracker");
    startTracking();

    document.body.innerHTML = '<a href="tel:+919400096518">Call Now</a>';
    const link = document.querySelector("a")!;

    link.click();
    link.click();

    // Both clicks land in the same batch window; only one should be queued.
    await vi.advanceTimersByTimeAsync(5000);

    const events = sent.flatMap((batch) => (batch as { events: unknown[] }).events);
    const calls = events.filter((event) => (event as { target_type: string }).target_type === "phone");
    expect(calls).toHaveLength(1);
  });

  it("records the label and classified target of a click", async () => {
    vi.useFakeTimers();
    const { startTracking } = await import("@/lib/tracker");
    startTracking();

    document.body.innerHTML = '<a href="https://wa.me/919400096518">WhatsApp Us</a>';
    document.querySelector("a")!.click();

    await vi.advanceTimersByTimeAsync(5000);

    const events = sent.flatMap((batch) => (batch as { events: Record<string, unknown>[] }).events);
    const whatsapp = events.find((event) => event.target_type === "whatsapp");

    expect(whatsapp).toBeDefined();
    expect(whatsapp?.label).toBe("WhatsApp Us");
    expect(whatsapp?.visitor_id).toBeTruthy();
  });
});
