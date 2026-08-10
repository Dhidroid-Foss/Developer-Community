export interface TechBriefItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  pages: number;
  updated: string;
  author: string;
  version: string;
  tags: string[];
  featured?: boolean;
}

export type CodeSnippetKey = "schema" | "edge" | "ai" | "shader";

export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
}
