import { developers } from "@/lib/data";

export const developersData = Object.fromEntries(
  developers.map((d) => [d.id, d])
) as Record<string, (typeof developers)[number]>;
