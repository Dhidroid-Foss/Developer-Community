"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Loader2, Sparkles, RefreshCw, BookOpen } from "lucide-react";
import VariableProximity from "@/components/VariableProximity";
import { DevCats1, DevCats2, DevCats3 } from "@/app/assets/dev-cats";
import { getAvatarUrl } from "@/lib/utils";

const thirukkuralDevVibes = [
  {
    kuralNo: "குறள் 391 · Kural 391",
    kuralTamil: "கற்க கசடறக் கற்பவை கற்றபின்\nநிற்க அதற்குத் தக.",
    kuralTrans: "Karka kasadara karpavai katrapin / Nirka adharkuth thaga.",
    devVibe: "Master clean code without flaws. Once learned, let your commits and architecture live up to that standard.",
    cat: DevCats1,
    tag: "CLEAN_ARCHITECTURE",
    snippet: "const code = learn({ flaw: false }); if (code.valid) ship(code);"
  },
  {
    kuralNo: "குறள் 611 · Kural 611",
    kuralTamil: "முயற்சி திருவினை ஆக்கும் முயற்றின்மை\nஇன்மை புகுத்தி விடும்.",
    kuralTrans: "Muyarsi thiruvinai aakkum muyartrinmai / Inmai puguththi vidum.",
    devVibe: "Relentless debugging yields production readiness; inaction in testing leads directly to downtime.",
    cat: DevCats2,
    tag: "DEBUGGING_PERSISTENCE",
    snippet: "while (bug) { debug(); if (testsPass) break; }"
  },
  {
    kuralNo: "குறள் 467 · Kural 467",
    kuralTamil: "எண்ணித் துணிக கருமம் துணிந்தபின்\nஎண்ணுவம் என்பது இழுக்கு.",
    kuralTrans: "Ennith thuniga karumam thunindhabin / Ennuvam enbadhu izhukku.",
    devVibe: "Architect your system thoroughly before writing code. To rethink fundamental schemas after pushing to main is a bug.",
    cat: DevCats3,
    tag: "SCHEMA_DESIGN",
    snippet: "await planArchitecture(); deployToProduction({ rethink: false });"
  },
  {
    kuralNo: "குறள் 396 · Kural 396",
    kuralTamil: "தொட்டனைத் தூறும் மணற்கேணி மாந்தர்க்குக்\nகற்றனைத் தூறும் அறிவு.",
    kuralTrans: "Thottanaith thoorum manarkeni maantharkkukk / Katranaith thoorum arivu.",
    devVibe: "As deep as you dig the sand, fresh water flows; as deep as you read the codebase, true engineering wisdom springs.",
    cat: DevCats1,
    tag: "CODEBASE_READING",
    snippet: "const wisdom = await codebase.readDeeply({ depth: Infinity });"
  },
  {
    kuralNo: "குறள் 26 · Kural 26",
    kuralTamil: "செயற்கரிய செய்வார் பெரியர் சிறியர்\nசெயற்கரிய செய்கலாதார்.",
    kuralTrans: "Seyarkariya seyvaar periyar siriyar / Seyarkariya seykaladhaar.",
    devVibe: "Engineers who ship impossible features are core maintainers; those who claim complex systems cannot be built remain novices.",
    cat: DevCats2,
    tag: "PRINCIPAL_ENGINEERING",
    snippet: "if (developer.shipsImpossible()) return 'Principal Dev';"
  },
  {
    kuralNo: "குறள் 421 · Kural 421",
    kuralTamil: "அறிவொன்றாக்கும் கருவி செறுவார்க்கும்\nஉள்ளழிக்க லாகா அரண்.",
    kuralTrans: "Arivondraakkum karuvi seruvaarkkum / Ullazhikka laagaa aran.",
    devVibe: "Modular code architecture is an indestructible shield; no unexpected edge-case can breach a well-tested system.",
    cat: DevCats3,
    tag: "MODULAR_SHIELD",
    snippet: "const system = createModularArchitecture({ typeSafety: true });"
  }
];

