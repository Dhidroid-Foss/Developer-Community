export interface Developer {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  bio: string;
  skills: string[];
  projects: { title: string; desc: string }[];
  github: string;
  linkedin: string;
  email: string;
  stack: string[];
  website?: string;
}

export interface Technology {
  name: string;
  type: string;
  desc: string;
  code: string;
}

export interface Session {
  name: string;
  desc: string;
  host: string;
  date: string;
}

export interface Cohort {
  id: string;
  label: string;
  title: string;
  desc: string;
  sessions: Session[];
  bg: string;
}

export interface ProgramSession {
  meta: string;
  title: string;
  host: string;
  image: string;
}

export interface Program {
  label: string;
  title: string;
  text: string;
  sessions: ProgramSession[];
}

export interface Story {
  tag: string;
  title: string;
  image: string;
}

export interface Resource {
  title: string;
  category: string;
  date: string;
  desc: string;
  action: string;
}

export const developers: Developer[] = [
  {
    id: "dhidroid",
    name: "DhineshKumar Thirupathi (dhidroid)",
    role: "Full Stack & React Native Developer | AI/ML Integration Enthusiast",
    location: "Chennai, IN",
    avatar: "/avatars/dhidroid.jpg",
    bio: "Software Engineer and React Native Developer building smooth cross-platform mobile experiences with JavaScript and clean architecture. DhineshKumar is passionate about Full Stack development, bridging the gap between intuitive user interfaces and robust backend systems. Currently deeply focused on integrating AI/ML capabilities into developer tooling to optimize workflows and build smarter applications. He loves automation, open-source collaboration, and translating complex technical concepts into accessible, production-ready code.",
    skills: ["React Native", "Expo", "Android SDK", "JavaScript", "TypeScript", "React.js", "Node.js", "AI/ML API Integration", "UI/UX Optimization", "Developer Tools"],
    projects: [
      { title: "Realtime Chat SDK", desc: "A React Native library for local-first messaging synced via WebSocket protocol." },
      { title: "Android Dev Hub", desc: "Command-line and GUI automation workflows for developer environment setups." },
      { title: "AI Developer Tooling", desc: "Integrating AI/ML capabilities into developer workflows for smarter application building." },
      { title: "Portfolio — dhidroid.vercel.app", desc: "Personal developer portfolio showcasing cross-platform projects, tech stack, and open-source contributions." }
    ],
    github: "https://github.com/dhidroid",
    linkedin: "https://linkedin.com/in/dhidroid-rndev",
    email: "dhidroid@devsync.community",
    website: "https://dhidroid.vercel.app",
    stack: ["React Native", "Expo", "TypeScript", "Node.js", "React.js"]
  },

  {
    id: "vignesh",
    name: "Vignesh",
    role: "Fullstack Web Developer",
    location: "Bengaluru, IN",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Vignesh is a full-stack engineer passionate about modular frontend architectures and efficient backend endpoints. He specializes in React, Next.js server actions, and Node.js microservices.",
    skills: ["ReactJS", "Next.js", "Node.js", "Express", "TypeScript"],
    projects: [
      { title: "SaaS Starter Kit", desc: "Next.js + Prisma + Postgres boilerplate optimized for server-less and edge hosting." },
      { title: "TamilDev Forum", desc: "A high-bandwidth collaborative platform for developer reviews." }
    ],
    github: "https://github.com/vignesh",
    linkedin: "https://linkedin.com/in/vignesh",
    email: "vignesh@devsync.community",
    stack: ["ReactJS", "Next.js", "Node.js"]
  },
  {
    id: "kishore",
    name: "Kishore Kumar P",
    role: "MERN Stack Developer",
    location: "Tamil Nadu, IN",
    avatar: "https://avatars.githubusercontent.com/u/88414254?v=4",
    bio: "Kishore is a passionate MERN Stack Developer building full-stack web applications with MongoDB, Express.js, React, and Node.js. He focuses on crafting scalable REST APIs and performant, modern user interfaces.",
    skills: ["MongoDB", "Express.js", "React", "Node.js", "JavaScript", "REST APIs"],
    projects: [
      { title: "Full-Stack MERN Applications", desc: "End-to-end web apps built with MongoDB, Express, React and Node.js with RESTful API architecture." },
      { title: "Web Developer Portfolio", desc: "A showcase of modern web projects demonstrating frontend and backend skills with the MERN ecosystem." }
    ],
    github: "https://github.com/Kishore00426",
    linkedin: "https://www.linkedin.com/in/kishore-kumar-p-",
    email: "kishore@devsync.community",
    stack: ["MongoDB", "React", "Node.js"]
  },
  {
    id: "saran",
    name: "Saran",
    role: "AI & LLM Integration Specialist",
    location: "Coimbatore, IN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Saran builds state-of-the-art intelligent features using OpenAI, Anthropic's Claude, and local open-source models via Ollama. He also integrates immersive media via Luma API.",
    skills: ["Claude AI", "Ollama LLM", "Luma API", "Python", "Vector Databases"],
    projects: [
      { title: "Local Code Assistant", desc: "Integrating Ollama locally to provide safe, private, offline auto-completions in IDEs." },
      { title: "Dream Canvas API", desc: "Dynamic cinematic video prompt execution using Luma API." }
    ],
    github: "https://github.com/saran",
    linkedin: "https://linkedin.com/in/saran",
    email: "saran@devsync.community",
    stack: ["Claude AI", "Ollama", "Luma API"]
  },
  {
    id: "vijay-ls",
    name: "Vijay LS",
    role: "UI/UX Designer & Frontend Developer",
    location: "Mumbai, IN",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    bio: "Vijay designs interface layouts in Figma and translates them pixel-perfectly to React and CSS. He focuses on responsive layouts, motion curves, and user-centric interfaces.",
    skills: ["Figma Design", "CSS/Tailwind", "ReactJS", "UI Prototyping", "A11y"],
    projects: [
      { title: "Design System Tokens", desc: "A multi-platform Figma-to-React UI design tokens compiler." },
      { title: "Glassmorphic Theme Engine", desc: "A light-weight CSS library for custom responsive themes." }
    ],
    github: "https://github.com/vijay-ls",
    linkedin: "https://linkedin.com/in/vijay-ls",
    email: "vijay-ls@devsync.community",
    stack: ["Figma", "Tailwind", "ReactJS"]
  }
];

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

