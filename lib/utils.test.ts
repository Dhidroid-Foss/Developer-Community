import { describe, expect, it } from "bun:test";
import { cn, getAvatarUrl } from "./utils";

describe("cn()", () => {
  it("joins class names with a single space", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("ignores falsy values", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });

  it("dedupes conflicting Tailwind classes keeping the last one", () => {
    expect(cn("px-2 text-red-500", "px-3")).toBe("text-red-500 px-3");
  });
});

describe("getAvatarUrl()", () => {
  it("returns an empty string for falsy values", () => {
    expect(getAvatarUrl(null)).toBe("");
    expect(getAvatarUrl(undefined)).toBe("");
    expect(getAvatarUrl("")).toBe("");
  });

  it("returns plain string paths untouched", () => {
    expect(getAvatarUrl("/avatars/dhidroid.jpg")).toBe("/avatars/dhidroid.jpg");
    expect(getAvatarUrl("https://example.com/a.png")).toBe("https://example.com/a.png");
  });

  it("extracts .src from static-import objects", () => {
    expect(getAvatarUrl({ src: "/avatars/cat01.jpg", height: 10, width: 10 })).toBe("/avatars/cat01.jpg");
  });

  it("stringifies unexpected values", () => {
    expect(getAvatarUrl(42)).toBe("42");
    expect(getAvatarUrl({ noSrc: true })).toBe("[object Object]");
  });
});