export default function Loading() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-rotate Thirukkural Dev Vibes every 4.5s
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % thirukkuralDevVibes.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const currentItem = thirukkuralDevVibes[index];

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#eeeae2] text-[#151515] p-4 sm:p-6 overflow-hidden">
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 hero-grain opacity-[0.05] pointer-events-none" />

      {/* Outer Aesthetic Container */}
      <div
        ref={containerRef}
        style={{ position: "relative" }}
        className="relative z-10 w-full max-w-[620px] border border-[#cfcac0] bg-stone-100/70 p-6 sm:p-8 shadow-2xl backdrop-blur-sm flex flex-col items-center text-center"
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-between w-full border-b border-[#cfcac0] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-lg text-[#fa6739] animate-pulse">✦</span>
            <span className="text-[12px] font-mono uppercase tracking-widest text-[#151515] font-bold flex items-center gap-1.5">
              Dev
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 bg-stone-200/80 px-2 py-0.5 border border-[#cfcac0]">
            {currentItem.tag}
          </span>
        </div>

        {/* Dynamic VariableProximity Loading Title */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#151515]">
            <VariableProximity
              label="Compiling Workspace..."
              fromFontVariationSettings="'wght' 350"
              toFontVariationSettings="'wght' 850"
              containerRef={containerRef}
              radius={120}
              falloff="linear"
            />
          </h2>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#fa6739] mt-1 flex items-center justify-center gap-1.5">
            <Loader2 size={11} className="animate-spin text-[#fa6739]" />
            <span>Streaming TamilDev engineering insights</span>
          </p>
        </div>

        {/* Thirukkural & DevCat Showcase Card */}
        <div className="w-full border border-[#cfcac0] bg-stone-50/90 p-5 mb-6 text-left relative overflow-hidden shadow-inner">
          <div className="grid sm:grid-cols-[90px_1fr] gap-4 items-center">
            {/* DevCat Avatar Badge */}
            <div className="relative aspect-square overflow-hidden bg-zinc-900 border border-[#cfcac0] rounded-none group mx-auto sm:mx-0 w-20 sm:w-full">
              <img
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={getAvatarUrl(currentItem.cat)}
                alt="DevCat Wisdom"
              />
              <span className="absolute bottom-1 right-1 bg-zinc-950/80 px-1 py-0.5 font-mono text-[7px] text-[#fa6739]">
                CAT #{(index % 3) + 1}
              </span>
            </div>

            {/* Thirukkural & Dev Vibe Content */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                  <BookOpen size={10} className="text-[#fa6739]" /> {currentItem.kuralNo}
                </span>
                <span className="font-mono text-[8px] text-stone-400">
                  {index + 1} / {thirukkuralDevVibes.length}
                </span>
              </div>

              {/* Original Tamil Kural */}
              <p
                lang="ta"
                className="font-serif font-bold text-sm sm:text-base text-[#151515] leading-snug whitespace-pre-line"
              >
                "{currentItem.kuralTamil}"
              </p>

              {/* Developer Vibe Interpretation */}
              <p className="mt-2 text-xs font-sans text-stone-700 leading-relaxed bg-[#fa6739]/10 p-2.5 border-l-2 border-[#fa6739]">
                <strong className="font-mono text-[9px] uppercase tracking-wider text-[#fa6739] block mb-0.5">
                  Dev Vibe:
                </strong>
                {currentItem.devVibe}
              </p>
            </div>
          </div>
        </div>

        {/* Code Console Terminal Output */}
        <div className="w-full border border-[#cfcac0]/60 bg-zinc-950 text-stone-300 p-3.5 font-mono text-xs text-left relative overflow-hidden mb-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2 text-stone-500 text-[8px] uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Terminal size={10} className="text-[#fa6739]" /> console.log // THIRUKKURAL_SNIPPET
            </span>
            <span className="text-[#fa6739] text-[8px]">LIVE</span>
          </div>

          <div className="min-h-[22px] flex items-center text-[#fa6739]">
            <span className="mr-2 text-stone-600">&gt;</span>
            <code className="text-stone-100 break-all select-none font-mono text-[11px]">
              {currentItem.snippet}
            </code>
          </div>

          <span className="absolute right-3 top-3.5 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fa6739] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#fa6739]"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
