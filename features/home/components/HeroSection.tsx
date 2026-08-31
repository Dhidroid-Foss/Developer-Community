"use client";

import { LayoutGroup, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, DeviconIcon } from "@/components/common";
import { TextRotate } from "@/components/ui/text-rotate";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"
import { stats } from "@/features/home/data/home.data";
import { cn } from "@/lib/utils";
import DevCats1 from "@/app/assets/dev-cats";

const floatingIcons = [
  { icon: "devicon-react-original", depth: 0.5, pos: "top-[15%] left-[2%] md:top-[25%] md:left-[5%]", size: "w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 text-5xl md:text-7xl", rotate: "-rotate-[3deg]", delay: 0.5 },
  { icon: "devicon-flutter-plain ", depth: 1, pos: "top-[5%] left-[75%] md:top-[10%] md:left-[80%]", size: "w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-4xl md:text-6xl", rotate: "rotate-12", delay: 0.7 },
  { icon: "devicon-postgresql-plain", depth: 4, pos: "top-[85%] left-[8%] md:top-[75%] md:left-[10%]", size: "w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 text-6xl md:text-8xl", rotate: "-rotate-[4deg]", delay: 0.9 },
  { icon: "devicon-docker-plain ", depth: 2, pos: "top-[70%] left-[80%] md:top-[65%] md:left-[85%]", size: "w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 text-5xl md:text-7xl", rotate: "rotate-[6deg]", delay: 1.1 },
  { icon: "devicon-kubernetes-plain ", depth: 1.5, pos: "top-[45%] left-[3%] md:top-[50%] md:left-[2%]", size: "w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 text-4xl md:text-6xl", rotate: "-rotate-[10deg]", delay: 1.3 },
  { icon: "devicon-github-original", depth: 3, pos: "top-[25%] left-[85%] md:top-[30%] md:left-[88%]", size: "w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 text-3xl md:text-5xl", rotate: "rotate-[15deg]", delay: 0.6 },
  { icon: "devicon-linux-plain", depth: 0.8, pos: "top-[60%] left-[12%] md:top-[65%] md:left-[15%]", size: "w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 text-2xl md:text-4xl", rotate: "-rotate-[15deg]", delay: 0.8 },
  { icon: "devicon-python-plain ", depth: 2.5, pos: "top-[80%] left-[50%] md:top-[85%] md:left-[55%]", size: "w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-4xl md:text-6xl", rotate: "rotate-[5deg]", delay: 1.0 },
  { icon: "devicon-dot-net-plain ", depth: 0.8, pos: "top-[0%] left-[50%] md:top-[5%] md:left-[45%]", size: "w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 text-4xl md:text-5xl", rotate: "-rotate-[8deg]", delay: 1.2 },
  { icon: "devicon-javascript-plain ", depth: 3.5, pos: "top-[40%] left-[90%] md:top-[45%] md:left-[92%]", size: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 text-3xl md:text-5xl", rotate: "rotate-[20deg]", delay: 1.4 },
  { icon: "devicon-typescript-plain ", depth: 0.7, pos: "top-[90%] left-[30%] md:top-[88%] md:left-[25%]", size: "w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 text-4xl md:text-5xl", rotate: "-rotate-[12deg]", delay: 1.5 },
  { icon: "devicon-supabase-plain ", depth: 1.8, pos: "top-[30%] left-[10%] md:top-[35%] md:left-[8%]", size: "w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 text-3xl md:text-4xl", rotate: "rotate-[8deg]", delay: 1.6 },
];


const developers = [
  { name: "Dhineshkumar", image:'/avatars/dhidroid.jpg' as string },
  { name: "Kishore", image: 'https://avatars.githubusercontent.com/u/88414254?v=4' as string },
  { name: "Vignesh", image: DevCats1 as string },
  { name: "Saran", image: '/avatars/sarandevaraj.png' as string },
];

export function HeroSection({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <section id="top" className="w-full min-h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative bg-zinc-950 text-white pt-24 pb-12">
      <Floating sensitivity={-0.5} className="h-full z-0 opacity-50">
        {floatingIcons.map((item, index) => (
          <FloatingElement key={index} depth={item.depth} className={item.pos}>
            <motion.div
              className={cn(
                "flex items-center justify-center object-cover p-2 cursor-pointer transition-transform shadow-2xl border border-white/10 bg-zinc-900/50 rounded-lg",
                item.size,
                item.rotate
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: item.delay }}
            >
              <DeviconIcon iconClass={item.icon} />
            </motion.div>
          </FloatingElement>
        ))}
      </Floating>

      <div className="relative z-10 flex flex-col justify-center items-center w-[90%] md:w-[800px] lg:w-[1000px] pointer-events-auto mt-[-5vh]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-6"><Eyebrow light>Niral Developer · The Realtime Developer Community</Eyebrow></div>
          
          <motion.h1
            className="max-w-[800px] text-[clamp(45px,6.5vw,85px)] font-bold leading-[.95] tracking-[-.078em] flex-col flex whitespace-pre"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
          >
            <span>Build in realtime.</span>
            <LayoutGroup>
              <motion.span layout className="flex whitespace-pre justify-center items-center mt-2">
                <motion.span
                  layout
                  className="flex whitespace-pre"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                >
                  Ship with the{" "}
                </motion.span>
                <TextRotate
                  texts={[
                    "best.",
                    "fastest.",
                    "smartest.",
                    "elite.",
                    "greatest."
                  ]}
                  mainClassName="overflow-hidden pr-3 text-[#fa6739] py-0 pb-2 md:pb-4 italic font-serif"
                  staggerDuration={0.03}
                  staggerFrom="last"
                  rotationInterval={3000}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              </motion.span>
            </LayoutGroup>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-[550px] text-sm md:text-base leading-relaxed text-stone-300"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
          >
            Niral Developer is a free developer community for Tamil-speaking engineers. Frontend, backend,
            mobile, and AI developers learn React, Next.js, Node.js, PostgreSQL, and AI tooling
            together.
          </motion.p>

          <motion.div 
            className="mt-9 flex flex-wrap gap-4 justify-center"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.7 }}
          >
            <button 
              onClick={onJoinClick} 
              className="rounded-full bg-[var(--orange)] px-5 py-3 text-[13px] md:text-[14px] text-zinc-950 font-bold hover:bg-[#e05629] transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-1.5 shadow-sm"
            >
              Join Niral Developer <ArrowUpRight size={16} />
            </button>
            <a 
              href="#showcase" 
              className="rounded-full bg-zinc-900 border border-stone-700 px-5 py-3 text-[13px] md:text-[14px] text-white font-bold hover:bg-zinc-800 transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center shadow-sm"
            >
              Meet the developers
            </a>
          </motion.div>

          <motion.div 
            className="mt-12 flex items-center gap-3 text-[11px] text-stone-400"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.9 }}
          >
            <div className="flex">
              {developers.map((developer) => (
                  <img src={developer.image} key={developer.name} alt={developer.name} className="ml-[-10px] h-8 w-8 rounded-full border-2 border-zinc-950 object-cover" />
              ))}
            </div>
            Join {stats[0][0]} modern developers shipping code daily.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
