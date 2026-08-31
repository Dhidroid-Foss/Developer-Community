import Link from "next/link";
import { CmsImage } from "@/components/content/CmsImage";
import { currentSlug } from "@/lib/content";
import type { AuthorRef } from "@/lib/sanity/types";
function bioText(bio: AuthorRef["bio"]): string | undefined {
  if (typeof bio === "string") return bio;
  if (!Array.isArray(bio)) return undefined;
  const text = bio
    .map((block) => (block.children ?? []).map((child) => child.text ?? "").join(""))
    .join(" ")
    .trim();
  return text || undefined;
}

export function ArticleAuthor({ author }: { author?: AuthorRef | null }) {
  if (!author?.name) return null;
  const slug = currentSlug(author.slug);
  const href = slug ? `/authors/${slug}` : "/authors";
  const summary = bioText(author.bio);

  return (
    <section className="mt-14 border-t border-[#cfcac0] pt-10">
      <p className="font-mono text-[10px] uppercase tracking-[.085em] text-stone-500">Written by</p>
      <div className="mt-5 flex gap-5">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-stone-200">
          {author.image?.asset?.url ? (
            <CmsImage
              image={author.image}
              alt={author.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : null}
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#151515]">
            <Link href={href} className="hover:text-[#fa6739] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]">
              {author.name}
            </Link>
          </h2>
          {summary ? <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-stone-600">{summary}</p> : null}
          <Link
            href={href}
            className="mt-3 inline-block font-mono text-[10px] uppercase tracking-wider text-[#fa6739]"
          >
            View author  
          </Link>
        </div>
      </div>
    </section>
  );
}
