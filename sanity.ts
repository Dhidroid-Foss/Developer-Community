import { createClient } from "@sanity/client";

/**
 * Server-side Sanity client.
 *
 * Credentials come from `.env` (projectId, dataset, apiVersion, useCdn, token)
 * with SANITY_* aliases as fallback. Never import this module from client components.
 */
const projectId =
  process.env.projectId ??
  process.env.SANITY_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  "";

const dataset =
  process.env.dataset ?? process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const apiVersion = process.env.apiVersion ?? process.env.SANITY_API_VERSION ?? "2024-01-01";

const useCdn =
  process.env.useCdn === "true" || process.env.SANITY_USE_CDN === "true";

export const isSanityConfigured = Boolean(projectId);

export const client = createClient({
  projectId: projectId || "unconfigured",
  dataset,
  apiVersion,
  useCdn,
  token: process.env.token ?? process.env.SANITY_TOKEN,
  perspective: "published",
});
