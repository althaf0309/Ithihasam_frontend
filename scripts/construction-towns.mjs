// Per-town detail for the construction section.
//
// 864 town pages are only worth publishing if each one says something the
// others do not. Google is already overriding the canonical on 1,004 template
// pages on this domain, which is what happens when pages differ by place name
// alone. So every town here carries four facts that actually change the job:
//
//   terrain      what the ground does to a foundation or a delivery
//   access       what a loaded tipper has to get through to reach site
//   building     what is actually being built there
//   note         one concrete local detail, used verbatim in the page copy
//
// These are written from the general character of each place. They are
// deliberately about construction conditions, not claims about jobs completed:
// nothing here asserts work Ithihasam has done.

export const townDetail = {
  // ------------------------------------------------------------- Kannur
  "Thalassery": {
    district: "kannur",
    terrain: "coastal laterite with a firm base close to the surface",
    access: "narrow older town roads near the fort and beach side, which decide tipper size more than distance does",
    building: "individual houses, shop buildings and renovation of older tiled-roof homes",
    note: "Laterite blocks cut locally are still common here, so a build often mixes laterite walls with concrete framing.",
  },
  "Taliparamba": {
    district: "kannur",
    terrain: "midland laterite, mostly level plots with firm bearing",
    access: "good highway access off NH-66, so full loads reach most sites",
    building: "independent houses on family plots and commercial buildings along the highway",
    note: "Highway frontage means full 10-wheel loads are practical, which brings the per-unit rate down on larger orders.",
  },
  "Payyannur": {
    district: "kannur",
    terrain: "coastal belt with sandy topsoil over laterite",
    access: "town roads are workable but coastal lanes can limit a loaded lorry",
    building: "houses, compound walls and small commercial units",
    note: "Salt-laden air near the coast is the reason colour-coated roofing outlasts plain GI here by years.",
  },
  "Mattannur": {
    district: "kannur",
    terrain: "midland with gentle slopes and firm laterite",
    access: "improved roads around the airport corridor take full loads",
    building: "new houses and commercial plots, with airport-corridor activity",
    note: "Plot development around the airport road has made levelling and compound-wall work steady demand.",
  },
  "Iritty": {
    district: "kannur",
    terrain: "hill-edge terrain with sloped plots and rocky sections",
    access: "ghat-side approaches, where gradient and turning room cap vehicle size",
    building: "hillside houses, retaining walls and site levelling",
    note: "Sloped plots here usually need retaining work and filling before the foundation can be set out.",
  },
  "Kuthuparamba": {
    district: "kannur",
    terrain: "midland laterite with mixed level and sloped plots",
    access: "town roads are adequate; interior lanes may need a smaller tipper",
    building: "residential construction and renovation",
    note: "A mix of level and sloped plots means the filling quantity varies widely from site to site.",
  },
  "Panoor": {
    district: "kannur",
    terrain: "midland laterite, generally firm",
    access: "narrow interior roads in parts of the town",
    building: "houses and small commercial buildings",
    note: "Interior lanes often mean part-load delivery, which is charged at the full trip rate.",
  },
  "Chakkarakkal": {
    district: "kannur",
    terrain: "laterite midland with level plots",
    access: "reasonable road access for standard tippers",
    building: "residential building and compound work",
    note: "Level plots keep excavation modest, so material cost dominates the budget here.",
  },

  // ---------------------------------------------------------- Kozhikode
  "Kozhikode City": {
    district: "kozhikode",
    terrain: "coastal plain with made-up ground in parts of the old town",
    access: "city traffic restrictions make delivery timing matter as much as distance",
    building: "commercial buildings, apartments and shop fit-outs",
    note: "City deliveries are usually scheduled early morning, because loading restrictions apply through the day.",
  },
  "Ramanattukara": {
    district: "kozhikode",
    terrain: "level midland with firm bearing",
    access: "junction location with strong highway access for full loads",
    building: "commercial units, warehouses and houses",
    note: "The highway junction makes this one of the easier places in the district for bulk delivery.",
  },
  "Feroke": {
    district: "kozhikode",
    terrain: "riverside flats with clay-bearing soil in places",
    access: "river-side roads and bridge approaches limit some routes",
    building: "houses and small industrial units",
    note: "Feroke's tile-making history reflects the clay in the ground, which matters for foundation design.",
  },
  "Koyilandy": {
    district: "kozhikode",
    terrain: "coastal belt with sandy soil near the shore",
    access: "coastal road access is workable for standard loads",
    building: "residential construction and commercial frontage",
    note: "Sandy coastal soil usually calls for a wider footing than the same house inland would need.",
  },
  "Vadakara": {
    district: "kozhikode",
    terrain: "coastal and midland mix with varied bearing",
    access: "good main-road access, narrower interior lanes",
    building: "houses, shops and renovation work",
    note: "Bearing varies noticeably between coastal and inland plots, so soil condition is worth checking first.",
  },
  "Kunnamangalam": {
    district: "kozhikode",
    terrain: "midland with gentle slopes and firm laterite",
    access: "good access on the main corridor",
    building: "houses, hostels and institutional buildings",
    note: "Institutional and rental-housing demand near the campuses keeps multi-room construction steady.",
  },
  "Thamarassery": {
    district: "kozhikode",
    terrain: "hill-approach terrain, sloped and rocky in parts",
    access: "ghat road approaches restrict vehicle size on the climb",
    building: "hillside houses and retaining structures",
    note: "On the ghat approach, gradient decides the vehicle, so loads are often split into smaller trips.",
  },
  "Balussery": {
    district: "kozhikode",
    terrain: "midland with undulating plots",
    access: "adequate road access for standard tippers",
    building: "residential construction and compound walls",
    note: "Undulating plots here usually need levelling before the plinth can be set out.",
  },

  // ---------------------------------------------------------- Ernakulam
  "Kochi": {
    district: "ernakulam",
    terrain: "coastal and reclaimed ground with a high water table",
    access: "city congestion and timing restrictions govern delivery windows",
    building: "apartments, commercial buildings and villa projects",
    note: "A high water table and made-up ground are why pile or raft foundations are common rather than exceptional.",
  },
  "Kakkanad": {
    district: "ernakulam",
    terrain: "midland with firmer bearing than the island side",
    access: "good access on the IT-corridor roads",
    building: "apartments, offices and villa developments",
    note: "IT-corridor work runs to tighter programmes, so material scheduling matters more than unit rate.",
  },
  "Aluva": {
    district: "ernakulam",
    terrain: "riverside flats with sandy and alluvial soil",
    access: "good road and rail-corridor access",
    building: "apartments, houses and commercial buildings",
    note: "Riverside plots near the Periyar need the flood level checked before plinth height is fixed.",
  },
  "Perumbavoor": {
    district: "ernakulam",
    terrain: "midland with firm bearing",
    access: "strong lorry access, being a timber and trade hub",
    building: "houses, commercial units and industrial sheds",
    note: "As a long-standing timber trade centre, heavy-vehicle access here is better than most towns of its size.",
  },
  "Angamaly": {
    district: "ernakulam",
    terrain: "level midland, firm plots",
    access: "excellent highway access on NH-544",
    building: "houses, commercial buildings and warehouses",
    note: "Highway access makes full-load delivery straightforward, which helps on large concreting orders.",
  },
  "Muvattupuzha": {
    district: "ernakulam",
    terrain: "midland with river-adjacent low ground in parts",
    access: "good main-road access, narrower interior roads",
    building: "houses and commercial buildings",
    note: "River-adjacent plots need plinth height set against the known flood line, not just the road level.",
  },
  "Tripunithura": {
    district: "ernakulam",
    terrain: "midland with moderate water table",
    access: "older town roads in the heritage area restrict larger vehicles",
    building: "houses, apartments and renovation",
    note: "Heritage-area streets often cap vehicle size, so part loads are more common here than elsewhere in the district.",
  },
  "Kothamangalam": {
    district: "ernakulam",
    terrain: "hill-edge midland, sloped in parts",
    access: "reasonable access, with gradient limits on the hill side",
    building: "houses and small commercial buildings",
    note: "Hill-side plots here usually need retaining walls before the main build starts.",
  },

  // ---------------------------------------------------------- Alappuzha
  "Alappuzha Town": {
    district: "alappuzha",
    terrain: "backwater belt with soft soil and a high water table",
    access: "canal-side and narrow town roads restrict vehicle size",
    building: "houses on raised plinths and commercial frontage",
    note: "A high water table makes plinth height and filling quantity the two numbers that decide the budget.",
  },
  "Cherthala": {
    district: "alappuzha",
    terrain: "coastal sandy soil with low bearing",
    access: "reasonable main-road access, narrower interior lanes",
    building: "houses, compound walls and small commercial units",
    note: "Low-bearing sandy soil usually means wider footings and more filling than an inland plot of the same size.",
  },
  "Kayamkulam": {
    district: "alappuzha",
    terrain: "coastal and backwater mix with soft ground",
    access: "good highway access, narrower approaches near the backwaters",
    building: "houses and commercial buildings",
    note: "Filling material is often the single largest delivery on a plot here, ahead of sand or metal.",
  },
  "Mavelikara": {
    district: "alappuzha",
    terrain: "midland with firmer bearing than the coastal belt",
    access: "good road access for standard loads",
    building: "houses and renovation work",
    note: "Firmer ground inland means less filling, so budgets here run closer to a standard midland build.",
  },
  "Chengannur": {
    district: "alappuzha",
    terrain: "midland near the Pamba with flood-prone low ground",
    access: "good access on main roads",
    building: "houses built with flood level in mind",
    note: "After the 2018 floods, plinth heights here are commonly set well above the old road-level practice.",
  },
  "Haripad": {
    district: "alappuzha",
    terrain: "coastal plain with soft topsoil",
    access: "adequate main-road access",
    building: "houses and compound walls",
    note: "Soft topsoil usually has to be cut back to firm ground before the foundation is laid.",
  },
  "Ambalappuzha": {
    district: "alappuzha",
    terrain: "coastal and paddy-belt ground with a very high water table",
    access: "narrow roads through paddy areas limit loaded vehicles",
    building: "raised-plinth houses and small buildings",
    note: "Paddy-belt plots often need substantial filling and a waiting period before construction starts.",
  },
  "Arookutty": {
    district: "alappuzha",
    terrain: "backwater edge with waterlogged ground",
    access: "narrow approaches, often needing smaller vehicles or part loads",
    building: "raised houses and waterfront structures",
    note: "Waterlogged ground here makes foundation design, not material choice, the decisive cost factor.",
  },

  // ----------------------------------------------------- Pathanamthitta
  "Pathanamthitta Town": {
    district: "pathanamthitta",
    terrain: "midland and hill-edge with sloped plots",
    access: "town road access is workable; gradient limits some approaches",
    building: "houses, often NRI-funded, and commercial buildings",
    note: "Sloped plots mean levelling and retaining work are usually priced before the building itself.",
  },
  "Adoor": {
    district: "pathanamthitta",
    terrain: "midland with firm laterite",
    access: "good highway access for full loads",
    building: "houses and commercial units",
    note: "Firm laterite and good access make this one of the more straightforward towns in the district to build in.",
  },
  "Thiruvalla": {
    district: "pathanamthitta",
    terrain: "midland with low-lying ground near the river",
    access: "good road access for standard and full loads",
    building: "houses, apartments and commercial buildings",
    note: "Low-lying river-side plots need plinth level checked against flood history before design is finalised.",
  },
  "Pandalam": {
    district: "pathanamthitta",
    terrain: "midland with mixed level and sloped plots",
    access: "reasonable access on main roads",
    building: "houses and renovation",
    note: "Plot-to-plot variation here is wide, so a site visit changes the estimate more than it would elsewhere.",
  },
  "Ranni": {
    district: "pathanamthitta",
    terrain: "hill terrain with rocky and steeply sloped plots",
    access: "hill roads restrict vehicle size; part loads are common",
    building: "hillside houses and retaining structures",
    note: "Rock is often met during excavation here, which can need breaking rather than ordinary digging.",
  },
  "Konni": {
    district: "pathanamthitta",
    terrain: "forest-edge hill terrain, sloped and rocky",
    access: "narrow hill approaches cap vehicle size",
    building: "houses and site development work",
    note: "Access is usually the binding constraint here, not material availability.",
  },
  "Mallappally": {
    district: "pathanamthitta",
    terrain: "midland with undulating plots",
    access: "adequate road access, narrower interior lanes",
    building: "houses, many NRI-funded",
    note: "Undulating plots typically need levelling and a retaining section on at least one boundary.",
  },
  "Kozhencherry": {
    district: "pathanamthitta",
    terrain: "midland near the Pamba with low-lying sections",
    access: "good main-road access",
    building: "houses and small commercial buildings",
    note: "Proximity to the Pamba makes flood level a standard check before plinth height is set.",
  },

  // ------------------------------------------------------------- Kollam
  "Kollam City": {
    district: "kollam",
    terrain: "coastal plain with a moderate to high water table",
    access: "city roads with timing constraints on larger vehicles",
    building: "houses, commercial buildings and apartments",
    note: "City-centre deliveries are usually scheduled outside peak hours to avoid vehicle restrictions.",
  },
  "Karunagappally": {
    district: "kollam",
    terrain: "coastal belt with sandy soil",
    access: "good highway access, narrower coastal lanes",
    building: "houses and commercial units",
    note: "Sandy coastal ground generally needs a wider footing than the same design inland.",
  },
  "Punalur": {
    district: "kollam",
    terrain: "hill-edge terrain with rocky sections",
    access: "hill road approaches limit vehicle size on some routes",
    building: "houses and small commercial buildings",
    note: "Rock in the ground can turn a routine excavation into breaking work, which is priced separately.",
  },
  "Kottarakkara": {
    district: "kollam",
    terrain: "midland with firm laterite",
    access: "good junction access for full loads",
    building: "houses, shops and commercial buildings",
    note: "Being a junction town, material reaches site here with fewer access constraints than most of the district.",
  },
  "Paravur": {
    district: "kollam",
    terrain: "coastal and backwater edge with soft ground",
    access: "narrow approaches near the backwaters",
    building: "houses and compound work",
    note: "Backwater-edge plots often need filling and a raised plinth before anything else is costed.",
  },
  "Chathannoor": {
    district: "kollam",
    terrain: "midland with generally firm bearing",
    access: "good highway access",
    building: "houses and commercial frontage",
    note: "Firm ground and highway access keep both excavation and delivery costs predictable here.",
  },
  "Anchal": {
    district: "kollam",
    terrain: "midland with undulating and partly rocky plots",
    access: "adequate access, narrower interior roads",
    building: "houses and renovation work",
    note: "Undulating plots usually need levelling, and rock is met often enough to be worth checking early.",
  },
  "Kundara": {
    district: "kollam",
    terrain: "midland with firm bearing",
    access: "reasonable road access for standard loads",
    building: "houses and small industrial units",
    note: "Firm midland ground keeps foundation work straightforward on most plots here.",
  },
};

