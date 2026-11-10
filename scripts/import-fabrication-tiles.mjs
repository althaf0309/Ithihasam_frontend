// Imports the numbered service tiles supplied for the metal / aluminium /
// roofing work, cropping the caption bar off each one.
//
//   node scripts/import-fabrication-tiles.mjs <dir-holding-the-tiles>
//
// Two decisions worth recording.
//
// The caption bar is cropped away. Each tile arrived with its heading baked
// into the image ("1. CONSTRUCTION MATERIAL SUPPLY"). Text inside an image
// cannot be translated for the Malayalam version of the site, cannot be read
// by a screen reader, goes blurry when the image is scaled, and the leading
// number is meaningless once the tile is alone on its own page. The heading
// comes from the page instead.
//
// They are written at 480x360, not the 1200x630 the page banners use. The
// sources are only 252px wide, so a banner would be a five-times upscale and
// visibly soft. At card size they are sharp, and they are used as sub-service
// thumbnails rather than as page banners.

import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

const sourceDir = process.argv[2];

if (!sourceDir || !fs.existsSync(sourceDir)) {
  console.error("Usage: node scripts/import-fabrication-tiles.mjs <source-dir>");
  process.exit(1);
}

const outputDir = path.resolve("public/og/fabrication");
const WIDTH = 480;
const HEIGHT = 360;

// The caption bar occupies the bottom of each tile. The exact share differs
// because the tiles were cut from rows of slightly different heights, so the
// fraction is measured per row rather than assumed to be uniform.
const CAPTION_SHARE = {
  249: 0.3,
  243: 0.28,
  223: 0.26,
  219: 0.25,
};

/** Only the tiles this section actually uses. */
const TILES = [
  { source: "51.jpg", target: "welding.jpg", what: "welding services" },
  { source: "52.jpg", target: "aluminium-fabrication.jpg", what: "aluminium doors and partitions" },
  { source: "53.jpg", target: "steel-iron-fabrication.jpg", what: "steel railings and staircases" },
  { source: "54.jpg", target: "roofing-shed.jpg", what: "roofing and shed construction" },
  { source: "55.jpg", target: "gate-fabrication.jpg", what: "gate fabrication" },
  { source: "56.jpg", target: "automatic-gates.jpg", what: "automatic and smart gates" },
  { source: "57.jpg", target: "glass-acp.jpg", what: "glass, ACP and partition works" },
  { source: "58.jpg", target: "rolling-shutters.jpg", what: "rolling shutters" },
  { source: "48.jpg", target: "outdoor-metal.jpg", what: "outdoor metal and fencing" },
];

fs.mkdirSync(outputDir, { recursive: true });

let written = 0;

for (const tile of TILES) {
  const from = path.join(sourceDir, tile.source);

  if (!fs.existsSync(from)) {
    console.error(`  ! ${tile.source} not found`);
    continue;
  }

  const meta = await sharp(from).metadata();
  const share = CAPTION_SHARE[meta.height] ?? 0.27;
  const keep = Math.round(meta.height * (1 - share));

  await sharp(from)
    .extract({ left: 0, top: 0, width: meta.width, height: keep })
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
    .jpeg({ quality: 84, progressive: true, mozjpeg: true })
    // No generated-card EXIF marker: these are supplied images, so
    // generate-service-cards.mjs must never overwrite them.
    .toFile(path.join(outputDir, tile.target));

  const { size } = fs.statSync(path.join(outputDir, tile.target));
  console.log(
    `  ${tile.target.padEnd(28)} ${(size / 1024).toFixed(0).padStart(3)} kB  ` +
      `${meta.width}x${meta.height} -> cropped ${Math.round(share * 100)}% caption  ${tile.what}`,
  );
  written += 1;
}

console.log(`\n${written} tile(s) imported to public/og/fabrication/.`);
