import fs from "node:fs";
import path from "node:path";
import { buildSearchIndex } from "../lib/search";
import { writeRssFeed } from "../lib/rss";
import { getAllPosts } from "../lib/posts";
import { getAllTags } from "../lib/tags";
import { SITE_URL } from "../lib/constants";

const publicDir = path.join(process.cwd(), "public");

function writeSitemap() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const urls: string[] = [];

  urls.push(`  <url><loc>${SITE_URL}</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`);
  urls.push(`  <url><loc>${SITE_URL}/tags</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`);
  urls.push(`  <url><loc>${SITE_URL}/search</loc><changefreq>monthly</changefreq><priority>0.2</priority></url>`);

  for (const post of posts) {
    urls.push(`  <url><loc>${SITE_URL}/posts/${post.slug}</loc><lastmod>${post.date}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }

  for (const { tag } of tags) {
    urls.push(`  <url><loc>${SITE_URL}/tags/${encodeURIComponent(tag)}</loc><changefreq>weekly</changefreq><priority>0.4</priority></url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml, "utf8");
  console.log("Sitemap generated");
}

function writeRobots() {
  const txt = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(publicDir, "robots.txt"), txt, "utf8");
  console.log("robots.txt generated");
}

async function main() {
  fs.mkdirSync(publicDir, { recursive: true });

  console.log("Building search index...");
  await buildSearchIndex();

  console.log("Generating RSS feed...");
  writeRssFeed();

  console.log("Generating sitemap...");
  writeSitemap();

  console.log("Generating robots.txt...");
  writeRobots();

  console.log("Prebuild complete.");
}

main().catch((err) => {
  console.error("Prebuild failed:", err);
  process.exit(1);
});
