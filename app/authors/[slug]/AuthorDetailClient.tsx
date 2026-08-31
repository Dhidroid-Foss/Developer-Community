import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContentShell } from "@/components/content/ContentShell";
import { CmsImage } from "@/components/content/CmsImage";
import { BlogCard } from "@/components/blog/BlogCard";
import { EmptyState } from "@/components/content/EmptyState";
import { JsonLd } from "@/components/seo/JsonLd";
import { currentSlug } from "@/lib/content";
import { getSanityImageUrl } from "@/lib/sanity/image";
import type { Author } from "@/lib/sanity/types";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/seo/structured-data";

function bioText(author: Author): string | undefined {
  if (typeof author.bio === "string") return author.bio;
  if (!Array.isArray(author.bio)) return undefined;
  const text = author.bio
    .map((block) => (block.children ?? []).map((child) => child.text ?? "").join(""))
    .join(" ")
    .trim();
  return text || undefined;
}

export default function AuthorDetailClient({ author }: { author: Author }) {
  const slug = currentSlug(author.slug);
  const path = `/authors/${slug}`;
  const summary = bioText(author);
  const image = getSanityImageUrl(author.image, { width: 800, quality: 80 });
  const posts = author.posts ?? [];

  return (
    <ContentShell>
      <JsonLd
        data={personJsonLd({
          name: author.name ?? "Author",
          path,
          description: summary,
          image,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Authors", path: "/authors" },
          { name: author.name ?? "Author", path },
        ])}
      />

      <Link
        href="/authors"
        className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-stone-500 hover:text-[#151515]"
      >
        <ArrowLeft size={14} /> Back to Authors
      </Link>

      <header className="mb-12 flex flex-col gap-6 border-b border-[#cfcac0] pb-10 sm:flex-row sm:items-center">
        <div className="relative h-28 w-28 overflow-hidden bg-stone-200">
          {author.image?.asset?.url ? (
            <CmsImage
              image={author.image}
              alt={author.name ?? "Author"}
              fill
              priority
              className="object-cover"
              sizes="112px"
            />
          ) : null}
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.085em] text-stone-500">Author</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#151515] md:text-4xl">
            {author.name ?? "Author"}
          </h1>
          {summary ? <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-stone-600">{summary}</p> : null}
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-stone-500">
            {author.postCount ?? posts.length} {(author.postCount ?? posts.length) === 1 ? "article" : "articles"}
          </p>
        </div>
      </header>

      <h2 className="text-2xl font-extrabold tracking-tight text-[#151515]">Articles</h2>
      {posts.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No articles yet" description="This author has no published posts in Sanity." />
        </div>
      ) : (
        <div className="mt-2">
          {posts.map((post) => (
            <BlogCard key={currentSlug(post.slug) || post.title || "post"} post={post} />
          ))}
        </div>
      )}
    </ContentShell>
  );
}
