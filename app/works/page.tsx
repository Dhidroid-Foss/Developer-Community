import { Suspense } from "react";
import type { Metadata } from "next";
import WorksClient from "./WorksClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { fetchProjects } from "@/lib/sanity/fetch";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Works — Projects & Case Studies",
  description:
    "Selected projects and case studies from Niral Developer: product work, architecture, and implementation notes from the community.",
  path: "/works",
  keywords: ["Niral Developer projects", "case studies", "developer portfolio"],
});

export default async function Page() {
  const works = await fetchProjects();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Works", path: "/works" },
        ])}
      />
      <Suspense fallback={null}>
        <WorksClient works={works} />
      </Suspense>
    </>
  );
}
