export type EventLayout = "wedding" | "pr_show" | "private_event" | "corporate_event";

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  eventLayout?: EventLayout;
  noindex?: boolean;
  priority?: string;
  changefreq?: string;
  serviceName?: string;
  city?: string;
  state?: string;
};

export const SITE_URL = "https://www.djmisshaze.com";
export const SITE_NAME = "DJ Miss Haze";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const SEO_PAGES: SeoPage[] = [
  {
    path: "/",
    title: "DJ Miss Haze | Premium Event DJ & MC | Dallas, Chicago, Denver",
    description:
      "Premium DJ and MC for weddings, corporate events, private parties, and brand activations in Dallas-Fort Worth, Chicago, and Denver. Book DJ Miss Haze for high-energy live mixing and polished event hosting.",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/wedding-dj",
    title: "Wedding DJ & MC | DJ Miss Haze | Chicago, Dallas, Denver",
    description:
      "Wedding DJ and MC for Chicago, Dallas-Fort Worth, Denver, and destination weddings. DJ Miss Haze delivers ceremony-to-afterparty music, live mixing, announcements, and dance-floor energy.",
    eventLayout: "wedding",
    serviceName: "Wedding DJ & MC",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/corporate-event-dj",
    title: "Corporate Event DJ & MC | DJ Miss Haze | Chicago, Dallas, Denver",
    description:
      "Corporate event DJ and MC for company parties, galas, conferences, brand activations, and professional events in Chicago, Dallas-Fort Worth, Denver, and beyond.",
    eventLayout: "corporate_event",
    serviceName: "Corporate Event DJ & MC",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/private-event-dj",
    title: "Private Event DJ & MC | DJ Miss Haze | Chicago, Dallas, Denver",
    description:
      "Private event DJ and MC for birthdays, anniversaries, holiday parties, and exclusive celebrations in Chicago, Dallas-Fort Worth, Denver, and destination locations.",
    eventLayout: "private_event",
    serviceName: "Private Event DJ & MC",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/brand-activation-dj",
    title: "Brand Activation DJ & Event MC | DJ Miss Haze",
    description:
      "DJ and MC for brand activations, PR events, launches, influencer events, galas, and high-profile event experiences in Chicago, Dallas-Fort Worth, Denver, and beyond.",
    eventLayout: "pr_show",
    serviceName: "Brand Activation DJ & MC",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/chicago-dj",
    title: "Chicago DJ & MC | Weddings, Corporate Events, Private Parties",
    description:
      "Chicago DJ and MC services for weddings, corporate events, brand activations, and private parties. DJ Miss Haze brings polished hosting and high-energy live mixing throughout Chicagoland.",
    city: "Chicago",
    state: "IL",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/dallas-dj",
    title: "Dallas DJ & MC | Weddings, Corporate Events, Private Parties",
    description:
      "Dallas-Fort Worth DJ and MC services for weddings, corporate events, galas, brand activations, and private parties with DJ Miss Haze.",
    city: "Dallas",
    state: "TX",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/denver-dj",
    title: "Denver DJ & MC | Weddings, Corporate Events, Private Parties",
    description:
      "Denver DJ and MC services for weddings, mountain celebrations, corporate events, brand activations, and private parties with DJ Miss Haze.",
    city: "Denver",
    state: "CO",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/chicago-wedding-dj",
    title: "Chicago Wedding DJ & MC | DJ Miss Haze",
    description:
      "Chicago wedding DJ and MC for ceremony, cocktail hour, reception, and afterparty music. DJ Miss Haze serves Chicagoland weddings with live mixing and polished hosting.",
    eventLayout: "wedding",
    serviceName: "Wedding DJ & MC",
    city: "Chicago",
    state: "IL",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/dallas-wedding-dj",
    title: "Dallas Wedding DJ & MC | DJ Miss Haze",
    description:
      "Dallas-Fort Worth wedding DJ and MC for ceremony-to-reception music, announcements, and high-energy dance floors. Book DJ Miss Haze for DFW weddings.",
    eventLayout: "wedding",
    serviceName: "Wedding DJ & MC",
    city: "Dallas",
    state: "TX",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/denver-wedding-dj",
    title: "Denver Wedding DJ & MC | DJ Miss Haze",
    description:
      "Denver wedding DJ and MC for city, mountain, and destination weddings across Colorado. DJ Miss Haze handles music flow, announcements, and dance-floor energy.",
    eventLayout: "wedding",
    serviceName: "Wedding DJ & MC",
    city: "Denver",
    state: "CO",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/chicago-corporate-event-dj",
    title: "Chicago Corporate Event DJ & MC | DJ Miss Haze",
    description:
      "Chicago corporate event DJ and MC for company parties, galas, conferences, brand activations, and professional events with polished music direction.",
    eventLayout: "corporate_event",
    serviceName: "Corporate Event DJ & MC",
    city: "Chicago",
    state: "IL",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/dallas-corporate-event-dj",
    title: "Dallas Corporate Event DJ & MC | DJ Miss Haze",
    description:
      "Dallas-Fort Worth corporate event DJ and MC for company celebrations, galas, conferences, brand activations, and polished professional events.",
    eventLayout: "corporate_event",
    serviceName: "Corporate Event DJ & MC",
    city: "Dallas",
    state: "TX",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/denver-corporate-event-dj",
    title: "Denver Corporate Event DJ & MC | DJ Miss Haze",
    description:
      "Denver corporate event DJ and MC for company parties, conferences, brand activations, galas, and professional events across Colorado.",
    eventLayout: "corporate_event",
    serviceName: "Corporate Event DJ & MC",
    city: "Denver",
    state: "CO",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/admin",
    title: "Admin | DJ Miss Haze",
    description: "DJ Miss Haze admin area.",
    noindex: true,
  },
  {
    path: "/corporate-admin",
    title: "Admin | DJ Miss Haze",
    description: "DJ Miss Haze admin area.",
    noindex: true,
  },
];

