export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
  draft?: boolean;
}

export interface Post extends PostMeta {
  contentHtml: string;
  readingTime: number;
  wordCount: number;
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface SearchIndexEntry {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  content: string;
}
