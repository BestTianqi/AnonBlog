import PostCard from "./PostCard";
import type { PostMeta } from "@/types";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-center text-neutral-500 dark:text-neutral-400 py-12">
        No posts yet.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
