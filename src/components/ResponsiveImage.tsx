import { VARIANT_BASES } from "@/lib/image-variants";

const WIDTHS = [640, 1024, 1600, 1920];

/**
 * Maps a bundled asset URL back to the WebP variants in /og/.
 *
 * Vite hashes imported assets (banner-electrical-0rAzh.jpg), so the basename is
 * recovered to find the matching pre-generated set. Returns null for anything
 * without variants, in which case the caller falls back to the original.
 */
function variantBaseFor(src: string) {
  const match = /\/([A-Za-z0-9_-]+)\.(?:jpg|jpeg|png)$/i.exec(src);
  if (!match) {
    return null;
  }

  // Vite appends a build hash: banner-cleaning-QbG_DXcH.jpg. Strip only that
  // final segment, and only when it looks like a hash rather than a word.
  //
  // The previous pattern was non-greedy, so "banner-cleaning-QbG_DXcH" matched
  // as base "banner" with "-cleaning-QbG_DXcH" treated as the hash. Every image
  // on the site then pointed at /og/banner-1920.webp, which does not exist, and
  // the hero rendered nothing.
  // Matching against the known source names is more reliable than guessing
  // where the hash begins. Vite can split a hash across dashes
  // ("banner-electrical-0rAzh-3b"), which no heuristic handles cleanly.
  const name = match[1];
  const known = VARIANT_BASES.find((base) => name === base || name.startsWith(`${base}-`));
  return known ?? null;
}

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** Set on the LCP image only. Everything below the fold should stay lazy. */
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

export function ResponsiveImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "100vw",
  width,
  height,
}: Props) {
  const base = variantBaseFor(src);

  const img = (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      // The hero image is the LCP element; lazy-loading it delays the metric
      // the ranking signal is measured on.
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
    />
  );

  if (!base) {
    return img;
  }

  return (
    // <picture> defaults to display:inline and ignores the sizing classes that
    // are set on the inner <img>. Inside an absolutely-positioned, full-height
    // hero that collapses the wrapper to zero height and the image disappears,
    // so the layout classes have to be mirrored onto the wrapper itself.
    <picture className={className} style={{ display: "block" }}>
      <source
        type="image/webp"
        sizes={sizes}
        srcSet={WIDTHS.map((w) => `/og/${base}-${w}.webp ${w}w`).join(", ")}
      />
      {img}
    </picture>
  );
}

/** Preload href for the first hero slide, so the LCP fetch starts in the head. */
export function heroPreloadHref(src: string) {
  const base = variantBaseFor(src);
  return base ? `/og/${base}-1920.webp` : src;
}
