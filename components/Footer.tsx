"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/my_community_logo.svg";
import { Eyebrow } from "@/components/common";
import { DISCORD_INVITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-zinc-700 bg-zinc-950 pt-14 text-white">
      <div className="relative z-10 mx-auto grid w-[min(1170px,calc(100%-38px))] gap-9 md:grid-cols-[1.7fr_.55fr_.55fr] md:gap-15">

        {/* Brand column */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            aria-label="Niral Developer — home"
          >
            <Image
              src={logo}
              alt="Niral Developer logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="text-lg font-extrabold tracking-[-.05em] leading-none">
              <span className="text-[var(--orange)]">Niral</span>
              <span> Developer</span>
            </span>
          </Link>
          <p className="mt-5 max-w-85 text-[11px] leading-relaxed text-stone-400">
            A developer community becomes real when it ships code together. We&apos;re here for
            engineering minds building their own way—without building alone.
          </p>
          <a
            href="mailto:dhinesh4668@gmail.com"
            className="mt-4 block text-[11px] text-stone-300 hover:text-[var(--orange)] transition-colors"
          >
            hello@niraldeveloper.community
          </a>
        </div>

        {/* Link columns */}
        {[
          [
            "Explore",
            [
              ["Stack", "/stack"],
              ["Developers", "/developers"],
              ["Cohorts", "/cohorts"],
              ["Resources", "/resources"],
              ["Tech Briefs", "/tech-briefs"],
            ],
          ],
          [
            "Elsewhere",
            [
              ["Discord", DISCORD_INVITE],
              ["GitHub", "https://github.com/dhidroid"],
              ["LinkedIn", "https://linkedin.com/in/dhidroid-rndev"],
              ["YouTube", "https://youtube.com"],
            ],
          ],
        ].map(([heading, links]) => (
          <div key={heading as string}>
            <Eyebrow light>{heading as string}</Eyebrow>
            {(links as [string, string][]).map(([label, href]) => {
              const isExternal = href.startsWith("http");
              return isExternal ? (
                <a
                  className="mt-2 block text-[11px] text-stone-300 hover:text-[var(--orange)] transition-colors"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={label}
                >
                  {label}
                </a>
              ) : (
                <Link
                  className="mt-2 block text-[11px] text-stone-300 hover:text-[var(--orange)] transition-colors"
                  href={href}
                  key={label}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Copyright bar */}
      <div className="relative z-10 mx-auto flex w-[min(1170px,calc(100%-38px))] flex-col gap-2 py-12 font-mono text-[9px] text-stone-500 md:flex-row md:justify-between">
        <p>© 2026 Niral Developer. All rights reserved.</p>
        <p>Made for the engineering minds.</p>
      </div>

      {/* Giant watermark wordmark */}
      <div
        className="-mb-2 ml-[-2vw] w-max whitespace-nowrap text-[clamp(68px,11vw,170px)] font-extrabold leading-[.75] tracking-[-.09em] text-zinc-900"
        aria-hidden="true"
      >
        <span className="text-[#fa6739]/20">Niral</span> Developer ·{" "}
        <span className="text-[#fa6739]/20">Niral</span> Developer ·{" "}
        <span className="text-[#fa6739]/20">Niral</span> Developer
      </div>
    </footer>
  );
}