/**
 * Ground type drives what actually changes about a job, so the page copy can
 * differ on substance rather than on the place name alone. Keyed by a token
 * found in the terrain string.
 *
 * Without this, 864 town pages shared ~740 words of boilerplate against ~90
 * words of local detail and measured 80-90% similar to each other — worse than
 * the 72% the existing template pages sit at, and those already have 1,004
 * Google-overridden canonicals.
 */
export const groundProfiles = [
  {
    match: /backwater|waterlogged|paddy|high water table/i,
    key: "soft",
    label: "soft, waterlogged ground",
    implication:
      "Filling material is usually the largest single delivery on these plots, often ahead of sand or metal. " +
      "Plinth height has to be fixed before quantities mean anything, because raising a plinth by half a foot " +
      "across a house footprint can add several loads of fill.",
    materialNote:
      "Quantities are worked out after the plinth level is set, not before. A quote given without it is guesswork.",
    machineNote:
      "Soft ground limits what a loaded machine can stand on. Work is often staged so the machine is not " +
      "tracking across ground it has just excavated.",
  },
  {
    match: /sandy|coastal/i,
    key: "sandy",
    label: "sandy coastal soil",
    implication:
      "Low-bearing sandy soil generally needs a wider footing than the same design inland, which raises both " +
      "the concrete and the steel quantity. Salt-laden air also shortens the life of plain GI, which is why " +
      "colour-coated roofing is worth the difference here.",
    materialNote:
      "Footing width is usually the reason a coastal plot needs more concrete than an identical inland one.",
    machineNote:
      "Sandy ground collapses back into an open excavation, so trenches are generally dug and filled in " +
      "shorter runs rather than opened all at once.",
  },
  {
    match: /hill|rocky|sloped|ghat|forest-edge/i,
    key: "rock",
    label: "sloped or rocky terrain",
    implication:
      "Rock is met often enough during excavation here to be worth checking before the budget is fixed, " +
      "because breaking is priced separately from ordinary digging. Sloped plots usually need a retaining " +
      "section and levelling before the plinth can be set out at all.",
    materialNote:
      "Retaining work and levelling are normally costed before the building itself, since they decide the " +
      "usable area.",
    machineNote:
      "Gradient and turning room cap the machine size more than the job does, so access is checked before " +
      "anything is committed.",
  },
  {
    match: /river|alluvial|flood/i,
    key: "river",
    label: "river-adjacent ground",
    implication:
      "Plinth height is set against the known flood line rather than the road level. After 2018 this is " +
      "standard practice in most river-side panchayats rather than an extra precaution.",
    materialNote:
      "Flood level is confirmed before quantities are finalised, because it changes the fill and the plinth.",
    machineNote:
      "Work near the river is scheduled around the season, since a wet site costs more in time than in material.",
  },
  {
    match: /laterite|midland|firm|level/i,
    key: "firm",
    label: "firm laterite midland",
    implication:
      "Firm bearing keeps foundation work straightforward, so material cost tends to dominate the budget " +
      "rather than groundwork. Laterite cut locally is still common, and a build often mixes laterite walls " +
      "with concrete framing.",
    materialNote:
      "With groundwork predictable, the delivered material rate is usually the number worth negotiating.",
    machineNote:
      "Firm ground means standard machinery works without matting or staging, which keeps hire time down.",
  },
];

/** The ground profile for a town, or the firm-midland default. */
export function groundFor(terrain) {
  return (
    groundProfiles.find((profile) => profile.match.test(terrain)) ??
    groundProfiles[groundProfiles.length - 1]
  );
}

/** Slug used in the URL, e.g. "Alappuzha Town" -> "alappuzha-town". */
export function townSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Every town, with its district attached. */
export function allTowns(districts) {
  const out = [];
  for (const district of districts) {
    for (const name of district.towns) {
      const detail = townDetail[name];
      if (!detail) continue;

      // `detail.district` is a slug string, while callers expect `district` to
      // be the district object. Spreading detail first and setting district
      // last keeps the object; the other order silently replaced it with a
      // string, and every consumer then read undefined off it.
      out.push({ ...detail, name, slug: townSlug(name), district });
    }
  }
  return out;
}
