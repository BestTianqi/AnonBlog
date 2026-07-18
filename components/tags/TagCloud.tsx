import Link from "next/link";
import type { TagCount } from "@/types";

export default function TagCloud({ tags }: { tags: TagCount[] }) {
  if (tags.length === 0) {
    return (
      <p className="text-center text-neutral-500 dark:text-neutral-400 py-12">
        No tags yet.
      </p>
    );
  }

  const maxCount = Math.max(...tags.map((t) => t.count));

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {tags.map(({ tag, count }) => {
        const size = 0.8 + (count / maxCount) * 1;
        return (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="no-underline rounded-full bg-neutral-100 dark:bg-neutral-800 px-3.5 py-1.5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            style={{ fontSize: `${size}rem` }}
          >
            {tag}
            <span className="ml-1 text-xs text-neutral-400">({count})</span>
          </Link>
        );
      })}
    </div>
  );
}
