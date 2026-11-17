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

  it("builds a wa.me url with the text encoded", () => {
    const url = whatsappLink({ service: "Sand Supply", place: "Cherthala" });

    expect(url.startsWith("https://wa.me/")).toBe(true);
    expect(url).toContain("?text=");

    // A raw newline or space in a URL breaks the link in some clients.
    const query = url.slice(url.indexOf("?text=") + 6);
    expect(query).not.toMatch(/[\s\n]/);

    // And it must decode back to the message the customer should see.
    expect(decodeURIComponent(query)).toBe(
      whatsappMessage({ service: "Sand Supply", place: "Cherthala" }),
    );
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
      const text = decodeURIComponent(url.split("?text=")[1] ?? "");
      expect(text.length, `empty message for ${JSON.stringify(enquiry)}`).toBeGreaterThan(20);
    }
  });
});
