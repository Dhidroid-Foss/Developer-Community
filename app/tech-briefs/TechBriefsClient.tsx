"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Download,
  Search,
  Code2,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
  Check,
  ExternalLink,
  Layers,
  Terminal,
  ArrowRight,
  Sparkles,
  Server,
  Lock,
  Globe
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";
import { Eyebrow } from "@/components/common";

// Sample Engineering Briefs Data
const BRIEF_CATEGORIES = ["All Specs", "Architecture", "Database & Storage", "Infrastructure", "AI & ML", "Security"];

interface TechBriefItem {
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

const TECH_BRIEFS: TechBriefItem[] = [
  {
    id: "TB-2026-01",
    title: "Realtime WebGL Canvas Physics Engine Specifications",
    category: "Architecture",
    summary: "Complete blueprint for 60fps 2D verlet integration, interactive mass-spring rope dynamics, and GPU-accelerated particle blast shaders.",
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
    summary: "Production guide to setting up tenant isolation, sub-millisecond query planning, and automated failover replicas across global regions.",
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
    summary: "Architectural specification for deploying hybrid server/client Next.js apps with Cloudflare Workers edge caching and granular revalidation.",
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
    summary: "Technical brief on constructing low-latency AI tool execution loops using structured JSON outputs, Ollama local backends, and Claude API.",
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
    summary: "Comprehensive security blueprint for mTLS inter-service authentication, rate-limiting rules, and automated DDoS mitigation pipelines.",
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
    summary: "Standard operating specifications for strict CSS variable design tokens, precision CAD bracket accents, and zero-runtime Tailwind builds.",
    pages: 12,
    updated: "August 2026",
    author: "Design Systems Guild",
    version: "v1.4.0",
    tags: ["Tailwind CSS", "Design Tokens", "CSS Variables", "UI Engineering"],
    featured: false,
  },
];

// Code Spec Inspector Snippets
const CODE_SNIPPETS = {
  schema: {
    language: "prisma",
    title: "Database Isolation Schema (Row Level Security)",
    code: `// PostgreSQL Tenant & Cohort Security Isolation Model
model Developer {
  id           String    @id @default(uuid())
  email        String    @unique
  role         Role      @default(MEMBER)
  cohortId     String?
  cohort       Cohort?   @relation(fields: [cohortId], references: [id])
  createdAt    DateTime  @default(now())

  @@index([cohortId, role])
  @@map("developers")
}

// Row-Level Security Policy Enforcement
// CREATE POLICY tenant_isolation ON developers
// USING (cohort_id = current_setting('app.current_cohort_id'));`,
  },
  edge: {
    language: "typescript",
    title: "Edge Worker Caching & Header Gateway",
    code: `import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  
  // High-performance Stale-While-Revalidate caching
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  response.headers.set("X-Tech-Spec-Version", "2026.4");
  response.headers.set("X-Frame-Options", "DENY");

  return response;
}`,
  },
  ai: {
    language: "typescript",
    title: "AI Tool Dispatcher & Schema Validator",
    code: `import { z } from "zod";

export const CodeRefactorToolSchema = z.object({
  targetFile: z.string().describe("Path to target source file"),
  instructions: z.string().describe("Refactoring directive"),
  maxTokens: z.number().default(2048),
});

export async function executeAgentTool(input: unknown) {
  const validated = CodeRefactorToolSchema.parse(input);
  // Dispatch tool execution to worker pool
  return await dispatchToWorkerPool(validated);
}`,
  },
  shader: {
    language: "glsl",
    title: "WebGL Particle Explosion Shader Fragment",
    code: `precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
varying vec2 v_uv;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float dist = length(st - vec2(0.5));
  float alpha = smoothstep(0.4, 0.0, dist + sin(u_time * 2.0) * 0.05);
  
  vec3 brandOrange = vec3(0.98, 0.40, 0.22);
  gl_FragColor = vec4(brandOrange, alpha * 0.85);
}`,
  },
};

import WordmarkShimmerLoader from "@/components/WordmarkShimmerLoader";

// Featured Card Carousel Slides (Hero Right Widget)
const HERO_FEATURED_SLIDES = [
  {
    icon: Sparkles,
    title: "Wordmark Shimmer Loader",
    description: "Bold 'தமிழ்Dev' brand logo with metallic sweep animation.",
    tag: "Brand & Loader",
    isWordmarkShimmer: true,
  },
  {
    icon: FileText,
    title: "Text Animations",
    description: "Cool text animations for your projects.",
    tag: "UI & Motion",
  },
  {
    icon: Database,
    title: "Database Isolation",
    description: "PostgreSQL row-level security & multi-region sharding.",
    tag: "Data Infra",
  },
  {
    icon: Cpu,
    title: "WebGL Canvas Shaders",
    description: "GPU accelerated particle physics & 60fps verlet ropes.",
    tag: "Graphics Math",
  },
  {
    icon: Zap,
    title: "Edge Gateway Security",
    description: "Zero-trust service mesh with Cloudflare edge workers.",
    tag: "DevOps & Gateway",
  },
];

export default function TechBriefsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Specs");
  const [activeCodeTab, setActiveCodeTab] = useState<keyof typeof CODE_SNIPPETS>("schema");
  const [copiedCode, setCopiedCode] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);

  // Auto-advance featured slide card every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_FEATURED_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Filter tech briefs
  const filteredBriefs = useMemo(() => {
    return TECH_BRIEFS.filter((brief) => {
      const matchesCategory = selectedCategory === "All Specs" || brief.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === "" ||
        brief.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brief.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brief.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeCodeTab].code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadBrief = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  const currentSlide = HERO_FEATURED_SLIDES[slideIdx];
  const SlideIcon = currentSlide.icon;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-hidden">
      <Header onJoinClick={() => setModalOpen(true)} />

      {/* Hero Banner Section */}
      <section className="relative bg-zinc-950 pt-32 pb-20 text-white overflow-hidden">
        {/* Subtle grid background accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

        <div className="relative mx-auto w-[min(1170px,calc(100%-38px))]">
          {/* Main 2-Column Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">
            {/* Left Column: Text & Metadata */}
            <div>
              {/* Metadata pill badge */}


              <h1 className="mt-6 text-[clamp(36px,4.2vw,60px)] font-bold leading-[0.98] tracking-[-.07em]">
                Engineering Briefs & <br />
                <em className="italic text-[#fa6739] not-italic">Technical Architecture.</em>
              </h1>

              <p className="mt-5 max-w-xl text-sm md:text-base text-stone-400 leading-relaxed">
                In-depth specifications, database blueprints, shader pipelines, and infrastructure benchmarks written directly by senior engineers at Niral Developer.
              </p>
            </div>

            {/* Right Column: Featured Interactive Card Widget with Touch/Mouse Drag Swiping */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[350px] rounded-[24px] border border-stone-800/90 bg-stone-950/70 p-4 backdrop-blur-md shadow-2xl">
                {/* Inner Dark Surface Card */}
                <div className="relative overflow-hidden rounded-[18px] border border-stone-800/80 bg-[#121217] p-6 flex flex-col justify-between min-h-[210px] select-none">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slideIdx}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_e, { offset, velocity }) => {
                        const swipeThreshold = 40;
                        if (offset.x < -swipeThreshold || velocity.x < -200) {
                          setSlideIdx((prev) => (prev + 1) % HERO_FEATURED_SLIDES.length);
                        } else if (offset.x > swipeThreshold || velocity.x > 200) {
                          setSlideIdx((prev) => (prev - 1 + HERO_FEATURED_SLIDES.length) % HERO_FEATURED_SLIDES.length);
                        }
                      }}
                      initial={{ opacity: 0, x: 20, scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.97 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex flex-col justify-between h-full cursor-grab active:cursor-grabbing"
                    >
                      <div>
                        {currentSlide.isWordmarkShimmer ? (
                          <div className="flex flex-col items-center justify-center py-2">
                            <WordmarkShimmerLoader color="#fa6739" className="p-2 border-0 bg-transparent shadow-none scale-90" />
                          </div>
                        ) : (
                          <>
                            {/* Top Icon Badge: White Pill with Document Icon */}
                            <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white text-zinc-950 shadow-md">
                              <SlideIcon size={18} strokeWidth={2.2} />
                            </div>

                            {/* Title */}
                            <h3 className="mt-5 text-xl font-extrabold tracking-tight text-white leading-tight">
                              {currentSlide.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-1.5 text-xs text-stone-400 leading-relaxed font-normal">
                              {currentSlide.description}
                            </p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Pagination Dots Bar */}
                <div className="mt-4 flex items-center justify-center gap-2 pb-0.5">
                  {HERO_FEATURED_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlideIdx(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${slideIdx === idx
                        ? "w-6 bg-white"
                        : "w-2 bg-stone-700 hover:bg-stone-500"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>



      {/* Tech Briefs Library Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <Eyebrow>Document Repository</Eyebrow>
              <h2 className="mt-2 text-[clamp(28px,3vw,44px)] font-bold tracking-[-.06em]">
                Technical Briefs & Specs.
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search specs, tags, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-stone-300 bg-white pl-10 pr-4 py-2 text-xs font-mono text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-stone-200">
            {BRIEF_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 font-mono text-xs uppercase font-semibold transition-all cursor-pointer ${selectedCategory === cat
                  ? "bg-[#fa6739] text-zinc-950 font-bold"
                  : "bg-white border border-stone-300 text-stone-600 hover:border-stone-800 hover:text-stone-900"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Briefs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredBriefs.map((brief) => (
                <motion.div
                  key={brief.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group relative border border-stone-300/90 bg-white p-6 rounded-none flex flex-col justify-between hover:border-stone-900 transition-all duration-300"
                >
                  {/* CAD Accent */}
                  <span className="absolute -top-[2px] -left-[2px] w-3 h-3 border-t-2 border-l-2 border-[#fa6739] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Header bar */}
                    <div className="flex items-center justify-between font-mono text-[10px] text-stone-400 mb-3">
                      <span className="font-bold text-[#fa6739]">{brief.id}</span>
                      <span>{brief.category}</span>
                    </div>

                    <h3 className="font-bold text-base text-stone-900 group-hover:text-[#fa6739] transition-colors leading-snug">
                      {brief.title}
                    </h3>

                    <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                      {brief.summary}
                    </p>

                    {/* Tag Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {brief.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-stone-100 border border-stone-200 px-2 py-0.5 font-mono text-[9px] text-stone-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Meta & Action */}
                  <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between font-mono text-[10px] text-stone-500">
                    <div>
                      <span>{brief.pages} PAGES</span>
                      <span className="mx-1.5">•</span>
                      <span>{brief.version}</span>
                    </div>

                    <button
                      onClick={() => handleDownloadBrief(brief.id)}
                      className="inline-flex items-center gap-1 text-stone-900 font-bold hover:text-[#fa6739] transition-colors cursor-pointer"
                    >
                      {downloadingId === brief.id ? (
                        <>
                          <Check size={12} className="text-green-600" />
                          <span>DOWNLOADING...</span>
                        </>
                      ) : (
                        <>
                          <Download size={12} />
                          <span>PDF BRIEF ↗</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredBriefs.length === 0 && (
            <div className="py-16 text-center border border-stone-300 bg-white">
              <FileText size={32} className="mx-auto text-stone-400 mb-3" />
              <p className="font-bold text-sm text-stone-800">No specifications found matching "{searchQuery}"</p>
              <p className="text-xs text-stone-500 mt-1">Try clearing your search query or selecting another category.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Specs");
                }}
                className="mt-4 bg-zinc-950 text-white px-4 py-2 text-xs font-mono font-bold hover:bg-stone-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Community Engineering Callout Banner */}
      <section className="bg-zinc-950 py-16 text-white border-t border-stone-800">
        <div className="mx-auto w-[min(1170px,calc(100%-38px))] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <Eyebrow light>Collaborative Architecture</Eyebrow>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
              Want to author a Technical Brief with our engineering team?
            </h2>
            <p className="mt-2 text-xs text-stone-400 max-w-xl">
              Niral Developer members regularly present production case studies, system benchmarks, and database post-mortems to the community.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-full bg-[var(--orange)] px-6 py-3.5 text-xs text-zinc-950 font-bold hover:bg-[#e05629] transition-colors shrink-0 cursor-pointer"
          >
            Submit a Spec Proposal ↗
          </button>
        </div>
      </section>

      <Footer />
      <JoinModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
