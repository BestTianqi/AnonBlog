import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
}

function pageHref(p: number): string {
  if (p === 1) return "/";
  return `/page/${p}`;
}

export default function Pagination({ page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={pageHref(page - 1)}
          className="rounded-md px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 no-underline hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-md px-3 py-1.5 text-sm text-neutral-300 dark:text-neutral-700">
          Previous
        </span>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
        p === page ? (
          <span
            key={p}
            className="rounded-md px-3 py-1.5 text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={pageHref(p)}
            className="rounded-md px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 no-underline hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {p}
          </Link>
        )
      )}

      {page < totalPages ? (
        <Link
          href={pageHref(page + 1)}
          className="rounded-md px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 no-underline hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-md px-3 py-1.5 text-sm text-neutral-300 dark:text-neutral-700">
          Next
        </span>
      )}
    </nav>
  );
}
