import type { CodeSnippet, CodeSnippetKey } from "../types/tech-brief.types";

export const codeSnippets: Record<CodeSnippetKey, CodeSnippet> = {
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
