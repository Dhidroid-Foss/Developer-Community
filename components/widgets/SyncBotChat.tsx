"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send } from "lucide-react";
import { FAQ_ANSWERS } from "@/features/home/data/faq.data";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

interface SyncBotChatProps {
  /** Whether the chat panel is open */
  isOpen: boolean;
  /** Callback to close the panel */
  onClose: () => void;
}

/**
 * SyncBotChat — floating FAQ chatbot panel.
 *
 * Keyword-matches user queries against FAQ_ANSWERS from
 * features/home/data/faq.data.ts.
 */
export function SyncBotChat({ isOpen, onClose }: SyncBotChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hey developer! I'm SyncBot. Ask me anything about the Niral Developer community, our cohorts, or core stack.",
      timestamp: "Just now",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { sender: "user", text: query, timestamp: now };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");

    // Keyword matching
    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyText = FAQ_ANSWERS.default;

      if (lower.includes("developer") || lower.includes("member") || lower.includes("contributor")) {
        replyText = FAQ_ANSWERS.developers;
      } else if (lower.includes("cohort") || lower.includes("program") || lower.includes("schedule") || lower.includes("session")) {
        replyText = FAQ_ANSWERS.cohorts;
      } else if (lower.includes("join") || lower.includes("apply")) {
        replyText = FAQ_ANSWERS.join;
      } else if (lower.includes("stack") || lower.includes("tech") || lower.includes("react") || lower.includes("next") || lower.includes("postgres")) {
        replyText = FAQ_ANSWERS.stack;
      }

      const botTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: replyText, timestamp: botTimestamp },
      ]);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-32px))] h-[500px] border border-[#cfcac0] bg-[#eeeae2] shadow-2xl flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex justify-between items-center bg-zinc-950 text-white p-4 border-b border-[#cfcac0]">
        <div className="flex items-center gap-2">
          <span className="text-[#fa6739] animate-pulse">✦</span>
          <span className="font-mono text-xs uppercase tracking-widest font-bold">SyncBot Companion</span>
        </div>
        <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-stone-50/50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col max-w-[80%] ${
              msg.sender === "user" ? "self-end items-end" : "self-start items-start"
            }`}
          >
            <div
              className={`p-3 text-xs leading-relaxed whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-[#fa6739] text-white rounded-none"
                  : "bg-white text-zinc-900 border border-[#cfcac0]"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[8px] text-stone-400 mt-1 font-mono">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Quick replies */}
      <div className="px-4 py-2 border-t border-[#cfcac0]/60 bg-[#eeeae2] flex flex-wrap gap-1">
        {[
          ["Who are the core developers?", "Core Developers"],
          ["What cohorts are active?", "Cohorts"],
          ["How do I join Niral Developer?", "How to join"],
        ].map(([query, label]) => (
          <button
            key={label}
            onClick={() => handleSendMessage(query)}
            className="text-[9px] font-mono border border-[#cfcac0] bg-white px-2 py-1 text-stone-600 hover:border-zinc-800 hover:text-zinc-950"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#cfcac0] bg-white flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask about developers, cohorts, stack..."
          className="flex-1 text-xs border border-[#cfcac0] px-3 py-2 bg-stone-50 text-zinc-950 focus:outline-none focus:border-zinc-800 font-mono"
        />
        <button
          onClick={() => handleSendMessage()}
          className="bg-zinc-950 text-white p-2 hover:bg-zinc-900 transition-colors"
          aria-label="Send Message"
        >
          <Send size={14} />
        </button>
      </div>
    </motion.div>
  );
}
