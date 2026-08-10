import React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  /** Use light text color (stone-400) for dark backgrounds. Defaults to stone-500. */
  light?: boolean;
}

/**
 * Small uppercase monospace label used as a section eyebrow / kicker.
 * Shared across: home page, footer, tech-briefs page, stack page, cohorts page.
 */
export function Eyebrow({ children, light = false }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-[10px] uppercase tracking-[.085em] ${
        light ? "text-stone-400" : "text-stone-500"
      }`}
    >
      {children}
    </p>
  );
}
