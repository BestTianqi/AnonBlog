import { Suspense } from "react";
import Container from "@/components/layout/Container";
import PostList from "@/components/posts/PostList";
import Pagination from "@/components/pagination/Pagination";
import { getPaginatedPosts } from "@/lib/posts";

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export const revalidate = 3600;

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const { posts, totalPages } = getPaginatedPosts(page);

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Posts</h1>
      <Suspense fallback={<PostsSkeleton />}>
        <PostList posts={posts} />
      </Suspense>
      <Pagination page={page} totalPages={totalPages} />
    </Container>
  );
}

function PostsSkeleton() {
  return (
    <div className="space-y-10">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
          <div className="h-6 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-1/4 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-16 rounded bg-neutral-100 dark:bg-neutral-800/50" />
        </div>
      ))}
    </div>
  );
}
