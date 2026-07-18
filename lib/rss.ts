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
