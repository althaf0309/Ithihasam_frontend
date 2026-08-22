// Prerenders static HTML + JSON-LD for every crawlable route, and emits a
// sitemap.xml whose URLs exactly match the canonicals it writes.
//
// Why prerender at all: answer engines (GPTBot, PerplexityBot, ClaudeBot, CCBot)
// and social preview fetchers largely do not execute JavaScript. Without this,
// every route serves an empty <div id="root"> and a generic title.

import fs from "node:fs";
import path from "node:path";

import {
  siteUrl,
  businessName,
  businessPhone,
  businessPhonePlain,
  businessEmail,
  businessStreet,
  businessLocality,
  businessRegion,
  businessPostalCode,
  businessAddress,
  serviceAreas,
  areaCoverageLine,
  services,
  servicesBySlug,
  localTemplates,
  duplicateTemplateCanonicals,
  newsArticles,
} from "./site-data.mjs";

// The districts marketed as separate service areas. Mirrors serviceDistricts in
// src/lib/service-areas.ts; check-seo-data.mjs fails the build if they diverge.
const HEADLINE_DISTRICTS = [
  { slug: "kannur", name: "Kannur" },
  { slug: "thrissur", name: "Thrissur" },
  { slug: "ernakulam", name: "Ernakulam" },
];

const distDir = path.resolve("dist");
const shellPath = path.join(distDir, "index.html");
const buildDate = new Date().toISOString().slice(0, 10);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function stripManagedHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/i, "")
    .replace(/<meta\s+name=["']author["'][^>]*>/i, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>/i, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/i, "")
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "");
}

// ---------------------------------------------------------------- routes

function serviceRoutes() {
  return services.map((service) => ({
    path: `/services/${service.slug}`,
    title: service.title,
    description: service.description,
    h1: service.name,
    serviceName: service.name,
    intro: service.intro,
    items: service.items,
    brands: service.brands,
    faqs: service.faqs,
    image: `/og/${service.slug}.jpg`,
    priority: "0.9",
    districtLinksFor: service.slug,
    breadcrumbs: [["Home", "/"], ["Services", "/services"], [service.name, `/services/${service.slug}`]],
  }));
}

function localRoutes() {
  const routes = [];

  for (const [prefix, serviceName, parentSlug, jobs] of localTemplates) {
    for (const area of serviceAreas) {
      const parent = servicesBySlug[parentSlug];
      const primaryPrefix = duplicateTemplateCanonicals[prefix];
      const lower = serviceName.toLowerCase();

      routes.push({
        path: `/${prefix}-${area.slug}`,
        // Synonym pages keep their URL but point at the primary page, so the site
        // does not publish ~90 near-identical pages as independent candidates.
        canonicalOverride: primaryPrefix ? `/${primaryPrefix}-${area.slug}` : undefined,
        title: `${serviceName} in ${area.name} | Ithihasam`,
        description: `Book ${lower} in ${area.name} with Ithihasam. Doorstep support for ${jobs.slice(0, 3).join(", ")} across ${area.district}.`,
        h1: `${serviceName} in ${area.name}`,
        serviceName,
        areaName: area.name,
        district: area.district,
        intro: `Ithihasam helps customers book ${lower} in ${area.name}. Share your issue, exact location, and preferred date so the team can coordinate the right professional for ${area.district}.`,
        items: jobs,
        brands: parent?.brands,
        image: `/og/${parentSlug}.jpg`,
        priority: primaryPrefix ? "0.4" : "0.7",
        parentServicePath: `/services/${parentSlug}`,
        breadcrumbs: [["Home", "/"], ["Services", "/services"], [parent?.name ?? serviceName, `/services/${parentSlug}`], [`${serviceName} in ${area.name}`, `/${prefix}-${area.slug}`]],
        faqs: [
          [`Can I book ${lower} in ${area.name}?`, `Yes. Ithihasam supports ${lower} booking requests in ${area.name} and nearby localities, subject to slot and technician availability.`],
          ["How do I book?", `Use the website enquiry form, WhatsApp, or call ${businessPhone}. Share the service needed, location, and preferred date.`],
          ["Do you charge a visit fee?", "Visit and inspection charges depend on the job type and distance. Any charge is confirmed with you before a technician is scheduled."],
        ],
      });
    }
  }

  return routes;
}

