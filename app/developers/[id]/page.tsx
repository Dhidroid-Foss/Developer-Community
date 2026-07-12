"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Github, Linkedin, Mail, MapPin, CheckCircle, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";

// Dynamically import the 3D Lanyard component to disable SSR compilation for Rapier/WebGL
const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false });

// Developers Data
const developersData = {
  dhidroid: {
    name: "DhineshKumar Thirupathi (dhidroid)",
    role: "Mobile & Android Developer",
    location: "Chennai, IN",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    bio: "DhineshKumar is a seasoned Mobile Specialist with over 5 years of experience building native Android interfaces and cross-platform React Native solutions. He bridges design blueprints in Figma with high-fidelity production application code.",
    skills: ["React Native", "Android SDK", "Java/Kotlin", "TypeScript", "Figma integration"],
    projects: [
      { title: "Realtime Chat SDK", desc: "A React Native library for local-first messaging synced via WebSocket protocol." },
      { title: "Android Dev Hub", desc: "Command-line and GUI automation workflows for developer environment setups." }
    ],
    github: "https://github.com/dhidroid",
    linkedin: "https://linkedin.com/in/dhidroid",
    email: "dhidroid@devsync.community"
  },
  vignesh: {
    name: "Vignesh",
    role: "Fullstack Web Developer",
    location: "Bengaluru, IN",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Vignesh is a full-stack engineer passionate about modular frontend architectures and efficient backend endpoints. He specializes in React, Next.js server actions, and Node.js microservices.",
    skills: ["ReactJS", "Next.js", "Node.js", "Express", "TypeScript"],
    projects: [
      { title: "SaaS Starter Kit", desc: "Next.js + Prisma + Postgres boilerplate optimized for server-less and edge hosting." },
      { title: "DevSync Forum", desc: "A high-bandwidth collaborative platform for developer reviews." }
    ],
    github: "https://github.com/vignesh",
    linkedin: "https://linkedin.com/in/vignesh",
    email: "vignesh@devsync.community"
  },
  kishore: {
    name: "Kishore",
    role: "Database & Systems Architect",
    location: "Hyderabad, IN",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    bio: "Kishore specializes in PostgreSQL databases, indexing strategies, and ORMs like Prisma. He ensures high performance and sub-millisecond query responses for write-heavy realtime applications.",
    skills: ["PostgreSQL", "Prisma ORM", "SQL Tuning", "Docker", "Database Migrations"],
    projects: [
      { title: "Postgres Cluster Optimization", desc: "Reduced database query latency by 45% using customized compound indexes and query cache layers." },
      { title: "Type-Safe DB Migrator", desc: "An open-source prisma automation tool mapping development databases safely." }
    ],
    github: "https://github.com/kishore",
    linkedin: "https://linkedin.com/in/kishore",
    email: "kishore@devsync.community"
  },
  saran: {
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
    email: "saran@devsync.community"
  },
  "vijay-ls": {
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
    email: "vijay-ls@devsync.community"
  }
};

export default function DeveloperDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [modalOpen, setModalOpen] = useState(false);
  const developer = developersData[id as keyof typeof developersData];

  if (!developer) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#eeeae2] text-[#151515] pt-28 pb-20 font-sans">
      <Header onJoinClick={() => setModalOpen(true)} />
      
      <div className="mx-auto w-[min(1170px,calc(100%-38px))] font-sans">
        {/* Back Link */}
        <Link 
          href="/developers" 
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-stone-500 hover:text-[#151515] transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Developers
        </Link>

        {/* Dynamic Double Column Grid */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          
          {/* Left Column: Profile Card, Bio, Projects, and Expertise */}
          <div className="flex flex-col gap-8">
            {/* Profile Header Card */}
            <section className="border border-[#cfcac0] bg-stone-100/40 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <img 
                className="h-32 w-32 rounded-none border border-[#cfcac0] object-cover grayscale" 
                src={developer.avatar} 
                alt={developer.name} 
              />
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <MapPin size={10} /> {developer.location}
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#151515] mt-2">
                  {developer.name}
                </h1>
                <p className="text-sm font-semibold text-[#fa6739] mt-1">
                  {developer.role}
                </p>
                
                {/* Social Links */}
                <div className="flex gap-4 mt-6">
                  <a 
                    href={developer.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 text-xs font-mono text-stone-600 hover:text-[#151515] transition-colors"
                  >
                    <Github size={14} /> GitHub <ExternalLink size={10} />
                  </a>
                  <a 
                    href={developer.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 text-xs font-mono text-stone-600 hover:text-[#151515] transition-colors"
                  >
                    <Linkedin size={14} /> LinkedIn <ExternalLink size={10} />
                  </a>
                  <a 
                    href={`mailto:${developer.email}`} 
                    className="flex items-center gap-1.5 text-xs font-mono text-stone-600 hover:text-[#151515] transition-colors"
                  >
                    <Mail size={14} /> Contact <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </section>

            {/* Biography */}
            <section className="border border-[#cfcac0] bg-stone-100/40 p-6 md:p-8">
              <h2 className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-4 border-b border-[#cfcac0]/60 pb-2">
                Biography
              </h2>
              <p className="text-sm leading-relaxed text-stone-700">
                {developer.bio}
              </p>
            </section>

            {/* Featured Projects */}
            <section className="border border-[#cfcac0] bg-stone-100/40 p-6 md:p-8">
              <h2 className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-4 border-b border-[#cfcac0]/60 pb-2">
                Featured Projects
              </h2>
              <div className="flex flex-col gap-6">
                {developer.projects.map((proj, idx) => (
                  <article key={idx} className="group">
                    <h3 className="text-base font-bold text-[#151515] flex items-center gap-2">
                      <CheckCircle size={14} className="text-[#fa6739]" /> {proj.title}
                    </h3>
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed pl-5">
                      {proj.desc}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Stack Info */}
            <section className="border border-[#cfcac0] bg-stone-100/40 p-6 md:p-8">
              <h2 className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-4 border-b border-[#cfcac0]/60 pb-2">
                Expertise & Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {developer.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="font-mono text-[10px] bg-stone-200/75 border border-[#cfcac0] text-stone-700 px-3 py-1.5 rounded-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Interactive 3D Lanyard & Contact Card */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-28">
            <section className="border border-[#cfcac0] bg-stone-100/40 p-6 flex flex-col items-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 mb-2">
                Interactive DevSync Card (Drag to spin)
              </span>
              
              <div className="w-full bg-[#111111]/5 border border-[#cfcac0]/40 overflow-hidden flex items-center justify-center">
                <Lanyard
                  name={developer.name}
                  role={developer.role}
                  avatar={developer.avatar}
                />
              </div>
            </section>

            <section className="border border-[#cfcac0] bg-stone-100/40 p-6 md:p-8 text-center">
              <h3 className="font-bold text-lg text-zinc-950 font-sans">Work with {developer.name.split(" ")[0]}</h3>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed font-sans">
                Start a partnership or contract project. Get direct architectural review and implementation support.
              </p>
              <div className="mt-6">
                <a 
                  href={`mailto:${developer.email}`}
                  className="inline-block w-full text-center bg-[#fa6739] hover:bg-[#e05629] text-white font-mono text-[11px] uppercase tracking-wider font-bold py-3 transition-colors"
                >
                  Hire {developer.name.split(" ")[0]}
                </a>
              </div>
            </section>
          </div>

        </div>
      </div>

      <Footer />
      <JoinModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
