"use client";

import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/common";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  onJoinClick: () => void;
}

/** Final full-width CTA banner — "Great products grow in good company." */
export function CtaSection({ onJoinClick }: CtaSectionProps) {
  return (
    <section className="bg-zinc-950 py-24 text-center text-white md:py-32">
      <div className="mx-auto w-[min(900px,calc(100%-38px))]">
        <Eyebrow light>Independent, together</Eyebrow>
        <h2 className="mt-4 text-[clamp(46px,5vw,72px)] font-bold leading-[.98] tracking-[-.08em]">
          Great products grow
          <br />
          in good company.
        </h2>
        <Button onClick={onJoinClick} className="mt-8 inline-flex">
          Join Niral Developer — it&apos;s free <ArrowUpRight size={16} />
        </Button>
        <p className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[.06em] text-stone-500">
          15k+ developers{" "}
          <i className="h-1 w-1 rounded-full bg-[var(--orange)]" />{" "}
          800+ repos{" "}
          <i className="h-1 w-1 rounded-full bg-[var(--orange)]" />{" "}
          Since 2021{" "}
          <i className="h-1 w-1 rounded-full bg-[var(--orange)]" />{" "}
          Built for modern minds
        </p>
      </div>
    </section>
  );
}
