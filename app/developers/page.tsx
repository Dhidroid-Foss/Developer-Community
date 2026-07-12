"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";
import PixelCard from "@/components/PixelCard";
import VariableProximity from "@/components/VariableProximity";

// Contributors Data
const members = [
  {
    id: "dhidroid",
    name: "DhineshKumar Thirupathi (dhidroid)",
    role: "Mobile & Android Developer",
    location: "Chennai, IN",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    stack: ["React Native", "Android SDK", "TypeScript"]
  },
  {
    id: "vignesh",
    name: "Vignesh",
    role: "Fullstack Web Developer",
    location: "Bengaluru, IN",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    stack: ["ReactJS", "Next.js", "Node.js"]
  },
  {
    id: "kishore",
    name: "Kishore",
    role: "Database & Systems Architect",
    location: "Hyderabad, IN",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    stack: ["PostgreSQL", "Prisma", "SQL tuning"]
  },
  {
    id: "saran",
    name: "Saran",
    role: "AI & LLM Integration Specialist",
    location: "Coimbatore, IN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    stack: ["Claude AI", "Ollama", "Luma API"]
  },
  {
    id: "vijay-ls",
    name: "Vijay LS",
    role: "UI/UX Designer & Frontend Dev",
    location: "Mumbai, IN",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80",
    stack: ["Figma", "Tailwind", "ReactJS"]
  }
];

export default function DevelopersListPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-[#eeeae2] text-[#151515] pt-28 pb-20">
      <Header onJoinClick={() => setModalOpen(true)} />
      
      <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
        <div ref={containerRef} style={{ position: "relative" }} className="border-b border-[#cfcac0] pb-10 mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[.085em] text-stone-500">
            DevSync Contributors
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight text-[#151515]">
            <VariableProximity
              label="Core Developers."
              fromFontVariationSettings="'wght' 350"
              toFontVariationSettings="'wght' 850"
              containerRef={containerRef}
              radius={180}
              falloff="linear"
            />
          </h1>
          <p className="mt-4 max-w-[650px] text-sm text-stone-600 leading-relaxed">
            <VariableProximity
              label="Meet the engineers shaping our open source templates, conducting our codebase audits, and driving technical cohort discussions."
              fromFontVariationSettings="'wght' 350"
              toFontVariationSettings="'wght' 650"
              containerRef={containerRef}
              radius={180}
              falloff="linear"
            />
          </p>
        </div>

        {/* Developers List Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <Link 
              key={member.id} 
              href={`/developers/${member.id}`} 
              className="group block"
            >
              <PixelCard
                variant="orange"
                className="w-full h-full bg-stone-100/50 hover:bg-stone-50 transition-all duration-300 p-6 border-[#cfcac0] hover:border-zinc-800 cursor-pointer pointer-events-auto"
              >
                <div className="pointer-events-none select-none">
                  <div className="relative aspect-[1.1] overflow-hidden bg-zinc-800 border border-[#cfcac0]/60 mb-6">
                    <img 
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0" 
                      src={member.avatar} 
                      alt={member.name} 
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-zinc-950/70 px-2 py-1 font-mono text-[8px] text-white">
                      {member.location}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold tracking-tight text-zinc-950 group-hover:text-[#fa6739] transition-colors">
                    {member.name}
                  </h2>
                  <p className="text-xs text-stone-500 font-semibold mt-1">
                    {member.role}
                  </p>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[#cfcac0]/40">
                    {member.stack.map((s) => (
                      <span 
                        key={s} 
                        className="font-mono text-[8px] bg-stone-200 text-stone-600 px-2 py-1"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between font-mono text-[9px] text-[#fa6739] font-bold group-hover:translate-x-1 transition-transform">
                    <span>VIEW PROFILE DETAILS</span>
                    <span>↗</span>
                  </div>
                </div>
              </PixelCard>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
      <JoinModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
