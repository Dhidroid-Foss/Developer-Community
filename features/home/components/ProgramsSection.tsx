"use client";

import { motion } from "motion/react";
import { Eyebrow } from "@/components/common";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { programs } from "@/features/home/data/home.data";

interface ProgramsSectionProps {
  onJoinClick: () => void;
}

export function ProgramsSection({ onJoinClick }: ProgramsSectionProps) {
  return (
    <section id="programs" className="">
      <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <Eyebrow>A place to stretch your practice</Eyebrow>
            <h2 className="mt-3 text-[clamp(34px,4vw,55px)] font-bold leading-[.98] tracking-[-.073em]">
              Accelerate your
              <br />
              <em>engineering.</em>
            </h2>
          </div>
          <p className="hidden max-w-72 text-xs text-stone-600 md:block">
            The most useful technical training is the kind you can deploy to production on Monday
            morning.
          </p>
        </div>

        <Tabs defaultValue="clinic">
          <TabsList aria-label="Niral Developer cohorts">
            <TabsTrigger value="clinic">Architecture Clinic</TabsTrigger>
            <TabsTrigger value="workshops">Skill Cohorts</TabsTrigger>
            <TabsTrigger value="connect">Dev Partnerships</TabsTrigger>
            <TabsTrigger value="circle">Engineering Circle</TabsTrigger>
          </TabsList>

          {Object.entries(programs).map(([key, program]) => (
            <TabsContent value={key} key={key}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-9 pt-10 md:grid-cols-[.85fr_1.15fr] md:gap-[11%]"
              >
                <div>
                  <Eyebrow>{program.label}</Eyebrow>
                  <h3 className="mt-3 text-[31px] font-bold leading-[1.07] tracking-[-.065em]">
                    {(() => {
                      const w = program.title.split(" ");
                      return (
                        <>
                          {w.slice(0, -1).join(" ")} <em>{w[w.length - 1]}</em>
                        </>
                      );
                    })()}
                  </h3>
                  <p className="mt-4 max-w-85 text-xs leading-relaxed text-stone-600">
                    {program.text}
                  </p>
                </div>
                <div>
                  {program.sessions.map((session) => (
                    <article
                      className="grid grid-cols-[85px_1fr_32px] items-center gap-3 border-b border-[var(--line)] pb-4 pt-0 last:pt-4 md:grid-cols-[112px_1fr_35px] md:gap-4"
                      key={session.title}
                    >
                      <img
                        className="h-[70px] w-[85px] object-cover grayscale md:h-[82px] md:w-[112px]"
                        src={session.image}
                        alt=""
                      />
                      <div>
                        <Eyebrow>{session.meta}</Eyebrow>
                        <h4 className="mt-1 text-sm font-bold leading-tight tracking-[-.05em]">
                          {session.title}
                        </h4>
                        <p className="mt-1 text-[10px] text-stone-500">{session.host}</p>
                      </div>
                      <button
                        onClick={onJoinClick}
                        className="grid h-8 w-8 place-items-center rounded-full border border-stone-400 text-base hover:bg-zinc-950 hover:text-white transition-colors"
                        aria-label={`View ${session.title}`}
                      >
                         
                      </button>
                    </article>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
