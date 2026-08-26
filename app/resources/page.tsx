import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resources — Open-Source Codebases, Guides & Templates",
  description:
    "Clone production-grade open-source codebases, read performance tuning guides, and download design-system templates built by Niral Developer: Next.js + Prisma boilerplates, local LLM setups, and more.",
  path: "/resources",
  keywords: [
    "open source boilerplates",
    "Next.js boilerplate",
    "Prisma template",
    "developer resources",
    "Ollama tuning guide",
    "design system template",
  ],
});

export default function Page() {
  return <ResourcesClient />;
}
