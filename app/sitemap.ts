import { MetadataRoute } from "next";
import { developers } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { fetchAuthorSlugs, fetchPostSlugs, fetchProjectSlugs } from "@/lib/sanity/fetch";
import { currentSlug } from "@/lib/content";

export const dynamic = "force-static";

const now = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postSlugs, authorSlugs, projectSlugs] = await Promise.all([
    fetchPostSlugs(),
    fetchAuthorSlugs(),
    fetchProjectSlugs(),
  ]);

  const developerUrls = developers.map((dev) => ({
    url: `${SITE_URL}/developers/${dev.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const contentUrls = [
    ...postSlugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...authorSlugs.map((slug) => ({
      url: `${SITE_URL}/authors/${currentSlug(slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...projectSlugs.map((slug) => ({
      url: `${SITE_URL}/works/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const routes = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/blog", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/authors", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/works", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/stack", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/developers", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/cohorts", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/resources", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/tech-briefs", changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  const routeUrls = routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...routeUrls, ...developerUrls, ...contentUrls];
}
