// Imports the remaining service tiles so each category shows its own subject.
//
//   node scripts/import-category-tiles.mjs <dir-holding-the-tiles>
//
// Fixes two kinds of mismatch found in review:
//
//   * Five material categories (bricks, roofing, plumbing/electrical,
//     finishing, ready-mix) all showed the same generic material-yard photo,
//     so a visitor on the roofing page saw cement bags.
//   * "Fencing & Outdoor Metal Works" showed a tipper truck, because tile 13
//     (Transportation & Logistics) was used for it. Tile 13 belongs on the
//     transport page.
//   * decor-products showed construction materials and property-consultancy
//     showed a building site; neither is the subject of its page.
//
// Tile numbering: the supplied sheet is numbered 1-24 and the files run 36-59,
// so tile N is file (35 + N).
//
// Captions are cropped off for the same reasons as the other tile importers:
// baked-in text cannot be translated to Malayalam, is invisible to a screen
// reader, blurs when scaled, and carries a list number that is meaningless on
// a standalone page.

import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

const sourceDir = process.argv[2];

if (!sourceDir || !fs.existsSync(sourceDir)) {
  console.error("Usage: node scripts/import-category-tiles.mjs <source-dir>");
  process.exit(1);
}

const WIDTH = 1200;
const HEIGHT = 630;

const CAPTION_SHARE = { 249: 0.3, 243: 0.28, 223: 0.26, 219: 0.25 };

const TILES = [
  // --- material categories that shared one photo -------------------------
  { source: "54.jpg", target: "og/construction-roofing.jpg", what: "tile 19 roofing & shed -> roofing-materials-supply" },
  { source: "59.jpg", target: "og/construction-mep.jpg", what: "tile 24 electrical/plumbing/MEP -> plumbing-electrical-supply" },
  { source: "49.jpg", target: "og/construction-quarry.jpg", what: "tile 14 quarry & aggregate -> aggregate-quarry-supply" },
  { source: "50.jpg", target: "og/construction-equipment.jpg", what: "tile 15 equipment rental -> equipment-rental" },
  { source: "37.jpg", target: "og/construction-house.jpg", what: "tile 2 house & flat -> house/flat construction" },
  { source: "40.jpg", target: "og/construction-finishing.jpg", what: "tile 5 interior -> finishing-materials-supply" },

  // --- real photos replacing generated cards -----------------------------
  { source: "46.jpg", target: "og/construction-demolition.jpg", what: "tile 11 demolition -> replaces generated card" },
  { source: "47.jpg", target: "og/construction-excavation.jpg", what: "tile 12 earthmoving -> replaces generated card" },

  // --- corrections -------------------------------------------------------
  // outdoor-metal showed tile 13 (a tipper truck). Tile 8 (landscape and
  // garden, which includes fencing and pergolas) is the right subject.
  { source: "43.jpg", target: "og/fabrication/outdoor-metal.jpg", what: "tile 8 landscape -> outdoor-metal (was a tipper truck)" },
  { source: "45.jpg", target: "og/design/decor-products.jpg", what: "tile 10 decoration -> decor-products" },
  { source: "39.jpg", target: "og/design/property-consultancy.jpg", what: "tile 4 engineering -> property-consultancy" },
];

let written = 0;

for (const tile of TILES) {
  const from = path.join(sourceDir, tile.source);

  if (!fs.existsSync(from)) {
    console.error(`  ! ${tile.source} not found`);
    continue;
  }

  const target = path.resolve("public", tile.target);
  fs.mkdirSync(path.dirname(target), { recursive: true });

  const meta = await sharp(from).metadata();
  const share = CAPTION_SHARE[meta.height] ?? 0.27;
  const keep = Math.round(meta.height * (1 - share));

  await sharp(from)
    .extract({ left: 0, top: 0, width: meta.width, height: keep })
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    // No generated-card EXIF marker, so generate-service-cards.mjs leaves
    // these alone.
    .toFile(target);

  const { size } = fs.statSync(target);
  console.log(`  ${tile.target.padEnd(42)} ${(size / 1024).toFixed(0).padStart(3)} kB  ${tile.what}`);
  written += 1;
}

console.log(`\n${written} tile(s) imported.`);
