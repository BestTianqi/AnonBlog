import Container from "@/components/layout/Container";
import PostList from "@/components/posts/PostList";
import Pagination from "@/components/pagination/Pagination";
import { getPaginatedPosts } from "@/lib/posts";

export default function HomePage() {
  const { posts, totalPages } = getPaginatedPosts(1);

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Posts</h1>
      <PostList posts={posts} />
      <Pagination page={1} totalPages={totalPages} />
    </Container>
  );
}