function locationRoutes() {
  return serviceAreas.map((area) => ({
    path: `/locations/${area.slug}`,
    title: `Home Services in ${area.name} | Electrical, Plumbing, Painting & More | Ithihasam`,
    description: `Book electrical, plumbing, painting, appliance servicing, carpentry, roofing, deep cleaning, pest control, and smart home setup in ${area.name}, ${area.district}.`,
    h1: `Home services in ${area.name}`,
    areaName: area.name,
    district: area.district,
    intro: `Ithihasam provides electrical, plumbing, painting, appliance servicing, carpentry, roofing, deep cleaning, pest control, and smart home setup in ${area.name}. Customers searching for an electrician, plumber, painter, AC technician, or pest control team in ${area.name} can use one booking flow for multiple home maintenance needs.`,
    items: services.map((service) => service.name),
    image: "/og/default.jpg",
    priority: "0.85",
    isLocation: true,
    breadcrumbs: [["Home", "/"], ["Service areas", "/services"], [area.name, `/locations/${area.slug}`]],
    faqs: [
      [`Which home services are available in ${area.name}?`, `All eight Ithihasam categories are bookable in ${area.name}: electrical and plumbing, painting, appliance servicing, carpentry, roofing and fabrication, deep cleaning, pest control, and smart home setup.`],
      [`How quickly can a technician reach ${area.name}?`, `Response time depends on the service type and technician availability on the day. Urgent electrical, plumbing, and appliance faults are prioritised.`],
      ["How do I book?", `Call or WhatsApp ${businessPhone}, or submit the booking form with your service, exact location in ${area.name}, and preferred date.`],
    ],
  }));
}

function newsRoutes() {
  return newsArticles.map((article) => ({
    path: `/news/${article.slug}`,
    title: `${article.title} | Ithihasam News`,
    description: article.excerpt,
    h1: article.title,
    intro: article.excerpt,
    image: article.image,
    priority: "0.6",
    isArticle: true,
    articleType: "NewsArticle",
    publishedAt: article.date,
    section: article.category,
    breadcrumbs: [["Home", "/"], ["News", "/news"], [article.title, `/news/${article.slug}`]],
  }));
}

/**
 * Blog posts live in the database, so the build asks the API for them.
 *
 * Without this the blog is invisible to anything that does not run JavaScript:
 * no prerendered text, no BlogPosting markup, and no sitemap entry. If the API
 * is unreachable the build continues and simply skips them, so a backend outage
 * cannot break a deploy.
 */
