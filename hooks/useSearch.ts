"use client";

import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import type { SearchIndexEntry } from "@/types";

export function useSearch() {
  const [index, setIndex] = useState<SearchIndexEntry[]>([]);
  const [rawQuery, setRawQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data: SearchIndexEntry[]) => {
        setIndex(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(rawQuery), 300);
    return () => clearTimeout(timer);
  }, [rawQuery]);

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: ["title", "description", "tags", "content"],
        threshold: 0.3,
        includeMatches: true,
      }),
    [index]
  );

  const hits = useMemo(() => {
    if (!debouncedQuery.trim() || index.length === 0) return [];
    return fuse.search(debouncedQuery).slice(0, 20);
  }, [debouncedQuery, fuse, index]);

  return { query: rawQuery, setQuery: setRawQuery, hits, loading };
}
