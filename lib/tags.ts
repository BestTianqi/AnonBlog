import { cache } from "react";
import { getAllPosts } from "./posts";
import type { TagCount } from "@/types";

export const getAllTags = cache((): TagCount[] => {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
});

export const getPostsByTag = cache((tag: string) => {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
});
