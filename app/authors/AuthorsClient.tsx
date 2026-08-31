"use client";

import { useRef } from "react";
import VariableProximity from "@/components/VariableProximity";
import { ContentShell } from "@/components/content/ContentShell";
import { EmptyState } from "@/components/content/EmptyState";
import { AuthorCard } from "@/components/authors/AuthorCard";
import type { Author } from "@/lib/sanity/types";

export default function AuthorsClient({ authors }: { authors: Author[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ContentShell>
      <div ref={containerRef} style={{ position: "relative" }} className="mb-12 border-b border-[#cfcac0] pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[.085em] text-stone-500">
          Niral Developer Writers
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#151515] md:text-6xl">
          <VariableProximity
            label="Authors."
            fromFontVariationSettings="'wght' 350"
            toFontVariationSettings="'wght' 850"
            containerRef={containerRef}
            radius={180}
            falloff="linear"
          />
        </h1>
        <p className="mt-4 max-w-[650px] text-sm leading-relaxed text-stone-600">
          The engineers and mentors writing about architecture, shipping, and community practice.
        </p>
      </div>

      {authors.length === 0 ? (
        <EmptyState
          title="No authors yet"
          description="Author profiles will appear here once they are published in Sanity."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <AuthorCard key={author._id ?? author.name ?? "author"} author={author} />
          ))}
        </div>
      )}
    </ContentShell>
  );
}
