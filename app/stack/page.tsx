"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";
import VariableProximity from "@/components/VariableProximity";

// Inline SVG Logos
const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="h-10 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const ReactNativeLogo = () => (
  <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="#00D8FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="#888" strokeWidth="1"/>
    <circle cx="12" cy="12" r="1.5" fill="#00D8FF"/>
    <ellipse rx="6" ry="2.2" transform="translate(12, 12) rotate(30)"/>
    <ellipse rx="6" ry="2.2" transform="translate(12, 12) rotate(90)"/>
    <ellipse rx="6" ry="2.2" transform="translate(12, 12) rotate(150)"/>
  </svg>
);

const FigmaLogo = () => (
  <svg viewBox="0 0 38 57" className="h-10 w-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 17C10.5 12.3 14.3 8.5 19 8.5C23.7 8.5 27.5 12.3 27.5 17V25.5H19C14.3 25.5 10.5 21.7 10.5 17Z" fill="#F24E1E"/>
    <path d="M10.5 40.8C10.5 36.1 14.3 32.3 19 32.3H27.5V40.8C27.5 45.5 23.7 49.3 19 49.3C14.3 49.3 10.5 45.5 10.5 40.8Z" fill="#0ACF83"/>
    <path d="M19 32.3C23.7 32.3 27.5 28.5 27.5 23.8V17H19V32.3Z" fill="#A259FF"/>
    <path d="M10.5 23.8C10.5 19.1 14.3 15.3 19 15.3V32.3C14.3 32.3 10.5 28.5 10.5 23.8Z" fill="#1ABCFE"/>
    <path d="M19 49.3C23.7 49.3 27.5 45.5 27.5 40.8V32.3H19V49.3Z" fill="#FF7262"/>
  </svg>
);

const NextjsLogo = () => (
  <svg viewBox="0 0 180 180" className="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M180 90C180 139.706 139.706 180 90 180C40.2944 180 0 139.706 0 90C0 40.2944 40.2944 0 90 0C139.706 0 180 40.2944 180 90ZM122.956 50.8412C122.253 50.8412 121.684 51.41 121.684 52.1132V109.914L63.5041 51.5441C62.9056 50.9456 61.9056 50.9456 61.3071 51.5441C61.0118 51.8394 60.8462 52.2394 60.8462 52.6565V127.143C60.8462 127.847 61.4151 128.415 62.1182 128.415C62.8214 128.415 63.3902 127.847 63.3902 127.143V69.3424L121.57 127.712C122.169 128.311 123.169 128.311 123.767 127.712C124.062 127.417 124.228 127.017 124.228 126.6V52.1132C124.228 51.41 123.659 50.8412 122.956 50.8412Z" />
  </svg>
);

const NodejsLogo = () => (
  <svg viewBox="0 0 256 295" className="h-10 w-10 fill-current text-[#339933]" xmlns="http://www.w3.org/2000/svg">
    <path d="M142.9 2.5c-9.1-5.3-20.7-5.3-29.8 0L20 56.1C9.9 62 3.7 72.8 3.7 84.5v125.7c0 11.7 6.2 22.5 16.3 28.4l93.1 53.7c9.1 5.3 20.7 5.3 29.8 0l93.1-53.7c10.1-5.9 16.3-16.7 16.3-28.4V84.5c0-11.7-6.2-22.5-16.3-28.4L142.9 2.5zM128 259.9V35.1c3.1 0 6.2.8 8.8 2.3l93.1 53.7c5.1 3 8.2 8.4 8.2 14.3v107.5c0 5.9-3.1 11.3-8.2 14.3l-93.1 53.7c-2.6 1.5-5.7 2.3-8.8 2.3z" />
  </svg>
);

const PostgresLogo = () => (
  <svg viewBox="0 0 64 64" className="h-10 w-10 fill-current text-[#336791]" xmlns="http://www.w3.org/2000/svg">
    <path d="M51.9 29.1c.1-.8.2-1.7.2-2.5 0-11.4-8.8-19.1-18.7-19.1-11.2 0-20.3 9.4-20.3 20.9 0 2 .3 4 .9 5.8-2.6.8-4.5 3.3-4.5 6.2 0 3.7 3 6.6 6.7 6.6h.4v2.7c0 4.1 3.3 7.5 7.5 7.5h16.2c4.1 0 7.5-3.3 7.5-7.5v-2.7h.5c3.7 0 6.7-3 6.7-6.6.1-4-2.8-7.3-6.5-7.9zM33.4 12c7.9 0 14.2 6 14.2 14.6 0 .8-.1 1.7-.2 2.5H19.5c-.1-.8-.2-1.7-.2-2.5 0-8.6 6.2-14.6 14.1-14.6z"/>
  </svg>
);

