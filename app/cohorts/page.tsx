"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";
import VariableProximity from "@/components/VariableProximity";
import { cohorts as cohortsData } from "@/lib/data";

export default function CohortsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-[#eeeae2] text-[#151515] pt-28">
      <Header onJoinClick={() => setModalOpen(true)} />
      
      <div className="mx-auto w-[min(1170px,calc(100%-38px))] pb-20">
        <div ref={containerRef} style={{ position: "relative" }} className="border-b border-[#cfcac0] pb-10 mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[.085em] text-stone-500">
            TamilDev Cohorts
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight text-[#151515]">
            <VariableProximity
              label="Active Cohorts."
              fromFontVariationSettings="'wght' 350"
              toFontVariationSettings="'wght' 850"
              containerRef={containerRef}
              radius={180}
              falloff="linear"
            />
          </h1>
          <p className="mt-4 max-w-[650px] text-sm text-stone-600 leading-relaxed">
            <VariableProximity
              label="Gain access to our upcoming sprints, code critiques, and matchmaking rooms. Select a cohort and secure your seat in our live streams."
              fromFontVariationSettings="'wght' 350"
              toFontVariationSettings="'wght' 650"
              containerRef={containerRef}
              radius={180}
              falloff="linear"
            />
          </p>
        </div>

        {/* Cohort list */}
        <div className="flex flex-col gap-8">
          {cohortsData.map((cohort) => (
            <section 
              key={cohort.id} 
              className={`border border-[#cfcac0] p-8 md:p-12 ${cohort.bg} flex flex-col lg:grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start`}
            >
              <div>
                <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">
                  {cohort.label}
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950 mt-2">
                  {cohort.title}
                </h2>
                <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                  {cohort.desc}
                </p>
                <button 
                  onClick={() => setModalOpen(true)}
                  className="mt-8 bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-[10px] uppercase tracking-wider font-bold py-3.5 px-6 transition-colors"
                >
                  Join Cohort Session
                </button>
              </div>

              {/* Sessions Details */}
              <div className="w-full flex flex-col gap-6">
                <h3 className="font-mono text-[9px] uppercase tracking-widest text-stone-400 border-b border-[#cfcac0]/60 pb-2">
                  Upcoming Sprints
                </h3>
                {cohort.sessions.map((sess, i) => (
                  <div key={i} className="border-b border-[#cfcac0]/40 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-base font-bold text-zinc-950">
                        {sess.name}
                      </h4>
                      <span className="font-mono text-[10px] text-[#fa6739] font-bold bg-[#fa6739]/10 px-2 py-0.5 whitespace-nowrap">
                        {sess.date}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-stone-600">
                      {sess.desc}
                    </p>
                    <p className="mt-1 text-[10px] text-stone-400 font-medium">
                      {sess.host}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <Footer />
      <JoinModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
