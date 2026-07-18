"use client";

import Container from "@/components/layout/Container";
import SearchField from "@/components/search/SearchField";
import SearchHit from "@/components/search/SearchHit";
import { useSearch } from "@/hooks/useSearch";

export default function SearchPage() {
  const { query, setQuery, hits, loading } = useSearch();

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Search</h1>
      <SearchField value={query} onChange={setQuery} />

      <div className="mt-8 space-y-4">
        {loading && (
          <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">
            Loading search index...
          </p>
        )}

        {!loading && query && hits.length === 0 && (
          <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">
            No posts found for &ldquo;{query}&rdquo;.
          </p>
        )}

        {!loading && !query && (
          <p className="text-center text-neutral-400 dark:text-neutral-500 py-8">
            Start typing to search posts.
          </p>
        )}

        {hits.map(({ item }) => (
          <SearchHit key={item.slug} entry={item} />
        ))}
      </div>
    </Container>
  );
}