const PrismaLogo = () => (
  <svg viewBox="0 0 45 52" className="h-10 w-9" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.023.238L.484 38.643a1.144 1.144 0 0 0 .991 1.701h12.56L22.023 26.65l7.989 13.693h12.56a1.144 1.144 0 0 0 .991-1.701L22.023.238z" fill="#0C344B"/>
    <path d="M22.023.238v26.412l7.989 13.693h12.56a1.144 1.144 0 0 0 .991-1.701L22.023.238z" fill="#16A394"/>
  </svg>
);

const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current text-[#D97706]" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.6 14.4L14.4 15.6L12 13.2L9.6 15.6L8.4 14.4L10.8 12L8.4 9.6L9.6 8.4L12 10.8L14.4 8.4L15.6 9.6L13.2 12L15.6 14.4Z"/>
  </svg>
);

const OllamaLogo = () => (
  <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18a4 4 0 0 0-8 0" />
    <path d="M12 2v4" />
    <path d="M9 3v2" />
    <path d="M15 3v2" />
    <rect x="4" y="6" width="16" height="10" rx="2" />
  </svg>
);

const LumaLogo = () => (
  <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
    <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10" />
    <path d="M2 12h20" />
  </svg>
);

const technologiesData = [
  { 
    name: "ReactJS", 
    type: "Frontend Library", 
    desc: "ReactJS forms the core of our web interfaces, offering component encapsulation, declarative rendering, and interactive UI states.", 
    icon: ReactLogo, 
    code: `import React, { useState } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}`
  },
  { 
    name: "React Native", 
    type: "Mobile Framework", 
    desc: "React Native allows us to ship native iOS and Android apps with 85%+ code sharing, utilizing the same core architectural logic.", 
    icon: ReactNativeLogo, 
    code: `import { Text, View, StyleSheet } from 'react-native';\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Text>DevSync Mobile</Text>\n    </View>\n  );\n}`
  },
  { 
    name: "Figma", 
    type: "UI/UX Design", 
    desc: "Figma serves as our collaborative workspace where visual grids, wireframes, and design tokens are defined and exported directly to code.", 
    icon: FigmaLogo, 
    code: `// Figma Design Tokens Schema\n{\n  "colors": {\n    "ink": "#151515",\n    "paper": "#eeeae2",\n    "orange": "#fa6739"\n  },\n  "fonts": {\n    "body": "Manrope"\n  }\n}`
  },
  { 
    name: "Next.js", 
    type: "React Framework", 
    desc: "Next.js coordinates server components, dynamic server actions, API routing, and SSR rendering, optimization metrics.", 
    icon: NextjsLogo, 
    code: `// app/page.tsx (Next.js Server Component)\nimport Header from '@/components/Header';\n\nexport default async function Page() {\n  return (\n    <main>\n      <Header />\n      <h1>DevSync Next.js App</h1>\n    </main>\n  );\n}`
  },
  { 
    name: "Node.js", 
    type: "Server Runtime", 
    desc: "Node.js runtime powers our fast, scalable backend APIs, processing sockets, database events, and microservices in real time.", 
    icon: NodejsLogo, 
    code: `const express = require('express');\nconst app = express();\n\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'healthy', timestamp: Date.now() });\n});\n\napp.listen(3000);`
  },
  { 
    name: "PostgreSQL", 
    type: "Relational DB", 
    desc: "PostgreSQL handles transactional datasets with high reliability, relational integrity, and custom query execution strategies.", 
    icon: PostgresLogo, 
    code: `-- SQL Query Optimization\nSELECT users.id, profiles.role \nFROM users \nINNER JOIN profiles ON users.id = profiles.userId\nWHERE profiles.status = 'active'\nLIMIT 5;`
  },
  { 
    name: "Prisma", 
    type: "Modern ORM", 
    desc: "Prisma maps schemas into TypeScript interfaces dynamically, enabling autocomplete query execution and robust database migrations.", 
    icon: PrismaLogo, 
    code: `// schema.prisma\nmodel User {\n  id    Int     @id @default(autoincrement())\n  email String  @unique\n  name  String?\n  posts Post[]\n}`
  },
  { 
    name: "Claude", 
    type: "Anthropic AI", 
    desc: "Claude handles smart AI context processing, text-to-code pipelines, and agentic workflows throughout our collaborative tools.", 
    icon: ClaudeLogo, 
    code: `import Anthropic from '@anthropic-ai/sdk';\nconst anthropic = new Anthropic();\n\nconst msg = await anthropic.messages.create({\n  model: "claude-3-5-sonnet-20241022",\n  max_tokens: 1024,\n  messages: [{ role: "user", content: "Refactor this code..." }]\n});`
  },
  { 
    name: "Ollama", 
    type: "Local LLM Runner", 
    desc: "Ollama runs powerful LLMs offline on local hardware, giving developers privacy and low latency for custom code completions.", 
    icon: OllamaLogo, 
    code: `// Local Ollama API execution\nconst response = await fetch('http://localhost:11434/api/generate', {\n  method: 'POST',\n  body: JSON.stringify({\n    model: 'llama3',\n    prompt: 'Explain Prisma migrations...'\n  })\n});`
  },
  { 
    name: "Luma API", 
    type: "Video & 3D Gen", 
    desc: "Luma API drives generative 3D modeling and cinematic video rendering in our creative application pipelines.", 
    icon: LumaLogo, 
    code: `// Luma Dream Machine Generation Prompt\nconst response = await fetch('https://api.lumalabs.ai/v1/generations', {\n  method: 'POST',\n  headers: { 'Authorization': 'Bearer LUMA_TOKEN' },\n  body: JSON.stringify({\n    prompt: 'Cinematic tracking shot of a programmer coding...',\n    aspect_ratio: '16:9'\n  })\n});`
  }
];

