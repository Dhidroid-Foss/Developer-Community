"use client";

import { useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";

export function ContentShell({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#eeeae2] text-[#151515] pt-28">
      <Header onJoinClick={() => setModalOpen(true)} />
      <div className="mx-auto w-[min(1170px,calc(100%-38px))] pb-20">{children}</div>
      <Footer />
      <JoinModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
