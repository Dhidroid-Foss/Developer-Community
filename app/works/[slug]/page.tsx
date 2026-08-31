import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkDetailClient from "./WorkDetailClient";
import { fetchProjectBySlug, fetchProjectSlugs } from "@/lib/sanity/fetch";
import { getSanityImageUrl } from "@/lib/sanity/image";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await fetchProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = await fetchProjectBySlug(slug);
  if (!work?.title) return { title: "Project not found" };

  return pageMetadata({
    title: work.title,
    description: work.tagline ?? work.description ?? `Project case study: ${work.title}`,
    path: `/works/${slug}`,
    image: getSanityImageUrl(work.image, { width: 1200, quality: 80 }),
    imageAlt: work.title,
    keywords: (work.categories ?? [])
      .map((category) => category.title)
      .filter((title): title is string => Boolean(title)),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = await fetchProjectBySlug(slug);
  if (!work?.title) notFound();
  return <WorkDetailClient work={work} />;
}