export default function StackPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-[#eeeae2] text-[#151515] pt-28 pb-20">
      <Header onJoinClick={() => setModalOpen(true)} />
      
      <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
        <div ref={containerRef} style={{ position: "relative" }} className="border-b border-[#cfcac0] pb-10 mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[.085em] text-stone-500">
            Tech Stacks We Handle
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight text-[#151515]">
            <VariableProximity
              label="Our Core Stack."
              fromFontVariationSettings="'wght' 350"
              toFontVariationSettings="'wght' 850"
              containerRef={containerRef}
              radius={180}
              falloff="linear"
            />
          </h1>
          <p className="mt-4 max-w-[650px] text-sm text-stone-600 leading-relaxed">
            <VariableProximity
              label="A comprehensive, high-bandwidth catalog of technologies implemented in our open-source templates, live-reviewed in architecture clinics, and mastered in cohorts."
              fromFontVariationSettings="'wght' 350"
              toFontVariationSettings="'wght' 650"
              containerRef={containerRef}
              radius={180}
              falloff="linear"
            />
          </p>
        </div>

        {/* Technologies List with Code Examples */}
        <div className="flex flex-col gap-16">
          {technologiesData.map((tech) => {
            const IconComponent = tech.icon;
            return (
              <section key={tech.name} className="grid md:grid-cols-[1fr_1.3fr] gap-8 border-b border-[#cfcac0]/60 pb-16 last:border-b-0">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="border border-[#cfcac0] bg-white p-3 flex items-center justify-center">
                      <IconComponent />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 bg-stone-200/80 px-2 py-0.5 rounded">
                        {tech.type}
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight text-[#151515] mt-1">
                        {tech.name}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-5 text-sm text-stone-700 leading-relaxed">
                    {tech.desc}
                  </p>
                  <button 
                    onClick={() => setModalOpen(true)}
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider font-bold text-[#fa6739] hover:text-[#e05629]"
                  >
                    Join Cohort for {tech.name} ↗
                  </button>
                </div>

                {/* Code Block Card */}
                <div className="border border-[#cfcac0] bg-zinc-950 text-stone-300 p-6 relative overflow-x-auto select-all">
                  <div className="absolute right-4 top-4 font-mono text-[8px] uppercase tracking-widest text-stone-600">
                    EX_SAMPLE
                  </div>
                  <pre className="font-mono text-xs leading-relaxed mt-2">
                    <code>{tech.code}</code>
                  </pre>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <Footer />
      <JoinModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
