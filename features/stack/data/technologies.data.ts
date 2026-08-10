import type { Technology } from "../types/technology.types";

export const technologies: Technology[] = [
  {
    name: "ReactJS",
    type: "Frontend Library",
    desc: "ReactJS forms the core of our web interfaces, offering component encapsulation, declarative rendering, and interactive UI states.",
    code: `import React, { useState } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}`
  },
  {
    name: "React Native",
    type: "Mobile Framework",
    desc: "React Native allows us to ship native iOS and Android apps with 85%+ code sharing, utilizing the same core architectural logic.",
    code: `import { Text, View, StyleSheet } from 'react-native';\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Text>DevSync Mobile</Text>\n    </View>\n  );\n}`
  },
  {
    name: "Figma",
    type: "UI/UX Design",
    desc: "Figma serves as our collaborative workspace where visual grids, wireframes, and design tokens are defined and exported directly to code.",
    code: `// Figma Design Tokens Schema\n{\n  "colors": {\n    "ink": "#151515",\n    "paper": "#eeeae2",\n    "orange": "#fa6739"\n  },\n  "fonts": {\n    "body": "Manrope"\n  }\n}`
  },
  {
    name: "Next.js",
    type: "React Framework",
    desc: "Next.js coordinates server components, dynamic server actions, API routing, and SSR rendering, optimization metrics.",
    code: `// app/page.tsx (Next.js Server Component)\nimport Header from '@/components/Header';\n\nexport default async function Page() {\n  return (\n    <main>\n      <Header />\n      <h1>DevSync Next.js App</h1>\n    </main>\n  );\n}`
  },
  {
    name: "Node.js",
    type: "Server Runtime",
    desc: "Node.js runtime powers our fast, scalable backend APIs, processing sockets, database events, and microservices in real time.",
    code: `const express = require('express');\nconst app = express();\n\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'healthy', timestamp: Date.now() });\n});\n\napp.listen(3000);`
  },
  {
    name: "PostgreSQL",
    type: "Relational DB",
    desc: "PostgreSQL handles transactional datasets with high reliability, relational integrity, and custom query execution strategies.",
    code: `-- SQL Query Optimization\nSELECT users.id, profiles.role \nFROM users \nINNER JOIN profiles ON users.id = profiles.userId\nWHERE profiles.status = 'active'\nLIMIT 5;`
  },
  {
    name: "Prisma",
    type: "Modern ORM",
    desc: "Prisma maps schemas into TypeScript interfaces dynamically, enabling autocomplete query execution and robust database migrations.",
    code: `// schema.prisma\nmodel User {\n  id    Int     @id @default(autoincrement())\n  email String  @unique\n  name  String?\n  posts Post[]\n}`
  },
  {
    name: "Claude",
    type: "Anthropic AI",
    desc: "Claude handles smart AI context processing, text-to-code pipelines, and agentic workflows throughout our collaborative tools.",
    code: `import Anthropic from '@anthropic-ai/sdk';\nconst anthropic = new Anthropic();\n\nconst msg = await anthropic.messages.create({\n  model: "claude-3-5-sonnet-20241022",\n  max_tokens: 1024,\n  messages: [{ role: "user", content: "Refactor this code..." }]\n});`
  },
  {
    name: "Ollama",
    type: "Local LLM Runner",
    desc: "Ollama runs powerful LLMs offline on local hardware, giving developers privacy and low latency for custom code completions.",
    code: `// Local Ollama API execution\nconst response = await fetch('http://localhost:11434/api/generate', {\n  method: 'POST',\n  body: JSON.stringify({\n    model: 'llama3',\n    prompt: 'Explain Prisma migrations...'\n  })\n});`
  },
  {
    name: "Luma API",
    type: "Video & 3D Gen",
    desc: "Luma API drives generative 3D modeling and cinematic video rendering in our creative application pipelines.",
    code: `// Luma Dream Machine Generation Prompt\nconst response = await fetch('https://api.lumalabs.ai/v1/generations', {\n  method: 'POST',\n  headers: { 'Authorization': 'Bearer LUMA_TOKEN' },\n  body: JSON.stringify({\n    prompt: 'Cinematic tracking shot of a programmer coding...',\n    aspect_ratio: '16:9'\n  })\n});`
  }
];

/** Omits the code snippet — used in the homepage tech belt carousel. */
export const homeTechnologies = technologies.map(({ code: _code, ...rest }) => rest);
