"use client";

import { useEffect, useState } from "react";
import { Terminal, Loader2 } from "lucide-react";

const quotes = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Clean code always looks like it was written by someone who cares.", author: "Michael Feathers" },
  { text: "Programs must be written for people to read, and only accidentally for machines to execute.", author: "Abelson & Sussman" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
  { text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" }
];

const snippets = [
  `const dev = { status: "shipping", community: "TamilDev" };`,
  `const user = await prisma.user.findUnique({ where: { id } });`,
  `const msg = await claude.messages.create({ prompt: "Refactor database queries" });`,
  `app.get('/api/health', (req, res) => res.send({ status: 'live' }));`,
  `const [state, dispatch] = useReducer(reducer, initialDeveloperState);`,
  `SELECT * FROM users WHERE active_contributors = true ORDER BY commits DESC;`,
  `npx -y modern-web-guidance@latest search "responsive grid layouts"`,
  `import PixelBlast from "@/components/PixelBlast"; // Rendering WebGL`
];

export default function Loading() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [snippetIdx, setSnippetIdx] = useState(0);

  useEffect(() => {
    // Rotate motivations and snippets every 4.2 seconds (slower so users can read them)
    const interval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
      setSnippetIdx((prev) => (prev + 1) % snippets.length);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#eeeae2] text-[#151515] p-6">
      {/* Background grain texture utilizing existing class */}
      <div className="absolute inset-0 hero-grain opacity-[0.04] pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-[500px] border border-[#cfcac0] bg-stone-100/60 p-8 shadow-xl flex flex-col items-center text-center">
        {/* Animated DevSync logo */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xl text-[#fa6739] animate-pulse">✦</span>
          <span className="text-[15px] font-mono uppercase tracking-widest text-[#151515] font-bold">
            <span className="text-[#fa6739]" lang="ta">தமிழ்</span>Dev Stream
          </span>
        </div>

        {/* Big Spinner */}
        <div className="relative flex items-center justify-center w-16 h-16 mb-8">
          <Loader2 className="absolute text-[#fa6739]/30 h-12 w-12 animate-pulse" />
          <Loader2 className="text-[#fa6739] h-8 w-8 animate-spin" />
        </div>

        {/* Developer Motivation Quote */}
        <div className="min-h-[110px] flex flex-col justify-center mb-6">
          <p className="font-serif italic text-base leading-relaxed text-stone-800">
            “{quotes[quoteIdx].text}”
          </p>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-stone-500">
            — {quotes[quoteIdx].author}
          </p>
        </div>

        {/* Code Snippet Box */}
        <div className="w-full border border-[#cfcac0]/60 bg-zinc-950 text-stone-300 p-4 font-mono text-xs text-left relative overflow-hidden">
          <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-2 mb-2 text-stone-600 text-[8px] uppercase tracking-widest">
            <Terminal size={10} /> console.log
          </div>
          <div className="min-h-[20px] flex items-center text-[#fa6739]">
            <span className="mr-2 text-stone-600">&gt;</span>
            <code className="text-stone-100 break-all select-none">
              {snippets[snippetIdx]}
            </code>
          </div>
          <span className="absolute right-3 top-3.5 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fa6739] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#fa6739]"></span>
          </span>
        </div>

        {/* Under text */}
        <p className="mt-8 font-mono text-[9px] uppercase tracking-widest text-stone-400 animate-pulse">
          compiling workspace assets...
        </p>
      </div>
    </div>
  );
}
