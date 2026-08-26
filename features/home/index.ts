/**
 * features/home/index.ts — Public API for the home feature module.
 *
 * Import from here instead of individual file paths:
 *   import { HeroSection, programs, faqItems } from "@/features/home";
 */

// ── Section Components ────────────────────────────────────────────────────────
export { HeroSection }         from "./components/HeroSection";
export { ShowcaseSection }     from "./components/ShowcaseSection";
export { CommunitySection }    from "./components/CommunitySection";
export { ProgramsSection }     from "./components/ProgramsSection";
export { TestimonialsSection } from "./components/TestimonialsSection";
export { ResourcesSection }    from "./components/ResourcesSection";
export { NewsletterSection }   from "./components/NewsletterSection";
export { FaqSection }          from "./components/FaqSection";
export { CtaSection }          from "./components/CtaSection";

// ── Data ─────────────────────────────────────────────────────────────────────
export {
  programs,
  stories,
  quotes,
  liveEvents,
  stats,
  featuredResources,
  brands,
} from "./data/home.data";

export { blueprintTechs, page2Techs, allTechs, homeIconMap } from "./data/tech-grid.data";
export { faqItems, FAQ_ANSWERS }                               from "./data/faq.data";

// ── Types ─────────────────────────────────────────────────────────────────────
export type { ProgramSession, Program, Story, Quote } from "./types/home.types";
