/**
 * scripts/serve-static.ts
 *
 * Minimal static file server for the Next.js static export in ./out.
 * Supports clean URLs (/stack -> stack.html) and SPA fallback to index.html,
 * mirroring the Cloudflare Workers "single-page-application" behaviour.
 *
 * Usage: bun run scripts/serve-static.ts   (PORT env to change, default 4173)
 */
import { extname, join, normalize } from "node:path";

const ROOT = new URL("../out/", import.meta.url).pathname;
const PORT = Number(process.env.PORT ?? 4173);

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
};

function resolvePath(pathname: string): string {
  let p = decodeURIComponent(pathname);
  if (p === "/") p = "/index.html";
  if (!extname(p)) p = p.endsWith("/") ? `${p}index.html` : `${p}.html`;
  return normalize(join(ROOT, p));
}

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const filePath = resolvePath(url.pathname);
    const file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file, {
        headers: { "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream" },
      });
    }

    // SPA fallback — serve the app shell for unknown client routes.
    return new Response(Bun.file(join(ROOT, "index.html")), {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
});

console.log(`Static server listening on http://localhost:${server.port} (root: ${ROOT})`);
