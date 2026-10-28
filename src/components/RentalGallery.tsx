import { useState } from "react";
import { ImageOff } from "lucide-react";

interface Props {
  images: { src: string; alt: string }[];
  className?: string;
}

/**
 * Image gallery that degrades instead of showing broken images.
 *
 * Rental photos are added over time, one product at a time. A missing file
 * would otherwise render as a browser's broken-image icon, which looks worse
 * on a rental page than no photo at all — people are deciding whether to trust
 * us with a deposit. Each image swaps itself for a neutral placeholder on load
 * failure, and the gallery hides entirely once every image has failed.
 */
export function RentalGallery({ images, className = "" }: Props) {
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const allFailed = images.length > 0 && images.every((img) => failed[img.src]);

  if (!images.length || allFailed) {
    return null;
  }

  return (
    <div className={`grid gap-3 sm:grid-cols-3 ${className}`}>
      {images.map((img) =>
        failed[img.src] ? (
          <div
            key={img.src}
            className="flex aspect-[3/2] items-center justify-center rounded-xl border border-dashed bg-muted/40 text-muted-foreground"
            aria-hidden="true"
          >
            <ImageOff size={20} />
          </div>
        ) : (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            onError={() => setFailed((prev) => ({ ...prev, [img.src]: true }))}
            className="aspect-[3/2] w-full rounded-xl border object-cover"
          />
        ),
      )}
    </div>
  );
}
