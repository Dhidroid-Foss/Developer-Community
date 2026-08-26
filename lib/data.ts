/**
 * lib/data.ts — DEPRECATED backward-compatibility re-export hub.
 *
 * ⚠️  This file exists only to avoid breaking callers that have not yet
 *     been migrated to import directly from their feature modules.
 *
 * Migration status:
 *   ✅ app/page.tsx       → now imports from @/features/home
 *   ✅ app/developers/[id] → now uses @/features/developers/data/developers.data
 *   ⏳ Other consumers    → migrate to direct feature imports
 *
 * Phase 4 (cleanup): Delete this file once all consumers are migrated.
 */

// ── Stack ─────────────────────────────────────────────────────────────────────
export type { Technology }              from "@/features/stack/types/technology.types";
export { technologies, homeTechnologies } from "@/features/stack/data/technologies.data";

// ── Cohorts ───────────────────────────────────────────────────────────────────
export type { Session, Cohort }         from "@/features/cohorts/types/cohort.types";
export { cohorts }                      from "@/features/cohorts/data/cohorts.data";

// ── Resources ─────────────────────────────────────────────────────────────────
export type { Resource }                from "@/features/resources/types/resource.types";
export { resources }                    from "@/features/resources/data/resources.data";

// ── Developers ────────────────────────────────────────────────────────────────
export type { Developer }               from "@/features/developers/types/developer.types";
export { developers }                   from "@/features/developers/data/developers.data";

// ── Home (programs, stories, quotes, live events, stats, etc.) ────────────────
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
