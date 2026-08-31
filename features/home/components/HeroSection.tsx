"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { ShuffleProps } from "@/components/Shuffle";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/common";
import { liveEvents } from "@/features/home/data/home.data";

// GSAP headline shuffle — lazy loaded to avoid blocking LCP
const Shuffle = dynamic<ShuffleProps>(() => import("@/components/Shuffle"), {
  ssr: false,
});

// WebGL hero background — decorative, loaded off critical path
const PixelBlast = dynamic(() => import("@/components/PixelBlast"), {
  ssr: false,
  loading: () => null,
});

interface HeroSectionProps {
  onJoinClick: () => void;
}

export function HeroSection({ onJoinClick }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative bg-zinc-950 pb-20 pt-32 text-white md:pb-24 md:pt-40 overflow-hidden"
    >
      {/* Background Interactive Canvas */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-auto">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#fa6739"
          patternScale={2.2}
          patternDensity={1.15}
          pixelSizeJitter={0.05}
          enableRipples={true}
          rippleSpeed={0.45}
          rippleThickness={0.13}
          rippleIntensityScale={2.0}
          liquid={false}
          speed={0.4}
          edgeFade={0.3}
          transparent={true}
        />
      </div>

      {/* Grid Content Overlay */}
      <div className="relative z-10 mx-auto grid w-[min(1170px,calc(100%-38px))] items-center gap-12 md:grid-cols-[1.05fr_.95fr] md:gap-20 pointer-events-none">

        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="pointer-events-none"
        >
          <Eyebrow light>Niral Developer · The Realtime Developer Community for Tamil Engineers</Eyebrow>
          <h1 className="mt-4 max-w-[680px] text-[clamp(45px,5.2vw,75px)] font-bold leading-[.98] tracking-[-.078em]">
            <Suspense fallback={<span className="block">Build in realtime.</span>}>
              <Shuffle
                text="Build in realtime."
                shuffleDirection="up"
                duration={0.45}
                animationMode="evenodd"
                shuffleTimes={2}
                ease="power3.out"
                stagger={0.02}
                threshold={0.1}
                triggerOnce={true}
                triggerOnHover={true}
                tag="span"
                className="block"
                colorFrom="#fa6739"
                colorTo="#ffffff"
              />
            </Suspense>
            <span className="block mt-1">
              Ship with the{" "}
              <Suspense
                fallback={
                  <span className="inline-block italic font-serif text-[#fa6739]">best.</span>
                }
              >
                <Shuffle
                  text="best."
                  shuffleDirection="up"
                  duration={0.45}
                  animationMode="evenodd"
                  shuffleTimes={2}
                  ease="power3.out"
                  stagger={0.04}
                  threshold={0.1}
                  triggerOnce={true}
                  triggerOnHover={true}
                  tag="span"
                  className="inline-block text-[#fa6739] italic font-serif"
                  colorFrom="#ffffff"
                  colorTo="#fa6739"
                />
              </Suspense>
            </span>
          </h1>
          <p className="mt-7 max-w-[470px] text-sm leading-relaxed text-stone-300">
            Niral Developer is a free developer community for Tamil-speaking engineers. Frontend, backend,
            mobile, and AI developers learn React, Next.js, Node.js, PostgreSQL, and AI tooling
            together, get live code reviews in architecture clinics, and ship open-source projects
            in realtime.
          </p>

          {/* Interactive buttons */}
          <div className="mt-7 flex flex-wrap gap-2 pointer-events-auto">
            <Button onClick={onJoinClick}>
              Join Niral Developer <ArrowUpRight size={16} />
            </Button>
            <a href="#showcase">
              <Button variant="outline">Meet the developers</Button>
            </a>
          </div>

          <div className="mt-9 flex items-center gap-3 text-[11px] text-stone-400 pointer-events-auto">
            <div className="flex">
              <img
                className="h-7 w-7 rounded-full border-2 border-zinc-950 object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt=""
              />
              <img
                className="-ml-2 h-7 w-7 rounded-full border-2 border-zinc-950 object-cover"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
                alt=""
              />
              <img
                className="-ml-2 h-7 w-7 rounded-full border-2 border-zinc-950 object-cover"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                alt=""
              />
            </div>
            Join 15,000+ modern developers shipping code daily.
          </div>
        </motion.div>

        {/* Right Column: Realtime Streams */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="pointer-events-auto"
        >
          <div className="mb-3 flex justify-between font-mono text-[10px] uppercase tracking-[.07em] text-stone-300">
            Realtime Community Streams{" "}
            <span className="text-[var(--orange)] animate-pulse">●</span>
          </div>
          {liveEvents.map((event) => (
            <article
              className="mb-1 grid min-h-[88px] grid-cols-[27px_1fr_40px_30px] items-center gap-3 bg-stone-100 p-3 text-zinc-950"
              key={event[0]}
            >
              <span className="font-mono text-[10px] text-stone-500">{event[0]}</span>
              <div>
                <p className="font-mono text-[9px] uppercase text-stone-500">{event[1]}</p>
                <h3 className="mt-1 text-xs font-bold tracking-[-.04em]">{event[2]}</h3>
              </div>
              <span className="font-mono text-[9px] text-stone-500">
                {event[3]}
                <br />
                <b className="text-[11px] text-zinc-950">{event[4]}</b>
              </span>
              <button
                onClick={onJoinClick}
                className="grid h-8 w-8 place-items-center rounded-full border border-stone-400 text-base hover:bg-zinc-950 hover:text-white transition-colors"
                aria-label={`Join ${event[2]}`}
              >
                 
              </button>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
