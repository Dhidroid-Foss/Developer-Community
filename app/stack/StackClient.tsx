"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";
import VariableProximity from "@/components/VariableProximity";
import { technologies as technologiesData } from "@/lib/data";

// ── Devicon helper ────────────────────────────────────────────────────────────
// devicon CSS is imported globally in app/globals.css from node_modules.
// makeIcon returns a zero-argument React FC that renders an <i> font icon.
function makeIcon(iconClass: string): React.FC {
  return function DevIcon() {
    return <i className={`${iconClass} text-4xl`} aria-hidden="true" />;
  };
}

const iconMap: Record<string, React.FC> = {
  ReactJS:        makeIcon("devicon-react-original colored"),
  "React Native": makeIcon("devicon-react-original colored"),
  Figma:          makeIcon("devicon-figma-plain colored"),
  "Next.js":      makeIcon("devicon-nextjs-plain colored"),
  "Node.js":      makeIcon("devicon-nodejs-plain colored"),
  PostgreSQL:     makeIcon("devicon-postgresql-plain colored"),
  Prisma:         makeIcon("devicon-prisma-original colored"),
  Claude:         makeIcon("devicon-anthropic-plain colored"),
  Ollama:         makeIcon("devicon-ollama-plain colored"),
  "Luma API":     makeIcon("devicon-python-plain colored"),
};

export default function StackPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-[#eeeae2] text-[#151515] pt-28">
      <Header onJoinClick={() => setModalOpen(true)} />
      
      <div className="mx-auto w-[min(1170px,calc(100%-38px))] pb-20">
        <div ref={containerRef} style={{ position: "relative" }} className="border-b border-[#cfcac0] pb-10 mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[.085em] text-stone-500">
            Tech Stacks We Handle
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight text-[#151515]">
            <VariableProximity
              label="Our Core Stack."
              fromFontVariationSettings="'wght' 350"
              toFontVariationSettings="'wght' 850"
              containerRef={containerRef}
              radius={180}
              falloff="linear"
            />
          </h1>
          <p className="mt-4 max-w-[650px] text-sm text-stone-600 leading-relaxed">
            <VariableProximity
              label="A comprehensive, high-bandwidth catalog of technologies implemented in our open-source templates, live-reviewed in architecture clinics, and mastered in cohorts."
              fromFontVariationSettings="'wght' 350"
              toFontVariationSettings="'wght' 650"
              containerRef={containerRef}
              radius={180}
              falloff="linear"
            />
          </p>
        </div>

        {/* Technologies List with Code Examples */}
        <div className="flex flex-col gap-16">
          {technologiesData.map((tech) => {
            const IconComponent = iconMap[tech.name];
            return (
              <section key={tech.name} className="grid md:grid-cols-[1fr_1.3fr] gap-8 border-b border-[#cfcac0]/60 pb-16 last:border-b-0">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="border border-[#cfcac0] bg-white p-3 flex items-center justify-center">
                      <IconComponent />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 bg-stone-200/80 px-2 py-0.5 rounded">
                        {tech.type}
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight text-[#151515] mt-1">
                        {tech.name}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-5 text-sm text-stone-700 leading-relaxed">
                    {tech.desc}
                  </p>
                  <button 
                    onClick={() => setModalOpen(true)}
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider font-bold text-[#fa6739] hover:text-[#e05629]"
                  >
                    Join Cohort for {tech.name} ↗
                  </button>
                </div>

                {/* Code Block Card */}
                <div className="border border-[#cfcac0] bg-zinc-950 text-stone-300 p-6 relative overflow-x-auto select-all">
                  <div className="absolute right-4 top-4 font-mono text-[8px] uppercase tracking-widest text-stone-600">
                    EX_SAMPLE
                  </div>
                  <pre className="font-mono text-xs leading-relaxed mt-2">
                    <code>{tech.code}</code>
                  </pre>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <Footer />
      <JoinModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
