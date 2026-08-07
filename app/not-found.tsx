"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Terminal, Home, Code, Sparkles, Compass } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";
import PixelCard from "@/components/PixelCard";
import VariableProximity from "@/components/VariableProximity";
import { DevCats1, DevCats2, DevCats3 } from "@/app/assets/dev-cats";
import { getAvatarUrl } from "@/lib/utils";

const devCatMemes = [
  {
    cat: DevCats1,
    name: "DevCat #01 — Senior Code Reviewer",
    role: "Lead Bug Stalker & Refactoring Specialist",
    quote: "It works on my machine. If it doesn't work in production, ship your machine.",
    tag: "STAGING_ERROR",
    details: "Found 0 syntax errors, 147 architectural opinions."
  },
  {
    cat: DevCats2,
    name: "DevCat #02 — LLM Prompt Whisperer",
    role: "Artificial Intelligence & Offline Ollama Handler",
    quote: "99 little bugs in the code, 99 bugs in the code. Fix 1 bug, compile again... 127 bugs in the code.",
    tag: "PROMPT_OVERFLOW",
    details: "Context window depleted. Recommend feeding tuna treats to reset."
  },
  {
    cat: DevCats3,
    name: "DevCat #03 — Deployment Commander",
    role: "Docker Container & Edge Server Sentinel",
    quote: "Git commit -m 'Fixed typo and routing 404', git push --force and pray.",
    tag: "ROUTE_MISSING",
    details: "Requested URL returned HTTP 404. Cat stepped on the router cable."
  }
];

const randomDevQuotes = [
  { text: "There are two hard things in Computer Science: cache invalidation, naming things, and off-by-one errors.", author: "Martin Fowler" },
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "CSS is awesome until you add 1px of margin and the whole grid drops to a new line.", author: "Every Frontend Dev" },
  { text: "A QA tester walks into a bar, orders a beer, orders 0 beers, orders 9999999 beers, orders a lizard...", author: "Software Testing Lore" }
];

