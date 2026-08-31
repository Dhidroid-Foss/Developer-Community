"use client";

import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/common";
import PixelCard from "@/components/PixelCard";
import { developers } from "@/features/developers/data/developers.data";
import { getAvatarUrl } from "@/lib/utils";

interface ShowcaseSectionProps {
  onJoinClick: () => void;
}

export function ShowcaseSection({ onJoinClick }: ShowcaseSectionProps) {
  return (
    <section id="showcase" className="bg-zinc-950 py-16 text-white md:py-24">
      <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <Eyebrow light>Meet the developers</Eyebrow>
            <h2 className="mt-3 text-[clamp(34px,4vw,55px)] font-bold leading-[.98] tracking-[-.073em]">
              Core Contributors.
            </h2>
          </div>
          <div className="hidden md:block">
            <button
              onClick={onJoinClick}
              className="inline-flex items-center gap-2 border-b pb-1 text-[11px] font-bold border-stone-100 text-stone-100"
            >
              Apply as Contributor <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          {developers.map((member) => (
            <a href={`/developers/${member.id}`} key={member.id} className="group block">
              <PixelCard
                variant="orange"
                className="bg-zinc-950 border-zinc-800 rounded-none h-full w-full p-0"
              >
                <article className="pointer-events-auto p-4">
                  <div className="relative aspect-[.78] overflow-hidden bg-zinc-800 border border-transparent group-hover:border-stone-100/30 transition-all duration-300">
                    <img
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                      src={getAvatarUrl(member.avatar)}
                      alt={`Portrait of ${member.name}`}
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-zinc-950/70 px-2 py-1 font-mono text-[8px] text-white opacity-0 transition group-hover:opacity-100 md:block">
                      {member.location}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[13px] font-bold tracking-[-.045em] text-white group-hover:text-[var(--orange)] transition-colors">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-[10px] text-stone-400">{member.role}</p>
                  <span className="inline-block mt-2 font-mono text-[8px] uppercase tracking-wider text-stone-500 group-hover:text-stone-300 transition-colors">
                    View Profile  
                  </span>
                </article>
              </PixelCard>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
