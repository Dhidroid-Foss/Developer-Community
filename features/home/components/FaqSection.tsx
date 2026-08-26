"use client";

import { Eyebrow } from "@/components/common";
import { faqItems } from "@/features/home/data/faq.data";

export function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-[var(--paper)]">
      <div className="mx-auto grid w-[min(1170px,calc(100%-38px))] gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-[11%]">
        <div>
          <Eyebrow>FAQ · Frequently asked questions</Eyebrow>
          <h2 className="mt-3 text-[clamp(34px,4vw,52px)] font-bold leading-[.98] tracking-[-.073em] text-[var(--ink)]">
            Everything you need to <em>know.</em>
          </h2>
          <p className="mt-5 max-w-85 text-xs leading-relaxed text-stone-600">
            Straight answers about joining Niral Developer, our live sessions, and how the community
            works. Still curious? Ask us in the next live stream.
          </p>
        </div>

        <div className="border-t border-[var(--line)]">
          {faqItems.map(({ q, a }) => (
            <details key={q} className="group border-b border-[var(--line)] py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-bold tracking-[-.02em] text-[var(--ink)]">
                {q}
                <span
                  className="shrink-0 font-mono text-[var(--orange)] transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-160 text-xs leading-relaxed text-stone-600">{a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />
    </section>
  );
}
