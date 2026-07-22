"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Calendar, X, Send, User, ChevronRight, Check } from "lucide-react";

// Types
interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const FAQ_ANSWERS = {
  developers: "TamilDev is powered by 5 core contributors:\n1. DhineshKumar (Mobile Specialist)\n2. Vignesh (Fullstack Developer)\n3. Kishore (MERN Stack Developer)\n4. Saran (AI Integrations)\n5. Vijay LS (UI/UX Design)",
  cohorts: "Active Cohorts:\n- Architecture Clinic: Relational database & Next.js schema critiques.\n- Skill Sprints: Hands-on AI engineering & mobile design syncing.\n- Dev Partnerships: Connecting startups with elite contract devs.",
  join: "Click any orange 'Join TamilDev' button on the page. Enter your email, check off your tech stack, and you'll get instant access!",
  stack: "Our core stack includes: ReactJS, React Native, Figma, Next.js, Node.js, PostgreSQL, Prisma ORM, Claude API, Ollama, and Luma API.",
  default: "I'm SyncBot! You can ask me about our core developers, active cohorts, tech stack, or how to join the TamilDev community."
};

export default function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [meetOpen, setMeetOpen] = useState(false);

  // Chatbot State
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hey developer! I'm SyncBot. Ask me anything about the TamilDev community, our cohorts, or core stack.",
      timestamp: "Just now"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Meeting State
  const [sessionType, setSessionType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [meetName, setMeetName] = useState("");
  const [meetEmail, setMeetEmail] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const dates = ["Jul 15 (Mon)", "Jul 16 (Tue)", "Jul 17 (Wed)", "Jul 18 (Thu)", "Jul 19 (Fri)"];
  const times = ["09:00 AM", "11:00 AM", "02:00 PM", "04:30 PM"];

  useEffect(() => {
    if (chatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  // Chatbot Logic
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    // Add user message
    const userMsg: Message = {
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");

    // Simple keyword matching bot reply
    setTimeout(() => {
      let replyText = FAQ_ANSWERS.default;
      const lower = query.toLowerCase();

      if (lower.includes("developer") || lower.includes("member") || lower.includes("contributor")) {
        replyText = FAQ_ANSWERS.developers;
      } else if (lower.includes("cohort") || lower.includes("program") || lower.includes("schedule") || lower.includes("session")) {
        replyText = FAQ_ANSWERS.cohorts;
      } else if (lower.includes("join") || lower.includes("member") || lower.includes("apply")) {
        replyText = FAQ_ANSWERS.join;
      } else if (lower.includes("stack") || lower.includes("tech") || lower.includes("react") || lower.includes("next") || lower.includes("postgres")) {
        replyText = FAQ_ANSWERS.stack;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  // Meeting Logic
  const handleBookMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionType || !selectedDate || !selectedTime || !meetName || !meetEmail) return;

    const id = `MEET-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id,
      sessionType,
      date: selectedDate,
      time: selectedTime,
      name: meetName,
      email: meetEmail
    };

    // Save to local storage
    const existing = JSON.parse(localStorage.getItem("devsync_bookings") || "[]");
    localStorage.setItem("devsync_bookings", JSON.stringify([...existing, newBooking]));

    setBookingId(id);
    setBookingConfirmed(true);
  };

  const resetMeetingForm = () => {
    setSessionType("");
    setSelectedDate("");
    setSelectedTime("");
    setMeetName("");
    setMeetEmail("");
    setBookingConfirmed(false);
    setMeetOpen(false);
  };

  return (
    <>
      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end pointer-events-auto">
        
        {/* Meeting Booker FAB */}
        <button
          onClick={() => {
            setMeetOpen(!meetOpen);
            setChatOpen(false);
          }}
          className={`group flex items-center justify-start h-12 w-12 hover:w-40 rounded-none shadow-lg transition-all duration-300 overflow-hidden px-3.5 border cursor-pointer ${
            meetOpen
              ? "bg-zinc-950 text-white border-zinc-800 w-40"
              : "bg-[#eeeae2] text-[#151515] border-[#cfcac0] hover:bg-stone-200"
          }`}
          aria-label="Toggle Meeting Booker"
        >
          <Calendar size={16} className={`shrink-0 ${meetOpen ? "animate-pulse text-[#fa6739]" : ""}`} />
          <span className={`font-mono text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all duration-300 ${
            meetOpen 
              ? "max-w-32 opacity-100 ml-2" 
              : "max-w-0 opacity-0 overflow-hidden group-hover:max-w-32 group-hover:opacity-100 group-hover:ml-2"
          }`}>
            Book Session
          </span>
        </button>

        {/* Chatbot FAB */}
        <button
          onClick={() => {
            setChatOpen(!chatOpen);
            setMeetOpen(false);
          }}
          className={`group flex items-center justify-start h-12 w-12 hover:w-36 rounded-none shadow-lg transition-all duration-300 overflow-hidden px-3.5 border cursor-pointer ${
            chatOpen
              ? "bg-[#fa6739] text-white border-[#e05629] w-36"
              : "bg-zinc-950 text-white border-zinc-900 hover:bg-zinc-900"
          }`}
          aria-label="Toggle Chatbot"
        >
          <MessageSquare size={16} className={`shrink-0 ${chatOpen ? "animate-pulse" : "text-[#fa6739]"}`} />
          <span className={`font-mono text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all duration-300 ${
            chatOpen
              ? "max-w-32 opacity-100 ml-2"
              : "max-w-0 opacity-0 overflow-hidden group-hover:max-w-32 group-hover:opacity-100 group-hover:ml-2"
          }`}>
            SyncBot ✦
          </span>
        </button>

      </div>

      {/* Floating Panels */}
      <AnimatePresence>
        
        {/* 1. Chatbot Floating Panel */}
        {chatOpen && (
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
              <button onClick={() => setChatOpen(false)} className="text-stone-400 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-stone-50/50 hero-grain">
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
              <button
                onClick={() => handleSendMessage("Who are the core developers?")}
                className="text-[9px] font-mono border border-[#cfcac0] bg-white px-2 py-1 text-stone-600 hover:border-zinc-800 hover:text-zinc-950"
              >
                Core Developers
              </button>
              <button
                onClick={() => handleSendMessage("What cohorts are active?")}
                className="text-[9px] font-mono border border-[#cfcac0] bg-white px-2 py-1 text-stone-600 hover:border-zinc-800 hover:text-zinc-950"
              >
                Cohorts
              </button>
              <button
                onClick={() => handleSendMessage("How do I join TamilDev?")}
                className="text-[9px] font-mono border border-[#cfcac0] bg-white px-2 py-1 text-stone-600 hover:border-zinc-800 hover:text-zinc-950"
              >
                How to join
              </button>
            </div>

            {/* Input Footer */}
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
        )}

        {/* 2. Meeting Booker Floating Panel */}
        {meetOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[min(410px,calc(100vw-32px))] max-h-[580px] overflow-y-auto border border-[#cfcac0] bg-[#eeeae2] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-zinc-950 text-white p-4 border-b border-[#cfcac0]">
              <div className="flex items-center gap-2">
                <span className="text-[#fa6739]">✦</span>
                <span className="font-mono text-xs uppercase tracking-widest font-bold">Book Architecture Session</span>
              </div>
              <button onClick={() => setMeetOpen(false)} className="text-stone-400 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 bg-stone-50/50 hero-grain">
              {bookingConfirmed ? (
                // Success Confirmation State
                <div className="text-center py-6 flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-[#fa6739]/10 text-[#fa6739] flex items-center justify-center mb-4">
                    <Check size={24} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-zinc-950">Session Booked!</h3>
                  
                  {/* Digital Ticket Mockup */}
                  <div className="my-6 border border-[#cfcac0] bg-white p-5 w-full text-left font-mono text-xs text-stone-700 relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#fa6739]" />
                    <div className="flex justify-between font-bold border-b pb-2 mb-3 text-zinc-950">
                      <span>TAMILDEV TICKET</span>
                      <span className="text-[#fa6739]">{bookingId}</span>
                    </div>
                    <p className="mb-1"><span className="text-stone-400">TYPE:</span> {sessionType}</p>
                    <p className="mb-1"><span className="text-stone-400">DATE:</span> {selectedDate}</p>
                    <p className="mb-1"><span className="text-stone-400">TIME:</span> {selectedTime}</p>
                    <p className="mb-3"><span className="text-stone-400">HOST:</span> TamilDev DevOps team</p>
                    <p className="text-[10px] text-stone-400 italic">Confirmation link has been dispatched to {meetEmail}.</p>
                  </div>
                  
                  <button
                    onClick={resetMeetingForm}
                    className="bg-zinc-950 hover:bg-zinc-900 text-white font-mono text-[10px] uppercase tracking-wider font-bold py-2.5 px-6 transition-all"
                  >
                    Done
                  </button>
                </div>
              ) : (
                // Booking Form State
                <form onSubmit={handleBookMeeting} className="flex flex-col gap-4">
                  
                  {/* Select Session */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-500 mb-1.5">
                      1. Select Session Type
                    </label>
                    <select
                      required
                      value={sessionType}
                      onChange={(e) => setSessionType(e.target.value)}
                      className="w-full text-xs border border-[#cfcac0] p-2.5 bg-white text-zinc-950 focus:outline-none"
                    >
                      <option value="">-- Choose Session --</option>
                      <option value="1-on-1 Code Review">1-on-1 Code Review (Vignesh/Kishore)</option>
                      <option value="AI Integration Critique">AI Integration Critique (Saran)</option>
                      <option value="Mobile/Android sync session">Mobile/Android Sync Session (dhidroid)</option>
                      <option value="Figma UI/UX pairing">Figma UI/UX Pairing (Vijay LS)</option>
                    </select>
                  </div>

                  {/* Date Grid */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-500 mb-1.5">
                      2. Choose Date
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {dates.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          className={`text-left font-mono text-[10px] p-2 border transition-all ${
                            selectedDate === d
                              ? "border-[#fa6739] bg-[#fa6739]/5 text-[#fa6739] font-bold"
                              : "border-[#cfcac0] bg-white text-stone-600 hover:border-zinc-800"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  {selectedDate && (
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-500 mb-1.5">
                        3. Choose Time Slot
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {times.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTime(t)}
                            className={`text-left font-mono text-[10px] p-2 border transition-all ${
                              selectedTime === t
                                ? "border-[#fa6739] bg-[#fa6739]/5 text-[#fa6739] font-bold"
                                : "border-[#cfcac0] bg-white text-stone-600 hover:border-zinc-800"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* User credentials */}
                  {selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-3 pt-3 border-t border-[#cfcac0]/60"
                    >
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-500 mb-1">
                          Your Name
                        </label>
                        <input
                          required
                          type="text"
                          value={meetName}
                          onChange={(e) => setMeetName(e.target.value)}
                          placeholder="e.g. Satoshi Nakamoto"
                          className="w-full text-xs border border-[#cfcac0] p-2.5 bg-white text-zinc-950 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-500 mb-1">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          value={meetEmail}
                          onChange={(e) => setMeetEmail(e.target.value)}
                          placeholder="e.g. satoshi@bitcoin.org"
                          className="w-full text-xs border border-[#cfcac0] p-2.5 bg-white text-zinc-950 focus:outline-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Trigger */}
                  <button
                    type="submit"
                    disabled={!sessionType || !selectedDate || !selectedTime || !meetName || !meetEmail}
                    className="w-full text-center bg-[#fa6739] hover:bg-[#e05629] text-white font-mono text-[11px] uppercase tracking-wider font-bold py-3 transition-colors disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed mt-2"
                  >
                    Confirm Booking
                  </button>

                </form>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}
