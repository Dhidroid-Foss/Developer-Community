"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("mid");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const techOptions = [
    "ReactJS", "React Native", "Figma", "Next.js", 
    "Node.js", "PostgreSQL", "Prisma", "Claude", 
    "Ollama", "Luma API"
  ];

  const handleTechToggle = (tech: string) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter(t => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API registration
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    // Save to LocalStorage
    localStorage.setItem("devsync_member", JSON.stringify({ name, email, selectedTech, experience }));
    
    setSubmitting(false);
    setSuccess(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSelectedTech([]);
    setExperience("mid");
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 w-full max-w-[500px] border border-[#cfcac0] bg-[#eeeae2] p-8 text-[#151515] shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-stone-500 hover:text-[#151515] transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {!success ? (
              <form onSubmit={handleSubmit}>
                <p className="font-mono text-[9px] uppercase tracking-[.1em] text-[#fa6739]">
                  ✦ DevSync Membership
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#151515]">
                  Join the developer stream.
                </h2>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                  Sign up to gain access to live code reviews, dynamic Slack/Discord channels, and collaborative open-source cohorts.
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-stone-500 mb-1">
                      Full Name
                    </label>
                    <Input 
                      type="text" 
                      required 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. DhineshKumar Thirupathi" 
                      className="bg-stone-100/50 border-[#cfcac0] text-zinc-950 focus:border-zinc-800"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-stone-500 mb-1">
                      Email Address
                    </label>
                    <Input 
                      type="email" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com" 
                      className="bg-stone-100/50 border-[#cfcac0] text-zinc-950 focus:border-zinc-800"
                    />
                  </div>

                  {/* Experience Select */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-stone-500 mb-1.5">
                      Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        ["junior", "Junior"],
                        ["mid", "Mid-level"],
                        ["senior", "Senior"]
                      ].map(([val, label]) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setExperience(val)}
                          className={`border p-2 text-center text-xs font-semibold transition-all ${
                            experience === val 
                              ? "border-zinc-950 bg-zinc-950 text-white" 
                              : "border-[#cfcac0] bg-stone-100/50 text-stone-600 hover:bg-stone-100"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tech Selection */}
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-stone-500 mb-1.5">
                      Your Stack (Select all that apply)
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 max-h-[105px] overflow-y-auto border border-[#cfcac0] p-2 bg-stone-100/30">
                      {techOptions.map((tech) => {
                        const isSelected = selectedTech.includes(tech);
                        return (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => handleTechToggle(tech)}
                            className={`flex items-center gap-1 px-2 py-1.5 text-[10px] font-mono border transition-all ${
                              isSelected 
                                ? "bg-[#fa6739]/15 border-[#fa6739] text-[#151515]" 
                                : "bg-transparent border-[#cfcac0]/60 text-stone-500 hover:border-stone-400"
                            }`}
                          >
                            <span className="w-3 h-3 border border-[#cfcac0] flex items-center justify-center text-[8px]">
                              {isSelected && "✓"}
                            </span>
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button 
                    type="submit" 
                    disabled={submitting} 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Joining stream...
                      </>
                    ) : (
                      "Confirm Membership ↗"
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-[#fa6739] flex items-center justify-center text-zinc-950 mb-4">
                  <Check size={24} strokeWidth={3} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[#151515]">
                  Welcome to DevSync, {name}!
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-stone-600 px-4">
                  You are now registered. We've queued your onboarding email. You can check the upcoming co-coding streams directly.
                </p>
                <div className="mt-6 flex flex-col gap-2 font-mono text-[9px] text-stone-400 uppercase tracking-widest">
                  <span>MEMBER PROFILE COMMITTED</span>
                  <span>ID: #{(15482 + Math.floor(Math.random() * 500)).toLocaleString()}</span>
                </div>
                <Button onClick={handleReset} className="mt-8 w-full">
                  Great, take me back
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
