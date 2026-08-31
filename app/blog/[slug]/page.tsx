import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import { fetchPostBySlug, fetchPostSlugs, fetchRelatedPosts } from "@/lib/sanity/fetch";
import { getSanityImageAlt, getSanityImageUrl } from "@/lib/sanity/image";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await fetchPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post?.title) {
    return { title: "Article not found" };
  }

  const image = getSanityImageUrl(post.mainImage, { width: 1200, quality: 80 });

  return pageMetadata({
    title: post.title,
    description: post.excerpt?.trim() || `Read ${post.title} on Niral Developer.`,
    path: `/blog/${slug}`,
    image,
    imageAlt: getSanityImageAlt(post.mainImage, post.title),
    type: "article",
    publishedTime: post.publishedAt ?? undefined,
    authors: post.author?.name ? [post.author.name] : undefined,
    keywords: (post.categories ?? []).map((category) => category.title).filter((title): title is string => Boolean(title)),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post?.title) notFound();
  const related = await fetchRelatedPosts(slug);
  return <BlogPostClient post={post} related={related} />;
}
