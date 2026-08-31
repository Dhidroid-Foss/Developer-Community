import { SITE_NAME, SITE_URL } from "@/lib/site";

type JsonLd = Record<string, unknown>;

function compact<T extends JsonLd>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => {
      if (entry === undefined || entry === null || entry === "") return false;
      if (Array.isArray(entry) && entry.length === 0) return false;
      return true;
    }),
  ) as T;
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function blogPostingJsonLd(input: {
  title: string;
  description?: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorPath?: string;
}): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${input.path}`,
    },
    author: input.authorName
      ? compact({
          "@type": "Person",
          name: input.authorName,
          url: input.authorPath ? `${SITE_URL}${input.authorPath}` : undefined,
        })
      : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
      },
    },
  });
}

export function personJsonLd(input: {
  name: string;
  path: string;
  description?: string;
  image?: string;
}): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    url: `${SITE_URL}${input.path}`,
    description: input.description,
    image: input.image,
  });
}

export function creativeWorkJsonLd(input: {
  title: string;
  path: string;
  description?: string;
  image?: string;
  datePublished?: string;
  url?: string;
}): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    url: input.url ?? `${SITE_URL}${input.path}`,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  });
}