async function blogRoutes() {
  const apiBase = (process.env.SEO_API_BASE_URL || process.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
  if (!apiBase) {
    console.warn("  ! SEO_API_BASE_URL not set — skipping blog prerender. Blog posts will not be in sitemap.xml.");
    return [];
  }

  try {
    const response = await fetch(`${apiBase}/blog/`, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const posts = await response.json();
    if (!Array.isArray(posts)) throw new Error("expected an array of posts");

    return posts.map((post) => ({
      path: `/blog/${post.slug}`,
      title: post.meta_title || `${post.title} | Ithihasam Blog`,
      description: post.meta_description || post.excerpt || "",
      h1: post.title,
      intro: post.excerpt || "",
      image: "/og/blog.jpg",
      priority: "0.7",
      isArticle: true,
      articleType: "BlogPosting",
      publishedAt: post.published_at,
      author: post.author_name,
      section: post.category,
      breadcrumbs: [["Home", "/"], ["Blog", "/blog"], [post.title, `/blog/${post.slug}`]],
    }));
  } catch (error) {
    console.warn(`  ! Could not fetch blog posts (${error.message}). Skipping blog prerender.`);
    return [];
  }
}

function staticRoutes() {
  const serviceNames = services.map((service) => service.name);

  return [
    {
      path: "/",
      title: "Ithihasam | Home Maintenance Services in Kannur, Kerala",
      description: `Book trusted home maintenance in Kannur with Ithihasam: electricians, plumbers, painters, appliance repair, carpentry, roofing, deep cleaning, pest control, and smart home setup. Call ${businessPhone}.`,
      h1: "Home maintenance services in Kannur",
      intro: `Ithihasam is a home maintenance service based in ${businessLocality}, ${businessRegion}. We coordinate verified electricians, plumbers, painters, carpenters, appliance technicians, cleaners, pest control teams, and smart home installers for homes, apartments, shops, and offices across ${areaCoverageLine}.`,
      items: serviceNames,
      image: "/og/default.jpg",
      priority: "1.0",
      isHome: true,
      breadcrumbs: [["Home", "/"]],
      faqs: [
        ["How do I book a service?", "You can book through the website form, call us directly, or message us on WhatsApp. We confirm your booking and coordinate a technician for your area."],
        ["Are your professionals verified?", "Yes. Professionals go through background checks, skill assessment, and onboarding before joining the Ithihasam network."],
        ["Which areas do you cover?", `We currently serve ${areaCoverageLine}, all within Kannur district and neighbouring Kozhikode and Mahe.`],
        ["Do you offer warranties on services?", "Many services come with workmanship support and a service warranty, depending on the type of work completed. The applicable terms are confirmed in your quote."],
        ["What are your working hours?", "We operate throughout the week, and urgent home-service requests are prioritised as quickly as technician availability allows."],
        ["How is pricing decided?", "Pricing is quoted per job after the scope is understood. Rates and any visit charge are confirmed with you before work begins, with no hidden charges."],
      ],
    },
    {
      path: "/services",
      title: "All Home Maintenance Services in Kannur | Ithihasam",
      description: "Explore every Ithihasam service: electrical, plumbing, painting, appliance servicing, carpentry, roofing and fabrication, deep cleaning, pest control, and smart home setup across Kannur district.",
      h1: "Home maintenance services for everyday residential needs",
      intro: `Browse every Ithihasam service in one place and choose the right support for repairs, upgrades, cleaning, fabrication, and smart home work across ${areaCoverageLine}.`,
      items: serviceNames,
      image: "/og/default.jpg",
      priority: "0.95",
      isServiceIndex: true,
      breadcrumbs: [["Home", "/"], ["Services", "/services"]],
    },
    {
      path: "/about",
      title: "About Ithihasam | Trusted Home Maintenance in Kannur",
      description: "Learn about Ithihasam, our mission, service standards, local focus in Kannur district, and how we connect households with trusted home maintenance professionals.",
      h1: "Building trust in home services, one booking at a time",
      intro: "Ithihasam was built to make home maintenance simpler, faster, and more dependable for everyday households. Instead of searching separately for electricians, plumbers, painters, appliance technicians, carpenters, cleaning teams, or smart home installers, we bring trusted services into one platform.",
      items: [
        "Background-checked and trained service partners",
        "Clear job scope and pricing discussion before work starts",
        "Call and WhatsApp coordination for faster scheduling",
        "Support for homes, apartments, shops, offices, and rental properties",
      ],
      image: "/og/default.jpg",
      priority: "0.8",
      isAbout: true,
      breadcrumbs: [["Home", "/"], ["About", "/about"]],
    },
    {
      path: "/contact",
      title: "Contact Ithihasam | Call, WhatsApp, Address and Booking",
      description: `Contact Ithihasam for home maintenance bookings in Kannur. Call ${businessPhone}, message on WhatsApp, email ${businessEmail}, or visit our ${businessLocality} office.`,
      h1: "Reach us for bookings, support, and service enquiries",
      intro: `Call, WhatsApp, email, or submit the booking form and our team will help coordinate the right home service for your requirement. Our office is at ${businessAddress}.`,
      items: [
        `Phone: ${businessPhone}`,
        `WhatsApp: ${businessPhone}`,
        `Email: ${businessEmail}`,
        `Office: ${businessAddress}`,
      ],
      image: "/og/default.jpg",
      priority: "0.9",
      isContact: true,
      breadcrumbs: [["Home", "/"], ["Contact", "/contact"]],
      faqs: [
        ["What is the Ithihasam phone number?", `You can reach Ithihasam on ${businessPhone} for bookings, availability, and pricing questions.`],
        ["Where is the Ithihasam office?", `Our office is at ${businessAddress}, ${businessRegion}.`],
        ["Can I book on WhatsApp?", `Yes. Message ${businessPhone} on WhatsApp with your service, location, and preferred date.`],
      ],
    },
    {
      path: "/blog",
      title: "Ithihasam Blog | Home Maintenance Tips for Kannur",
      description: "Read Ithihasam articles on home maintenance, electrical work, plumbing, painting, appliance repair, cleaning, pest control, and smart home services in Kannur.",
      h1: "Home maintenance blog for Kannur",
      intro: "Practical guides and maintenance advice from the Ithihasam team, written for households in Kannur district: what to check before a repair visit, what a job should cost, and how to keep appliances and interiors in good condition.",
      image: "/og/blog.jpg",
      priority: "0.85",
      isBlogIndex: true,
      breadcrumbs: [["Home", "/"], ["Blog", "/blog"]],
    },
    {
      path: "/news",
      title: "Ithihasam News and Service Updates",
      description: "Latest Ithihasam news, service expansion updates, community initiatives, and training stories connected to home maintenance services in Kerala.",
      h1: "Ithihasam news and home service updates",
      intro: "Company updates, service coverage changes, community initiatives, and technician training news from Ithihasam.",
      image: "/og/default.jpg",
      priority: "0.7",
      breadcrumbs: [["Home", "/"], ["News", "/news"]],
    },
    {
      path: "/privacy-policy",
      title: "Privacy Policy | Ithihasam",
      description: "How Ithihasam collects, uses, stores, and protects booking, contact, WhatsApp, and website information.",
      h1: "How Ithihasam collects and uses your information",
      intro: "This policy explains what data we collect through our website, booking forms, calls, WhatsApp, and email, and how we use that information to deliver services.",
      image: "/og/default.jpg",
      priority: "0.3",
      breadcrumbs: [["Home", "/"], ["Privacy Policy", "/privacy-policy"]],
    },
    {
      path: "/terms-and-conditions",
      title: "Terms & Conditions | Ithihasam",
      description: "Ithihasam terms for website usage, service bookings, pricing, cancellations, warranties, and customer responsibilities.",
      h1: "Terms and conditions for Ithihasam services",
      intro: "These terms cover website usage, service bookings, pricing, cancellations, warranties, and customer responsibilities when booking Ithihasam home maintenance services.",
      image: "/og/default.jpg",
      priority: "0.3",
      breadcrumbs: [["Home", "/"], ["Terms & Conditions", "/terms-and-conditions"]],
    },
  ];
}

// ---------------------------------------------------------------- head

function headFor(route) {
  const canonical = `${siteUrl}${route.canonicalOverride ?? route.path}`;
  const image = `${siteUrl}${route.image ?? "/og/default.jpg"}`;

  // Only the homepage renders the hero carousel, so only the homepage preloads
  // it. Preloading on all 509 pages would download an unused image everywhere.
  const heroPreload = route.isHome
    ? `
    <link rel="preload" as="image" type="image/webp" href="/og/banner-electrical-1920.webp" fetchpriority="high" media="(min-width: 768px)">` +
      `
    <link rel="preload" as="image" type="image/webp" href="/og/banner-electrical-640.webp" fetchpriority="high" media="(max-width: 767px)">`
    : "";

  return `${heroPreload}
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}">
    <meta name="author" content="Ithihasam">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <meta property="og:type" content="${route.isArticle ? "article" : "website"}">
    <meta property="og:locale" content="en_IN">
    <meta property="og:site_name" content="Ithihasam">${
      route.publishedAt ? `\n    <meta property="article:published_time" content="${escapeHtml(route.publishedAt)}">` : ""
    }${route.section ? `\n    <meta property="article:section" content="${escapeHtml(route.section)}">` : ""}
    <meta property="og:title" content="${escapeHtml(route.title)}">
    <meta property="og:description" content="${escapeHtml(route.description)}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:image" content="${escapeHtml(image)}">
    <meta property="og:image:width" content="1920">
    <meta property="og:image:height" content="800">
    <meta property="og:image:alt" content="${escapeHtml(route.h1)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(route.title)}">
    <meta name="twitter:description" content="${escapeHtml(route.description)}">
    <meta name="twitter:image" content="${escapeHtml(image)}">`;
}

// ---------------------------------------------------------------- JSON-LD

const organizationNode = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: businessName,
  url: siteUrl,
  email: businessEmail,
  telephone: businessPhonePlain,
  logo: { "@type": "ImageObject", url: `${siteUrl}/ithihasa-logo.jpeg` },
};

const localBusinessNode = {
  "@type": "HomeAndConstructionBusiness",
  "@id": `${siteUrl}/#business`,
  name: businessName,
  url: siteUrl,
  image: `${siteUrl}/og/default.jpg`,
  logo: `${siteUrl}/ithihasa-logo.jpeg`,
  telephone: businessPhonePlain,
  email: businessEmail,
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  parentOrganization: { "@id": `${siteUrl}/#organization` },
  address: {
    "@type": "PostalAddress",
    streetAddress: businessStreet,
    addressLocality: businessLocality,
    addressRegion: businessRegion,
    postalCode: businessPostalCode,
    addressCountry: "IN",
  },
  areaServed: serviceAreas.map((area) => ({
    "@type": "City",
    name: area.name,
    containedInPlace: { "@type": "AdministrativeArea", name: area.district },
  })),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: businessPhonePlain,
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "ml"],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home maintenance services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.name, url: `${siteUrl}/services/${service.slug}` },
    })),
  },
};

