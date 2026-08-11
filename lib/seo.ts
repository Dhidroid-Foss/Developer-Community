import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

interface PageSeoInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

/**
 * Builds a full Metadata object for a static page:
 * unique title + description, self-referencing canonical URL,
 * Open Graph + Twitter cards pointing at the branded generated image.
 */
export function pageMetadata({ title, description, path, keywords }: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = "/opengraph-image";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: SITE_TAGLINE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [image],
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
