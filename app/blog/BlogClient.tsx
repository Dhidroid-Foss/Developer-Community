"use client";

import { useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import VariableProximity from "@/components/VariableProximity";
import { ContentShell } from "@/components/content/ContentShell";
import { EmptyState } from "@/components/content/EmptyState";
import { BlogCard } from "@/components/blog/BlogCard";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { toFilterParam } from "@/lib/content";
import type { BlogPost } from "@/lib/sanity/types";

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = searchParams.get("category") ?? "all";

  const categories = useMemo(() => {
    const titles = new Set<string>();
    for (const post of posts) {
      for (const category of post.categories ?? []) {
        if (category.title) titles.add(category.title);
      }
    }
    return [...titles];
  }, [posts]);

  const filtered = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((post) =>
      (post.categories ?? []).some((category) => toFilterParam(category.title ?? "") === active),
    );
  }, [posts, active]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  function setCategory(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("category");
    else params.set("category", value);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <ContentShell>
      <div ref={containerRef} style={{ position: "relative" }} className="mb-12 border-b border-[#cfcac0] pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[.085em] text-stone-500">
          Niral Developer Journal
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#151515] md:text-6xl">
          <VariableProximity
            label="Blog."
            fromFontVariationSettings="'wght' 350"
            toFontVariationSettings="'wght' 850"
            containerRef={containerRef}
            radius={180}
            falloff="linear"
          />
        </h1>
        <p className="mt-4 max-w-[650px] text-sm leading-relaxed text-stone-600">
          Engineering notes, architecture write-ups, and community shipping stories from Niral Developer.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="mb-10 flex flex-wrap gap-2" role="navigation" aria-label="Filter by category">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`border px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
              active === "all"
                ? "border-zinc-950 bg-zinc-950 text-white"
                : "border-[#cfcac0] bg-stone-100/50 text-stone-600 hover:bg-stone-100"
            }`}
          >
            All
          </button>
          {categories.map((title) => {
            const value = toFilterParam(title);
            return (
              <button
                key={title}
                type="button"
                onClick={() => setCategory(value)}
                className={`border px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
                  active === value
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-[#cfcac0] bg-stone-100/50 text-stone-600 hover:bg-stone-100"
                }`}
              >
                {title}
              </button>
            );
          })}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <EmptyState
          title="No articles yet"
          description="When posts are published in Sanity they will appear here. Check back after the next content sync."
        />
      ) : (
        <>
          {featured ? <FeaturedPost post={featured} /> : null}
          <div>
            {rest.map((post) => (
              <BlogCard key={post._id ?? currentKey(post)} post={post} />
            ))}
          </div>
        </>
      )}
    </ContentShell>
  );
}

function currentKey(post: BlogPost): string {
  return [post.title, post.publishedAt].filter(Boolean).join("-") || "post";
}
