import type { Metadata } from "next";
import TechBriefsClient from "./TechBriefsClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Technical Briefs & Architecture Specs",
  description:
    "In-depth engineering briefs written by Niral Developer senior engineers: WebGL physics specs, PostgreSQL row-level security, edge-first Next.js architecture, AI agent orchestration, and zero-trust security blueprints.",
  path: "/tech-briefs",
  keywords: [
    "engineering briefs",
    "architecture specification",
    "WebGL canvas physics",
    "PostgreSQL security",
    "Next.js architecture",
    "AI agent orchestration",
    "technical documentation",
  ],
});

export default function Page() {
  return <TechBriefsClient />;
}
