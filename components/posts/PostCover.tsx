import Image from "next/image";

interface PostCoverProps {
  src: string;
  alt: string;
}

export default function PostCover({ src, alt }: PostCoverProps) {
  if (!src) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 720px"
      />
    </div>
  );
}
