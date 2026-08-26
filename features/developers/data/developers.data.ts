import { DevCats1 } from "@/app/assets/dev-cats";
import type { Developer } from "../types/developer.types";

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
    email: "-",
    website: "https://dhidroid.vercel.app",
    stack: ["React Native", "Expo", "TypeScript", "Node.js", "React.js"]
  },
  {
    id: "vignesh",
    name: "Vignesh",
    role: "Fullstack Web Developer",
    location: "Bengaluru, IN",
    avatar: DevCats1,
    bio: "Vignesh is a full-stack engineer passionate about modular frontend architectures and efficient backend endpoints. He specializes in React, Next.js server actions, and Node.js microservices.",
    skills: ["ReactJS", "Next.js", "Node.js", "Express", "TypeScript"],
    projects: [
      { title: "SaaS Starter Kit", desc: "Next.js + Prisma + Postgres boilerplate optimized for server-less and edge hosting." },
      { title: "Niral Developer Forum", desc: "A high-bandwidth collaborative platform for developer reviews." }
    ],
    github: "https://github.com/vignesh",
    linkedin: "https://linkedin.com/in/vignesh",
    email: "-",
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
    email: "-",
    stack: ["MongoDB", "React", "Node.js"]
  },
  {
    id: "saran",
    name: "Saran",
    role: "AI & LLM Integration Specialist",
    location: "Coimbatore, IN",
    avatar: "/avatars/sarandevaraj.png",
    bio: "Saran builds state-of-the-art intelligent features using OpenAI, Anthropic's Claude, and local open-source models via Ollama. He also integrates immersive media via Luma API.",
    skills: ["Claude AI", "Ollama LLM", "Luma API", "Python", "Vector Databases"],
    projects: [
      { title: "Local Code Assistant", desc: "Integrating Ollama locally to provide safe, private, offline auto-completions in IDEs." },
      { title: "Dream Canvas API", desc: "Dynamic cinematic video prompt execution using Luma API." }
    ],
    github: "https://github.com/saran",
    linkedin: "https://linkedin.com/in/saran",
    email: "-",
    stack: ["Claude AI", "Ollama", "Luma API"]
  },
];

/** Convenience lookup: id → Developer (used by the dynamic route). */
export const developersById = Object.fromEntries(
  developers.map((d) => [d.id, d])
) as Record<string, Developer>;
