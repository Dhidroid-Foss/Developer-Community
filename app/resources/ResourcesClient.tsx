"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";
import PixelCard from "@/components/PixelCard";
import VariableProximity from "@/components/VariableProximity";
import { resources as resourcesData } from "@/lib/data";

export default function ResourcesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredResources = filter === "all" 
    ? resourcesData 
    : resourcesData.filter(res => res.category === filter);

  return (
    <main className="min-h-screen bg-[#eeeae2] text-[#151515] pt-28">
      <Header onJoinClick={() => setModalOpen(true)} />
      
      <div className="mx-auto w-[min(1170px,calc(100%-38px))] pb-20">
        <div ref={containerRef} style={{ position: "relative" }} className="border-b border-[#cfcac0] pb-10 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.085em] text-stone-500">
              TamilDev Resources
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight text-[#151515]">
              <VariableProximity
                label="Developer assets."
                fromFontVariationSettings="'wght' 350"
                toFontVariationSettings="'wght' 850"
                containerRef={containerRef}
                radius={180}
                falloff="linear"
              />
            </h1>
            <p className="mt-4 max-w-[650px] text-sm text-stone-600 leading-relaxed">
              <VariableProximity
                label="Clone our production-grade boilerplates, review performance tuning guidelines, and download design system templates."
                fromFontVariationSettings="'wght' 350"
                toFontVariationSettings="'wght' 650"
                containerRef={containerRef}
                radius={180}
                falloff="linear"
              />
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              ["all", "All Assets"],
              ["codebase", "Codebases"],
              ["guide", "Guides"],
              ["template", "Templates"]
            ].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFilter(val)}
                className={`font-mono text-[10px] uppercase tracking-wider font-bold py-2.5 px-4 border transition-all ${
                  filter === val 
                    ? "border-zinc-950 bg-zinc-950 text-white" 
                    : "border-[#cfcac0] bg-stone-100/50 text-stone-600 hover:bg-stone-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((res, i) => (
            <PixelCard
              key={i}
              variant="orange"
              className="flex flex-col justify-between bg-stone-100/50 hover:bg-stone-50 transition-all duration-300 p-6 border-[#cfcac0] hover:border-zinc-800 pointer-events-auto"
            >
              <div className="flex flex-col justify-between h-full pointer-events-none select-none">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#fa6739] font-bold bg-[#fa6739]/10 px-2.5 py-0.5">
                      {res.category}
                    </span>
                    <span className="font-mono text-[9px] text-stone-400">
                      {res.date}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-zinc-950 leading-tight whitespace-normal">
                    {res.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-stone-600 whitespace-normal">
                    {res.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#cfcac0]/50 flex items-center justify-between pointer-events-auto">
                  <button 
                    onClick={() => setModalOpen(true)}
                    className="font-mono text-[10px] uppercase tracking-wider font-bold text-zinc-950 hover:text-[#fa6739] flex items-center gap-1 cursor-pointer"
                  >
                    {res.action} <span className="text-xs">↗</span>
                  </button>
                </div>
              </div>
            </PixelCard>
          ))}
        </div>
      </div>

      <Footer />
      <JoinModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