const websiteNode = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Ithihasam",
  inLanguage: "en-IN",
  publisher: { "@id": `${siteUrl}/#organization` },
};

function jsonLd(route) {
  const canonical = `${siteUrl}${route.canonicalOverride ?? route.path}`;
  const graph = [organizationNode, websiteNode, localBusinessNode];

  if (route.breadcrumbs?.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: route.breadcrumbs.map(([name, itemPath], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        item: `${siteUrl}${itemPath}`,
      })),
    });
  }

  if (route.serviceName) {
    graph.push({
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: route.serviceName,
      description: route.description,
      provider: { "@id": `${siteUrl}/#business` },
      serviceType: route.serviceName,
      areaServed: route.areaName
        ? [{ "@type": "City", name: route.areaName }, { "@type": "AdministrativeArea", name: route.district ?? "Kannur district" }]
        : serviceAreas.map((area) => ({ "@type": "City", name: area.name })),
      ...(route.items?.length
        ? {
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: route.serviceName,
              itemListElement: route.items.map((item) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: item },
              })),
            },
          }
        : {}),
    });
  }

  if (route.isServiceIndex) {
    graph.push({
      "@type": "ItemList",
      "@id": `${canonical}#services`,
      name: "Ithihasam home maintenance services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.name,
        url: `${siteUrl}/services/${service.slug}`,
      })),
    });
  }

  if (route.isLocation) {
    graph.push({
      "@type": "ItemList",
      "@id": `${canonical}#area-services`,
      name: `Services available in ${route.areaName}`,
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${service.name} in ${route.areaName}`,
        url: `${siteUrl}/services/${service.slug}`,
      })),
    });
  }

  if (route.isContact) {
    graph.push({ "@type": "ContactPage", "@id": `${canonical}#contact`, url: canonical, about: { "@id": `${siteUrl}/#business` } });
  }

  if (route.isAbout) {
    graph.push({ "@type": "AboutPage", "@id": `${canonical}#about`, url: canonical, about: { "@id": `${siteUrl}/#business` } });
  }

  if (route.isBlogIndex) {
    graph.push({ "@type": "Blog", "@id": `${canonical}#blog`, url: canonical, name: "Ithihasam Blog", publisher: { "@id": `${siteUrl}/#organization` } });
  }

  if (route.isArticle) {
    graph.push({
      "@type": route.articleType ?? "Article",
      "@id": `${canonical}#article`,
      headline: route.h1,
      description: route.description,
      image: `${siteUrl}${route.image ?? "/og/default.jpg"}`,
      datePublished: route.publishedAt,
      dateModified: route.publishedAt,
      inLanguage: "en-IN",
      ...(route.section ? { articleSection: route.section } : {}),
      author: route.author
        ? { "@type": "Person", name: route.author }
        : { "@id": `${siteUrl}/#organization` },
      publisher: { "@id": `${siteUrl}/#organization` },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    });
  }

  // Only the canonical page of a synonym pair carries FAQ markup, so duplicate
  // FAQPage entities are not published across the site.
  if (route.faqs?.length && !route.canonicalOverride) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: route.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }

  // Tells voice assistants and answer engines which part of the page is the
  // direct answer, rather than leaving them to guess from the whole document.
  graph.push({
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: route.title,
    description: route.description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    inLanguage: "en-IN",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".seo-answer-summary", ".seo-prerender h1"],
    },
  });

  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>`;
}

// ---------------------------------------------------------------- body

/**
 * A single self-contained sentence stating who, what, where, and how to book.
 *
 * Answer engines quote a passage, not a page. Without an extractable sentence
 * carrying the entity, the service, the area, and the phone number together, a
 * model summarising this page has to stitch those facts from separate sections
 * and often drops the contact detail — the one part a customer needs.
 */
function answerSummary(route) {
  const where = route.areaName ? `${route.areaName}, ${route.district ?? "Kannur district"}` : "Kannur district, Kerala";

  if (route.isArticle) {
    return `This article is published by ${businessName}, a home maintenance service in ${businessLocality}, ${businessRegion}. To book any service, call or WhatsApp ${businessPhone}.`;
  }

  const what = route.serviceName
    ? `${route.serviceName.toLowerCase()}`
    : "electrical, plumbing, painting, appliance repair, carpentry, roofing, deep cleaning, pest control, and smart home services";

  return `${businessName} provides ${what} in ${where}. Bookings are taken by phone or WhatsApp on ${businessPhone}, or through the enquiry form at ${siteUrl}. Typical service hours are 8:00 to 20:00, seven days a week.`;
}

function contentFor(route) {
  const items = route.items || [];
  const brands = route.brands || [];
  const faqs = route.faqs || [];
  const nav = `
      <nav aria-label="Breadcrumb"><ol>${(route.breadcrumbs || [])
        .map(([name, itemPath]) => `<li><a href="${escapeHtml(itemPath)}">${escapeHtml(name)}</a></li>`)
        .join("")}</ol></nav>`;

  return `
    <main class="seo-prerender" style="max-width:1120px;margin:0 auto;padding:32px 20px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.65">
      ${route.breadcrumbs?.length > 1 ? nav : ""}
      <h1>${escapeHtml(route.h1)}</h1>
      <p class="seo-answer-summary">${escapeHtml(route.intro || route.description)}</p>
      <p><strong>Quick answer:</strong> ${escapeHtml(answerSummary(route))}</p>
      ${items.length ? `<h2>${escapeHtml(route.isContact ? "Contact details" : "Services we cover")}</h2><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
      ${brands.length ? `<h2>Popular brands</h2><p>${brands.map(escapeHtml).join(", ")}</p>` : ""}
      ${route.districtLinksFor ? `<h2>Choose your district</h2><ul>${HEADLINE_DISTRICTS.map((d) => `<li><a href="/${route.districtLinksFor}-${d.slug}">${escapeHtml(route.serviceName ?? "Services")} in ${escapeHtml(d.name)}</a></li>`).join("")}</ul>` : ""}
      <h2>Service areas</h2>
      <p>Book Ithihasam services across ${escapeHtml(areaCoverageLine)} and nearby localities in Kannur district.</p>
      <ul>${serviceAreas.map((area) => `<li><a href="/locations/${area.slug}">Home services in ${escapeHtml(area.name)}</a></li>`).join("")}</ul>
      <h2>Why choose Ithihasam</h2>
      <ul>
        <li>Doorstep service coordination for homes, shops, offices, and apartments.</li>
        <li>Background-checked professionals matched to the requested service type.</li>
        <li>Clear scope and pricing discussion before work starts, with no hidden charges.</li>
        <li>Call and WhatsApp booking support at ${escapeHtml(businessPhone)}.</li>
      </ul>
      <h2>Contact Ithihasam</h2>
      <p>
        <a href="tel:${escapeHtml(businessPhonePlain)}">${escapeHtml(businessPhone)}</a> &middot;
        <a href="https://wa.me/${escapeHtml(businessPhonePlain.replace("+", ""))}">WhatsApp</a> &middot;
        <a href="mailto:${escapeHtml(businessEmail)}">${escapeHtml(businessEmail)}</a>
      </p>
      <address>${escapeHtml(businessAddress)}, ${escapeHtml(businessRegion)}, India</address>
      ${route.parentServicePath ? `<p><a href="${escapeHtml(route.parentServicePath)}">View the main service page</a></p>` : ""}
      ${faqs.length ? `<h2>Frequently asked questions</h2>${faqs.map(([question, answer]) => `<h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p>`).join("")}` : ""}
    </main>`;
}

