import Link from "next/link";
import { formatDate } from "@/lib/utils";
import TagBadge from "@/components/tags/TagBadge";
import type { PostMeta } from "@/types";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group">
      <Link
        href={`/posts/${post.slug}`}
        className="block no-underline text-foreground"
      >
        <h2 className="text-xl font-semibold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
          {post.title}
        </h2>
      </Link>

      <time
        dateTime={post.date}
        className="text-sm text-neutral-500 dark:text-neutral-400"
      >
        {formatDate(post.date)}
      </time>

      {post.description && (
        <p className="mt-2 text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {post.description}
        </p>
      )}

      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
