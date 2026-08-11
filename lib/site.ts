/**
 * lib/site.ts — Single source of truth for TamilDev site identity & SEO.
 *
 * The site is deployed on Cloudflare Workers and served from
 * https://tamildevs.dhidroid.workers.dev — every canonical URL, sitemap
 * entry, robots.txt reference and Open Graph tag must point here.
 */

export const SITE_URL = "https://tamildevs.dhidroid.workers.dev";

export const SITE_NAME = "TamilDev";

export const SITE_TAGLINE = "The realtime developer community for Tamil-speaking engineers.";

export const SITE_DESCRIPTION =
  "TamilDev is a free developer community where frontend, backend, mobile and AI engineers " +
  "learn together, get live code reviews, and ship open-source projects. Join live cohorts, " +
  "architecture clinics and realtime coding sessions on React, Next.js, Node.js, PostgreSQL and AI.";

export const SITE_KEYWORDS = [
  "TamilDev",
  "Tamil developer community",
  "developer community India",
  "Tamil coding community",
  "open source community",
  "ReactJS",
  "React Native",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Claude AI",
  "Ollama",
  "Luma API",
  "fullstack development",
  "AI integration",
  "live code review",
  "architecture clinic",
];

export const SOCIALS = {
  github: "https://github.com/dhidroid",
  linkedin: "https://linkedin.com/in/dhidroid-rndev",
};

export const BRAND = {
  ink: "#151515",
  paper: "#f3f0e9",
  orange: "#fa6739",
  line: "#dcd7cd",
};

export const openGraphImage = `${SITE_URL}/opengraph-image`;
