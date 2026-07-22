import { MetadataRoute } from "next";
import { developers } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://devcom.dhidroid.workers.dev";

  const developerUrls = developers.map((dev) => ({
    url: `${baseUrl}/developers/${dev.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const routes = [
    "",
    "/stack",
    "/developers",
    "/cohorts",
    "/resources",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.9,
  }));

  return [...routes, ...developerUrls];
}
