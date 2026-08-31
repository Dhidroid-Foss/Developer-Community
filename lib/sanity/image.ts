import type { SanityImage } from "./types";

export type ImageSizeOptions = {
  width?: number;
  height?: number;
  quality?: number;
  fit?: "crop" | "clip" | "fill" | "max" | "min";
};

const DIMENSIONS_FROM_ID = /image-[a-zA-Z0-9]+-(\d+)x(\d+)-/;

export function getSanityImageUrl(
  image?: SanityImage,
  options: ImageSizeOptions = {},
): string | undefined {
  const src = image?.asset?.url;
  if (!src) return undefined;

  try {
    const url = new URL(src);
    if (options.width) url.searchParams.set("w", String(options.width));
    if (options.height) url.searchParams.set("h", String(options.height));
    if (options.quality) url.searchParams.set("q", String(options.quality));
    if (options.fit) url.searchParams.set("fit", options.fit);
    url.searchParams.set("auto", "format");
    return url.toString();
  } catch {
    return src;
  }
}

export function getSanityImageDimensions(
  image?: SanityImage,
): { width: number; height: number } | undefined {
  const id = image?.asset?._id;
  if (!id) return undefined;
  const match = id.match(DIMENSIONS_FROM_ID);
  if (!match) return undefined;
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!width || !height) return undefined;
  return { width, height };
}

export function getSanityImageAlt(image?: SanityImage, fallback = ""): string {
  const alt = image?.alt?.trim();
  if (alt) return alt;
  return fallback;
}

export function isRemoteImage(src?: string): boolean {
  return Boolean(src && /^https?:\/\//.test(src));
}
