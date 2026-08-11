/**
 * scripts/assert-lighthouse.mjs
 *
 * Reads lighthouse-results.json and asserts category scores meet a threshold.
 * Exits non-zero when any audited category drops below the threshold.
 *
 * Usage: node scripts/assert-lighthouse.mjs <threshold> [lighthouse-results.json]
 */
import { readFile } from "node:fs/promises";

const threshold = Number(process.argv[2] ?? 90);
const reportPath = new URL(process.argv[3] ?? "../lighthouse-results.json", import.meta.url);
const results = JSON.parse(await readFile(reportPath, "utf8"));

const categories = [
  "performance",
  "accessibility",
  "best-practices",
  "seo",
];

let failed = false;
console.log("\n── Lighthouse category scores ──────────────────────────────");
for (const cat of categories) {
  const score = Math.round((results.categories[cat]?.score ?? 0) * 100);
  const ok = score >= threshold;
  console.log(`${ok ? "PASS" : "FAIL"}  ${cat.padEnd(15)} ${score}%   (threshold ${threshold}%)`);
  if (!ok) failed = true;
}

const keyAudits = ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "interaction-to-next-paint"];
console.log("\n── Core Web Vitals ─────────────────────────────────────────");
for (const id of keyAudits) {
  const audit = results.audits?.[id];
  if (!audit) continue;
  const display = audit.displayValue ?? audit.numericValue ?? "n/a";
  console.log(`  ${id.padEnd(30)} ${display}`);
}

process.exit(failed ? 1 : 0);
