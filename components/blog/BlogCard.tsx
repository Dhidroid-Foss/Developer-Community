import Link from "next/link";
import { CmsImage } from "@/components/content/CmsImage";
import { currentSlug, firstCategory, formatDate } from "@/lib/content";
import type { BlogPost, RelatedPost } from "@/lib/sanity/types";
import { formatReadingTime } from "@/utils/reading-time";

type PostCardPost = BlogPost | RelatedPost;

export function BlogCard({ post }: { post: PostCardPost }) {
  const slug = currentSlug(post.slug);
  const href = slug ? `/blog/${slug}` : "/blog";
  const category = firstCategory(post.categories);
  const date = formatDate(post.publishedAt);
  const excerpt = "excerpt" in post ? post.excerpt : undefined;
  const reading = formatReadingTime(post.bodyText);
  const authorName = "author" in post ? post.author?.name : undefined;

  return (
    <article className="group grid gap-4 border-b border-[#cfcac0] py-8 sm:grid-cols-[160px_1fr] sm:gap-6">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-stone-200">
        {post.mainImage?.asset?.url ? (
          <CmsImage
            image={post.mainImage}
            alt={post.title ?? ""}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 160px"
          />
        ) : (
          <span className="flex h-full items-center justify-center font-mono text-[9px] uppercase tracking-wider text-stone-400">
            No image
          </span>
        )}
      </Link>
      <div>
        {category ? (
          <p className="font-mono text-[9px] uppercase tracking-wider text-[#fa6739]">{category}</p>
        ) : null}
        <h3 className="mt-2 text-xl font-bold tracking-tight text-[#151515] group-hover:text-[#fa6739]">
          <Link href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]">
            {post.title ?? "Untitled"}
          </Link>
        </h3>
        {excerpt ? (
          <p className="mt-2 text-sm leading-relaxed text-stone-600 line-clamp-2">{excerpt}</p>
        ) : null}
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-stone-500">
          {[authorName, date, reading].filter(Boolean).join(" · ")}
        </p>
      </div>
    </article>
  );
}
