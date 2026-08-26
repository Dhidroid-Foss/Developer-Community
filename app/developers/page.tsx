import type { Metadata } from "next";
import DevelopersClient from "./DevelopersClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Core Developers — Meet the Niral Developer Contributors",
  description:
    "Meet the engineers building Niral Developer: full-stack, React Native, MERN and AI/LLM developers who mentor architecture clinics, maintain open-source templates, and drive technical cohorts.",
  path: "/developers",
  keywords: [
    "Niral Developer developers",
    "developer community contributors",
    "full stack developers India",
    "React Native developers",
    "MERN stack developers",
    "AI engineers",
  ],
});

export default function Page() {
  return <DevelopersClient />;
}
