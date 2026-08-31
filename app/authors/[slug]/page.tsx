import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AuthorDetailClient from "./AuthorDetailClient";
import { fetchAuthorBySlug, fetchAuthorSlugs } from "@/lib/sanity/fetch";
import { getSanityImageUrl } from "@/lib/sanity/image";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await fetchAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await fetchAuthorBySlug(slug);
  if (!author?.name) return { title: "Author not found" };

  const description =
    typeof author.bio === "string"
      ? author.bio.slice(0, 155)
      : `Read articles by ${author.name} on Niral Developer.`;

  return pageMetadata({
    title: author.name,
    description,
    path: `/authors/${slug}`,
    image: getSanityImageUrl(author.image, { width: 1200, quality: 80 }),
    imageAlt: author.name,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await fetchAuthorBySlug(slug);
  if (!author?.name) notFound();
  return <AuthorDetailClient author={author} />;
}
