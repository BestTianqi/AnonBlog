import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PostList from "@/components/posts/PostList";
import { getAllTags, getPostsByTag } from "@/lib/tags";
import { SITE_TITLE } from "@/lib/constants";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded}`,
    description: `Posts tagged with "${decoded}" on ${SITE_TITLE}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  if (posts.length === 0) notFound();

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        <span className="text-blue-600 dark:text-blue-400">#</span> {decoded}
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8">
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>
      <PostList posts={posts} />
    </Container>
  );
}
