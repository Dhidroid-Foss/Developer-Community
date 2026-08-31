import type { Metadata } from "next";
import AuthorsClient from "./AuthorsClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { fetchAuthors } from "@/lib/sanity/fetch";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Authors — Writers from the Niral Developer Community",
  description:
    "Meet the engineers writing Niral Developer articles: architecture notes, shipping stories, and technical practice from the community.",
  path: "/authors",
  keywords: ["Niral Developer authors", "engineering writers", "developer community"],
});

export default async function Page() {
  const authors = await fetchAuthors();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Authors", path: "/authors" },
        ])}
      />
      <AuthorsClient authors={authors} />
    </>
  );
}
