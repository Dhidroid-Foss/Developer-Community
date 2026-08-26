import type { Cohort } from "../types/cohort.types";

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
      { name: "Contract Matchmaking", desc: "Introductions to startups hiring fullstack and mobile teams.", host: "Niral Developer Partnerships Team", date: "Aug 02, 16:00" },
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
      { name: "Node & Postgres Scaling", desc: "Load balancing write-heavy databases.", host: "Niral Developer Devops Team", date: "Jul 20, 18:00" },
      { name: "The Future of Frameworks", desc: "Discussion on Bun runtime, Next.js updates, and agent workflows.", host: "Niral Developer Maintainers", date: "Jul 31, 19:00" }
    ],
    bg: "bg-white/40"
  }
];
