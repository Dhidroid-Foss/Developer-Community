"use client";

import WordmarkShimmerLoader from "@/components/WordmarkShimmerLoader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--paper)] text-[var(--ink)] p-4">
      <WordmarkShimmerLoader color="#fa6739" />
    </div>
  );
}
