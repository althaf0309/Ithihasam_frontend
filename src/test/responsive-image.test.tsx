import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ResponsiveImage, heroPreloadHref } from "@/components/ResponsiveImage";

describe("ResponsiveImage", () => {
  it("puts the layout classes on the <picture>, not only the <img>", () => {
    // <picture> is display:inline by default and ignores classes set on the
    // inner <img>. Inside the absolutely-positioned hero that collapsed the
    // wrapper to zero height and the banner vanished entirely.
    const { container } = render(
      <ResponsiveImage src="/assets/banner-electrical-0rAzh.jpg" alt="Electrical work" className="h-full w-full object-cover" />,
    );

    const picture = container.querySelector("picture");
    expect(picture).not.toBeNull();
    expect(picture).toHaveClass("h-full", "w-full", "object-cover");
    expect(picture).toHaveStyle({ display: "block" });
  });

  it("offers WebP variants derived from the hashed asset name", () => {
    const { container } = render(
      <ResponsiveImage src="/assets/banner-carpentry-DrkgmnIE.jpg" alt="Carpentry" />,
    );

    const source = container.querySelector("source");
    expect(source).toHaveAttribute("type", "image/webp");
    // The hash must be stripped so the path matches the pre-generated files.
    expect(source?.getAttribute("srcSet")).toContain("/og/banner-carpentry-1920.webp 1920w");
    expect(source?.getAttribute("srcSet")).not.toContain("DrkgmnIE");
  });

  it("falls back to a plain <img> when no variants exist", () => {
    const { container } = render(<ResponsiveImage src="https://cdn.example.com/photo.gif" alt="Remote" />);

    expect(container.querySelector("picture")).toBeNull();
    expect(screen.getByAltText("Remote")).toHaveAttribute("src", "https://cdn.example.com/photo.gif");
  });

  it("falls back to the JPEG when an image has no generated variants", () => {
    // banner-pest has no WebP set, so offering one would 404.
    const { container } = render(<ResponsiveImage src="/assets/banner-pest-BzT4T5C3.jpg" alt="Pest control" />);
    expect(container.querySelector("picture")).toBeNull();
    expect(screen.getByAltText("Pest control")).toHaveAttribute("src", "/assets/banner-pest-BzT4T5C3.jpg");
  });

  it("loads the LCP image eagerly and everything else lazily", () => {
    const { rerender } = render(<ResponsiveImage src="/assets/banner-painting-ABC123.jpg" alt="Hero" priority />);
    expect(screen.getByAltText("Hero")).toHaveAttribute("loading", "eager");

    rerender(<ResponsiveImage src="/assets/banner-painting-ABC123.jpg" alt="Hero" />);
    expect(screen.getByAltText("Hero")).toHaveAttribute("loading", "lazy");
  });

  it("preloads the widest WebP variant for the first hero slide", () => {
    expect(heroPreloadHref("/assets/banner-cleaning-QbG_DXcH.jpg")).toBe("/og/banner-cleaning-1920.webp");
    // Vite can split a hash across dashes; the exact-list match still resolves it.
    expect(heroPreloadHref("/assets/banner-electrical-0rAzh-3b.jpg")).toBe("/og/banner-electrical-1920.webp");
    // Nothing to preload for an asset with no generated variants.
    expect(heroPreloadHref("https://cdn.example.com/photo.gif")).toBe("https://cdn.example.com/photo.gif");
  });
});
