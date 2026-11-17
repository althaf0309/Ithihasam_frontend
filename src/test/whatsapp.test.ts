import { describe, expect, it } from "vitest";

import { whatsappLink, whatsappMessage } from "@/lib/whatsapp";

describe("whatsapp enquiry link", () => {
  it("writes the enquiry in Malayalam and English together", () => {
    // Whoever answers may not be the person who set the page language, so the
    // message carries both rather than following the toggle.
    const message = whatsappMessage({ service: "furniture rental", place: "Kochi" });

    expect(message).toMatch(/[ഀ-ൿ]/); // Malayalam present
    expect(message).toContain("Kochi");
    expect(message).toContain("I need furniture rental in Kochi.");
  });

  it("uses the Malayalam name in the Malayalam line, English in the English one", () => {
    // Without serviceMl the Malayalam sentence embedded an English category
    // name and read as half-translated.
    const message = whatsappMessage({
      service: "Cement & Steel Supply",
      serviceMl: "സിമന്റ് & സ്റ്റീൽ വിതരണം",
    });

    const [malayalamLine, englishLine] = message.split(String.fromCharCode(10));

    expect(malayalamLine).toContain("സിമന്റ് & സ്റ്റീൽ വിതരണം");
    expect(malayalamLine).not.toContain("Cement");
    expect(englishLine).toContain("Cement & Steel Supply");
    expect(englishLine).not.toMatch(/[ഀ-ൿ]/);
  });

  it("falls back to the English name when no Malayalam one exists", () => {
    const message = whatsappMessage({ service: "Ready-Mix Concrete" });

    // Still bilingual in sentence structure, just with the English noun.
    expect(message.split(String.fromCharCode(10))[0]).toMatch(/[ഀ-ൿ]/);
    expect(message).toContain("Ready-Mix Concrete");
  });

  it("still says something useful with no service or place", () => {
    // The header and footer buttons have no page context. An empty chat is
    // what this change exists to avoid, so the generic case must not be blank.
    const message = whatsappMessage();

    expect(message.trim().length).toBeGreaterThan(20);
    expect(message).toMatch(/[ഀ-ൿ]/);
    expect(message).toContain("Ithihasam");
  });

  it("names the service when the place is unknown", () => {
    const message = whatsappMessage({ service: "Sand Supply" });

    expect(message).toContain("Sand Supply");
    expect(message).not.toContain("undefined");
    expect(message).not.toContain("in .");
  });

  it("appends the source page but never for the homepage", () => {
    expect(whatsappMessage({ service: "x", path: "/sand-supply-cherthala" })).toContain(
      "(ithihasam.in/sand-supply-cherthala)",
    );
    expect(whatsappMessage({ service: "x", path: "/" })).not.toContain("ithihasam.in/");
  });

  it("uses the click-to-chat endpoint that works on web and desktop", () => {
    // wa.me drops ?text= on WhatsApp Web and the desktop client, which opened
    // an empty chat even though the link itself was correct.
    const url = whatsappLink({ service: "Sand Supply", place: "Cherthala" });

    expect(url.startsWith("https://api.whatsapp.com/send?")).toBe(true);
    expect(url).not.toContain("wa.me");
    expect(url).toContain("&text=");

    // A raw newline or space in a URL breaks the link in some clients.
    const query = url.slice(url.indexOf("&text=") + 6);
    expect(query).not.toMatch(/[\s\n]/);

    // And it must decode back to the message the customer should see.
    expect(decodeURIComponent(query)).toBe(
      whatsappMessage({ service: "Sand Supply", place: "Cherthala" }),
    );
  });

  it("survives a service name containing an ampersand", () => {
    // "Cement & Steel Supply" is a real category. An unencoded & would end the
    // text parameter early and the message would arrive truncated or empty.
    const url = whatsappLink({ service: "Cement & Steel Supply" });
    const parsed = new URL(url);

    expect(parsed.searchParams.get("phone")).toBeTruthy();
    expect(parsed.searchParams.get("text")).toContain("Cement & Steel Supply");
    expect(url).not.toContain("&amp;");
  });

  it("never produces a link without a message", () => {
    // The bug this replaces: a bare wa.me link opened an empty chat.
    for (const enquiry of [
      {},
      { service: "Interior Design" },
      { place: "Thalassery" },
      { service: "Demolition Services", place: "Ranni", path: "/demolition-services-ranni" },
    ]) {
      const url = whatsappLink(enquiry);
      const text = new URL(url).searchParams.get("text") ?? "";
      expect(text.length, `empty message for ${JSON.stringify(enquiry)}`).toBeGreaterThan(20);
    }
  });
});
