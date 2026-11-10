// Imports the supplied service tiles for the design, interior, decoration and
// outdoor categories, cropping each tile's caption bar away.
//
//   node scripts/import-design-tiles.mjs <dir-holding-the-tiles>
//
// Same reasoning as import-fabrication-tiles.mjs: the headings were baked into
// the images, and text inside an image cannot be translated to Malayalam, is
// invisible to a screen reader, blurs when scaled, and carries a list number
// that means nothing once the tile stands on its own page.
//
// Written at 480x360. The sources are 252px wide, so these work as section and
// card images but not as 1200x630 page banners, which would be a five-times
// upscale.

import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

const sourceDir = process.argv[2];

if (!sourceDir || !fs.existsSync(sourceDir)) {
  console.error("Usage: node scripts/import-design-tiles.mjs <source-dir>");
  process.exit(1);
}

const outputDir = path.resolve("public/og/design");
const WIDTH = 480;
const HEIGHT = 360;

// Caption share differs per row because the tiles were cut from rows of
// slightly different heights.
const CAPTION_SHARE = {
  249: 0.3,
  243: 0.28,
  223: 0.26,
  219: 0.25,
};

// The supplied sheet is numbered 1-24 and the files run 36-59, so tile N is
// file (35 + N).
const TILES = [
  { source: "38.jpg", target: "architecture-planning.jpg", what: "tile 3 — architecture & building planning" },
  { source: "39.jpg", target: "structural-drafting.jpg", what: "tile 4 — structural engineering & drafting" },
  { source: "40.jpg", target: "interior-design.jpg", what: "tile 5 — interior design & decoration" },
  { source: "41.jpg", target: "interior-execution.jpg", what: "tile 6 — interior execution & installation" },
  { source: "42.jpg", target: "exterior-decoration.jpg", what: "tile 7 — exterior decoration" },
  { source: "43.jpg", target: "landscape-garden.jpg", what: "tile 8 — landscape & garden decoration" },
  { source: "44.jpg", target: "outdoor-lifestyle.jpg", what: "tile 9 — outdoor lifestyle & recreation" },
  { source: "45.jpg", target: "event-decoration.jpg", what: "tile 10 — event & special decoration" },
  // Interior decoration and theme decoration have no tile of their own, so
  // they reuse the interior-design photograph rather than showing a branded
  // card beside eight photographs.
  { source: "40.jpg", target: "interior-decoration.jpg", what: "tile 5 reused — interior decoration" },
  { source: "40.jpg", target: "theme-decoration.jpg", what: "tile 5 reused — theme-based decoration" },
  // Decor products and consultancy have no matching tile; these two keep the
  // generated branded cards instead, which is honest about there being no
  // photograph rather than borrowing an unrelated one.
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
    // No generated-card EXIF marker, so generate-service-cards.mjs leaves
    // these alone.
    .toFile(path.join(outputDir, tile.target));

  const { size } = fs.statSync(path.join(outputDir, tile.target));
  console.log(`  ${tile.target.padEnd(30)} ${(size / 1024).toFixed(0).padStart(3)} kB  ${tile.what}`);
  written += 1;
}

console.log(`\n${written} tile(s) imported to public/og/design/.`);
