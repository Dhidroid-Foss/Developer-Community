import { createClient } from "@sanity/client";

/**
 * Server-side Sanity client.
 *
 * Credentials come from `.env` (projectId, dataset, apiVersion, useCdn, token)
 * with SANITY_* aliases as fallback. Never import this module from client components.
 */
const projectId = "pjmjgioq";

const dataset = "production";

const apiVersion = "v2026-08-31";

const useCdn = false;

export const isSanityConfigured = Boolean(projectId);

export const client = createClient({
  projectId: projectId || "unconfigured",
  dataset,
  apiVersion,
  useCdn,
  token: "skpBFk1mZo9EewAnrgaXZ9cyr3vm53xqshSACAXhtsVdUpu7JNsj7eq9uh8SPZ2OFZRsWOd8oC3L9HkWH8vcg17BlyXwv9uLxt63vhK5Va2Wq8ojpxNCWFF5CLgntFZF4To4Bu4YH6wdBUy7eUzFkHMhBTfvenGEdOciKcjMPOlOYwiXv1yR",
  perspective: "published",
});
