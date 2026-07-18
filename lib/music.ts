export interface Song {
  title: string;
  file: string;
}

const BASE = "/AnonBlog/music";

const files = [
  "迷星叫.mp3",
  "壱雫空.mp3",
  "碧天伴走.mp3",
  "影色舞.mp3",
  "春日影 (MyGO!!!!! ver.).mp3",
  "栞.mp3",
];

export const PLAYLIST: Song[] = files.map((f) => ({
  title: f.replace(".mp3", ""),
  file: `${BASE}/${encodeURIComponent(f)}`,
}));
