import { Suspense } from "react";
import HomeClient from "./HomeClient";
import { fetchProjects } from "@/lib/sanity/fetch";
import { fetchPosts } from "@/lib/sanity/fetch";

export const dynamic = "force-static";

/**
 * Home page — server component wrapper.
 *
 * Fetches real-time Sanity data (projects + posts) at build/request time,
 * then hands it to the client-side HomeClient shell.
 */
export default async function Home() {
  const [projects, posts] = await Promise.all([
    fetchProjects(),
    fetchPosts(),
  ]);

  return (
    <Suspense fallback={null}>
      <HomeClient projects={projects} posts={posts} />
    </Suspense>
  );
}
