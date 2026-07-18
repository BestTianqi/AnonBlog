import { SITE_TITLE } from "@/lib/constants";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 dark:text-neutral-400">
        <p>&copy; {new Date().getFullYear()} {SITE_TITLE}</p>
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            Next.js
          </a>
        </p>
      </div>
    </footer>
  );
}
