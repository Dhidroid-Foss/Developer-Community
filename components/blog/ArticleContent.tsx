import type { ReactNode } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CmsImage } from "@/components/content/CmsImage";
import { headingIdForBlock, isMarkdownBody, isPortableText, asPortableBlocks } from "@/utils/portable-text";
import type { PortableBlock, PortableTextValue, SanityImage } from "@/lib/sanity/types";

const prose = {
  h2: "mt-10 mb-4 text-2xl font-extrabold tracking-tight text-[#151515]",
  h3: "mt-8 mb-3 text-xl font-bold tracking-tight text-[#151515]",
  p: "my-4 text-sm md:text-[15px] leading-relaxed text-stone-700",
  a: "text-[#151515] underline decoration-[#cfcac0] underline-offset-4 hover:text-[#fa6739] hover:decoration-[#fa6739] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]",
  list: "my-4 ml-5 space-y-2 text-sm md:text-[15px] leading-relaxed text-stone-700",
  quote:
    "my-6 border-l-2 border-[#fa6739] pl-4 font-heading text-lg font-bold leading-snug tracking-[-.04em] text-[#151515]",
  codeInline: "rounded bg-stone-200/80 px-1.5 py-0.5 font-mono text-[12px] text-[#151515]",
  pre: "my-6 overflow-x-auto border border-[#cfcac0] bg-zinc-950 p-4 font-mono text-[12px] leading-relaxed text-stone-200",
  hr: "my-10 border-[#cfcac0]",
  table: "my-6 w-full overflow-x-auto text-left text-sm",
  img: "my-8 w-full border border-[#cfcac0] bg-stone-100 object-cover",
};

function markdownComponents() {
  return {
    h1: ({ children }: { children?: ReactNode }) => <h2 className={prose.h2}>{children}</h2>,
    h2: ({ children }: { children?: ReactNode }) => <h2 className={prose.h2}>{children}</h2>,
    h3: ({ children }: { children?: ReactNode }) => <h3 className={prose.h3}>{children}</h3>,
    p: ({ children }: { children?: ReactNode }) => <p className={prose.p}>{children}</p>,
    a: ({ href, children }: { href?: string; children?: ReactNode }) => (
      <a href={href} className={prose.a} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    ),
    ul: ({ children }: { children?: ReactNode }) => <ul className={`${prose.list} list-disc`}>{children}</ul>,
    ol: ({ children }: { children?: ReactNode }) => <ol className={`${prose.list} list-decimal`}>{children}</ol>,
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className={prose.quote}>{children}</blockquote>
    ),
    code: ({ className, children }: { className?: string; children?: ReactNode }) => {
      const isBlock = Boolean(className);
      if (isBlock) {
        return <code className={className}>{children}</code>;
      }
      return <code className={prose.codeInline}>{children}</code>;
    },
    pre: ({ children }: { children?: ReactNode }) => <pre className={prose.pre}>{children}</pre>,
    hr: () => <hr className={prose.hr} />,
    table: ({ children }: { children?: ReactNode }) => (
      <div className="overflow-x-auto">
        <table className={prose.table}>{children}</table>
      </div>
    ),
    th: ({ children }: { children?: ReactNode }) => (
      <th className="border-b border-[#cfcac0] px-3 py-2 font-mono text-[10px] uppercase tracking-wider">{children}</th>
    ),
    td: ({ children }: { children?: ReactNode }) => (
      <td className="border-b border-[#cfcac0]/60 px-3 py-2 text-stone-700">{children}</td>
    ),
    img: ({ src, alt }: { src?: string | Blob; alt?: string }) =>
      src && typeof src === "string" ? (
        // Markdown images are remote URLs from the CMS body
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? ""} className={prose.img} />
      ) : null,
  };
}

function portableComponents(seen: Map<string, number>): PortableTextComponents {
  return {
    block: {
      h2: ({ value, children }) => {
        const id = headingIdForBlock(value as PortableBlock, seen);
        return (
          <h2 id={id} className={prose.h2}>
            {children}
          </h2>
        );
      },
      h3: ({ value, children }) => {
        const id = headingIdForBlock(value as PortableBlock, seen);
        return (
          <h3 id={id} className={prose.h3}>
            {children}
          </h3>
        );
      },
      normal: ({ children }) => <p className={prose.p}>{children}</p>,
      blockquote: ({ children }) => <blockquote className={prose.quote}>{children}</blockquote>,
    },
    list: {
      bullet: ({ children }) => <ul className={`${prose.list} list-disc`}>{children}</ul>,
      number: ({ children }) => <ol className={`${prose.list} list-decimal`}>{children}</ol>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => <code className={prose.codeInline}>{children}</code>,
      link: ({ value, children }) => {
        const href = typeof value?.href === "string" ? value.href : undefined;
        const external = Boolean(href?.startsWith("http"));
        return (
          <a
            href={href}
            className={prose.a}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value }) => {
        const image = value as SanityImage & PortableBlock;
        return (
          <figure className="my-8">
            <CmsImage
              image={image}
              alt={image.alt ?? ""}
              className={prose.img}
              sizes="(max-width: 768px) 100vw, 720px"
            />
            {image.caption ? (
              <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-wider text-stone-500">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      },
      code: ({ value }) => {
        const language = typeof value?.language === "string" ? value.language : undefined;
        const code = typeof value?.code === "string" ? value.code : "";
        return (
          <pre className={prose.pre} data-language={language}>
            <code>{code}</code>
          </pre>
        );
      },
    },
  };
}

export function ArticleContent({
  body,
  fallbackText,
}: {
  body?: PortableTextValue;
  fallbackText?: string | null;
}) {
  if (isPortableText(body) && body.length > 0) {
    const seen = new Map<string, number>();
    return (
      <div className="max-w-[68ch]">
        <PortableText value={asPortableBlocks(body)} components={portableComponents(seen)} />
      </div>
    );
  }

  if (isMarkdownBody(body)) {
    return (
      <div className="max-w-[68ch]">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents()}>
          {body}
        </ReactMarkdown>
      </div>
    );
  }

  if (fallbackText?.trim()) {
    return (
      <div className="max-w-[68ch]">
        {fallbackText
          .split(/\n{2,}/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
          .map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className={prose.p}>
              {paragraph}
            </p>
          ))}
      </div>
    );
  }

  return (
    <p className="max-w-[68ch] text-sm text-stone-500">This article has no body content yet.</p>
  );
}
