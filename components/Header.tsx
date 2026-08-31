"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/app/assets/my_community_logo.svg";
import { DISCORD_INVITE } from "@/lib/site";
import RichNavigationMenu from "@/components/ui/navigation-menu-06";
import { cn } from "@/lib/utils";

interface HeaderProps {
  /** Legacy prop — kept for API compatibility but no longer used for modal. */
  onJoinClick?: () => void;
  /** Explicit color theme override ("dark" | "light" | "auto") */
  theme?: "dark" | "light" | "auto";
  /** Optional additional CSS classes */
  className?: string;
}

export default function Header({
  onJoinClick: _,
  theme = "auto",
  className,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if current route has a dark hero background by default
  const isDarkRoute = pathname === "/" || pathname === "/tech-briefs";
  const resolvedTheme = theme === "auto" ? (isDarkRoute ? "dark" : "light") : theme;
  const isDark = resolvedTheme === "dark";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        scrolled
          ? isDark
            ? "bg-zinc-950/85 backdrop-blur-md border-b border-white/10 shadow-md shadow-black/20 py-0 text-white"
            : "bg-[#eeeae2]/85 backdrop-blur-md border-b border-stone-300/80 shadow-sm shadow-stone-900/5 py-0 text-stone-900"
          : isDark
            ? "bg-transparent backdrop-blur-none border-b border-transparent py-1.5 text-white"
            : "bg-transparent backdrop-blur-none border-b border-transparent py-1.5 text-stone-900",
        className
      )}
    >
      <nav
        className="mx-auto flex h-[68px] md:h-[72px] w-[min(1170px,calc(100%-38px))] items-center justify-between transition-all duration-300"
        aria-label="Main navigation"
      >
        {/* ── Brand wordmark + logo ────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          aria-label="Niral Developer — home"
        >
          <Image
            src={logo}
            alt="Niral Developer logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="text-[17px] font-extrabold tracking-[-.05em] leading-none">
            <span className="text-[var(--orange)]">Niral</span>
            <span className={isDark ? "text-white" : "text-stone-900"}> Developer</span>
          </span>
        </Link>

        {/* ── Desktop rich nav ─────────────────────────────────────────── */}
        <div className="hidden items-center md:flex">
          <RichNavigationMenu isDark={isDark} />
        </div>

        {/* ── Right action buttons ─────────────────────────────────────── */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/stack"
            className={cn(
              "text-xs font-semibold transition-colors",
              isDark ? "text-stone-300 hover:text-white" : "text-stone-700 hover:text-stone-950"
            )}
          >
            Stack
          </Link>
          <Link
            href="/cohorts"
            className={cn(
              "text-xs font-semibold transition-colors",
              isDark ? "text-stone-300 hover:text-white" : "text-stone-700 hover:text-stone-950"
            )}
          >
            Cohorts
          </Link>

          {/* Join now → Discord invite */}
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--orange)] px-4 py-2 text-[11px] text-zinc-950 font-bold hover:bg-[#e05629] transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-1 shadow-sm"
          >
            Join now
          </a>
        </div>

        {/* ── Mobile hamburger ────────────────────────────────────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={cn(
            "p-2 md:hidden transition-colors",
            isDark ? "text-white hover:text-white/80" : "text-stone-900 hover:text-black"
          )}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className={cn(
              "px-5 pb-5 md:hidden backdrop-blur-xl transition-colors",
              isDark
                ? "border-t border-white/15 bg-zinc-950/95 text-white"
                : "border-t border-stone-300/80 bg-[#eeeae2]/98 text-stone-900 shadow-xl"
            )}
          >
            <div className="mx-auto flex w-[min(1170px,100%)] flex-col items-start gap-1 text-sm font-medium">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/works", label: "Works" },
                { href: "/authors", label: "Authors" },
                { href: "/stack", label: "Stack" },
                { href: "/developers", label: "Developers" },
                { href: "/cohorts", label: "Cohorts" },
                { href: "/resources", label: "Resources" },
              ].map((item) => (
                <Link
                  key={item.href}
                  className={cn(
                    "py-3 w-full transition-colors",
                    isDark
                      ? "text-stone-200 hover:text-[var(--orange)]"
                      : "text-stone-800 hover:text-[var(--orange)]"
                  )}
                  onClick={() => setMenuOpen(false)}
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}

              {/* Join now → Discord */}
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-2 w-full text-center rounded-full bg-[var(--orange)] px-4 py-2.5 text-xs font-bold text-zinc-950 block hover:bg-[#e05629] transition-colors"
              >
                Join now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
