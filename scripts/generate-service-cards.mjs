// Generates branded graphic cards for pages that have no photograph yet.
//
// These are designed images, not fake photographs. A stock photo of someone
// else's building site, or an AI-generated one, would misrepresent work the
// business has not done; a clean branded card with the service name does not
// pretend to be anything it is not, and it reads as deliberate rather than
// unfinished.
//
// Replace any of these with a real photo of the same filename and the build
// will use the photo instead: generation skips a file it did not create.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

/**
 * Files git tracks, as a set of absolute paths.
 *
 * Computed once. Outside a git checkout this is empty, and generation falls
 * back to the EXIF marker alone.
 */
const trackedFiles = (() => {
  try {
    const out = execFileSync("git", ["ls-files", "public/og"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return new Set(
      out
        .split(/\r?\n/)
        .filter(Boolean)
        .map((f) => path.resolve(f)),
    );
  } catch {
    return new Set();
  }
})();

function isTrackedByGit(target) {
  return trackedFiles.has(path.resolve(target));
}

const outputDir = path.resolve("public/og");
const WIDTH = 1200;
const HEIGHT = 630;

// Marker written into the file so a later run can tell its own output from a
// real photograph that has been dropped in to replace it.
const GENERATED_MARKER = "ithihasam-generated-card";

const BRAND = {
  ink: "#0b0f14",
  inkSoft: "#11161d",
  accent: "#f97316",
  accentSoft: "#fb923c",
  text: "#f8fafc",
  muted: "#94a3b8",
  line: "#1e293b",
};

/** Simple icon glyphs, drawn rather than imported, so there is no asset to miss. */
const ICONS = {
  materials: `<path d="M8 40 L32 26 L56 40 L32 54 Z" fill="none" stroke="${BRAND.accent}" stroke-width="3" stroke-linejoin="round"/>
              <path d="M8 40 V52 L32 66 L56 52 V40" fill="none" stroke="${BRAND.accent}" stroke-width="3" stroke-linejoin="round"/>`,
  building: `<rect x="12" y="20" width="22" height="46" fill="none" stroke="${BRAND.accent}" stroke-width="3"/>
             <rect x="38" y="34" width="18" height="32" fill="none" stroke="${BRAND.accent}" stroke-width="3"/>
             <path d="M18 30h4M26 30h4M18 40h4M26 40h4M18 50h4M26 50h4M44 44h4M44 54h4" stroke="${BRAND.accent}" stroke-width="2.5" stroke-linecap="round"/>`,
  delivery: `<rect x="8" y="30" width="30" height="22" fill="none" stroke="${BRAND.accent}" stroke-width="3"/>
             <path d="M38 38h10l8 9v5H38z" fill="none" stroke="${BRAND.accent}" stroke-width="3" stroke-linejoin="round"/>
             <circle cx="20" cy="58" r="5" fill="none" stroke="${BRAND.accent}" stroke-width="3"/>
             <circle cx="48" cy="58" r="5" fill="none" stroke="${BRAND.accent}" stroke-width="3"/>`,
  demolition: `<path d="M10 64 L10 30 L30 30 L30 64" fill="none" stroke="${BRAND.accent}" stroke-width="3" stroke-linejoin="round"/>
               <path d="M14 22 L26 22" stroke="${BRAND.accent}" stroke-width="3" stroke-linecap="round"/>
               <path d="M38 64 L38 44 L52 44" fill="none" stroke="${BRAND.accent}" stroke-width="3" stroke-linejoin="round"/>
               <path d="M40 34 L48 26 M50 32 L58 24 M44 20 L52 12" stroke="${BRAND.accentSoft}" stroke-width="2.5" stroke-linecap="round"/>`,
  excavation: `<path d="M6 62 H58" stroke="${BRAND.accent}" stroke-width="3" stroke-linecap="round"/>
               <rect x="10" y="40" width="20" height="14" fill="none" stroke="${BRAND.accent}" stroke-width="3"/>
               <path d="M30 44 L44 28 L52 34" fill="none" stroke="${BRAND.accent}" stroke-width="3" stroke-linejoin="round"/>
               <path d="M46 36 L58 36 L54 48 L44 46 Z" fill="none" stroke="${BRAND.accent}" stroke-width="3" stroke-linejoin="round"/>
               <circle cx="16" cy="56" r="4" fill="none" stroke="${BRAND.accent}" stroke-width="2.5"/>
               <circle cx="26" cy="56" r="4" fill="none" stroke="${BRAND.accent}" stroke-width="2.5"/>`,
  rental: `<path d="M10 34 L32 16 L54 34" fill="none" stroke="${BRAND.accent}" stroke-width="3" stroke-linejoin="round"/>
           <rect x="16" y="34" width="32" height="30" fill="none" stroke="${BRAND.accent}" stroke-width="3"/>
           <rect x="26" y="46" width="12" height="18" fill="none" stroke="${BRAND.accent}" stroke-width="3"/>`,
};

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** Wraps a title across at most three lines, breaking on words. */
function wrap(text, perLine = 22, maxLines = 3) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > perLine && current) {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    } else {
      current = candidate;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  return lines;
}

function cardSvg({ title, subtitle, icon }) {
  const lines = wrap(title);
  const startY = 300 - (lines.length - 1) * 34;

  const titleLines = lines
    .map(
      (line, index) =>
        `<text x="80" y="${startY + index * 68}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" ` +
        `font-size="58" font-weight="800" fill="${BRAND.text}">${escapeXml(line)}</text>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <title>${GENERATED_MARKER}</title>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND.ink}"/>
      <stop offset="100%" stop-color="${BRAND.inkSoft}"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${BRAND.accent}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${BRAND.accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <!-- Faint grid, suggesting a drawing sheet without imitating a photo. -->
  <g stroke="${BRAND.line}" stroke-width="1" opacity="0.5">
    ${Array.from({ length: 11 }, (_, i) => `<line x1="${i * 120}" y1="0" x2="${i * 120}" y2="${HEIGHT}"/>`).join("")}
    ${Array.from({ length: 6 }, (_, i) => `<line x1="0" y1="${i * 126}" x2="${WIDTH}" y2="${i * 126}"/>`).join("")}
  </g>

  <rect x="0" y="0" width="10" height="${HEIGHT}" fill="${BRAND.accent}"/>

  <g transform="translate(80, 96)">${ICONS[icon] ?? ICONS.materials}</g>

  ${titleLines}

  <text x="80" y="${startY + lines.length * 68 + 14}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
        font-size="28" font-weight="500" fill="${BRAND.muted}">${escapeXml(subtitle)}</text>

  <text x="80" y="${HEIGHT - 60}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
        font-size="30" font-weight="700" fill="${BRAND.accentSoft}">Ithihasam</text>
  <text x="248" y="${HEIGHT - 60}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
        font-size="24" fill="${BRAND.muted}">ithihasam.in</text>
</svg>`;
}

const CARDS = [
  { file: "construction-materials.jpg", title: "Construction Materials", subtitle: "Sand, cement, steel, blocks and finishes", icon: "materials" },
  { file: "construction-site.jpg", title: "Building & Construction", subtitle: "Houses, apartments and commercial projects", icon: "building" },
  { file: "construction-delivery.jpg", title: "Delivered to Site", subtitle: "Bulk material delivery across Kerala", icon: "delivery" },
  { file: "construction-demolition.jpg", title: "Demolition & Clearance", subtitle: "Buildings, structures and debris removal", icon: "demolition" },
  { file: "construction-excavation.jpg", title: "Earthmoving & Excavation", subtitle: "Foundations, levelling and site preparation", icon: "excavation" },
  { file: "rental-furniture.jpg", title: "Furniture on Rent", subtitle: "Beds, sofas, wardrobes and dining sets", icon: "rental" },
  { file: "rental-appliance.jpg", title: "Appliances on Rent", subtitle: "Fridge, washing machine, AC and more", icon: "rental" },
  { file: "rental-team.jpg", title: "Delivered & Installed", subtitle: "Maintenance included for the whole rental", icon: "delivery" },
  { file: "rental-hub.jpg", title: "Monthly Rental", subtitle: "Furniture and appliances across Kerala", icon: "rental" },
];

/** True when the file is absent or was produced by a previous run. */
async function isReplaceable(target) {
  if (!fs.existsSync(target)) return true;

  // A file git is tracking came from the repository, so it is a real photo
  // somebody committed deliberately. Regenerating it rewrites a tracked file,
  // and the next `git pull` on the server then refuses to merge with
  // "local changes would be overwritten" — which is exactly what happened on
  // production and blocked three deploys in a row.
  if (isTrackedByGit(target)) return false;

  try {
    // The marker is written to EXIF ImageDescription, so the raw EXIF buffer is
    // what has to be searched. Reading metadata().comments instead returned
    // undefined for every file, which made each card look like a real photo
    // and quietly stopped regeneration from ever working.
    const { exif } = await sharp(target).metadata();
    return Boolean(exif) && exif.toString("latin1").includes(GENERATED_MARKER);
  } catch {
    // Unreadable file: treat as a real photo and leave it alone.
    return false;
  }
}

fs.mkdirSync(outputDir, { recursive: true });

let generated = 0;
let kept = 0;

for (const card of CARDS) {
  const target = path.join(outputDir, card.file);

  if (!(await isReplaceable(target))) {
    kept += 1;
    continue;
  }

  await sharp(Buffer.from(cardSvg(card)))
    .jpeg({ quality: 86, progressive: true })
    // The marker travels with the file, so a real photo dropped in later is
    // never overwritten by a regenerated card.
    .withMetadata({ exif: { IFD0: { ImageDescription: GENERATED_MARKER } } })
    .toFile(target);

  generated += 1;
}

console.log(
  `Service cards: ${generated} generated, ${kept} left alone (real photos already in place).`,
);
