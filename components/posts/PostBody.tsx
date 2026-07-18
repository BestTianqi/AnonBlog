interface PostBodyProps {
  contentHtml: string;
}

export default function PostBody({ contentHtml }: PostBodyProps) {
  return (
    <article
      className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:leading-relaxed
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-blue-500 prose-blockquote:bg-neutral-50 dark:prose-blockquote:bg-neutral-900/50 prose-blockquote:py-0.5 prose-blockquote:px-4
        prose-img:rounded-lg
        prose-table:text-sm
        prose-li:marker:text-neutral-400"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