export const homeTechnologies = technologies.map(({ code, ...rest }) => rest);

export const programs: Record<string, Program> = {
  clinic: {
    label: "01 / Architecture Clinic",
    title: "Feedback that moves your code forward.",
    text: "Bring your repository, database schema, or design spec. Get live, high-bandwidth reviews from engineers who build for scale.",
    sessions: [
      { meta: "React & Next.js · Jul 18", title: "Optimizing Server Components and client-side bundle size", host: "Hosted by Vignesh, Fullstack Developer", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80" },
      { meta: "MERN Stack · Jul 23", title: "Building scalable REST APIs with Node.js, Express, and MongoDB", host: "Hosted by Kishore Kumar P, MERN Stack Developer", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  workshops: {
    label: "02 / Skill Cohorts",
    title: "Get sharper at the things that ship.",
    text: "Interactive, hands-on sprints on modern tech stacks. Skip the basic tutorials—we build and deploy real applications.",
    sessions: [
      { meta: "AI Integration · Jul 15", title: "Orchestrating Claude, Ollama, and cinematic video via Luma API", host: "Hosted by Saran, AI Integration Specialist", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=500&q=80" },
      { meta: "Mobile Engineering · Jul 27", title: "Translating Figma layout specs to performant React Native screens", host: "Hosted by DhineshKumar Thirupathi, Senior Mobile Dev", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  connect: {
    label: "03 / Dev Partnerships",
    title: "The right rooms make room for scale.",
    text: "We bridge the gap between premium startups and elite developers who understand both code and product strategy.",
    sessions: [
      { meta: "Client Meet · Aug 02", title: "Matchmaking session with startups hiring React and Node contract teams", host: "Hosted by The TamilDev Team", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80" },
      { meta: "Figma Handover · Aug 06", title: "Bridging design and code: smooth developer-designer handovers", host: "Hosted by Vijay LS, UI/UX Lead", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  circle: {
    label: "04 / Engineering Circle",
    title: "Your engineering career needs a node.",
    text: "A peer group for conversations that go deep: architecture decisions, deployment headaches, and local AI workflows.",
    sessions: [
      { meta: "Architecture Sync · Jul 20", title: "The real cost of cloud vs bare-metal with Postgres & Node", host: "Hosted by TamilDev DevOps", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=500&q=80" },
      { meta: "Open Code Critique · Jul 31", title: "Show your worst legacy code and let's refactor it live", host: "Hosted by TamilDev Members", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=500&q=80" }
    ]
  }
};

export const cohorts: Cohort[] = [
  {
    id: "architecture",
    label: "01 / Architecture Clinic",
    title: "Get live review of your code & queries.",
    desc: "Bring a repository, database schema, or architectural diagram. Get live, high-bandwidth reviews from engineers who build for scale.",
    sessions: [
      { name: "React & Next.js Reviews", desc: "Optimizing layout hydration and RSC structures.", host: "Vignesh, Fullstack Developer", date: "Jul 18, 09:00" },
      { name: "MERN Stack API Design", desc: "Building scalable REST APIs with Node.js, Express, and MongoDB.", host: "Kishore Kumar P, MERN Stack Developer", date: "Jul 23, 14:00" }
    ],
    bg: "bg-stone-100/50"
  },
  {
    id: "skill-cohorts",
    label: "02 / Skill Cohorts",
    title: "Interactive hands-on code sprints.",
    desc: "Skip the basic tutorials. We build, optimize, and deploy real production applications with modern API sets.",
    sessions: [
      { name: "AI Integration Labs", desc: "Orchestrating Claude, Ollama, and generative video via Luma API.", host: "Saran, AI Integration Specialist", date: "Jul 15, 10:00" },
      { name: "Mobile Design-to-Code", desc: "Translating Figma layouts into native React Native component files.", host: "DhineshKumar Thirupathi, Mobile Specialist", date: "Jul 27, 11:00" }
    ],
    bg: "bg-white/40"
  },
  {
    id: "partnerships",
    label: "03 / Dev Partnerships",
    title: "Startups meet elite engineers.",
    desc: "We bridge the gap between premium startups and elite developers who understand both code and product strategy.",
    sessions: [
      { name: "Contract Matchmaking", desc: "Introductions to startups hiring fullstack and mobile teams.", host: "TamilDev Partnerships Team", date: "Aug 02, 16:00" },
      { name: "Figma Handovers Workshop", desc: "Optimizing the workflow between product designers and devs.", host: "Vijay LS, UI/UX Lead", date: "Aug 06, 15:00" }
    ],
    bg: "bg-stone-100/50"
  },
  {
    id: "circle",
    label: "04 / Engineering Circle",
    title: "Peer groups for senior engineers.",
    desc: "A private forum for senior devs. Share scaling issues, launch stress-tests, talk through infrastructure costs, and build next-gen tools.",
    sessions: [
      { name: "Node & Postgres Scaling", desc: "Load balancing write-heavy databases.", host: "TamilDev Devops Team", date: "Jul 20, 18:00" },
      { name: "The Future of Frameworks", desc: "Discussion on Bun runtime, Next.js updates, and agent workflows.", host: "TamilDev Maintainers", date: "Jul 31, 19:00" }
    ],
    bg: "bg-white/40"
  }
];

export const stories: Story[] = [
  { tag: "Architecture Clinic · Next.js & Claude AI", title: "Building a real-time collaborative code workspace from scratch.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85" },
  { tag: "Client Connect · React Native & Figma", title: "Launching a high-performance cross-platform mobile app in 6 weeks.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=85" },
  { tag: "Membership Circle · Node & Postgres", title: "Optimizing database queries and Prisma schemas to handle 10M+ daily events.", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=85" }
];

export const resources: Resource[] = [
  {
    title: "Next.js + Prisma + Postgres Boilerplate",
    category: "codebase",
    date: "Jul 02, 2026",
    desc: "A fully production-ready Next.js SaaS boilerplate featuring safe Prisma schemas, PostgreSQL relational migrations, and Vercel edge configs.",
    action: "Clone Repository"
  },
  {
    title: "Ollama Local-First Inference Optimization Guide",
    category: "guide",
    date: "Jun 18, 2026",
    desc: "Detailed benchmark configurations to optimize private LLM completion inferences locally using Ollama and Llama 3 models.",
    action: "Read Guide"
  },
  {
    title: "Figma to React Native Style Synchronizer",
    category: "template",
    date: "Jul 21, 2026",
    desc: "Design tokens script compiling color assets and layout metrics from Figma files directly into React Native style props.",
    action: "Get Template"
  },
  {
    title: "Claude API Agent Orchestrator",
    category: "codebase",
    date: "Jun 30, 2026",
    desc: "A Node.js microservice template orchestrating tool-calling schemas and chat contexts dynamically with Anthropic Claude API.",
    action: "Clone Repository"
  },
  {
    title: "Prisma Schema Scaling Indexing Strategies",
    category: "guide",
    date: "May 12, 2026",
    desc: "Learn how to write multi-column compound indexes in Prisma to optimize large relational datasets in PostgreSQL.",
    action: "Read Guide"
  },
  {
    title: "Luma API Cinematic Video prompt boilerplate",
    category: "template",
    date: "May 29, 2026",
    desc: "Ready-to-use prompting configurations and JSON schemas to trigger cinematic video outputs via Luma Dream Machine API.",
    action: "Get Template"
  }
];

export interface Quote {
  text: string;
  author: string;
  role: string;
  image: string;
  location: string;
  github: string;
  linkedin: string;
  website?: string;
}

export const quotes: Quote[] = [
  {
    text: "Instead of debugging in isolation, TamilDev gave me a live room of senior developers to pair program and solve scaling issues with.",
    author: "DhineshKumar Thirupathi (dhidroid)",
    role: "Full Stack & React Native Developer | AI/ML Integration Enthusiast",
    image: "/avatars/dhidroid.jpg",
    location: "Chennai, IN",
    github: "https://github.com/dhidroid",
    linkedin: "https://linkedin.com/in/dhidroid-rndev",
    website: "https://dhidroid.vercel.app"
  },
  {
    text: "Building modular server actions and microservices with Next.js and Node.js has never been faster. Collaborative reviews speed up production deployment immensely.",
    author: "Vignesh",
    role: "Fullstack Web Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    location: "Bengaluru, IN",
    github: "https://github.com/vignesh",
    linkedin: "https://linkedin.com/in/vignesh"
  },
  {
    text: "Designing performant MERN stack applications with REST APIs and MongoDB taught me how crucial query optimization and clean architecture are for real scale.",
    author: "Kishore Kumar P",
    role: "MERN Stack Developer",
    image: "https://avatars.githubusercontent.com/u/88414254?v=4",
    location: "Tamil Nadu, IN",
    github: "https://github.com/Kishore00426",
    linkedin: "https://www.linkedin.com/in/kishore-kumar-p-"
  },
  {
    text: "Integrating Claude and local Ollama LLMs into production workflows allows us to build private, intelligent AI tools right from our IDEs.",
    author: "Saran",
    role: "AI & LLM Integration Specialist",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    location: "Coimbatore, IN",
    github: "https://github.com/saran",
    linkedin: "https://linkedin.com/in/saran"
  },
  {
    text: "Translating complex Figma design tokens into clean React components creates a seamless workflow where design and frontend logic align perfectly.",
    author: "Vijay LS",
    role: "UI/UX Designer & Frontend Developer",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    location: "Mumbai, IN",
    github: "https://github.com/vijay-ls",
    linkedin: "https://linkedin.com/in/vijay-ls"
  }
];

export const liveEvents = [
  ["01", "Live Hack Session", "Orchestrating Claude, Ollama, and Luma API video streams", "Tue", "09:00"],
  ["02", "Database Arch Crit", "Postgres query optimization & Prisma scale-out", "Thu", "14:00"],
  ["03", "Design-to-Code Sync", "Translating Figma layout specs into React Native", "Fri", "11:00"]
] as const;

export const stats = [
  ["15k+", "Active developers"],
  ["800+", "Repos sparked here"],
  ["5 Contributors", "Core maintainers"],
  ["99.9%", "Platform uptime"]
] as const;

export const featuredResources = [
  ["Codebase · Jul 02, 2026", "Next.js + Prisma + Postgres schema boilerplate for SaaS", "Clone repository"],
  ["Tuning Guide · Jun 18, 2026", "Optimizing local Ollama performance for code inference", "Read tuning guide"],
  ["Template · Jul 21, 2026", "Figma design system auto-synced with React Native style props", "Get template"]
] as const;

export const brands = ["Vercel", "Supabase", "prisma", "PostgreSQL", "GitHub", "Figma", "Ollama", "Luma AI"] as const;
