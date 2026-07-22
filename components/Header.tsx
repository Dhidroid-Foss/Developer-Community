"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Menu } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onJoinClick?: () => void;
}

export default function Header({ onJoinClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-zinc-950/85 text-white backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] w-[min(1170px,calc(100%-38px))] items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="text-[17px] font-extrabold tracking-[-.05em] hover:opacity-90 transition-opacity flex items-center gap-0.5">
          <span className="text-[var(--orange)]" lang="ta">தமிழ்</span><span>Dev</span>
        </Link>
        <div className="hidden items-center gap-7 text-xs font-semibold md:flex">
          <Link href="/stack" className="hover:text-[var(--orange)] transition-colors">Stack</Link>
          <Link href="/developers" className="hover:text-[var(--orange)] transition-colors">Developers</Link>
          <Link href="/cohorts" className="hover:text-[var(--orange)] transition-colors">Cohorts</Link>
          <Link href="/resources" className="hover:text-[var(--orange)] transition-colors">Resources</Link>
          <button 
            onClick={onJoinClick}
            className="rounded-full bg-[var(--orange)] px-4 py-2.5 text-[11px] text-zinc-950 font-bold hover:bg-[#e05629] transition-colors cursor-pointer"
          >
            Join now <span className="ml-1 text-base">↗</span>
          </button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 md:hidden" aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="border-t border-white/15 bg-zinc-950 px-5 pb-5 md:hidden">
            <div className="mx-auto flex w-[min(1170px,100%)] flex-col items-start gap-1 text-sm">
              <Link className="py-3 w-full" onClick={() => setMenuOpen(false)} href="/stack">Stack</Link>
              <Link className="py-3 w-full" onClick={() => setMenuOpen(false)} href="/developers">Developers</Link>
              <Link className="py-3 w-full" onClick={() => setMenuOpen(false)} href="/cohorts">Cohorts</Link>
              <Link className="py-3 w-full" onClick={() => setMenuOpen(false)} href="/resources">Resources</Link>
              <button 
                className="mt-2 w-full text-center rounded-full bg-[var(--orange)] px-4 py-2.5 text-xs font-bold text-zinc-950" 
                onClick={() => { setMenuOpen(false); onJoinClick?.(); }}
              >
                Join now ↗
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
