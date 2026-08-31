"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DISCORD_INVITE } from "@/lib/site";

interface JoinModalProps {
  isOpen?: boolean;
  open?: boolean;
  onClose: () => void;
}

/**
 * JoinModal — community membership form.
 *
 * Collects name, email, experience level, and tech stack.
 * On submit: saves to localStorage, then opens Discord invite in a new tab.
 */
export default function JoinModal({ isOpen, open, onClose }: JoinModalProps) {
  const activeOpen = isOpen ?? open ?? false;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("mid");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const techOptions = [
    "ReactJS", "React Native", "Figma", "Next.js",
    "Node.js", "PostgreSQL", "Prisma", "Claude",
    "Ollama", "Luma API",
  ];

  const handleTechToggle = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Persist member profile locally
    localStorage.setItem(
      "niral_member",
      JSON.stringify({
        name,
        email,
        selectedTech,
        experience,
        joinedAt: new Date().toISOString(),
      })
    );

    // Brief UX pause, then launch Discord
    await new Promise((resolve) => setTimeout(resolve, 900));
    window.open(DISCORD_INVITE, "_blank", "noopener,noreferrer");

    setSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {activeOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 w-full max-w-[500px] border border-[#cfcac0] bg-[#eeeae2] p-8 text-[#151515] shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-stone-500 hover:text-[#151515] transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleSubmit}>
              {/* Header */}
              <p className="font-mono text-[9px] uppercase tracking-[.1em] text-[#fa6739]">
                <span className="font-extrabold">Niral</span> Developer · Community Membership
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#151515]">
                Join the developer stream.
              </h2>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                Fill in your details and we&apos;ll open the Discord community right away — live code
                reviews, architecture clinics, and open-source cohorts await.
              </p>

              <div className="mt-6 flex flex-col gap-4">
                {/* Name */}
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

                {/* Email */}
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

                {/* Experience level */}
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-stone-500 mb-1.5">
                    Experience Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      ["junior", "Junior"],
                      ["mid", "Mid-level"],
                      ["senior", "Senior"],
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

                {/* Tech stack picker */}
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

              {/* CTA */}
              <div className="mt-8">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Opening Discord...
                    </>
                  ) : (
                    "Join on Discord "
                  )}
                </Button>
                <p className="mt-3 text-center font-mono text-[9px] text-stone-400">
                  Free forever · No spam · discord.gg/QSbsfzy2Y
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
