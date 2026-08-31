import { BlogCard } from "@/components/blog/BlogCard";
import type { RelatedPost } from "@/lib/sanity/types";

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="mt-16 border-t border-[#cfcac0] pt-10">
      <h2 className="text-2xl font-extrabold tracking-tight text-[#151515]">Related posts</h2>
      <div className="mt-2">
        {posts.map((post) => (
          <BlogCard key={post._id ?? post.title ?? Math.random().toString()} post={post} />
        ))}
      </div>
    </section>
  );
}
