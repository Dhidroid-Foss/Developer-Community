"use client";

import { useState } from "react";
import { FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterSectionProps {
  onJoinClick: () => void;
}

export function NewsletterSection({ onJoinClick }: NewsletterSectionProps) {
  const [submitted, setSubmitted] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (endpoint) {
      await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(event.currentTarget),
      });
    }
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return (
    <section id="join" className="bg-[var(--orange)] py-18 md:py-24">
      <div className="mx-auto grid w-[min(1170px,calc(100%-38px))] items-end gap-9 md:grid-cols-[1.05fr_.75fr] md:gap-[12%]">
        <div>
          <Eyebrow>Join the developer stream</Eyebrow>
          <h2 className="mt-3 max-w-142 text-[clamp(37px,4vw,58px)] font-bold leading-[1.01] tracking-[-.073em]">
            Code and architectural stories shipped <em>monthly.</em>
          </h2>
        </div>
        <div>
          <p className="mb-5 text-xs leading-relaxed text-[#71301f]">
            One curated email per month: open-source boilerplates, local LLM configurations, and
            live cohort invitations. No spam, ever.
          </p>
          <form onSubmit={subscribe} className="flex flex-col gap-2 sm:flex-row">
            <Input
              name="email"
              type="email"
              required
              placeholder="Your email address"
              className="bg-stone-50 border-stone-300 text-zinc-950 placeholder:text-stone-400"
            />
            <Button variant="dark" type="submit">
              Subscribe <ArrowUpRight size={16} />
            </Button>
          </form>
          <p className="mt-2 min-h-4 text-[10px] text-[#71301f]" aria-live="polite">
            {submitted && "You're on the list. Welcome to Niral Developer."}
          </p>
        </div>
      </div>
    </section>
  );
}
