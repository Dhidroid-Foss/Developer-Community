"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Eyebrow } from "@/components/common";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { programs as fallbackPrograms } from "@/features/home/data/home.data";
import { getSanityImageUrl } from "@/lib/sanity/image";
import type { BlogPost } from "@/lib/sanity/types";
import type { Program, ProgramSession } from "@/features/home/types/home.types";

interface ProgramsSectionProps {
  onJoinClick: () => void;
  posts?: BlogPost[];
}

/** Format a Sanity ISO date to short display format, e.g. "Jul 18" */
function formatSessionDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

/** Extract slug string from Sanity slug field */
function getSlugString(slug: BlogPost["slug"]): string {
  if (!slug) return "";
  return typeof slug === "string" ? slug : slug.current ?? "";
}

/** Build dynamic programs dataset from live Sanity blog posts */
function buildProgramsFromPosts(posts: BlogPost[]): Record<string, Program> {
  const usedSlugs = new Set<string>();

  const pickPosts = (keywords: string[], count = 2): BlogPost[] => {
    const matches = posts.filter((p) => {
      const slug = getSlugString(p.slug);
      if (usedSlugs.has(slug)) return false;
      const categoriesText = (p.categories ?? [])
        .map((c) => (c.title ?? "").toLowerCase())
        .join(" ");
      const combined = `${p.title ?? ""} ${categoriesText}`.toLowerCase();
      return keywords.some((k) => combined.includes(k.toLowerCase()));
    });

    const picked = matches.slice(0, count);
    picked.forEach((p) => {
      const slug = getSlugString(p.slug);
      if (slug) usedSlugs.add(slug);
    });

    // Fallback fill if not enough keyword matches
    if (picked.length < count) {
      for (const p of posts) {
        if (picked.length >= count) break;
        const slug = getSlugString(p.slug);
        if (!usedSlugs.has(slug)) {
          picked.push(p);
          if (slug) usedSlugs.add(slug);
        }
      }
    }

    return picked;
  };

  const toSession = (p: BlogPost, fallbackCategory: string): ProgramSession => {
    const cat = p.categories?.[0]?.title || fallbackCategory;
    const dateFormatted = formatSessionDate(p.publishedAt);
    const meta = dateFormatted ? `${cat} · ${dateFormatted}` : cat;
    const host = p.author?.name ? `Hosted by ${p.author.name}` : "Hosted by Niral Developer";
    const imageUrl =
      getSanityImageUrl(p.mainImage, { width: 500, quality: 80 }) ||
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80";

    return {
      meta,
      title: p.title || "Untitled Session",
      host,
      image: imageUrl,
      slug: getSlugString(p.slug),
    };
  };

  const clinicPosts = pickPosts(["architecture", "database", "postgres", "sql", "api", ".net", "backend", "system design"]);
  const workshopPosts = pickPosts(["react native", "mobile", "sqlite", "eslint", "theming", "reactjs", "android", "expo"]);
  const connectPosts = pickPosts(["ai", "llm", "vibe coding", "agentic", "hugging face", "n8n", "automation"]);
  const circlePosts = pickPosts(["git", "security", "docker", "microservice", "best practices", "node", "dev", "learn"]);

  return {
    clinic: {
      ...fallbackPrograms.clinic,
      sessions: clinicPosts.length > 0
        ? clinicPosts.map((p) => toSession(p, "Architecture"))
        : fallbackPrograms.clinic.sessions,
    },
    workshops: {
      ...fallbackPrograms.workshops,
      sessions: workshopPosts.length > 0
        ? workshopPosts.map((p) => toSession(p, "Skill Cohort"))
        : fallbackPrograms.workshops.sessions,
    },
    connect: {
      ...fallbackPrograms.connect,
      sessions: connectPosts.length > 0
        ? connectPosts.map((p) => toSession(p, "Dev Partnership"))
        : fallbackPrograms.connect.sessions,
    },
    circle: {
      ...fallbackPrograms.circle,
      sessions: circlePosts.length > 0
        ? circlePosts.map((p) => toSession(p, "Engineering Circle"))
        : fallbackPrograms.circle.sessions,
    },
  };
}

export function ProgramsSection({ onJoinClick, posts }: ProgramsSectionProps) {
  const hasPosts = posts && posts.length > 0;
  const programsData = hasPosts ? buildProgramsFromPosts(posts) : fallbackPrograms;

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

          {Object.entries(programsData).map(([key, program]) => (
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
                      className="group grid grid-cols-[85px_1fr_32px] items-center gap-3 border-b border-[var(--line)] pb-4 pt-0 last:pt-4 md:grid-cols-[112px_1fr_35px] md:gap-4 transition-colors"
                      key={session.title}
                    >
                      <img
                        className="h-[70px] w-[85px] object-cover grayscale transition duration-300 group-hover:grayscale-0 md:h-[82px] md:w-[112px]"
                        src={session.image}
                        alt={session.title}
                      />
                      <div>
                        <Eyebrow>{session.meta}</Eyebrow>
                        <h4 className="mt-1 text-sm font-bold leading-tight tracking-[-.05em] transition-colors group-hover:text-[var(--orange)]">
                          {session.slug ? (
                            <Link href={`/blog/${session.slug}`} className="hover:underline">
                              {session.title}
                            </Link>
                          ) : (
                            session.title
                          )}
                        </h4>
                        <p className="mt-1 text-[10px] text-stone-500">{session.host}</p>
                      </div>
                      {session.slug ? (
                        <Link
                          href={`/blog/${session.slug}`}
                          className="grid h-8 w-8 place-items-center rounded-full border border-stone-400 text-base hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-colors"
                          aria-label={`Read article: ${session.title}`}
                        >
                          <ArrowUpRight size={15} />
                        </Link>
                      ) : (
                        <button
                          onClick={onJoinClick}
                          className="grid h-8 w-8 place-items-center rounded-full border border-stone-400 text-base hover:bg-zinc-950 hover:text-white transition-colors"
                          aria-label={`View ${session.title}`}
                        >
                          <ArrowUpRight size={15} />
                        </button>
                      )}
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
