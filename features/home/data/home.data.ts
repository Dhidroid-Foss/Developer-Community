import { DevCats1 } from "@/app/assets/dev-cats";
import type { Program, Story, Quote } from "../types/home.types";

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
      { meta: "Client Meet · Aug 02", title: "Matchmaking session with startups hiring React and Node contract teams", host: "Hosted by The Niral Developer Team", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80" },
      { meta: "Figma Handover · Aug 06", title: "Bridging design and code: smooth developer-designer handovers", host: "Hosted by Vijay LS, UI/UX Lead", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  circle: {
    label: "04 / Engineering Circle",
    title: "Your engineering career needs a node.",
    text: "A peer group for conversations that go deep: architecture decisions, deployment headaches, and local AI workflows.",
    sessions: [
      { meta: "Architecture Sync · Jul 20", title: "The real cost of cloud vs bare-metal with Postgres & Node", host: "Hosted by Niral Developer DevOps", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=500&q=80" },
      { meta: "Open Code Critique · Jul 31", title: "Show your worst legacy code and let's refactor it live", host: "Hosted by Niral Developer Members", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=500&q=80" }
    ]
  }
};

export const stories: Story[] = [
  { tag: "Architecture Clinic · Next.js & Claude AI", title: "Building a real-time collaborative code workspace from scratch.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85" },
  { tag: "Client Connect · React Native & Figma", title: "Launching a high-performance cross-platform mobile app in 6 weeks.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=85" },
  { tag: "Membership Circle · Node & Postgres", title: "Optimizing database queries and Prisma schemas to handle 10M+ daily events.", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=85" }
];

export const quotes: Quote[] = [
  {
    text: "Instead of debugging in isolation, Niral Developer gave me a live room of senior developers to pair program and solve scaling issues with.",
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
    image: DevCats1,
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
    image: "/avatars/sarandevaraj.png",
    location: "Coimbatore, IN",
    github: "https://github.com/saran",
    linkedin: "https://linkedin.com/in/saran"
  }
];

export const liveEvents = [
  ["01", "Live Hack Session", "Orchestrating Claude, Ollama, and Luma API video streams", "Tue", "09:00"],
  ["02", "Database Arch Crit", "Postgres query optimization & Prisma scale-out", "Thu", "14:00"],
  ["03", "Design-to-Code Sync", "Translating Figma layout specs into React Native", "Fri", "11:00"]
] as const;

export const stats = [
  ["2+", "Active developers"],
  ["10+", "Repos sparked here"],
  ["10+", "Contributors"],
  ["10+", "Platform uptime"]
] as const;

/** 3-item summary shown in the homepage open-source section. */
export const featuredResources = [
  ["Codebase · Jul 02, 2026", "Next.js + Prisma + Postgres schema boilerplate for SaaS", "Clone repository"],
  ["Tuning Guide · Jun 18, 2026", "Optimizing local Ollama performance for code inference", "Read tuning guide"],
  ["Template · Jul 21, 2026", "Figma design system auto-synced with React Native style props", "Get template"]
] as const;

export const brands = [
  "Vercel", "Supabase", "prisma", "PostgreSQL", "GitHub", "Figma", "Ollama", "Luma AI"
] as const;
