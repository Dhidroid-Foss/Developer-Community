"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { MessageSquare, Calendar } from "lucide-react";
import { SyncBotChat } from "@/components/widgets/SyncBotChat";
import { MeetingBooker } from "@/components/widgets/MeetingBooker";

/**
 * FloatingWidgets — thin FAB shell that composes SyncBotChat + MeetingBooker.
 *
 * Owns only the open/close state for each widget; all logic lives in
 * the individual widget components under components/widgets/.
 */
export default function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [meetOpen, setMeetOpen] = useState(false);

  const openChat = () => { setChatOpen(true);  setMeetOpen(false); };
  const openMeet = () => { setMeetOpen(true);  setChatOpen(false); };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end pointer-events-auto">

        {/* Meeting Booker FAB */}
        <button
          onClick={() => (meetOpen ? setMeetOpen(false) : openMeet())}
          className={`group flex items-center justify-start h-12 w-12 hover:w-40 rounded-none shadow-lg transition-all duration-300 overflow-hidden px-3.5 border cursor-pointer ${
            meetOpen
              ? "bg-zinc-950 text-white border-zinc-800 w-40"
              : "bg-[#eeeae2] text-[#151515] border-[#cfcac0] hover:bg-stone-200"
          }`}
          aria-label="Toggle Meeting Booker"
        >
          <Calendar
            size={16}
            className={`shrink-0 ${meetOpen ? "animate-pulse text-[#fa6739]" : ""}`}
          />
          <span
            className={`font-mono text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all duration-300 ${
              meetOpen
                ? "max-w-32 opacity-100 ml-2"
                : "max-w-0 opacity-0 overflow-hidden group-hover:max-w-32 group-hover:opacity-100 group-hover:ml-2"
            }`}
          >
            Book Session
          </span>
        </button>

        {/* SyncBot FAB */}
        <button
          onClick={() => (chatOpen ? setChatOpen(false) : openChat())}
          className={`group flex items-center justify-start h-12 w-12 hover:w-36 rounded-none shadow-lg transition-all duration-300 overflow-hidden px-3.5 border cursor-pointer ${
            chatOpen
              ? "bg-[#fa6739] text-white border-[#e05629] w-36"
              : "bg-zinc-950 text-white border-zinc-900 hover:bg-zinc-900"
          }`}
          aria-label="Toggle Chatbot"
        >
          <MessageSquare
            size={16}
            className={`shrink-0 ${chatOpen ? "animate-pulse" : "text-[#fa6739]"}`}
          />
          <span
            className={`font-mono text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all duration-300 ${
              chatOpen
                ? "max-w-32 opacity-100 ml-2"
                : "max-w-0 opacity-0 overflow-hidden group-hover:max-w-32 group-hover:opacity-100 group-hover:ml-2"
            }`}
          >
            SyncBot ✦
          </span>
        </button>
      </div>

      {/* Floating Panels */}
      <AnimatePresence>
        <SyncBotChat  isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        <MeetingBooker isOpen={meetOpen} onClose={() => setMeetOpen(false)} />
      </AnimatePresence>
    </>
  );
}
