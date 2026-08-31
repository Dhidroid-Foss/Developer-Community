import { client, isSanityConfigured } from "./client";
import {
  AUTHOR_BY_SLUG_QUERY,
  AUTHOR_SLUGS_QUERY,
  AUTHORS_QUERY,
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  POSTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
  PROJECTS_QUERY,
  RELATED_POSTS_QUERY,
} from "./queries";
import type { Author, BlogPost, RelatedPost, Work } from "./types";

async function fetchQuery<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured) {
    console.error(
      "❌ Sanity not configured. Please set the following environment variables:\n" +
      "   - projectId (or SANITY_PROJECT_ID)\n" +
      "   - dataset (or SANITY_DATASET, defaults to 'production')\n" +
      "   - apiVersion (or SANITY_API_VERSION, defaults to '2024-01-01')\n" +
      "   - token (or SANITY_TOKEN, required for authenticated requests)\n" +
      "See .env.example for more details."
    );
    return null;
  }
  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.error("Sanity fetch failed");
    console.error(error);
    return null;
  }
}

export async function fetchPosts(): Promise<BlogPost[]> {
  return (await fetchQuery<BlogPost[]>(POSTS_QUERY)) ?? [];
}

export async function fetchPostSlugs(): Promise<string[]> {
  const rows = (await fetchQuery<{ slug?: string }[]>(POST_SLUGS_QUERY)) ?? [];
  return rows.map((row) => row.slug).filter((slug): slug is string => Boolean(slug));
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  return fetchQuery<BlogPost>(POST_BY_SLUG_QUERY, { slug });
}

export async function fetchRelatedPosts(slug: string): Promise<RelatedPost[]> {
  return (await fetchQuery<RelatedPost[]>(RELATED_POSTS_QUERY, { slug })) ?? [];
}

export async function fetchAuthors(): Promise<Author[]> {
  return (await fetchQuery<Author[]>(AUTHORS_QUERY)) ?? [];
}

export async function fetchAuthorSlugs(): Promise<string[]> {
  const rows = (await fetchQuery<{ slug?: string }[]>(AUTHOR_SLUGS_QUERY)) ?? [];
  return rows.map((row) => row.slug).filter((slug): slug is string => Boolean(slug));
}

export async function fetchAuthorBySlug(slug: string): Promise<Author | null> {
  return fetchQuery<Author>(AUTHOR_BY_SLUG_QUERY, { slug });
}

export async function fetchProjects(): Promise<Work[]> {
  return (await fetchQuery<Work[]>(PROJECTS_QUERY)) ?? [];
}

export async function fetchProjectSlugs(): Promise<string[]> {
  const rows = (await fetchQuery<{ slug?: string }[]>(PROJECT_SLUGS_QUERY)) ?? [];
  return rows.map((row) => row.slug).filter((slug): slug is string => Boolean(slug));
}

export async function fetchProjectBySlug(slug: string): Promise<Work | null> {
  return fetchQuery<Work>(PROJECT_BY_SLUG_QUERY, { slug });
}
