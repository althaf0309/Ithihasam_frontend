const WIDTHS = [640, 1024, 1600, 1920];

/**
 * Maps a bundled asset URL back to the WebP variants in /og/.
 *
 * Vite hashes imported assets (banner-electrical-0rAzh.jpg), so the basename is
 * recovered to find the matching pre-generated set. Returns null for anything
 * without variants, in which case the caller falls back to the original.
 */
function variantBaseFor(src: string) {
  const match = /\/([a-z0-9-]+?)(?:-[A-Za-z0-9_-]{6,})?\.(?:jpg|jpeg|png)$/i.exec(src);
  return match ? match[1] : null;
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
    <picture>
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
