import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import TagCloud from "@/components/tags/TagCloud";
import { getAllTags } from "@/lib/tags";
import { SITE_TITLE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tags",
  description: `Browse all tags on ${SITE_TITLE}`,
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Tags</h1>
      <TagCloud tags={tags} />
    </Container>
  );
}
