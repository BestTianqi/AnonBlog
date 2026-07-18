import fs from "node:fs";
import path from "node:path";
import { Feed } from "feed";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "./constants";
import { getAllPosts } from "./posts";

export function generateRssFeed(): string {
  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: "zh-CN",
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    author: {
      name: "Tianqi",
    },
  });

  const posts = getAllPosts();

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/posts/${post.slug}`,
      link: `${SITE_URL}/posts/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
    });
  }

  return feed.rss2();
}

export function writeRssFeed(): void {
  const rss = generateRssFeed();
  const outputPath = path.join(process.cwd(), "public", "feed.xml");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, rss, "utf8");
  console.log("RSS feed written to public/feed.xml");
}
