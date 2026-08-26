/**
 * features/developers/index.ts — Public API for the developers feature module.
 *
 * Import from here instead of individual file paths:
 *   import { developers, developersById } from "@/features/developers";
 */

// ── Data ─────────────────────────────────────────────────────────────────────
export { developers, developersById } from "./data/developers.data";

// ── Types ─────────────────────────────────────────────────────────────────────
export type { Developer } from "./types/developer.types";
