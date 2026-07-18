import Link from "next/link";
import Container from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h1 className="text-6xl font-bold text-neutral-200 dark:text-neutral-800">
          404
        </h1>
        <p className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </p>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-md bg-neutral-900 dark:bg-neutral-100 px-5 py-2.5 text-sm font-medium text-white dark:text-neutral-900 no-underline hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </Container>
  );
}