export default function NotFound() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCatIdx, setActiveCatIdx] = useState(0);
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleShuffle = () => {
    setActiveCatIdx((prev) => (prev + 1) % devCatMemes.length);
    setActiveQuoteIdx((prev) => (prev + 1) % randomDevQuotes.length);
  };

  const currentCat = devCatMemes[activeCatIdx];
  const currentQuote = randomDevQuotes[activeQuoteIdx];

  return (
    <main className="min-h-screen bg-[#eeeae2] text-[#151515] pt-28 font-sans">
      <Header onJoinClick={() => setModalOpen(true)} />

      <div className="mx-auto w-[min(1170px,calc(100%-38px))] pb-20">
        
        {/* Top Eyebrow & Typography Header */}
        <div ref={containerRef} style={{ position: "relative" }} className="border-b border-[#cfcac0] pb-10 mb-12">
          <div className="flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-[.085em] text-[#fa6739]">
            <span>ERR_404 // ROUTE_NOT_FOUND</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#151515]">
            <VariableProximity
              label="404 · Page Lost in Code."
              fromFontVariationSettings="'wght' 350"
              toFontVariationSettings="'wght' 850"
              containerRef={containerRef}
              radius={180}
              falloff="linear"
            />
          </h1>

          <p className="mt-4 max-w-[680px] text-base text-stone-600 leading-relaxed font-sans">
            <VariableProximity
              label="The route you requested does not exist or has been refactored into oblivion. Don't worry—our DevCats are currently inspecting the stack trace."
              fromFontVariationSettings="'wght' 350"
              toFontVariationSettings="'wght' 650"
              containerRef={containerRef}
              radius={180}
              falloff="linear"
            />
          </p>
        </div>

        {/* Feature Interactive Section: Active DevCat & Dynamic Dev Quote */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch mb-16">
          
          {/* Left: Active DevCat Spotlight Card */}
          <section className="border border-[#cfcac0] bg-stone-100/50 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500 bg-stone-200/80 px-2.5 py-1 border border-[#cfcac0]">
                  {currentCat.tag}
                </span>
                <span className="font-mono text-[10px] text-stone-400">
                  DEV_CAT #{activeCatIdx + 1} / 03
                </span>
              </div>

              <div className="grid sm:grid-cols-[180px_1fr] gap-6 items-center mb-6">
                <div className="relative aspect-square overflow-hidden bg-zinc-900 border border-[#cfcac0] group">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={getAvatarUrl(currentCat.cat)}
                    alt={currentCat.name}
                  />
                  <span className="absolute bottom-2 left-2 rounded bg-zinc-950/80 px-2 py-0.5 font-mono text-[8px] text-stone-300">
                    MEME_CAT_SPEC
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold tracking-tight text-[#151515]">
                    {currentCat.name}
                  </h2>
                  <p className="text-xs font-semibold text-[#fa6739] mt-1">
                    {currentCat.role}
                  </p>
                  <p className="mt-3 text-xs text-stone-600 leading-relaxed font-mono">
                    "{currentCat.quote}"
                  </p>
                  <p className="mt-2 text-[10px] text-stone-400 font-mono italic">
                    Diagnostic: {currentCat.details}
                  </p>
                </div>
              </div>
            </div>

            {/* Shuffle Button */}
            <div className="pt-4 border-t border-[#cfcac0]/60 flex items-center justify-between">
              <button
                onClick={handleShuffle}
                className="inline-flex items-center gap-2 bg-[#151515] text-white px-4 py-2 text-xs font-mono uppercase tracking-wider hover:bg-[#fa6739] transition-colors cursor-pointer"
              >
                <RefreshCw size={13} className="animate-spin" /> Shuffle DevCat & Quote
              </button>
              <span className="font-mono text-[10px] text-stone-500 hidden sm:inline">
                Click to inspect next cat
              </span>
            </div>
          </section>

          {/* Right: Typography Code Terminal & Random Dev Quotes */}
          <section className="border border-zinc-800 bg-zinc-950 p-8 text-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-6 font-mono text-[10px] uppercase tracking-widest text-[#fa6739]">
                <Terminal size={12} />
                <span>TERMINAL_OUTPUT // 404_STACK_TRACE</span>
              </div>

              <div className="space-y-4 font-mono text-xs text-stone-300">
                <p className="text-stone-500">
                  <span className="text-red-400">Error 404</span>: Cannot GET <span className="text-amber-300">window.location.pathname</span>
                </p>
                
                <div className="p-4 bg-zinc-900 border border-zinc-800 font-serif italic text-sm text-stone-200 leading-relaxed">
                  “{currentQuote.text}”
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-[#fa6739] not-italic">
                    — {currentQuote.author}
                  </p>
                </div>

                <div className="text-[11px] text-stone-400 space-y-1">
                  <p>&gt; checking developer community index...</p>
                  <p>&gt; status: 15,000+ active engineers found online</p>
                  <p>&gt; action: recommend redirecting to active workspace</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400">
                System operational · Navigate back safely
              </span>
            </div>
          </section>
        </div>

        {/* DevCats Roster Grid */}
        <div className="mb-16">
          <div className="border-b border-[#cfcac0] pb-4 mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#151515] flex items-center gap-2">
              <Sparkles size={18} className="text-[#fa6739]" /> DevCat Squad
            </h2>
            <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">
              Select any cat to spotlight
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {devCatMemes.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCatIdx(idx);
                  setActiveQuoteIdx((idx * 2) % randomDevQuotes.length);
                }}
                className={`text-left group block transition-all duration-300 cursor-pointer ${
                  activeCatIdx === idx ? "ring-2 ring-[#fa6739]" : ""
                }`}
              >
                <PixelCard
                  variant="orange"
                  className="w-full h-full bg-stone-100/60 p-5 border-[#cfcac0] hover:border-zinc-800"
                >
                  <div className="relative aspect-square overflow-hidden bg-zinc-900 border border-[#cfcac0]/60 mb-4">
                    <img
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      src={getAvatarUrl(item.cat)}
                      alt={item.name}
                    />
                    <span className="absolute left-2 top-2 rounded bg-zinc-950/80 px-2 py-0.5 font-mono text-[8px] text-white">
                      #{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#151515] group-hover:text-[#fa6739] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-1 font-semibold">
                    {item.role}
                  </p>
                  <p className="text-[10px] text-stone-400 font-mono mt-2 line-clamp-2">
                    "{item.quote}"
                  </p>
                </PixelCard>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Navigation Actions */}
        <div className="border border-[#cfcac0] bg-stone-100/40 p-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#151515]">
            Where would you like to head next?
          </h2>
          <p className="text-xs text-stone-500 mt-2 max-w-md mx-auto">
            Choose a direction below to return to live developer workflows and community tools.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#151515] text-white px-6 py-3 text-xs font-mono uppercase tracking-wider hover:bg-[#fa6739] transition-colors"
            >
              <Home size={14} /> Back to Homepage
            </Link>

            <Link
              href="/developers"
              className="inline-flex items-center gap-2 border border-[#151515] text-[#151515] px-6 py-3 text-xs font-mono uppercase tracking-wider hover:bg-stone-200 transition-colors"
            >
              <Code size={14} /> Core Developers
            </Link>

            <Link
              href="/stack"
              className="inline-flex items-center gap-2 border border-[#cfcac0] bg-stone-50 text-stone-700 px-6 py-3 text-xs font-mono uppercase tracking-wider hover:bg-stone-200 transition-colors"
            >
              <Compass size={14} /> Tech Stack Catalog
            </Link>
          </div>
        </div>

      </div>

      <Footer />
      <JoinModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
