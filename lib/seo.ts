import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

interface PageSeoInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Absolute URL or site-relative path. Falls back to the branded OG image. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}

function absoluteUrl(value?: string): string {
  if (!value) return `${SITE_URL}/opengraph-image`;
  if (/^https?:\/\//.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

/**
 * Builds a full Metadata object for a static page:
 * unique title + description, self-referencing canonical URL,
 * Open Graph + Twitter cards pointing at the branded generated image.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  authors,
}: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ? absoluteUrl(image) : "/opengraph-image";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: `${title} · ${SITE_NAME}`,
      description,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors?.length ? { authors } : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? SITE_TAGLINE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
