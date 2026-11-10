// One-off import of the construction photographs supplied by the business.
//
// Run with the source directory as the argument:
//   node scripts/import-construction-photos.mjs <dir-holding-the-originals>
//
// Each photo is resized to the 1200x630 card shape the pages expect, written
// as a progressive JPEG, and deliberately written WITHOUT the generated-card
// EXIF marker. generate-service-cards.mjs only overwrites files carrying that
// marker, so a real photo imported here is never replaced by a generated card.
//
// Two of the supplied images needed handling rather than straight copying, and
// both reasons are recorded here so the decision is not silently lost:
//
//   * The steel-yard photo carries other companies' branding (a TATA Tiscon
//     banner, an ACC banner, and a "... BAR AGENCIES, KASARAGOD" board). That
//     is a different business's signage, so the frame is cropped to the stock
//     itself. Publishing another firm's board on our own supply page implies a
//     relationship that does not exist.
//
//   * The TMT-warehouse image has garbled lettering on the bags
//     ("SCACE FRITT SCINTIONE", "OUINELDIRED, STRENSE"). It reads as fake on
//     any close look, so it is not imported. It is listed in SKIPPED below
//     rather than quietly dropped.

import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

const sourceDir = process.argv[2];

if (!sourceDir || !fs.existsSync(sourceDir)) {
  console.error("Usage: node scripts/import-construction-photos.mjs <source-dir>");
  process.exit(1);
}

const outputDir = path.resolve("public/og");
const WIDTH = 1200;
const HEIGHT = 630;

/**
 * crop: an optional region applied before the resize, as fractions of the
 * source, used to remove another business's signage from the frame.
 */
const PHOTOS = [
  {
    source: "28.jpg",
    target: "construction-materials.jpg",
    what: "mixed material yard: steel, cement, blocks, bricks, aggregate, sheets",
  },
  {
    source: "33.jpg",
    target: "construction-site.jpg",
    what: "house under construction with materials laid out",
  },
  {
    source: "29.jpg",
    target: "construction-delivery.jpg",
    what: "tipper fleet loading at a yard",
  },
  {
    source: "31.jpg",
    target: "construction-aggregate.jpg",
    what: "blue metal graded 6, 12, 20 and 40 mm",
  },
  {
    source: "30.jpg",
    target: "construction-steel.jpg",
    what: "TMT bar stock under a shed",
    // The ACC banner sits mid-frame and the KASARAGOD board on the far left,
    // so the usable region is the right-hand third holding only the bar stock.
    // A first attempt cropping at 42% left the ACC banner MORE prominent than
    // in the original, which is why this is verified visually after import.
    crop: { left: 0.62, top: 0.42, width: 0.38, height: 0.58 },
  },
];

const SKIPPED = [
  {
    source: "32.jpg",
    reason:
      "garbled AI lettering on the bags (\"SCACE FRITT SCINTIONE\", \"OUINELDIRED, STRENSE\") — " +
      "reads as fake on close inspection",
  },
];

fs.mkdirSync(outputDir, { recursive: true });

let written = 0;

for (const photo of PHOTOS) {
  const from = path.join(sourceDir, photo.source);

  if (!fs.existsSync(from)) {
    console.error(`  ! ${photo.source} not found in ${sourceDir}`);
    continue;
  }

  let pipeline = sharp(from);

  if (photo.crop) {
    const meta = await sharp(from).metadata();
    pipeline = pipeline.extract({
      left: Math.round(meta.width * photo.crop.left),
      top: Math.round(meta.height * photo.crop.top),
      width: Math.round(meta.width * photo.crop.width),
      height: Math.round(meta.height * photo.crop.height),
    });
  }

  await pipeline
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    // No EXIF marker: that is what tells generate-service-cards.mjs this is a
    // real photo and must not be overwritten.
    .toFile(path.join(outputDir, photo.target));

  const { size } = fs.statSync(path.join(outputDir, photo.target));
  console.log(
    `  ${photo.target.padEnd(32)} ${(size / 1024).toFixed(0).padStart(4)} kB  ${photo.what}` +
      (photo.crop ? "  [cropped: removed other-brand signage]" : ""),
  );
  written += 1;
}

for (const skip of SKIPPED) {
  console.log(`  ! skipped ${skip.source}: ${skip.reason}`);
}

console.log(`\n${written} photo(s) imported to public/og/.`);
