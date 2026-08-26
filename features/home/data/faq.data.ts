/**
 * features/home/data/faq.data.ts
 *
 * Niral Developer FAQ content — used by both:
 *   1. The homepage FAQ accordion (<details/> section)
 *   2. SyncBot in FloatingWidgets (keyword-matched answers)
 */

/** Full FAQ items shown in the homepage accordion. */
export const faqItems: { q: string; a: string }[] = [
  {
    q: "What is Niral Developer?",
    a: "Niral Developer (தமிழ்Dev) is a free, realtime developer community for Tamil-speaking engineers. Frontend, backend, mobile, and AI developers learn together, review each other's code, and ship open-source projects — from React, Next.js and React Native to Node.js, PostgreSQL, and AI tooling.",
  },
  {
    q: "Is Niral Developer free to join?",
    a: "Yes. Joining Niral Developer is free. Live architecture clinics, skill cohorts, engineering circles, and our open-source resources are open to all members.",
  },
  {
    q: "Which technologies does the community cover?",
    a: "We focus on a production-ready stack: React, React Native, Next.js, Node.js, TypeScript, PostgreSQL, Prisma, MongoDB, Docker, Kubernetes, Tailwind CSS, and AI workflows with Claude, Ollama, and the Luma API.",
  },
  {
    q: "How do architecture clinics work?",
    a: "Bring a repository, database schema, or design spec. Senior engineers give live, high-bandwidth reviews so you can ship better, faster — this is real code review, not a lecture.",
  },
  {
    q: "How do I join a cohort or live session?",
    a: "Pick a cohort on the Cohorts page and join its live stream, or open any session card and hit the join button. Weekly sessions are published with dates and times on the homepage.",
  },
  {
    q: "Can I contribute to open-source projects through Niral Developer?",
    a: "Yes. Members maintain 800+ repositories and share production-grade boilerplates, templates, and guides in the Resources section. Submit your own project to be featured.",
  },
  {
    q: "Is Niral Developer only for Tamil-speaking developers?",
    a: "The community is built around Tamil-speaking engineers, but anyone who loves building in realtime is welcome. Sessions and resources are available in English.",
  },
];

/**
 * SyncBot keyword → answer map.
 * Extracted from FloatingWidgets.tsx so the chatbot logic
 * stays separate from the UI component.
 */
export const FAQ_ANSWERS: Record<string, string> = {
  developers:
    "Niral Developer is powered by 5 core contributors:\n1. DhineshKumar (Mobile Specialist)\n2. Vignesh (Fullstack Developer)\n3. Kishore (MERN Stack Developer)\n4. Saran (AI Integrations)\n5. Vijay LS (UI/UX Design)",
  cohorts:
    "Active Cohorts:\n- Architecture Clinic: Relational database & Next.js schema critiques.\n- Skill Sprints: Hands-on AI engineering & mobile design syncing.\n- Dev Partnerships: Connecting startups with elite contract devs.",
  join: "Click any orange 'Join Niral Developer' button on the page. Enter your email, check off your tech stack, and you'll get instant access!",
  stack:
    "Our core stack includes: ReactJS, React Native, Figma, Next.js, Node.js, PostgreSQL, Prisma ORM, Claude API, Ollama, and Luma API.",
  default:
    "I'm SyncBot! You can ask me about our core developers, active cohorts, tech stack, or how to join the Niral Developer community.",
};