// ---------------------------------------------------------------- write

function routeHtml(shell, route) {
  const clean = stripManagedHead(shell);
  const withHead = clean.replace("</head>", `${headFor(route)}\n  </head>`);
  const withRoot = withHead.replace('<div id="root"></div>', `<div id="root">${contentFor(route)}</div>`);
  return withRoot.replace("</body>", `${jsonLd(route)}\n  </body>`);
}

function outputPath(routePath) {
  const normalized = routePath.replace(/^\/|\/$/g, "");
  return normalized ? path.join(distDir, normalized, "index.html") : path.join(distDir, "index.html");
}

function writeRoute(shell, route) {
  const target = outputPath(route.path);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, routeHtml(shell, route), "utf8");
}

function urlsetXml(entries) {
  const body = entries
    .map(
      (route) =>
        `  <url>\n` +
        `    <loc>${escapeHtml(siteUrl + (route.path === "/" ? "/" : route.path))}</loc>\n` +
        `    <lastmod>${route.publishedAt ? String(route.publishedAt).slice(0, 10) : buildDate}</lastmod>\n` +
        `    <changefreq>${route.changefreq ?? (route.isArticle ? "monthly" : "weekly")}</changefreq>\n` +
        `    <priority>${route.priority ?? "0.6"}</priority>\n` +
        `  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

/**
 * Writes a sitemap index plus themed child sitemaps.
 *
 * A single flat file of 400+ URLs makes it impossible to tell in Search Console
 * which *kind* of page is being indexed. Splitting by purpose means coverage
 * problems show up against the group that caused them.
 */
function writeSitemaps(routes) {
  // Synonym pages are excluded everywhere: a sitemap lists canonical URLs only.
  const canonical = routes.filter((route) => !route.canonicalOverride);

  const groups = {
    "sitemap-pages.xml": canonical.filter((r) => !r.isArticle && !r.serviceName && !r.isLocation),
    "sitemap-services.xml": canonical.filter((r) => r.serviceName && !r.areaName),
    "sitemap-locations.xml": canonical.filter((r) => r.isLocation),
    "sitemap-local-services.xml": canonical.filter((r) => r.serviceName && r.areaName),
    "sitemap-articles.xml": canonical.filter((r) => r.isArticle),
  };

  const written = [];
  for (const [filename, entries] of Object.entries(groups)) {
    if (!entries.length) continue;
    fs.writeFileSync(path.join(distDir, filename), urlsetXml(entries), "utf8");
    written.push({ filename, count: entries.length });
  }

  const index =
    `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    written
      .map(({ filename }) => `  <sitemap>\n    <loc>${siteUrl}/${filename}</loc>\n    <lastmod>${buildDate}</lastmod>\n  </sitemap>`)
      .join("\n") +
    `\n</sitemapindex>\n`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), index, "utf8");
  return { written, total: canonical.length };
}

