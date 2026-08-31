import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContentShell } from "@/components/content/ContentShell";
import { CmsImage } from "@/components/content/CmsImage";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { ArticleAuthor } from "@/components/blog/ArticleAuthor";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { JsonLd } from "@/components/seo/JsonLd";
import { currentSlug, firstCategory, formatDate } from "@/lib/content";
import { getSanityImageUrl } from "@/lib/sanity/image";
import type { BlogPost, RelatedPost } from "@/lib/sanity/types";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";
import { headingsFromBody } from "@/utils/portable-text";
import { formatReadingTime } from "@/utils/reading-time";
import { SITE_URL } from "@/lib/site";

export default function BlogPostClient({
  post,
  related,
}: {
  post: BlogPost;
  related: RelatedPost[];
}) {
  const slug = currentSlug(post.slug);
  const path = `/blog/${slug}`;
  const category = firstCategory(post.categories);
  const date = formatDate(post.publishedAt);
  const reading = formatReadingTime(post.bodyText);
  const toc = headingsFromBody(post.body);
  const image = getSanityImageUrl(post.mainImage, { width: 1200, quality: 80 });
  const authorSlug = currentSlug(post.author?.slug);

  return (
    <ContentShell>
      <JsonLd
        data={blogPostingJsonLd({
          title: post.title ?? "Untitled",
          description: post.excerpt ?? undefined,
          path,
          image,
          datePublished: post.publishedAt ?? undefined,
          authorName: post.author?.name ?? undefined,
          authorPath: authorSlug ? `/authors/${authorSlug}` : undefined,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title ?? "Article", path },
        ])}
      />

      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-stone-500 hover:text-[#151515]"
      >
        <ArrowLeft size={14} /> Back to Blog
      </Link>

      <article>
        <header className="border-b border-[#cfcac0] pb-10">
          {category ? (
            <p className="font-mono text-[10px] uppercase tracking-[.085em] text-[#fa6739]">{category}</p>
          ) : null}
          <h1 className="mt-3 max-w-[18ch] text-[clamp(32px,4.2vw,56px)] font-extrabold leading-[1.02] tracking-tight text-[#151515]">
            {post.title ?? "Untitled"}
          </h1>
          {post.excerpt ? (
            <p className="mt-5 max-w-[68ch] text-sm leading-relaxed text-stone-600 md:text-base">{post.excerpt}</p>
          ) : null}
          <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-stone-500">
            {[post.author?.name ? `By ${post.author.name}` : null, date, reading].filter(Boolean).join(" · ")}
          </p>
        </header>

        {post.mainImage?.asset?.url ? (
          <figure className="relative mt-10 aspect-[16/8] overflow-hidden bg-stone-200">
            <CmsImage
              image={post.mainImage}
              alt={post.title ?? ""}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1170px) 100vw, 1170px"
            />
          </figure>
        ) : null}

        <div className={`mt-12 grid gap-12 ${toc.length >= 2 ? "lg:grid-cols-[minmax(0,1fr)_220px]" : ""}`}>
          <ArticleContent body={post.body} fallbackText={post.bodyText} />
          {toc.length >= 2 ? (
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <TableOfContents items={toc} />
            </aside>
          ) : null}
        </div>

        <div className="mt-12">
          <ShareLinks title={post.title ?? SITE_URL} path={path} />
        </div>

        <ArticleAuthor author={post.author} />
        <RelatedPosts posts={related} />
      </article>
    </ContentShell>
  );
}
