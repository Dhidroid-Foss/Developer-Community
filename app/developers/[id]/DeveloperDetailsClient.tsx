"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Github, Linkedin, Mail, MapPin, CheckCircle, ExternalLink, Globe } from "lucide-react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";
import { developersData } from "./developersData";
import { getAvatarUrl } from "@/lib/utils";

export default function DeveloperDetailsClient({ id }: { id: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const developer = developersData[id as keyof typeof developersData];

  if (!developer) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#eeeae2] text-[#151515] pt-28 font-sans">
      <Header onJoinClick={() => setModalOpen(true)} />
      
      <div className="mx-auto w-[min(1170px,calc(100%-38px))] font-sans pb-20">
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
                src={getAvatarUrl(developer.avatar)} 
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
                <div className="flex gap-4 mt-6 flex-wrap">
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
                  {developer.website && (
                    <a 
                      href={developer.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1.5 text-xs font-mono text-stone-600 hover:text-[#151515] transition-colors"
                    >
                      <Globe size={14} /> Website <ExternalLink size={10} />
                    </a>
                  )}
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

          {/* Right Column: Live Website Preview & Contact Card */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-28">
            <section className="border border-[#cfcac0] bg-stone-100/40 overflow-hidden">
              {/* Browser Chrome Bar */}
              <div className="flex items-center gap-2 border-b border-[#cfcac0] bg-stone-200/60 px-3 py-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex flex-1 items-center gap-2 rounded bg-white/70 border border-[#cfcac0]/60 px-2 py-1 mx-1">
                  <Globe size={9} className="text-stone-400 shrink-0" />
                  <span className="font-mono text-[9px] text-stone-500 truncate">
                    {developer.website ?? developer.github}
                  </span>
                </div>
                <a
                  href={developer.website ?? developer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-stone-400 hover:text-[#fa6739] transition-colors"
                  aria-label="Open in new tab"
                >
                  <ExternalLink size={11} />
                </a>
              </div>

              {/* Iframe Preview */}
              <div className="relative w-full" style={{ height: "420px" }}>
                <iframe
                  src={developer.website ?? developer.github}
                  title={`${developer.name}'s live website`}
                  className="w-full h-full border-0"
                  style={{ transform: "scale(0.75)", transformOrigin: "top left", width: "133.33%", height: "133.33%" }}
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                />
              </div>

              <div className="border-t border-[#cfcac0] px-4 py-2 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400">
                  Live Preview
                </span>
                <a
                  href={developer.website ?? developer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[9px] uppercase tracking-wider text-[#fa6739] font-bold hover:underline flex items-center gap-1"
                >
                  Open Site <ExternalLink size={9} />
                </a>
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