/** RSS for the blog. Feed readers and several AI crawlers poll feeds directly. */
function writeFeed(routes) {
  const articles = routes
    .filter((route) => route.isArticle)
    .sort((a, b) => String(b.publishedAt ?? "").localeCompare(String(a.publishedAt ?? "")))
    .slice(0, 30);

  if (!articles.length) return 0;

  const items = articles
    .map((article) => {
      const url = `${siteUrl}${article.path}`;
      const pubDate = article.publishedAt ? new Date(article.publishedAt).toUTCString() : new Date().toUTCString();
      return (
        `    <item>\n` +
        `      <title>${escapeHtml(article.h1)}</title>\n` +
        `      <link>${escapeHtml(url)}</link>\n` +
        `      <guid isPermaLink="true">${escapeHtml(url)}</guid>\n` +
        `      <pubDate>${pubDate}</pubDate>\n` +
        `      <description>${escapeHtml(article.description)}</description>\n` +
        `    </item>`
      );
    })
    .join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n` +
    `    <title>Ithihasam — Home Maintenance in Kannur</title>\n` +
    `    <link>${siteUrl}</link>\n` +
    `    <description>Home maintenance guides, service updates, and news from Ithihasam.</description>\n` +
    `    <language>en-IN</language>\n` +
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n` +
    `    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />\n` +
    `${items}\n  </channel>\n</rss>\n`;

  fs.writeFileSync(path.join(distDir, "feed.xml"), xml, "utf8");
  return articles.length;
}

