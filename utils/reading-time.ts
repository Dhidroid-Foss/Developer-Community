const DEFAULT_WPM = 220;

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function wordCount(text?: string | null): number {
  if (!text) return 0;
  const normalized = normalizeText(text);
  if (!normalized) return 0;
  return normalized.split(" ").length;
}

export function readingTimeMinutes(text?: string | null, wpm = DEFAULT_WPM): number {
  const words = wordCount(text);
  if (words === 0) return 0;
  return Math.max(1, Math.round(words / wpm));
}

export function formatReadingTime(text?: string | null, wpm = DEFAULT_WPM): string | undefined {
  const minutes = readingTimeMinutes(text, wpm);
  if (!minutes) return undefined;
  return `${minutes} min read`;
}
