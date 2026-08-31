"use client";

import { useState } from "react";
import { SITE_URL } from "@/lib/site";

export function ShareLinks({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}${path}`;
  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="font-mono text-[10px] uppercase tracking-[.085em] text-stone-500">Share</p>
      <a
        href={tweet}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[10px] uppercase tracking-wider text-stone-600 hover:text-[#fa6739]"
      >
        X / Twitter
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="font-mono text-[10px] uppercase tracking-wider text-stone-600 hover:text-[#fa6739] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
