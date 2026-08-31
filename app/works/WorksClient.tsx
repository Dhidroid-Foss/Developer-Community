"use client";

import { useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import VariableProximity from "@/components/VariableProximity";
import { ContentShell } from "@/components/content/ContentShell";
import { EmptyState } from "@/components/content/EmptyState";
import { FeaturedWork } from "@/components/works/FeaturedWork";
import { WorkCard } from "@/components/works/WorkCard";
import { toFilterParam } from "@/lib/content";
import type { Work } from "@/lib/sanity/types";

export default function WorksClient({ works }: { works: Work[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = searchParams.get("category") ?? "all";

  const categories = useMemo(() => {
    const titles = new Set<string>();
    for (const work of works) {
      for (const category of work.categories ?? []) {
        if (category.title) titles.add(category.title);
      }
    }
    return [...titles];
  }, [works]);

  const filtered = useMemo(() => {
    const list =
      active === "all"
        ? works
        : works.filter((work) =>
            (work.categories ?? []).some((category) => toFilterParam(category.title ?? "") === active),
          );
    return [...list].sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));
  }, [works, active]);

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
          Niral Developer Studio
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#151515] md:text-6xl">
          <VariableProximity
            label="Works."
            fromFontVariationSettings="'wght' 350"
            toFontVariationSettings="'wght' 850"
            containerRef={containerRef}
            radius={180}
            falloff="linear"
          />
        </h1>
        <p className="mt-4 max-w-[650px] text-sm leading-relaxed text-stone-600">
          Selected projects and case studies shipped by the community — architecture, product, and implementation.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="mb-10 flex flex-wrap gap-2" role="navigation" aria-label="Filter works">
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
          title="No projects yet"
          description="Project case studies will appear here once they are published in Sanity."
        />
      ) : (
        <>
          {featured ? <FeaturedWork work={featured} /> : null}
          <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((work) => (
              <WorkCard key={work._id ?? work.title ?? JSON.stringify(work.slug)} work={work} />
            ))}
          </div>
        </>
      )}
    </ContentShell>
  );
}
