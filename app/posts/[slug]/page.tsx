import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PostCover from "@/components/posts/PostCover";
import PostHeader from "@/components/posts/PostHeader";
import PostBody from "@/components/posts/PostBody";
import CommentsLoader from "@/components/comments/CommentsLoader";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_URL } from "@/lib/constants";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: post.cover ? [{ url: post.cover }] : [],
      url: `${SITE_URL}/posts/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Container>
      {post.cover && <PostCover src={post.cover} alt={post.title} />}
      <PostHeader post={post} />
      <PostBody contentHtml={post.contentHtml} />

      <CommentsLoader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            description: post.description,
            author: {
              "@type": "Person",
              name: "Tianqi",
            },
          }),
        }}
      />
    </Container>
  );
}
