"use client";

import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/common";
import { stories as fallbackStories, featuredResources } from "@/features/home/data/home.data";
import { getSanityImageUrl } from "@/lib/sanity/image";
import type { Work } from "@/lib/sanity/types";

/** Normalise Sanity slug to a plain string. */
function slugStr(slug: Work["slug"]): string {
  if (!slug) return "";
  return typeof slug === "string" ? slug : slug.current ?? "";
}

/** Map a Sanity project to the shape the stories grid expects. */
function projectToStory(project: Work) {
  const imageUrl = getSanityImageUrl(project.image, {
    width: 1200,
    quality: 85,
  });
  return {
    tag: [
      project.role,
      project.categories?.map((c) => c.title).join(" & "),
    ]
      .filter(Boolean)
      .join(" · ") || "Project",
    title: project.tagline || project.title || "Untitled project",
    image: imageUrl ?? "",
    stat: project.results ?? null,
    slug: slugStr(project.slug),
  };
}

interface ResourcesSectionProps {
  onJoinClick: () => void;
  projects?: Work[];
}

export function ResourcesSection({ onJoinClick, projects }: ResourcesSectionProps) {
  // Use real Sanity projects when available (take the 3 most recent),
  // otherwise fall back to static placeholder data.
  const hasProjects = projects && projects.length > 0;
  const displayStories = hasProjects
    ? projects.slice(0, 3).map(projectToStory)
    : fallbackStories.map((s) => ({ ...s, stat: null, slug: "" }));

  return (
    <>
      {/* Member Accomplishments — Stories Grid */}
      <section id="resources" className="bg-zinc-950 py-20 text-white md:py-32">
        <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <Eyebrow light>Member accomplishments</Eyebrow>
              <h2 className="mt-3 text-[clamp(34px,4vw,55px)] font-bold leading-[.98] tracking-[-.073em]">
                Real code.
                <br />
                Real impact.
              </h2>
            </div>
            <div className="hidden md:block">
              <button
                onClick={onJoinClick}
                className="inline-flex items-center gap-2 border-b pb-1 text-[11px] font-bold border-stone-100 text-stone-100"
              >
                Submit your project <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[1.1fr_.9fr]">
            {displayStories.map((story, index) => (
              <article
                className={`group relative min-h-[350px] overflow-hidden bg-zinc-800 ${
                  index === 0 ? "md:row-span-2 md:min-h-[690px]" : ""
                }`}
                key={story.title}
              >
                {story.image && (
                  <img
                    className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.04]"
                    src={story.image}
                    alt={story.title}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <Eyebrow light>{story.tag}</Eyebrow>
                  <h3 className="mt-3 max-w-125 text-[clamp(20px,2vw,31px)] font-bold leading-[1.08] tracking-[-.06em]">
                    {story.title}
                  </h3>
                  {index === 0 && story.stat ? (
                    <div className="mt-5 flex items-baseline gap-2">
                      <strong className="text-[35px] tracking-[-.07em] text-[var(--orange)]">
                        {story.stat}
                      </strong>
                    </div>
                  ) : index === 0 ? (
                    <div className="mt-5 flex items-baseline gap-2">
                      <strong className="text-[35px] tracking-[-.07em] text-[var(--orange)]">
                        ✦
                      </strong>
                      <span className="text-[10px] text-stone-200">
                        Featured project
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={onJoinClick}
                      className="mt-5 inline-block border-b border-white/70 text-[11px] font-bold"
                    >
                      {story.slug ? "View project" : "Read build story"} 
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Open-Source Resources Grid */}
      <section className="py-20 md:py-32">
        <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <Eyebrow>Worth your compile time</Eyebrow>
              <h2 className="mt-3 text-[clamp(34px,4vw,55px)] font-bold leading-[.98] tracking-[-.073em]">
                Open-source codebases
                <br />
                and guides.
              </h2>
            </div>
            <div className="hidden md:block">
              <button
                onClick={onJoinClick}
                className="inline-flex items-center gap-2 border-b pb-1 text-[11px] font-bold border-zinc-950 text-zinc-950"
              >
                Request resources <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          <div className="grid border-t border-[var(--line)] md:grid-cols-3">
            {featuredResources.map(([meta, title, action], i) => (
              <article
                className={`flex min-h-52 flex-col border-b border-[var(--line)] py-6 ${
                  i > 0 ? "md:border-l md:pl-7" : "md:pr-7"
                }`}
                key={title}
              >
                <Eyebrow>{meta}</Eyebrow>
                <h3 className="mt-2 max-w-70 text-xl font-bold leading-[1.18] tracking-[-.06em]">
                  {title}
                </h3>
                <button
                  onClick={onJoinClick}
                  className="mt-auto pt-6 text-[11px] font-bold text-left hover:text-[#fa6739] transition-colors"
                >
                  {action} <span className="ml-1 text-base"> </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
