"use client";

import { useState } from "react";
import type { TocItem } from "@/utils/portable-text";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);
  if (items.length < 2) return null;

  const list = (
    <ol className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
          <a
            href={`#${item.id}`}
            className="font-mono text-[10px] uppercase tracking-wider text-stone-500 hover:text-[#fa6739] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav aria-label="Table of contents">
      <div className="lg:hidden border border-[#cfcac0] bg-stone-100/50">
        <button
          type="button"
          className="flex w-full items-center justify-between px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-stone-600"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          On this page
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        {open ? <div className="border-t border-[#cfcac0] px-4 py-3">{list}</div> : null}
      </div>
      <div className="hidden lg:block">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[.085em] text-stone-500">On this page</p>
        {list}
      </div>
    </nav>
  );
}
