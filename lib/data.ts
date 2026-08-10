/**
 * lib/data.ts — Re-export hub (backward compatibility layer)
 *
 * All domain types and data now live in their respective feature directories.
 * This file re-exports everything so existing consumers continue to compile
 * without modification during Phase 3 migration.
 *
 * Phase 4 (cleanup) will remove this file once all consumers import
 * directly from their feature modules.
 */

// ── Stack ────────────────────────────────────────────────────────────────────
export type { Technology } from "@/features/stack/types/technology.types";
export { technologies, homeTechnologies } from "@/features/stack/data/technologies.data";

// ── Cohorts ──────────────────────────────────────────────────────────────────
export type { Session, Cohort } from "@/features/cohorts/types/cohort.types";
export { cohorts } from "@/features/cohorts/data/cohorts.data";

// ── Resources ────────────────────────────────────────────────────────────────
export type { Resource } from "@/features/resources/types/resource.types";
export { resources } from "@/features/resources/data/resources.data";

// ── Developers ───────────────────────────────────────────────────────────────
export type { Developer } from "@/features/developers/types/developer.types";
export { developers } from "@/features/developers/data/developers.data";

// ── Home (programs, stories, quotes, live events, stats, etc.) ───────────────
export type { ProgramSession, Program, Story, Quote } from "@/features/home/types/home.types";
export {
  programs,
  stories,
  quotes,
  liveEvents,
  stats,
  featuredResources,
  brands,
} from "@/features/home/data/home.data";
