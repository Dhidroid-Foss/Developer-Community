import Link from "next/link";
import { CmsImage } from "@/components/content/CmsImage";
import { currentSlug, firstCategory, formatDate } from "@/lib/content";
import type { BlogPost } from "@/lib/sanity/types";
import { formatReadingTime } from "@/utils/reading-time";

export function FeaturedPost({ post }: { post: BlogPost }) {
  const slug = currentSlug(post.slug);
  const href = slug ? `/blog/${slug}` : "/blog";
  const category = firstCategory(post.categories);
  const date = formatDate(post.publishedAt);
  const reading = formatReadingTime(post.bodyText);

  return (
    <article className="border-b border-[#cfcac0] pb-12">
      <Link
        href={href}
        className="group grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-stone-200">
          {post.mainImage?.asset?.url ? (
            <CmsImage
              image={post.mainImage}
              alt={post.title ?? ""}
              fill
              priority
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 640px"
            />
          ) : (
            <span className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-wider text-stone-400">
              No cover image
            </span>
          )}
        </div>
        <div>
          {category ? (
            <p className="font-mono text-[10px] uppercase tracking-[.085em] text-[#fa6739]">{category}</p>
          ) : null}
          <h2 className="mt-3 text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-tight text-[#151515] group-hover:text-[#fa6739]">
            {post.title ?? "Untitled"}
          </h2>
          {post.excerpt ? (
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-stone-600">{post.excerpt}</p>
          ) : null}
          <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-stone-500">
            {[post.author?.name ? `By ${post.author.name}` : null, date, reading]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </Link>
    </article>
  );
}
