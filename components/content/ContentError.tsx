"use client";

import { ContentShell } from "@/components/content/ContentShell";

export default function ContentError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ContentShell>
      <p className="font-mono text-[10px] uppercase tracking-[.085em] text-[#fa6739]">
        ERR // CONTENT_UNAVAILABLE
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#151515] md:text-6xl">
        Could not load this page.
      </h1>
      <p className="mt-4 max-w-[650px] text-sm leading-relaxed text-stone-600">
        Sanity content is temporarily unavailable, or this document could not be rendered.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center bg-[#151515] px-6 py-3 font-mono text-xs uppercase tracking-wider text-white hover:bg-[#fa6739]"
      >
        Try again
      </button>
    </ContentShell>
  );
}
