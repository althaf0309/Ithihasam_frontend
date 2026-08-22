// Generates responsive WebP variants of the hero and social images.
//
// The hero previously shipped seven full-size JPEGs (818 kB total) with no
// srcset, no modern format, and no preload — all decoded on the landing page,
// which is exactly where Largest Contentful Paint is measured. Core Web Vitals
// are a ranking signal, so this is SEO work, not just performance work.
//
// Runs before `vite build`. Output goes to public/og/ so URLs stay stable and
// unhashed, which matters for og:image and preload hints.

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.resolve("src/assets");
const outputDir = path.resolve("public/og");

// The hero renders full-bleed, so the widths track common viewport widths.
const WIDTHS = [640, 1024, 1600, 1920];

const HERO_SOURCES = [
  "banner-electrical",
  "banner-painting",
  "banner-appliance",
  "banner-carpentry",
  "banner-cleaning",
  "banner-smarthome",
  "banner-fabrication",
  "hero-professionals",
  "blog-header",
];

fs.mkdirSync(outputDir, { recursive: true });

let generated = 0;
let skipped = 0;
// Compared like-for-like: source JPEG vs the widest WebP variant, since that is
// what replaces it on a desktop viewport. Smaller viewports do considerably
// better than this figure suggests.
let bytesBefore = 0;
let bytesAfterLargest = 0;
let smallestVariantTotal = 0;

for (const name of HERO_SOURCES) {
  const source = path.join(sourceDir, `${name}.jpg`);
  if (!fs.existsSync(source)) {
    console.warn(`  ! missing source: ${name}.jpg`);
    continue;
  }

  bytesBefore += fs.statSync(source).size;
  const image = sharp(source);
  const { width: sourceWidth } = await image.metadata();

  let largest = 0;
  let smallest = Infinity;

  const sourceMtime = fs.statSync(source).mtimeMs;

  for (const width of WIDTHS) {
    // Never upscale: a 1920px source has nothing to give a 1920px variant twice.
    if (sourceWidth && width > sourceWidth) continue;

    const target = path.join(outputDir, `${name}-${width}.webp`);

    // Re-encoding unchanged images added minutes to every build. Skip any
    // variant that is already newer than its source.
    const fresh = fs.existsSync(target) && fs.statSync(target).mtimeMs >= sourceMtime;
    if (fresh) {
      skipped += 1;
    } else {
      await sharp(source).resize({ width }).webp({ quality: 78, effort: 5 }).toFile(target);
      generated += 1;
    }

    const size = fs.statSync(target).size;
    largest = Math.max(largest, size);
    smallest = Math.min(smallest, size);
  }

  bytesAfterLargest += largest;
  smallestVariantTotal += Number.isFinite(smallest) ? smallest : 0;
}

const desktopSaving = bytesBefore ? (((bytesBefore - bytesAfterLargest) / bytesBefore) * 100).toFixed(0) : "0";
const mobileSaving = bytesBefore ? (((bytesBefore - smallestVariantTotal) / bytesBefore) * 100).toFixed(0) : "0";

console.log(
  `Images: ${generated} WebP variants generated, ${skipped} already current (${HERO_SOURCES.length} sources).\n` +
    `  desktop (1920w): ${(bytesBefore / 1024).toFixed(0)} kB JPEG -> ${(bytesAfterLargest / 1024).toFixed(0)} kB WebP (${desktopSaving}% smaller)\n` +
    `  mobile   (640w): ${(bytesBefore / 1024).toFixed(0)} kB JPEG -> ${(smallestVariantTotal / 1024).toFixed(0)} kB WebP (${mobileSaving}% smaller)`,
);
