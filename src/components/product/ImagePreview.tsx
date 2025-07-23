import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImagePreview({ src, alt, className }: ImagePreviewProps) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-md border",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://placehold.co/600x400";
        }}
        unoptimized
      />
    </div>
  );
}
