"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";

// Home feature section components — each owns its own data, state and markup
import {
  HeroSection,
  ShowcaseSection,
  CommunitySection,
  ProgramsSection,
  TestimonialsSection,
  ResourcesSection,
  NewsletterSection,
  FaqSection,
  CtaSection,
} from "@/features/home";

import type { BlogPost, Work } from "@/lib/sanity/types";

interface HomeClientProps {
  projects: Work[];
  posts: BlogPost[];
}

/**
 * Home page — thin composition shell (client component).
 *
 * All section content, data imports, animations and sub-components live in
 * features/home/components/*. This file only:
 *   1. Owns the global modal open/close state
 *   2. Passes onJoinClick down to sections that need it
 *   3. Renders Header, sections in order, Footer, and JoinModal
 */
export default function HomeClient({ projects, posts }: HomeClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <main className="overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header onJoinClick={openModal} />

      <HeroSection         onJoinClick={openModal} />
      <ShowcaseSection     onJoinClick={openModal} />
      <CommunitySection />
      <ProgramsSection     onJoinClick={openModal} posts={posts} />
      <TestimonialsSection />
      <ResourcesSection    onJoinClick={openModal} projects={projects} />
      <NewsletterSection   onJoinClick={openModal} />
      <FaqSection />
      <CtaSection          onJoinClick={openModal} />

      <Footer />
      <JoinModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
