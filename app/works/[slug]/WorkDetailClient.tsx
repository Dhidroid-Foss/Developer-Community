import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { ContentShell } from "@/components/content/ContentShell";
import { CmsImage } from "@/components/content/CmsImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { currentSlug, firstCategory } from "@/lib/content";
import { getSanityImageUrl } from "@/lib/sanity/image";
import type { Work } from "@/lib/sanity/types";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/seo/structured-data";

function Section({ title, body }: { title: string; body?: string | null }) {
  if (!body || typeof body !== "string" || !body.trim()) return null;
  return (
    <section className="border-t border-[#cfcac0] pt-8">
      <h2 className="text-xl font-extrabold tracking-tight text-[#151515]">{title}</h2>
      <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-stone-600 whitespace-pre-wrap">{body}</p>
    </section>
  );
}

export default function WorkDetailClient({ work }: { work: Work }) {
  const slug = currentSlug(work.slug);
  const path = `/works/${slug}`;
  const image = getSanityImageUrl(work.image, { width: 1600, quality: 80 });
  const category = firstCategory(work.categories);
  const year = work.year != null ? String(work.year) : undefined;

  const creativeWorkLd = creativeWorkJsonLd({
    title: work.title ?? "Project",
    path,
    description: work.tagline ?? work.description ?? undefined,
    image,
    datePublished: year,
    url: work.link ?? undefined,
  });

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Works", path: "/works" },
    { name: work.title ?? "Project", path },
  ]);

  return (
    <ContentShell>
      <JsonLd data={creativeWorkLd} />
      <JsonLd data={breadcrumbLd} />

      <Link
        href="/works"
        className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-stone-500 hover:text-[#151515]"
      >
        <ArrowLeft size={14} /> Back to Works
      </Link>

      <article>
        <header className="border-b border-[#cfcac0] pb-10">
          {category ? (
            <p className="font-mono text-[10px] uppercase tracking-[.085em] text-[#fa6739]">{category}</p>
          ) : null}
          <h1 className="mt-3 text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.02] tracking-tight text-[#151515]">
            {work.title ?? "Untitled project"}
          </h1>
          {work.tagline ? (
            <p className="mt-4 max-w-[68ch] text-sm leading-relaxed text-stone-600 md:text-base">{work.tagline}</p>
          ) : null}
          <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-stone-500">
            {[work.role, year].filter(Boolean).join(" · ")}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {work.link ? (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-stone-600 hover:text-[#fa6739]"
              >
                Project URL <ExternalLink size={12} />
              </a>
            ) : null}
            {work.github ? (
              <a
                href={work.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-stone-600 hover:text-[#fa6739]"
              >
                <Github size={12} /> GitHub
              </a>
            ) : null}
          </div>
        </header>

        {work.image?.asset?.url ? (
          <figure className="relative mt-10 aspect-[16/8] overflow-hidden bg-stone-200">
            <CmsImage
              image={work.image}
              alt={work.title ?? "Project"}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1170px) 100vw, 1170px"
            />
          </figure>
        ) : null}

        <div className="mt-12 space-y-10">
          <Section title="Overview" body={work.description} />
          <Section title="Challenge" body={work.challenge} />
          <Section title="Solution" body={work.solution} />
          <Section title="Results" body={work.results} />
        </div>

        {(work.categories ?? []).length > 0 ? (
          <section className="mt-10 border-t border-[#cfcac0] pt-8">
            <h2 className="text-xl font-extrabold tracking-tight text-[#151515]">Categories</h2>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {(work.categories ?? []).map((item) =>
                item.title ? (
                  <span key={item.title} className="bg-stone-200 px-2 py-1 font-mono text-[8px] text-stone-600">
                    {item.title}
                  </span>
                ) : null,
              )}
            </div>
          </section>
        ) : null}

        {(work.gallery ?? []).some((item) => item?.asset?.url) ? (
          <section className="mt-10 border-t border-[#cfcac0] pt-8">
            <h2 className="text-xl font-extrabold tracking-tight text-[#151515]">Gallery</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(work.gallery ?? []).map((item, index) =>
                item?.asset?.url ? (
                  <div key={item.asset._id ?? item.asset.url ?? index} className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                    <CmsImage
                      image={item}
                      alt={`${work.title ?? "Project"} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : null,
              )}
            </div>
          </section>
        ) : null}
      </article>
    </ContentShell>
  );
}