/**
 * llms.txt — a plain-text brief for answer engines.
 *
 * Crawlers that summarise the site have to infer the basics from scattered
 * pages. This states them once, unambiguously, in the format the convention
 * expects. It costs nothing and removes the guesswork that produces wrong
 * answers about coverage area and contact details.
 */
function writeLlmsTxt() {
  const content = `# ${businessName}

> Home maintenance services in Kannur district, Kerala, India. One booking flow for
> electricians, plumbers, painters, carpenters, appliance technicians, cleaners,
> pest control, roofing and fabrication, and smart home installation.

## Key facts

- Business name: ${businessName}
- Service area: ${areaCoverageLine} — all within Kannur district and neighbouring Kozhikode and Mahe, Kerala, India
- Office: ${businessAddress}, ${businessRegion}, India
- Phone and WhatsApp: ${businessPhone}
- Email: ${businessEmail}
- Hours: 08:00–20:00, seven days a week
- Booking: call, WhatsApp, or the enquiry form at ${siteUrl}/contact
- Languages: English and Malayalam

## Services

${services.map((service) => `- [${service.name}](${siteUrl}/services/${service.slug}): ${service.description}`).join("\n")}

## Service area pages

${serviceAreas.map((area) => `- [Home services in ${area.name}](${siteUrl}/locations/${area.slug}) — ${area.district}`).join("\n")}

## Notes for summarisation

- Ithihasam serves two Kerala districts: Kannur and Thrissur. Each has its own
  location and service pages; they are separate service areas, not one combined region.
- Pricing is quoted per job after the scope is confirmed; no fixed public price list exists.
- Sitemap: ${siteUrl}/sitemap.xml
- Feed: ${siteUrl}/feed.xml
`;

  fs.writeFileSync(path.join(distDir, "llms.txt"), content, "utf8");
}

