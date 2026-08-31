import Link from "next/link";
import PixelCard from "@/components/PixelCard";
import { CmsImage } from "@/components/content/CmsImage";
import { currentSlug, firstCategory } from "@/lib/content";
import type { Work } from "@/lib/sanity/types";

export function WorkCard({ work }: { work: Work }) {
  const slug = currentSlug(work.slug);
  const href = slug ? `/works/${slug}` : "/works";
  const category = firstCategory(work.categories);

  return (
    <Link href={href} className="group block">
      <PixelCard
        variant="orange"
        className="h-full w-full cursor-pointer border-[#cfcac0] bg-stone-100/50 p-6 hover:border-zinc-800 hover:bg-stone-50 pointer-events-auto"
      >
        <div className="pointer-events-none select-none">
          <div className="relative mb-6 aspect-[1.4] overflow-hidden bg-zinc-800">
            {work.image?.asset?.url ? (
              <CmsImage
                image={work.image}
                alt={work.title ?? "Project"}
                fill
                className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <span className="flex h-full items-center justify-center font-mono text-[9px] uppercase tracking-wider text-stone-400">
                No image
              </span>
            )}
            {work.year ? (
              <span className="absolute left-3 top-3 rounded-full bg-zinc-950/70 px-2 py-1 font-mono text-[8px] text-white">
                {work.year}
              </span>
            ) : null}
          </div>
          {category ? (
            <p className="font-mono text-[9px] uppercase tracking-wider text-[#fa6739]">{category}</p>
          ) : null}
          <h2 className="mt-2 text-xl font-bold tracking-tight text-zinc-950 group-hover:text-[#fa6739]">
            {work.title ?? "Untitled project"}
          </h2>
          {work.tagline || work.description ? (
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-stone-600">
              {work.tagline ?? work.description}
            </p>
          ) : null}
          {work.role ? (
            <p className="mt-3 font-mono text-[9px] uppercase tracking-wider text-stone-500">{work.role}</p>
          ) : null}
        </div>
      </PixelCard>
    </Link>
  );
}
