import Link from "next/link";
import { formatDate } from "@/lib/utils";
import TagBadge from "@/components/tags/TagBadge";
import type { SearchIndexEntry } from "@/types";

interface SearchHitProps {
  entry: SearchIndexEntry;
}

export default function SearchHit({ entry }: SearchHitProps) {
  return (
    <article className="border-b border-neutral-100 dark:border-neutral-800 pb-4 last:border-0">
      <Link
        href={`/posts/${entry.slug}`}
        className="no-underline text-foreground"
      >
        <h3 className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {entry.title}
        </h3>
      </Link>
      <div className="flex items-center gap-3 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        <time>{formatDate(entry.date)}</time>
        {entry.tags.length > 0 && (
          <span className="flex gap-1 flex-wrap">
            {entry.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </span>
        )}
      </div>
      {entry.description && (
        <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {entry.description}
        </p>
      )}
    </article>
  );
}
