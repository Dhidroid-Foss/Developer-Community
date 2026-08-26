import { describe, expect, it } from "bun:test";
import { pageMetadata } from "./seo";

const base = {
  title: "Tech Stack",
  description: "Explore the production-ready stack Niral Developer masters.",
  path: "/stack",
};

describe("pageMetadata()", () => {
  it("sets a self-referencing canonical URL", () => {
    const meta = pageMetadata(base);
    expect(meta.alternates?.canonical).toBe("/stack");
  });

  it("keeps pages indexable and followable", () => {
    const meta = pageMetadata(base);
    const robots = meta.robots as {
      index?: boolean;
      follow?: boolean;
      googleBot?: { "max-image-preview"?: string };
    };
    expect(robots.index).toBe(true);
    expect(robots.follow).toBe(true);
    expect(robots.googleBot?.["max-image-preview"]).toBe("large");
  });

  it("builds absolute Open Graph and Twitter URLs on the live domain", () => {
    const meta = pageMetadata(base);
    expect(meta.openGraph?.url).toBe("https://niraldevelopers.dhidroid.workers.dev/stack");
    expect(meta.openGraph?.title).toContain("Tech Stack");
    const images = meta.openGraph?.images as Array<{ width?: number }> | undefined;
    expect(Array.isArray(images) && images[0]?.width).toBe(1200);
    const twitter = meta.twitter as { card?: string; images?: string[] };
    expect(twitter.card).toBe("summary_large_image");
    expect(twitter.images).toEqual(["/opengraph-image"]);
  });

  it("passes through keywords when provided", () => {
    const meta = pageMetadata({ ...base, keywords: ["react", "next"] });
    expect(meta.keywords).toEqual(["react", "next"]);
  });
});
