import { formatDate } from "@/lib/utils";
import TagBadge from "@/components/tags/TagBadge";
import type { Post } from "@/types";

export default function PostHeader({ post }: { post: Post }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>&middot;</span>
        <span>{post.readingTime} min read</span>
        <span>&middot;</span>
        <span>{post.wordCount} words</span>
      </div>

      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </header>
  );
}
