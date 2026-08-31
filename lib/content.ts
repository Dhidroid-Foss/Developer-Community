import type { SanitySlug } from "@/lib/sanity/types";

export function currentSlug(slug?: SanitySlug): string {
  if (!slug) return "";
  if (typeof slug === "string") return slug;
  return slug.current?.trim() ?? "";
}

export function toFilterParam(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(value?: string | null): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function firstCategory(categories?: { title?: string | null }[] | null): string | undefined {
  return categories?.find((category) => category.title)?.title ?? undefined;
}
