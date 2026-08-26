import { describe, expect, it } from "bun:test";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SOCIALS,
  BRAND,
  openGraphImage,
} from "./site";

describe("site config", () => {
  it("uses the real deployed domain for every canonical reference", () => {
    expect(SITE_URL).toBe("https://niraldevelopers.dhidroid.workers.dev");
    expect(SITE_URL).not.toContain("devcom.");
  });

  it("exposes the brand identity", () => {
    expect(SITE_NAME).toBe("Niral Developer");
    expect(SITE_TAGLINE).toContain("developer community");
    expect(openGraphImage).toBe(`${SITE_URL}/opengraph-image`);
  });

  it("describes what Niral Developer does with relevant keywords", () => {
    expect(SITE_DESCRIPTION).toMatch(/developer community/i);
    for (const kw of ["React", "Next.js", "Node.js", "PostgreSQL"]) {
      expect(SITE_DESCRIPTION).toContain(kw);
    }
    expect(SITE_KEYWORDS.length).toBeGreaterThan(5);
  });

  it("links real social profiles", () => {
    expect(SOCIALS.github).toMatch(/^https:\/\/github\.com\//);
    expect(SOCIALS.linkedin).toMatch(/^https:\/\/(www\.)?linkedin\.com\//);
  });

  it("keeps brand tokens consistent with the design system", () => {
    expect(BRAND.orange).toBe("#fa6739");
    expect(BRAND.ink).toBe("#151515");
  });
});
