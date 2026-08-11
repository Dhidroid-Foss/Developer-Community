import type { Metadata } from "next";
import StackClient from "./StackClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tech Stack — React, Next.js, Node.js, PostgreSQL & AI",
  description:
    "Explore the production-ready tech stack TamilDev masters and deploys: React, React Native, Next.js, Node.js, TypeScript, PostgreSQL, Prisma, MongoDB, Tailwind CSS, Docker, and AI tooling with Claude, Ollama, and the Luma API.",
  path: "/stack",
  keywords: [
    "TamilDev tech stack",
    "React stack",
    "Next.js stack",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "React Native",
    "AI development stack",
    "Ollama",
    "Claude AI",
  ],
});

export default function Page() {
  return <StackClient />;
}
