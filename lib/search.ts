import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "./posts";
import { getPostBySlug } from "./posts";
import type { SearchIndexEntry } from "@/types";

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

  const outputPath = path.join(process.cwd(), "public", "search-index.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(entries), "utf8");
  console.log(`Search index: ${entries.length} entries`);
}
