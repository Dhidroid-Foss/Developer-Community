"use client";

import Link from "next/link";

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) { 
  return <p className={`font-mono text-[10px] uppercase tracking-[.085em] ${light ? "text-stone-400" : "text-stone-500"}`}>{children}</p>; 
}

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-zinc-700 bg-zinc-950 pt-14 text-white">
      <div className="relative z-10 mx-auto grid w-[min(1170px,calc(100%-38px))] gap-9 md:grid-cols-[1.7fr_.55fr_.55fr] md:gap-15">
        <div>
          <Link href="/" className="text-lg font-extrabold tracking-[-.05em] hover:opacity-90 transition-opacity">
            <span className="mr-1 text-[var(--orange)]">✦</span>DevSync
          </Link>
          <p className="mt-5 max-w-85 text-[11px] leading-relaxed text-stone-400">
            A developer community becomes real when it ships code together. We're here for engineering minds building their own way—without building alone.
          </p>
          <a href="mailto:hello@devsync.community" className="mt-4 block text-[11px] text-stone-300 hover:text-[var(--orange)] transition-colors">hello@devsync.community</a>
        </div>
        {[
          ["Explore", [["Stack", "/stack"], ["Developers", "/developers"], ["Cohorts", "/cohorts"], ["Resources", "/resources"]]],
          ["Elsewhere", [["GitHub", "https://github.com"], ["Discord", "https://discord.gg"], ["LinkedIn", "https://linkedin.com"], ["YouTube", "https://youtube.com"]]]
        ].map(([heading, links]) => (
          <div key={heading as string}>
            <Eyebrow light>{heading as string}</Eyebrow>
            {(links as [string, string][]).map(([label, href]) => {
              const isExternal = href.startsWith("http");
              return isExternal ? (
                <a className="mt-2 block text-[11px] text-stone-300 hover:text-[var(--orange)] transition-colors" href={href} target="_blank" rel="noopener noreferrer" key={label}>{label}</a>
              ) : (
                <Link className="mt-2 block text-[11px] text-stone-300 hover:text-[var(--orange)] transition-colors" href={href} key={label}>{label}</Link>
              );
            })}
          </div>
        ))}
      </div>
      <div className="relative z-10 mx-auto flex w-[min(1170px,calc(100%-38px))] flex-col gap-2 py-12 font-mono text-[9px] text-stone-500 md:flex-row md:justify-between">
        <p>© 2026 DevSync. All rights reserved.</p>
        <p>Made for the engineering minds.</p>
      </div>
      <div className="-mb-2 ml-[-2vw] w-max whitespace-nowrap text-[clamp(68px,11vw,170px)] font-extrabold leading-[.75] tracking-[-.09em] text-zinc-900" aria-hidden="true">
        DEVSYNC · DEVSYNC · DEVSYNC
      </div>
    </footer>
  );
}
