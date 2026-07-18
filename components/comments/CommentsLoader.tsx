"use client";

import dynamic from "next/dynamic";

const GiscusComments = dynamic(
  () => import("@/components/comments/GiscusComments"),
  { ssr: false }
);

export default function CommentsLoader() {
  return <GiscusComments />;
}
