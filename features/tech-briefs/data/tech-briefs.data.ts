import type { TechBriefItem } from "../types/tech-brief.types";

export const BRIEF_CATEGORIES = [
  "All Specs",
  "Architecture",
  "Database & Storage",
  "Infrastructure",
  "AI & ML",
  "Security",
] as const;

export const techBriefs: TechBriefItem[] = [
  {
    id: "TB-2026-01",
    title: "Realtime WebGL Canvas Physics Engine Specifications",
    category: "Architecture",
    summary:
      "Complete blueprint for 60fps 2D verlet integration, interactive mass-spring rope dynamics, and GPU-accelerated particle blast shaders.",
    pages: 14,
    updated: "August 2026",
    author: "Graphics Platform Squad",
    version: "v3.2.0",
    tags: ["WebGL", "Three.js", "Verlet Physics", "GLSL Shaders"],
    featured: true,
  },
  {
    id: "TB-2026-02",
    title: "PostgreSQL Multi-Region Row Level Security & Sharding Model",
    category: "Database & Storage",
    summary:
      "Production guide to setting up tenant isolation, sub-millisecond query planning, and automated failover replicas across global regions.",
    pages: 22,
    updated: "July 2026",
    author: "Database Infrastructure Team",
    version: "v2.8.4",
    tags: ["PostgreSQL", "Supabase", "Row Level Security", "Sharding"],
    featured: true,
  },
  {
    id: "TB-2026-03",
    title: "Edge-First Next.js 16 Serverless Architecture & Cache Invalidation",
    category: "Infrastructure",
    summary:
      "Architectural specification for deploying hybrid server/client Next.js apps with Cloudflare Workers edge caching and granular revalidation.",
    pages: 18,
    updated: "August 2026",
    author: "Core Web Platform Group",
    version: "v4.1.0",
    tags: ["Next.js 16", "Cloudflare Workers", "Edge Compute", "ISR"],
    featured: false,
  },
  {
    id: "TB-2026-04",
    title: "AI Agent Inference Orchestration & Local LLM Bridge",
    category: "AI & ML",
    summary:
      "Technical brief on constructing low-latency AI tool execution loops using structured JSON outputs, Ollama local backends, and Claude API.",
    pages: 28,
    updated: "August 2026",
    author: "AI Engineering Guild",
    version: "v1.9.2",
    tags: ["AI Agents", "Ollama", "Claude 3.5", "Structured Outputs"],
    featured: true,
  },
  {
    id: "TB-2026-05",
    title: "Zero-Trust Service Mesh & Cloudflare Workers Gateway Security",
    category: "Security",
    summary:
      "Comprehensive security blueprint for mTLS inter-service authentication, rate-limiting rules, and automated DDoS mitigation pipelines.",
    pages: 16,
    updated: "June 2026",
    author: "SecOps Engineering Team",
    version: "v2.1.1",
    tags: ["Zero Trust", "Cloudflare", "mTLS", "API Gateway"],
    featured: false,
  },
  {
    id: "TB-2026-06",
    title: "Tailwind CSS v4 Utility Architecture & CAD Design Token System",
    category: "Architecture",
    summary:
      "Standard operating specifications for strict CSS variable design tokens, precision CAD bracket accents, and zero-runtime Tailwind builds.",
    pages: 12,
    updated: "August 2026",
    author: "Design Systems Guild",
    version: "v1.4.0",
    tags: ["Tailwind CSS", "Design Tokens", "CSS Variables", "UI Engineering"],
    featured: false,
  },
];
