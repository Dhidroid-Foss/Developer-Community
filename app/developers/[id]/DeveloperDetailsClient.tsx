"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Github, Linkedin, Mail, MapPin, CheckCircle, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";
import { developersData } from "./developersData";

// Dynamically import the 3D Lanyard component to disable SSR compilation for Rapier/WebGL
const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false });

export default function DeveloperDetailsClient({ id }: { id: string }) {
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
