import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { SITE_TITLE } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tags", label: "Tags" },
  { href: "/search", label: "Search" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 flex items-center justify-between h-14">
        <Link
          href="/"
          className="font-semibold text-lg tracking-tight text-foreground no-underline hover:opacity-80 transition-opacity"
        >
          {SITE_TITLE}
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-md text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors no-underline"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
