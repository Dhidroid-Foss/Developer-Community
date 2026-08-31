import Image from "next/image";
import { getSanityImageAlt, getSanityImageDimensions, getSanityImageUrl } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

type CmsImageProps = {
  image?: SanityImage;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
};

export function CmsImage({
  image,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
  fill = false,
}: CmsImageProps) {
  const src = getSanityImageUrl(image, {
    width: width ?? 1600,
    quality: 80,
  });
  if (!src) return null;

  const dimensions = getSanityImageDimensions(image);
  const resolvedAlt = getSanityImageAlt(image, alt ?? "");
  const resolvedWidth = width ?? dimensions?.width ?? 1600;
  const resolvedHeight = height ?? dimensions?.height ?? 900;

  if (fill) {
    return (
      <Image
        src={src}
        alt={resolvedAlt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={resolvedAlt}
      width={resolvedWidth}
      height={resolvedHeight}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