if (!fs.existsSync(shellPath)) {
  throw new Error("dist/index.html not found. Run vite build before prerendering SEO pages.");
}

const shell = fs.readFileSync(shellPath, "utf8");
const routes = [
  ...staticRoutes(),
  ...serviceRoutes(),
  ...locationRoutes(),
  ...localRoutes(),
  ...newsRoutes(),
  ...(await blogRoutes()),
];

const seen = new Set();
for (const route of routes) {
  if (seen.has(route.path)) {
    throw new Error(`Duplicate prerender route: ${route.path}`);
  }
  seen.add(route.path);
  writeRoute(shell, route);
}

const { written, total } = writeSitemaps(routes);
const feedCount = writeFeed(routes);
writeLlmsTxt();

const canonicalised = routes.filter((route) => route.canonicalOverride).length;

console.log(
  `Prerendered ${routes.length} routes ` +
    `(${routes.length - canonicalised} canonical, ${canonicalised} synonym pages pointing at a primary).`,
);
for (const { filename, count } of written) {
  console.log(`  ${filename.padEnd(28)} ${String(count).padStart(4)} URLs`);
}
console.log(`  sitemap.xml (index)          ${String(written.length).padStart(4)} child sitemaps, ${total} URLs total`);
console.log(`  feed.xml                     ${String(feedCount).padStart(4)} articles`);
console.log(`  llms.txt                     written`);
