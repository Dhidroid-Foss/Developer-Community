import type { PortableTextBlock } from "@portabletext/types";
import type { PortableBlock, PortableTextValue } from "@/lib/sanity/types";
import { toFilterParam } from "@/lib/content";

export function isPortableText(value: PortableTextValue | undefined): value is PortableBlock[] {
  return Array.isArray(value);
}

export function isMarkdownBody(value: PortableTextValue | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function blockPlainText(block: PortableBlock): string {
  return (block.children ?? []).map((child) => child.text ?? "").join("");
}

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function headingsFromBody(body?: PortableTextValue): TocItem[] {
  if (!isPortableText(body)) return [];
  const used = new Map<string, number>();

  return body.flatMap((block) => {
    if (block._type !== "block" || (block.style !== "h2" && block.style !== "h3")) {
      return [];
    }
    const text = blockPlainText(block).trim();
    if (!text) return [];
    const base = toFilterParam(text) || "section";
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    return [{ id, text, level: block.style === "h3" ? 3 : 2 }];
  });
}

export function headingIdForBlock(block: PortableBlock, seen: Map<string, number>): string {
  const text = blockPlainText(block).trim();
  const base = toFilterParam(text) || "section";
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

export function asPortableBlocks(body: PortableBlock[]): PortableTextBlock[] {
  return body as unknown as PortableTextBlock[];
}
