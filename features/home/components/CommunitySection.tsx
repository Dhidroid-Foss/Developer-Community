"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/common";
import PixelCard from "@/components/PixelCard";
import { AnimatePresence, motion } from "motion/react";
import { blueprintTechs, allTechs } from "@/features/home/data/tech-grid.data";

// ── AnimatedMetricNumber ──────────────────────────────────────────────────────
/** Count-up animation triggered by IntersectionObserver when scrolled into view. */
function AnimatedMetricNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let start = 0;
          const duration = 1600;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <strong
      ref={ref}
      className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 leading-none"
    >
      {count}
      {suffix}
    </strong>
  );
}

// ── FlipCard ──────────────────────────────────────────────────────────────────
/** Tech card with 3D flip animation + PixelCard particle blast on flip. */
function FlipCard({
  tech,
  isActive = false,
}: {
  tech: (typeof allTechs)[number];
  isActive?: boolean;
}) {
  const Icon = tech.icon;
  return (
    <PixelCard
      active={isActive}
      colors="#fa6739,#fda382,#c5bfb3"
      gap={5}
      speed={35}
      className="border-0 rounded-none border-r border-b border-stone-300/90 min-h-[125px] overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={tech.name}
          initial={{ rotateX: 90, opacity: 0, y: 6 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: -90, opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1000, transformOrigin: "center center" }}
          className="flex items-center justify-center gap-3 w-full h-full p-5 sm:p-6"
        >
          <Icon className="text-2xl shrink-0" />
          <span className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
            {tech.name}
          </span>
        </motion.div>
      </AnimatePresence>
    </PixelCard>
  );
}

// ── TechGrid ──────────────────────────────────────────────────────────────────
/** Tracks active flipping card slot; randomly swaps one card every 3.5–5.5s. */
function TechGrid() {
  const [positions, setPositions] = useState<typeof allTechs>(
    () => blueprintTechs.slice(0, 10) as unknown as typeof allTechs
  );
  const [activeFlippingIdx, setActiveFlippingIdx] = useState<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let clearTimer: ReturnType<typeof setTimeout>;

    const scheduleSwap = () => {
      const delay = 3500 + Math.random() * 2000;
      timer = setTimeout(() => {
        setPositions((prev) => {
          const currentNames = new Set(prev.map((t) => t.name));
          const available = allTechs.filter((t) => !currentNames.has(t.name));
          if (available.length === 0) return prev;

          const posIdx = Math.floor(Math.random() * prev.length);
          const next = available[Math.floor(Math.random() * available.length)];

          setActiveFlippingIdx(posIdx);
          clearTimer = setTimeout(() => setActiveFlippingIdx(null), 2800);

          const updated = [...prev];
          updated[posIdx] = next;
          return updated;
        });
        scheduleSwap();
      }, delay);
    };

    scheduleSwap();
    return () => {
      clearTimeout(timer);
      clearTimeout(clearTimer);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-stone-300/90 bg-transparent">
      {positions.map((tech, idx) => (
        <FlipCard key={idx} tech={tech} isActive={idx === activeFlippingIdx} />
      ))}
    </div>
  );
}

// ── CommunitySection ──────────────────────────────────────────────────────────
/**
 * Combined section containing:
 * - "Why Niral Developer" heading + GitHub activity heatmap
 * - Metric count-up cards
 * - Scroll-driven tech stack section with TechGrid
 */
export function CommunitySection() {
  return (
    <>
      {/* Community / Stats */}
      <section id="community" className="py-20 md:py-32 bg-[var(--paper)]">
        <div className="mx-auto w-[min(1170px,calc(100%-38px))] flex flex-col gap-10">
          <div>
            <Eyebrow>Why Niral Developer</Eyebrow>
            <h2 className="mt-3 text-[clamp(34px,4.2vw,56px)] font-extrabold leading-[1.06] tracking-[-.065em] text-[var(--ink)] max-w-[850px]">
              The future belongs to developers who build with{" "}
              <span className="text-[var(--orange)]">AI</span>—
              <em>not against it.</em>
            </h2>
          </div>

          {/* GitHub Activity Heatmap */}
          <div className="w-full overflow-hidden">
            <div className="mb-3 flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-400 px-1 overflow-x-auto no-scrollbar">
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(
                (m) => <span key={m}>{m}</span>
              )}
            </div>
            <div className="w-full overflow-hidden">
              <div className="grid grid-flow-col grid-rows-7 gap-[2px] sm:gap-[3.5px] md:gap-[4.5px] w-full justify-between">
                {Array.from({ length: 364 }).map((_, idx) => {
                  const seed = (idx * 17 + (idx % 7) * 31) % 100;
                  let levelClass = "bg-stone-200/60";
                  if (seed > 82) levelClass = "bg-[#fa6739]";
                  else if (seed > 65) levelClass = "bg-[#fa6739]/85";
                  else if (seed > 45) levelClass = "bg-[#fa6739]/55";
                  else if (seed > 25) levelClass = "bg-[#fa6739]/30";
                  return (
                    <div
                      key={idx}
                      className={`h-2.5 sm:h-3.5 md:h-4 w-full aspect-square rounded-[1.5px] sm:rounded-[2.5px] transition-transform hover:scale-125 ${levelClass}`}
                      title={`Contribution activity day ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 border border-stone-300/90">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 p-6 sm:p-7 border-b lg:border-b-0 lg:border-r border-stone-300/90 flex flex-col justify-center">
              <p className="text-sm sm:text-base leading-relaxed text-stone-700 font-normal">
                Master modern development by combining engineering fundamentals with AI workflows.
                Build faster, write better code, and launch products that matter.
              </p>
            </div>
            {[
              { value: 18, suffix: "K+", label: "Contributions" },
              { value: 250, suffix: "+", label: "Open Source Projects" },
              { value: 500, suffix: "+", label: "AI Agents Built" },
              { value: 10, suffix: "K+", label: "Community Members" },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`col-span-1 p-6 sm:p-7 flex flex-col justify-between ${
                  index < 3 ? "border-r border-stone-300/90" : ""
                } ${index % 2 === 0 ? "border-b lg:border-b-0 border-stone-300/90" : ""}`}
              >
                <AnimatedMetricNumber target={item.value} suffix={item.suffix} />
                <span className="mt-5 text-[10px] sm:text-[11px] font-semibold leading-snug text-stone-500 uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        id="stack"
        className="overflow-hidden border-t border-[var(--line)] bg-[var(--paper)] py-20 md:py-32"
      >
        <div className="mx-auto w-[min(1170px,calc(100%-38px))] mb-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>The Technologies We Handle</Eyebrow>
              <h2 className="mt-3 text-[clamp(34px,4vw,55px)] font-bold leading-[.98] tracking-[-.073em] text-[var(--ink)]">
                Core Tech Stack.
              </h2>
            </div>
            <p className="max-w-[420px] text-xs leading-relaxed text-stone-600">
              We master and deploy a curated stack of modern web, mobile, database, and artificial
              intelligence tools. Scroll down to see the carousel motion.
            </p>
          </div>
        </div>
        <div className="py-8">
          <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
            <TechGrid />
          </div>
        </div>
      </section>
    </>
  );
}
