/**
 * features/home/data/tech-grid.data.ts
 *
 * Tech icon grid data for the homepage tech showcase section.
 * Uses makeIcon() from components/common so no Three.js or animation
 * code leaks into this data file.
 *
 * blueprintTechs  — Primary 12-card grid (page 1)
 * page2Techs      — Overflow pool (page 2), mixed into random flip rotation
 * allTechs        — Full pool used by TechGrid for random slot swapping
 * homeIconMap     — Name → icon mapping for the scroll-driven belt carousel
 */

import { makeIcon } from "@/components/common";

export const blueprintTechs = [
  { id: "01", name: "Vercel",       icon: makeIcon("devicon-vercel-original colored"),             role: "HOSTING"    },
  { id: "02", name: "React",        icon: makeIcon("devicon-react-original colored"),              role: "UI LIBRARY" },
  { id: "03", name: "Next.js",      icon: makeIcon("devicon-nextjs-plain colored"),                role: "FRAMEWORK"  },
  { id: "04", name: "Supabase",     icon: makeIcon("devicon-supabase-plain colored"),              role: "BACKEND"    },
  { id: "05", name: "PostgreSQL",   icon: makeIcon("devicon-postgresql-plain colored"),            role: "DATABASE"   },
  { id: "06", name: "Node.js",      icon: makeIcon("devicon-nodejs-plain colored"),                role: "RUNTIME"    },
  { id: "07", name: "Docker",       icon: makeIcon("devicon-docker-plain colored"),                role: "CONTAINERS" },
  { id: "08", name: "AWS",          icon: makeIcon("devicon-amazonwebservices-plain colored"),     role: "CLOUD"      },
  { id: "09", name: "GitHub",       icon: makeIcon("devicon-github-original colored"),             role: "DEVOPS"     },
  { id: "10", name: "TypeScript",   icon: makeIcon("devicon-typescript-plain colored"),            role: "LANGUAGE"   },
  { id: "11", name: "Tailwind CSS", icon: makeIcon("devicon-tailwindcss-plain colored"),           role: "STYLING"    },
  { id: "12", name: "Redis",        icon: makeIcon("devicon-redis-plain colored"),                 role: "CACHING"    },
] as const;

export const page2Techs = [
  { name: "Figma",       icon: makeIcon("devicon-figma-plain colored")       },
  { name: "Prisma",      icon: makeIcon("devicon-prisma-original colored")   },
  { name: "MongoDB",     icon: makeIcon("devicon-mongodb-plain colored")     },
  { name: "GraphQL",     icon: makeIcon("devicon-graphql-plain colored")     },
  { name: "Stripe",      icon: makeIcon("devicon-stripe-plain colored")      },
  { name: "Cloudflare",  icon: makeIcon("devicon-cloudflare-plain colored")  },
  { name: "Python",      icon: makeIcon("devicon-python-plain colored")      },
  { name: "Vite",        icon: makeIcon("devicon-vitejs-plain colored")      },
  { name: "Linux",       icon: makeIcon("devicon-linux-plain colored")       },
  { name: "Kubernetes",  icon: makeIcon("devicon-kubernetes-plain colored")  },
  { name: "Zod",         icon: makeIcon("devicon-typescript-plain colored")  },
  { name: "Node.js",     icon: makeIcon("devicon-nodejs-plain colored")      },
];

/** Full pool for random slot-swap rotation in TechGrid. */
export const allTechs = [...blueprintTechs, ...page2Techs];

/** Name → icon map for the scroll-driven belt carousel. */
export const homeIconMap: Record<string, React.FC<{ className?: string }>> = {
  ReactJS:        makeIcon("devicon-react-original colored"),
  "React Native": makeIcon("devicon-react-original colored"),
  Figma:          makeIcon("devicon-figma-plain colored"),
  "Next.js":      makeIcon("devicon-nextjs-plain colored"),
  "Node.js":      makeIcon("devicon-nodejs-plain colored"),
  PostgreSQL:     makeIcon("devicon-postgresql-plain colored"),
  Prisma:         makeIcon("devicon-prisma-original colored"),
  Claude:         makeIcon("devicon-anthropic-plain colored"),
  Ollama:         makeIcon("devicon-ollama-plain colored"),
  "Luma API":     makeIcon("devicon-python-plain colored"),
};
