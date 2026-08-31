import { Suspense } from "react";
import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { fetchPosts } from "@/lib/sanity/fetch";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Engineering Notes & Shipping Stories",
  description:
    "Read engineering notes, architecture write-ups, and community shipping stories from Niral Developer: React, Next.js, Node.js, PostgreSQL, and AI.",
  path: "/blog",
  keywords: ["Niral Developer blog", "engineering blog", "Tamil developer articles", "Next.js architecture"],
});

export default async function Page() {
  const posts = await fetchPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Suspense fallback={null}>
        <BlogClient posts={posts} />
      </Suspense>
    </>
  );
}
