import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PostList from "@/components/posts/PostList";
import Pagination from "@/components/pagination/Pagination";
import { getPaginatedPosts, getAllPosts } from "@/lib/posts";
import { SITE_TITLE } from "@/lib/constants";

interface PageProps {
  params: Promise<{ num: string }>;
}

export function generateStaticParams() {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / 3);
  if (totalPages <= 1) return [{ num: "2" }];
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    num: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { num } = await params;
  return {
    title: `Page ${num} — ${SITE_TITLE}`,
  };
}

export default async function PaginatedPage({ params }: PageProps) {
  const { num } = await params;
  const page = parseInt(num, 10);

  if (isNaN(page) || page < 2) notFound();

  const { posts, totalPages } = getPaginatedPosts(page);

  if (posts.length === 0) notFound();

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Posts</h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
        Page {page} of {totalPages}
      </p>
      <PostList posts={posts} />
      <Pagination page={page} totalPages={totalPages} />
    </Container>
  );
}