export const PUBLIC_SEO_PAGES = SEO_PAGES.filter((page) => !page.noindex);

export function normalizePath(pathname: string) {
  const path = pathname.split("?")[0].replace(/\/+$/, "");
  return path || "/";
}

export function getSeoPage(pathname: string): SeoPage {
  const normalized = normalizePath(pathname);
  return SEO_PAGES.find((page) => page.path === normalized) || SEO_PAGES[0];
}

export function getEventLayoutForPath(pathname: string): EventLayout | null {
  return getSeoPage(pathname).eventLayout || null;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getCanonicalUrl(page: SeoPage) {
  return `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
}

export function getJsonLd(page: SeoPage) {
  const canonical = getCanonicalUrl(page);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      "@type": "EntertainmentBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      description:
        "Professional DJ and MC for weddings, corporate events, private parties, brand activations, and destination events across Chicago, Dallas-Fort Worth, Denver, and beyond.",
      url: SITE_URL,
      image: OG_IMAGE,
      priceRange: "$$$",
      sameAs: [
        "https://instagram.com/djmisshaze",
        "https://www.facebook.com/djmisshaze",
        "https://www.tiktok.com/@djmisshaze",
      ],
      areaServed: [
        { "@type": "City", name: "Chicago", containedInPlace: { "@type": "State", name: "Illinois" } },
        { "@type": "City", name: "Dallas", containedInPlace: { "@type": "State", name: "Texas" } },
        { "@type": "City", name: "Denver", containedInPlace: { "@type": "State", name: "Colorado" } },
      ],
      knowsAbout: [
        "Wedding DJ",
        "Corporate Event DJ",
        "Private Party DJ",
        "Brand Activation DJ",
        "Master of Ceremonies",
        "Live Mixing",
        "Open Format DJing",
        "Event Production",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
    },
  ];

  if (page.serviceName) {
    graph.push({
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: page.serviceName,
      description: page.description,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: page.city
        ? { "@type": "City", name: page.city, containedInPlace: { "@type": "State", name: page.state } }
        : ["Chicago", "Dallas-Fort Worth", "Denver"],
      serviceType: page.serviceName,
      additionalProperty: [
        { "@type": "PropertyValue", name: "Professional BOSE sound system", value: "Included" },
        { "@type": "PropertyValue", name: "Shure wireless handheld microphone", value: "Included" },
        { "@type": "PropertyValue", name: "Microphone stand", value: "Included" },
        { "@type": "PropertyValue", name: "Dance floor lighting", value: "Included" },
        { "@type": "PropertyValue", name: "Liability insurance", value: "Certificate of Insurance available" },
      ],
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function renderSeoMeta(page: SeoPage) {
  const canonical = getCanonicalUrl(page);
  const robots = page.noindex ? "noindex, nofollow" : "index, follow";
  const type = page.serviceName ? "website" : "website";
  const jsonLd = JSON.stringify(getJsonLd(page), null, 2).replace(/</g, "\\u003c");

  return `    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonical}" />

    <meta property="og:type" content="${type}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:secure_url" content="${OG_IMAGE}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1080" />
    <meta property="og:image:height" content="1080" />
    <meta property="og:image:alt" content="${SITE_NAME}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />

    <script type="application/ld+json">
${jsonLd}
    </script>`;
}

export function injectSeoMeta(html: string, page: SeoPage) {
  const replacement = `    <!-- SEO_META_START -->\n${renderSeoMeta(page)}\n    <!-- SEO_META_END -->`;
  return html.replace(
    /    <!-- SEO_META_START -->[\s\S]*?    <!-- SEO_META_END -->/,
    () => replacement,
  );
}
