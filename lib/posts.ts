import { cache } from "react";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { markdownToHtml } from "./markdown";
import { POSTS_PER_PAGE } from "./constants";
import type { PostMeta, Post } from "@/types";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export const getAllPosts = cache((): PostMeta[] => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        description: data.description || "",
        tags: data.tags || [],
        cover: data.cover || undefined,
        draft: data.draft || false,
      } as PostMeta;
    });

  const published = posts.filter(
    (post) => !post.draft || process.env.NODE_ENV === "development"
  );

  return published.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = await markdownToHtml(content);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    description: data.description || "",
    tags: data.tags || [],
    cover: data.cover || undefined,
    draft: data.draft || false,
    contentHtml,
    readingTime: Math.ceil(stats.minutes),
    wordCount: stats.words,
  };
});

export const getPaginatedPosts = cache(
  (page: number = 1): { posts: PostMeta[]; total: number; totalPages: number } => {
    const allPosts = getAllPosts();
    const total = allPosts.length;
    const totalPages = Math.ceil(total / POSTS_PER_PAGE);
    const safePage = Math.max(1, Math.min(page, totalPages));
    const start = (safePage - 1) * POSTS_PER_PAGE;
    const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

    return { posts, total, totalPages };
  }
);
