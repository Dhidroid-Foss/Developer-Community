import Link from "next/link";
import PixelCard from "@/components/PixelCard";
import { CmsImage } from "@/components/content/CmsImage";
import { currentSlug } from "@/lib/content";
import type { Author } from "@/lib/sanity/types";

function bioPreview(author: Author): string | undefined {
  if (typeof author.bio === "string") return author.bio;
  if (!Array.isArray(author.bio)) return undefined;
  const text = author.bio
    .map((block) => (block.children ?? []).map((child) => child.text ?? "").join(""))
    .join(" ")
    .trim();
  return text || undefined;
}

export function AuthorCard({ author }: { author: Author }) {
  const slug = currentSlug(author.slug);
  const href = slug ? `/authors/${slug}` : "/authors";
  const count = author.postCount ?? 0;
  const preview = bioPreview(author);

  return (
    <Link href={href} className="group block">
      <PixelCard
        variant="orange"
        className="h-full w-full cursor-pointer border-[#cfcac0] bg-stone-100/50 p-6 hover:border-zinc-800 hover:bg-stone-50 pointer-events-auto"
      >
        <div className="pointer-events-none select-none">
          <div className="relative mb-6 aspect-square overflow-hidden bg-zinc-800">
            {author.image?.asset?.url ? (
              <CmsImage
                image={author.image}
                alt={author.name ?? "Author"}
                fill
                className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <span className="flex h-full items-center justify-center font-mono text-[9px] uppercase tracking-wider text-stone-400">
                No photo
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-950 group-hover:text-[#fa6739]">
            {author.name ?? "Author"}
          </h2>
          {preview ? (
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-stone-600">{preview}</p>
          ) : null}
          <p className="mt-4 font-mono text-[9px] uppercase tracking-wider text-stone-500">
            {count} {count === 1 ? "article" : "articles"}
          </p>
        </div>
      </PixelCard>
    </Link>
  );
}
