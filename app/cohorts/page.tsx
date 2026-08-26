import type { Metadata } from "next";
import CohortsClient from "./CohortsClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cohorts & Live Sessions — Architecture Clinics, Sprints & Circles",
  description:
    "Join Niral Developer cohorts: live architecture clinics, skill sprints, dev partnerships, and engineering circles on React, Next.js, Node.js, PostgreSQL and AI. Real code, live reviews, production-ready skills.",
  path: "/cohorts",
  keywords: [
    "developer cohorts",
    "architecture clinic",
    "live code review",
    "skill sprints",
    "developer community India",
    "React Next.js cohort",
  ],
});

export default function Page() {
  return <CohortsClient />;
}
