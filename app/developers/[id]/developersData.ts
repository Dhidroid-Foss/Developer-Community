/**
 * app/developers/[id]/developersData.ts — DEPRECATED
 *
 * ⚠️  This file is kept only as a shim during migration.
 *     It now re-exports `developersById` from the canonical data source.
 *
 * TODO (Phase 4): Delete this file and update the import in page.tsx to:
 *   import { developersById } from "@/features/developers";
 */
export { developersById as developersData } from "@/features/developers/data/developers.data";
