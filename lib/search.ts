import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "./posts";
import { getPostBySlug } from "./posts";
import type { SearchIndexEntry } from "@/types";

const outputPath = path.join(process.cwd(), "public", "search-index.json");

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function buildSearchIndex(): Promise<void> {
  const posts = getAllPosts();
  const entries: SearchIndexEntry[] = [];

  for (const post of posts) {
    const full = await getPostBySlug(post.slug);
    entries.push({
      slug: post.slug,
      title: post.title,
      description: post.description,
      tags: post.tags,
      date: post.date,
      content: full ? stripHtml(full.contentHtml) : "",
    });
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(entries), "utf8");
}

// Run directly: tsx lib/search.ts
if (process.argv[1]?.endsWith("search.ts")) {
  buildSearchIndex()
    .then(() => {
      console.log("Search index built successfully.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Failed to build search index:", err);
      process.exit(1);
    });
}
