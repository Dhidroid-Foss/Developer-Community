"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/common";
import { quotes } from "@/features/home/data/home.data";
import { getAvatarUrl } from "@/lib/utils";

export function TestimonialsSection() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [isQuotePaused, setIsQuotePaused] = useState(false);

  useEffect(() => {
    if (isQuotePaused) return;
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isQuotePaused]);

  return (
    <section
      onMouseEnter={() => setIsQuotePaused(true)}
      onMouseLeave={() => setIsQuotePaused(false)}
      className="bg-[var(--orange)] py-18 md:py-24 relative overflow-hidden"
    >
      <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
        <div className="grid min-h-[450px] md:min-h-[480px] items-center gap-12 md:grid-cols-[1.05fr_.7fr] md:gap-[13%]">

          {/* Left: Quote */}
          <div className="flex flex-col justify-center h-full min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col justify-between h-full py-2"
              >
                <div>
                  <Eyebrow>
                    Straight from the editor ·{" "}
                    {String(quoteIdx + 1).padStart(2, "0")} /{" "}
                    {String(quotes.length).padStart(2, "0")}
                  </Eyebrow>
                  <blockquote className="mt-5 min-h-[140px] md:min-h-[160px] max-w-162 text-[clamp(26px,3.2vw,48px)] font-bold leading-[1.06] tracking-[-.07em] flex items-center">
                    &ldquo;{quotes[quoteIdx].text}&rdquo;
                  </blockquote>
                </div>
                <div className="mt-6">
                  <div className="flex flex-col text-[11px] font-bold">
                    <span>— {quotes[quoteIdx].author}</span>
                    <small className="mt-1 font-normal text-[#71301f]">
                      {quotes[quoteIdx].role}
                    </small>
                  </div>
                  <div className="mt-4 flex gap-3 flex-wrap">
                    {quotes[quoteIdx].github && (
                      <a
                        href={quotes[quoteIdx].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border-b border-zinc-950/30 text-[10px] font-mono font-bold hover:border-zinc-950 transition-colors"
                      >
                        GitHub  
                      </a>
                    )}
                    {quotes[quoteIdx].linkedin && (
                      <a
                        href={quotes[quoteIdx].linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border-b border-zinc-950/30 text-[10px] font-mono font-bold hover:border-zinc-950 transition-colors"
                      >
                        LinkedIn  
                      </a>
                    )}
                    {quotes[quoteIdx].website && (
                      <a
                        href={quotes[quoteIdx].website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border-b border-zinc-950/30 text-[10px] font-mono font-bold hover:border-zinc-950 transition-colors"
                      >
                        Portfolio  
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Photo card */}
          <div className="flex items-center justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mx-auto w-full max-w-[300px] rotate-2 hover:rotate-0 transition-transform duration-500 bg-stone-50 p-3 shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    className="h-80 w-full object-cover object-top md:h-[365px] transition duration-500 hover:scale-[1.04]"
                    src={getAvatarUrl(quotes[quoteIdx].image)}
                    alt={quotes[quoteIdx].author}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950/85 to-transparent p-4">
                    <p className="font-mono text-[8px] uppercase tracking-[.1em] text-[#fa6739]">
                      Niral Developer · Core Contributor
                    </p>
                    <p className="mt-1 text-[11px] font-bold text-white leading-tight">
                      {quotes[quoteIdx].author}
                    </p>
                    <p className="mt-0.5 font-mono text-[8px] text-stone-400">
                      {quotes[quoteIdx].location}
                    </p>
                  </div>
                </div>
                <p className="mt-3 font-serif text-base italic text-zinc-950">
                  &ldquo;Commit early. Deploy together.&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-12 flex items-center justify-between border-t border-zinc-950/20 pt-6">
          <div className="flex items-center gap-2">
            {quotes.map((q, i) => (
              <button
                key={i}
                onClick={() => setQuoteIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === quoteIdx
                    ? "w-8 bg-zinc-950"
                    : "w-2 bg-zinc-950/30 hover:bg-zinc-950/60"
                }`}
                aria-label={`Go to contributor quote ${i + 1} by ${q.author}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`font-mono text-[10px] uppercase tracking-wider font-semibold transition-all duration-200 ${
                isQuotePaused
                  ? "text-zinc-950 font-bold bg-zinc-950/15 px-2 py-0.5 rounded"
                  : "text-zinc-900/70"
              }`}
            >
              {isQuotePaused ? "Paused (Hovered)" : "Auto Switch"}
            </span>
            <button
              onClick={() =>
                setQuoteIdx((prev) => (prev === 0 ? quotes.length - 1 : prev - 1))
              }
              className="grid h-8 w-8 place-items-center rounded-full border border-zinc-950/30 text-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors"
              aria-label="Previous contributor quote"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => setQuoteIdx((prev) => (prev + 1) % quotes.length)}
              className="grid h-8 w-8 place-items-center rounded-full border border-zinc-950/30 text-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors"
              aria-label="Next contributor quote"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
