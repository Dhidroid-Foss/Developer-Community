import Link from "next/link";
import { CmsImage } from "@/components/content/CmsImage";
import { currentSlug, firstCategory } from "@/lib/content";
import type { Work } from "@/lib/sanity/types";

export function FeaturedWork({ work }: { work: Work }) {
  const slug = currentSlug(work.slug);
  const href = slug ? `/works/${slug}` : "/works";
  const category = firstCategory(work.categories);
  const year = work.year != null ? String(work.year) : undefined;

  return (
    <article className="border-b border-[#cfcac0] pb-12">
      <Link
        href={href}
        className="group grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-zinc-800">
          {work.image?.asset?.url ? (
            <CmsImage
              image={work.image}
              alt={work.title ?? "Project"}
              fill
              priority
              className="object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              sizes="(max-width: 1024px) 100vw, 640px"
            />
          ) : (
            <span className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-wider text-stone-400">
              No cover image
            </span>
          )}
          {year ? (
            <span className="absolute left-4 top-4 rounded-full bg-zinc-950/70 px-3 py-1 font-mono text-[9px] text-white">
              {year}
            </span>
          ) : null}
        </div>
        <div>
          {category ? (
            <p className="font-mono text-[10px] uppercase tracking-[.085em] text-[#fa6739]">{category}</p>
          ) : null}
          <h2 className="mt-3 text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-tight text-[#151515] group-hover:text-[#fa6739]">
            {work.title ?? "Untitled project"}
          </h2>
          {work.tagline || work.description ? (
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-stone-600">
              {work.tagline ?? work.description}
            </p>
          ) : null}
          <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-stone-500">
            {[work.role, year].filter(Boolean).join(" · ")}
          </p>
        </div>
      </Link>
    </article>
  );
}
