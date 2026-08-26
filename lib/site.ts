/**
 * lib/site.ts — Single source of truth for Niral Developer site identity & SEO.
 *
 * The site is deployed on Cloudflare Workers and served from
 * https://niraldeveloper.dhidroid.workers.dev — every canonical URL, sitemap
 * entry, robots.txt reference and Open Graph tag must point here.
 */

export const SITE_URL = "https://niraldeveloper.dhidroid.workers.dev";

export const SITE_NAME = "Niral Developer";

export const SITE_TAGLINE = "The realtime developer community for Tamil-speaking engineers.";

export const SITE_DESCRIPTION =
  "Niral Developer is a free developer community where frontend, backend, mobile and AI engineers " +
  "learn together, get live code reviews, and ship open-source projects. Join live cohorts, " +
  "architecture clinics and realtime coding sessions on React, Next.js, Node.js, PostgreSQL and AI.";

export const SITE_KEYWORDS = [
  "Niral Developer",
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

/** Discord invite link — used by all "Join now" CTAs across the site. */
export const DISCORD_INVITE = "https://discord.gg/QSbsfzy2Y";

export const SOCIALS = {
  github:   "https://github.com/dhidroid",
  linkedin: "https://linkedin.com/in/dhidroid-rndev",
  discord:  DISCORD_INVITE,
};

export const BRAND = {
  ink:    "#151515",
  paper:  "#f3f0e9",
  orange: "#fa6739",
  line:   "#dcd7cd",
};

export const openGraphImage = `${SITE_URL}/opengraph-image`;

