import { MetadataRoute } from "next";
import { developers } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const developerUrls = developers.map((dev) => ({
    url: `${SITE_URL}/developers/${dev.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const routes = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
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

  return [...routeUrls, ...developerUrls];
}
