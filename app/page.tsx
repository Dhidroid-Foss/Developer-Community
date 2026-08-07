"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";
import PixelBlast from "@/components/PixelBlast";
import PixelCard from "@/components/PixelCard";
import Shuffle from "@/components/Shuffle";
import { developers, homeTechnologies, programs, stories, liveEvents, stats, featuredResources, brands, quotes } from "@/lib/data";
import { getAvatarUrl } from "@/lib/utils";

// ── Devicon helper ──────────────────────────────────────────────────────────────
// Renders an icon from the devicon icon font (devicon npm pkg, CSS already
// imported in globals.css). `iconClass` is the full devicon class string, e.g.
// "devicon-react-original colored".
function DeviconIcon({ iconClass, className }: { iconClass: string; className?: string }) {
  return (
    <i
      className={`${iconClass}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    />
  );
}

// Factory that returns a React FC wrapping DeviconIcon with a fixed iconClass.
// This keeps the same component-as-value interface used by blueprintTechs /
// page2Techs so FlipCard / TechGrid need zero changes.
function makeIcon(iconClass: string): React.FC<{ className?: string }> {
  return function DevIcon({ className }) {
    return <DeviconIcon iconClass={iconClass} className={className} />;
  };
}

// ── Page 1 tech grid ────────────────────────────────────────────────────────────
const blueprintTechs = [
  { id: "01", name: "Vercel",       icon: makeIcon("devicon-vercel-original colored"),       role: "HOSTING" },
  { id: "02", name: "React",        icon: makeIcon("devicon-react-original colored"),        role: "UI LIBRARY" },
  { id: "03", name: "Next.js",      icon: makeIcon("devicon-nextjs-plain colored"),          role: "FRAMEWORK" },
  { id: "04", name: "Supabase",     icon: makeIcon("devicon-supabase-plain colored"),        role: "BACKEND" },
  { id: "05", name: "PostgreSQL",   icon: makeIcon("devicon-postgresql-plain colored"),      role: "DATABASE" },
  { id: "06", name: "Node.js",      icon: makeIcon("devicon-nodejs-plain colored"),          role: "RUNTIME" },
  { id: "07", name: "Docker",       icon: makeIcon("devicon-docker-plain colored"),          role: "CONTAINERS" },
  { id: "08", name: "AWS",          icon: makeIcon("devicon-amazonwebservices-plain colored"), role: "CLOUD" },
  { id: "09", name: "GitHub",       icon: makeIcon("devicon-github-original colored"),       role: "DEVOPS" },
  { id: "10", name: "TypeScript",   icon: makeIcon("devicon-typescript-plain colored"),      role: "LANGUAGE" },
  { id: "11", name: "Tailwind CSS", icon: makeIcon("devicon-tailwindcss-plain colored"),     role: "STYLING" },
  { id: "12", name: "Redis",        icon: makeIcon("devicon-redis-plain colored"),           role: "CACHING" },
];

// ── Page 2 tech grid ────────────────────────────────────────────────────────────
const page2Techs = [
  { name: "Figma",       icon: makeIcon("devicon-figma-plain colored") },
  { name: "Prisma",      icon: makeIcon("devicon-prisma-original colored") },
  { name: "MongoDB",     icon: makeIcon("devicon-mongodb-plain colored") },
  { name: "GraphQL",     icon: makeIcon("devicon-graphql-plain colored") },
  { name: "Stripe",      icon: makeIcon("devicon-stripe-plain colored") },
  { name: "Cloudflare",  icon: makeIcon("devicon-cloudflare-plain colored") },
  { name: "Python",      icon: makeIcon("devicon-python-plain colored") },
  { name: "Vite",        icon: makeIcon("devicon-vitejs-plain colored") },
  { name: "Linux",       icon: makeIcon("devicon-linux-plain colored") },
  { name: "Kubernetes",  icon: makeIcon("devicon-kubernetes-plain colored") },
  { name: "Zod",         icon: makeIcon("devicon-typescript-plain colored") },
  { name: "Node.js",     icon: makeIcon("devicon-nodejs-plain colored") },
];

const techPages = [blueprintTechs, page2Techs];


const homeIconMap: Record<string, React.FC<{ className?: string }>> = {
  ReactJS:        makeIcon("devicon-react-original colored"),
  "React Native": makeIcon("devicon-react-original colored"),
  Figma:          makeIcon("devicon-figma-plain colored"),
  "Next.js":      makeIcon("devicon-nextjs-plain colored"),
  "Node.js":      makeIcon("devicon-nodejs-plain colored"),
  PostgreSQL:     makeIcon("devicon-postgresql-plain colored"),
  Prisma:         makeIcon("devicon-prisma-original colored"),
  Claude:         makeIcon("devicon-anthropic-plain colored"),
  Ollama:         makeIcon("devicon-ollama-plain colored"),
  "Luma API":     makeIcon("devicon-python-plain colored"),
};

function AnimatedMetricNumber({ target, suffix = "" }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let start = 0;
          const duration = 1600;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <strong ref={ref} className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 leading-none">
      {count}{suffix}
    </strong>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`font-mono text-[10px] uppercase tracking-[.085em] ${light ? "text-stone-400" : "text-stone-500"}`}>{children}</p>;
}

// All available techs for random flipping
const allTechs = [...blueprintTechs, ...page2Techs];

// FlipCard — renders the tech with 3D flip + particle blast animation on flip
function FlipCard({ tech, isActive = false }: { tech: typeof allTechs[0]; isActive?: boolean }) {
  const Icon = tech.icon;
  return (
    <PixelCard
      active={isActive}
      colors="#fa6739,#fda382,#c5bfb3"
      gap={5}
      speed={35}
      className="border-0 rounded-none border-r border-b border-stone-300/90 min-h-[125px] overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={tech.name}
          initial={{ rotateX: 90, opacity: 0, y: 6 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: -90, opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1000, transformOrigin: "center center" }}
          className="flex items-center justify-center gap-3 w-full h-full p-5 sm:p-6"
        >
          <Icon className="text-2xl shrink-0" />
          <span className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
            {tech.name}
          </span>
        </motion.div>
      </AnimatePresence>
    </PixelCard>
  );
}

// TechGrid — tracks active flipping card slot and holds pixel particle animation for a few seconds
function TechGrid() {
  const [positions, setPositions] = useState<typeof allTechs>(
    () => blueprintTechs.slice(0, 10)
  );
  const [activeFlippingIdx, setActiveFlippingIdx] = useState<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let clearTimer: ReturnType<typeof setTimeout>;

    const scheduleSwap = () => {
      const delay = 3500 + Math.random() * 2000; // Holds each flipped card for 3.5s – 5.5s
      timer = setTimeout(() => {
        setPositions((prev) => {
          const currentNames = new Set(prev.map((t) => t.name));
          const available = allTechs.filter((t) => !currentNames.has(t.name));
          if (available.length === 0) return prev;

          // Pick a random card position to swap
          const posIdx = Math.floor(Math.random() * prev.length);
          const next = available[Math.floor(Math.random() * available.length)];

          // Trigger active pixel particle animation and hold for 2.8 seconds
          setActiveFlippingIdx(posIdx);
          clearTimer = setTimeout(() => {
            setActiveFlippingIdx(null);
          }, 2800);

          const updated = [...prev];
          updated[posIdx] = next;
          return updated;
        });
        scheduleSwap();
      }, delay);
    };

    scheduleSwap();
    return () => {
      clearTimeout(timer);
      clearTimeout(clearTimer);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-stone-300/90 bg-transparent">
      {positions.map((tech, idx) => (
        <FlipCard key={idx} tech={tech} isActive={idx === activeFlippingIdx} />
      ))}
    </div>
  );
}


export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [isQuotePaused, setIsQuotePaused] = useState(false);

  useEffect(() => {
    if (isQuotePaused) return;
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isQuotePaused]);

  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start end", "end start"]
  });

  // Smooth scroll transformation from left to right (-20% to 5%)
  const carouselX = useTransform(scrollYProgress, [0, 1], ["-20%", "5%"]);

  // Duplicate tech stack to make horizontal belt long enough
  const doubleTechnologies = [...homeTechnologies, ...homeTechnologies, ...homeTechnologies];

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (endpoint) {
      await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(event.currentTarget) });
    }
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return <main className="overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
    <Header onJoinClick={() => setModalOpen(true)} />

    {/* Hero Section with PixelBlast interactive WebGL Background */}
    <section id="top" className="relative bg-zinc-950 pb-20 pt-32 text-white md:pb-24 md:pt-40 overflow-hidden">

      {/* Background Interactive Canvas */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-auto">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#fa6739" // DevSync Brand Orange Token
          patternScale={2.2}
          patternDensity={1.15}
          pixelSizeJitter={0.05}
          enableRipples={true}
          rippleSpeed={0.45}
          rippleThickness={0.13}
          rippleIntensityScale={2.0}
          liquid={false}
          speed={0.4}
          edgeFade={0.3}
          transparent={true}
        />
      </div>

      {/* Grid Content Overlay - pointer-events-none lets mouse slide through to the Canvas */}
      <div className="relative z-10 mx-auto grid w-[min(1170px,calc(100%-38px))] items-center gap-12 md:grid-cols-[1.05fr_.95fr] md:gap-20 pointer-events-none">

        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .65 }}
          className="pointer-events-none"
        >
          <Eyebrow light>The Realtime Developer Community</Eyebrow>
          <h1 className="mt-4 max-w-[680px] text-[clamp(45px,5.2vw,75px)] font-bold leading-[.98] tracking-[-.078em]">
            <Shuffle
              text="Build in realtime."
              shuffleDirection="up"
              duration={0.45}
              animationMode="evenodd"
              shuffleTimes={2}
              ease="power3.out"
              stagger={0.02}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              tag="span"
              className="block"
              colorFrom="#fa6739"
              colorTo="#ffffff"
            />
            <span className="block mt-1">
              Ship with the{" "}
              <Shuffle
                text="best."
                shuffleDirection="up"
                duration={0.45}
                animationMode="evenodd"
                shuffleTimes={2}
                ease="power3.out"
                stagger={0.04}
                threshold={0.1}
                triggerOnce={true}
                triggerOnHover={true}
                tag="span"
                className="inline-block text-[#fa6739] italic font-serif"
                colorFrom="#ffffff"
                colorTo="#fa6739"
              />
            </span>
          </h1>
          <p className="mt-7 max-w-[470px] text-sm leading-relaxed text-stone-300">
            TamilDev is where frontend, backend, mobile, and AI developers build side-by-side, collaborate in realtime, and ship production-grade products.
          </p>

          {/* Interactive buttons */}
          <div className="mt-7 flex flex-wrap gap-2 pointer-events-auto">
            <Button onClick={() => setModalOpen(true)}>Join TamilDev <ArrowUpRight size={16} /></Button>
            <a href="#showcase"><Button variant="outline">Meet the developers</Button></a>
          </div>

          <div className="mt-9 flex items-center gap-3 text-[11px] text-stone-400 pointer-events-auto">
            <div className="flex">
              <img className="h-7 w-7 rounded-full border-2 border-zinc-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" />
              <img className="-ml-2 h-7 w-7 rounded-full border-2 border-zinc-950 object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="" />
              <img className="-ml-2 h-7 w-7 rounded-full border-2 border-zinc-950 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="" />
            </div>
            Join 15,000+ modern developers shipping code daily.
          </div>
        </motion.div>

        {/* Right Column (Streams List) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .65, delay: .12 }}
          className="pointer-events-auto"
        >
          <div className="mb-3 flex justify-between font-mono text-[10px] uppercase tracking-[.07em] text-stone-300">
            Realtime Community Streams <span className="text-[var(--orange)] animate-pulse">●</span>
          </div>
          {liveEvents.map((event) => (
            <article className="mb-1 grid min-h-[88px] grid-cols-[27px_1fr_40px_30px] items-center gap-3 bg-stone-100 p-3 text-zinc-950" key={event[0]}>
              <span className="font-mono text-[10px] text-stone-500">{event[0]}</span>
              <div>
                <p className="font-mono text-[9px] uppercase text-stone-500">{event[1]}</p>
                <h3 className="mt-1 text-xs font-bold tracking-[-.04em]">{event[2]}</h3>
              </div>
              <span className="font-mono text-[9px] text-stone-500">{event[3]}<br /><b className="text-[11px] text-zinc-950">{event[4]}</b></span>
              <button onClick={() => setModalOpen(true)} className="grid h-8 w-8 place-items-center rounded-full border border-stone-400 text-base hover:bg-zinc-950 hover:text-white transition-colors" aria-label={`Join ${event[2]}`}>↗</button>
            </article>
          ))}
        </motion.div>
      </div>
    </section>

    <section id="showcase" className="bg-zinc-950 py-16 text-white md:py-24">
      <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <Eyebrow light>Meet the developers</Eyebrow>
            <h2 className="mt-3 text-[clamp(34px,4vw,55px)] font-bold leading-[.98] tracking-[-.073em]">Core Contributors.</h2>
          </div>
          <div className="hidden md:block">
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 border-b pb-1 text-[11px] font-bold border-stone-100 text-stone-100">
              Apply as Contributor <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          {developers.map((member) => (
            <a href={`/developers/${member.id}`} key={member.id} className="group block">
              <PixelCard variant="orange" className="bg-zinc-950 border-zinc-800 rounded-none h-full w-full p-0">
                <article className="pointer-events-auto p-4">
                  <div className="relative aspect-[.78] overflow-hidden bg-zinc-800 border border-transparent group-hover:border-stone-100/30 transition-all duration-300">
                    <img className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0" src={getAvatarUrl(member.avatar)} alt={`Portrait of ${member.name}`} />
                    <span className="absolute left-3 top-3 rounded-full bg-zinc-950/70 px-2 py-1 font-mono text-[8px] text-white opacity-0 transition group-hover:opacity-100 md:block">{member.location}</span>
                  </div>
                  <h3 className="mt-3 text-[13px] font-bold tracking-[-.045em] text-white group-hover:text-[var(--orange)] transition-colors">{member.name}</h3>
                  <p className="mt-0.5 text-[10px] text-stone-400">{member.role}</p>
                  <span className="inline-block mt-2 font-mono text-[8px] uppercase tracking-wider text-stone-500 group-hover:text-stone-300 transition-colors">
                    View Profile ↗
                  </span>
                </article>
              </PixelCard>
            </a>
          ))}
        </div>
      </div>
    </section>

    <section id="community" className="py-20 md:py-32 bg-[var(--paper)]">
      <div className="mx-auto w-[min(1170px,calc(100%-38px))] flex flex-col gap-10">
        {/* TIER 1: Title Top */}
        <div>
          <Eyebrow>Why TamilDev</Eyebrow>
          <h2 className="mt-3 text-[clamp(34px,4.2vw,56px)] font-extrabold leading-[1.06] tracking-[-.065em] text-[var(--ink)] max-w-[850px]">
            The future belongs to developers who build with <span className="text-[var(--orange)]">AI</span>—<em>not against it.</em>
          </h2>
        </div>

        {/* TIER 2: GitHub Activity Heatmap Grid Container (Full Width & Taller Tiles) */}
        <div className="w-full overflow-hidden">
          {/* Month Labels Bar */}
          <div className="mb-3 flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-400 px-1 overflow-x-auto no-scrollbar">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          {/* 7-Row Contribution Grid (Zero Scroll, Fits 100% Container Width) */}
          <div className="w-full overflow-hidden">
            <div className="grid grid-flow-col grid-rows-7 gap-[2px] sm:gap-[3.5px] md:gap-[4.5px] w-full justify-between">
              {Array.from({ length: 364 }).map((_, idx) => {
                // Generate realistic contribution activity pattern
                const seed = (idx * 17 + (idx % 7) * 31) % 100;
                let levelClass = "bg-stone-200/60";
                if (seed > 82) levelClass = "bg-[#fa6739]";
                else if (seed > 65) levelClass = "bg-[#fa6739]/85";
                else if (seed > 45) levelClass = "bg-[#fa6739]/55";
                else if (seed > 25) levelClass = "bg-[#fa6739]/30";

                return (
                  <div
                    key={idx}
                    className={`h-2.5 sm:h-3.5 md:h-4 w-full aspect-square rounded-[1.5px] sm:rounded-[2.5px] transition-transform hover:scale-125 ${levelClass}`}
                    title={`Contribution activity day ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* TIER 3: Architectural Line-Divided Grid (With complete outer edge lines) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 border border-stone-300/90">
          {/* Cell 1: Description Card */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 p-6 sm:p-7 border-b lg:border-b-0 lg:border-r border-stone-300/90 flex flex-col justify-center">
            <p className="text-sm sm:text-base leading-relaxed text-stone-700 font-normal">
              Master modern development by combining engineering fundamentals with AI workflows. Build faster, write better code, and launch products that matter.
            </p>
          </div>

          {/* Cells 2-5: 4 Metric Cards with dynamic count-up animations */}
          {[
            { value: 18, suffix: "K+", label: "Contributions" },
            { value: 250, suffix: "+", label: "Open Source Projects" },
            { value: 500, suffix: "+", label: "AI Agents Built" },
            { value: 10, suffix: "K+", label: "Community Members" },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`col-span-1 p-6 sm:p-7 flex flex-col justify-between ${
                index < 3 ? "border-r border-stone-300/90" : ""
              } ${index % 2 === 0 ? "border-b lg:border-b-0 border-stone-300/90" : ""}`}
            >
              <AnimatedMetricNumber target={item.value} suffix={item.suffix} />
              <span className="mt-5 text-[10px] sm:text-[11px] font-semibold leading-snug text-stone-500 uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Scroll-Driven Horizontal Motion Carousel Tech Stack */}
    <section id="stack" ref={stackRef} className="overflow-hidden border-t border-[var(--line)] bg-[var(--paper)] py-20 md:py-32">
      <div className="mx-auto w-[min(1170px,calc(100%-38px))] mb-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>The Technologies We Handle</Eyebrow>
            <h2 className="mt-3 text-[clamp(34px,4vw,55px)] font-bold leading-[.98] tracking-[-.073em] text-[var(--ink)]">
              Core Tech Stack.
            </h2>
          </div>
          <p className="max-w-[420px] text-xs leading-relaxed text-stone-600">
            We master and deploy a curated stack of modern web, mobile, database, and artificial intelligence tools. Scroll down to see the carousel motion.
          </p>
        </div>
      </div>
      <div className="py-8">
        <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
          <TechGrid />
        </div>
      </div>
      {/* <div className="relative flex w-full overflow-hidden py-4 animate-carousel-container"> */}
      {/* Animated Horizontal Belt */}
      {/* <motion.div style={{ x: carouselX }} className="flex gap-6 whitespace-nowrap min-w-max px-4">
          {doubleTechnologies.map((tech, idx) => {
            const IconComponent = homeIconMap[tech.name];
            return (
              <PixelCard
                key={`${tech.name}-${idx}`}
                variant="orange"
                className="w-[320px] shrink-0 bg-stone-100/50 hover:bg-stone-50 transition-all duration-300 p-6 rounded-none border-[var(--line)] hover:border-zinc-800 cursor-pointer pointer-events-auto"
              >
                <div className="flex flex-col justify-between h-full pointer-events-none select-none">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded">
                        {tech.type}
                      </span>
                      <IconComponent className="text-xl transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-zinc-950 whitespace-normal">
                      {tech.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600 whitespace-normal">
                      {tech.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[var(--line)]/50 flex items-center justify-between text-[10px] font-mono text-stone-400 group-hover:text-zinc-950 transition-colors duration-200">
                    <span>ACTIVE COHORT</span>
                    <span>↗</span>
                  </div>
                </div>
              </PixelCard>
            );
          })}
        </motion.div> */}
      {/* </div> */}
    </section>



    <section id="programs" className="">
      <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <Eyebrow>A place to stretch your practice</Eyebrow>
            <h2 className="mt-3 text-[clamp(34px,4vw,55px)] font-bold leading-[.98] tracking-[-.073em]">Accelerate your<br /><em>engineering.</em></h2>
          </div>
          <p className="hidden max-w-72 text-xs text-stone-600 md:block">
            The most useful technical training is the kind you can deploy to production on Monday morning.
          </p>
        </div>
        <Tabs defaultValue="clinic">
          <TabsList aria-label="TamilDev cohorts">
            <TabsTrigger value="clinic">Architecture Clinic</TabsTrigger>
            <TabsTrigger value="workshops">Skill Cohorts</TabsTrigger>
            <TabsTrigger value="connect">Dev Partnerships</TabsTrigger>
            <TabsTrigger value="circle">Engineering Circle</TabsTrigger>
          </TabsList>
          {Object.entries(programs).map(([key, program]) => (
            <TabsContent value={key} key={key}>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-9 pt-10 md:grid-cols-[.85fr_1.15fr] md:gap-[11%]">
                <div>
                  <Eyebrow>{program.label}</Eyebrow>
                  <h3 className="mt-3 text-[31px] font-bold leading-[1.07] tracking-[-.065em]">
                    {(() => { const w = program.title.split(' '); return <>{w.slice(0, -1).join(' ')} <em>{w[w.length - 1]}</em></>; })()}
                  </h3>
                  <p className="mt-4 max-w-85 text-xs leading-relaxed text-stone-600">{program.text}</p>
                </div>
                <div>
                  {program.sessions.map((session) => (
                    <article className="grid grid-cols-[85px_1fr_32px] items-center gap-3 border-b border-[var(--line)] pb-4 pt-0 last:pt-4 md:grid-cols-[112px_1fr_35px] md:gap-4" key={session.title}>
                      <img className="h-[70px] w-[85px] object-cover grayscale md:h-[82px] md:w-[112px]" src={session.image} alt="" />
                      <div>
                        <Eyebrow>{session.meta}</Eyebrow>
                        <h4 className="mt-1 text-sm font-bold leading-tight tracking-[-.05em]">{session.title}</h4>
                        <p className="mt-1 text-[10px] text-stone-500">{session.host}</p>
                      </div>
                      <button onClick={() => setModalOpen(true)} className="grid h-8 w-8 place-items-center rounded-full border border-stone-400 text-base hover:bg-zinc-950 hover:text-white transition-colors" aria-label={`View ${session.title}`}>↗</button>
                    </article>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>

    <section
      onMouseEnter={() => setIsQuotePaused(true)}
      onMouseLeave={() => setIsQuotePaused(false)}
      className="bg-[var(--orange)] py-18 md:py-24 relative overflow-hidden"
    >
      <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
        {/* Fixed min-height grid with inner vertical alignment */}
        <div className="grid min-h-[450px] md:min-h-[480px] items-center gap-12 md:grid-cols-[1.05fr_.7fr] md:gap-[13%]">
          {/* Left Column: Quote text & links with smooth motion */}
          <div className="flex flex-col justify-center h-full min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col justify-between h-full py-2"
              >
                <div>
                  <Eyebrow>Straight from the editor · {String(quoteIdx + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}</Eyebrow>
                  <blockquote className="mt-5 min-h-[140px] md:min-h-[160px] max-w-162 text-[clamp(26px,3.2vw,48px)] font-bold leading-[1.06] tracking-[-.07em] flex items-center">
                    "{quotes[quoteIdx].text}"
                  </blockquote>
                </div>

                <div className="mt-6">
                  <div className="flex flex-col text-[11px] font-bold">
                    <span>— {quotes[quoteIdx].author}</span>
                    <small className="mt-1 font-normal text-[#71301f]">{quotes[quoteIdx].role}</small>
                  </div>
                  {/* Quick links */}
                  <div className="mt-4 flex gap-3 flex-wrap">
                    {quotes[quoteIdx].github && (
                      <a href={quotes[quoteIdx].github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border-b border-zinc-950/30 text-[10px] font-mono font-bold hover:border-zinc-950 transition-colors">
                        GitHub ↗
                      </a>
                    )}
                    {quotes[quoteIdx].linkedin && (
                      <a href={quotes[quoteIdx].linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border-b border-zinc-950/30 text-[10px] font-mono font-bold hover:border-zinc-950 transition-colors">
                        LinkedIn ↗
                      </a>
                    )}
                    {quotes[quoteIdx].website && (
                      <a href={quotes[quoteIdx].website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border-b border-zinc-950/30 text-[10px] font-mono font-bold hover:border-zinc-950 transition-colors">
                        Portfolio ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Developer Photo Card with Motion */}
          <div className="flex items-center justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mx-auto w-full max-w-[300px] rotate-2 hover:rotate-0 transition-transform duration-500 bg-stone-50 p-3 shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    className="h-80 w-full object-cover object-top md:h-[365px] transition duration-500 hover:scale-[1.04]"
                    src={getAvatarUrl(quotes[quoteIdx].image)}
                    alt={quotes[quoteIdx].author}
                  />
                  {/* Developer ID badge overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950/85 to-transparent p-4">
                    <p className="font-mono text-[8px] uppercase tracking-[.1em] text-[#fa6739]">TamilDev · Core Contributor</p>
                    <p className="mt-1 text-[11px] font-bold text-white leading-tight">{quotes[quoteIdx].author}</p>
                    <p className="mt-0.5 font-mono text-[8px] text-stone-400">{quotes[quoteIdx].location}</p>
                  </div>
                </div>
                <p className="mt-3 font-serif text-base italic text-zinc-950">"Commit early. Deploy together."</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Control Bar & Indicators */}
        <div className="mt-12 flex items-center justify-between border-t border-zinc-950/20 pt-6">
          <div className="flex items-center gap-2">
            {quotes.map((q, i) => (
              <button
                key={i}
                onClick={() => setQuoteIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === quoteIdx ? "w-8 bg-zinc-950" : "w-2 bg-zinc-950/30 hover:bg-zinc-950/60"}`}
                aria-label={`Go to contributor quote ${i + 1} by ${q.author}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className={`font-mono text-[10px] uppercase tracking-wider font-semibold transition-all duration-200 ${isQuotePaused ? "text-zinc-950 font-bold bg-zinc-950/15 px-2 py-0.5 rounded" : "text-zinc-900/70"}`}>
              {isQuotePaused ? "Paused (Hovered)" : "Auto Switch"}
            </span>
            <button
              onClick={() => setQuoteIdx((prev) => (prev === 0 ? quotes.length - 1 : prev - 1))}
              className="grid h-8 w-8 place-items-center rounded-full border border-zinc-950/30 text-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors"
              aria-label="Previous contributor quote"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => setQuoteIdx((prev) => (prev + 1) % quotes.length)}
              className="grid h-8 w-8 place-items-center rounded-full border border-zinc-950/30 text-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors"
              aria-label="Next contributor quote"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section id="resources" className="bg-zinc-950 py-20 text-white md:py-32">
      <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Eyebrow light>Member accomplishments</Eyebrow>
            <h2 className="mt-3 text-[clamp(34px,4vw,55px)] font-bold leading-[.98] tracking-[-.073em]">Real code.<br />Real impact.</h2>
          </div>
          <div className="hidden md:block">
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 border-b pb-1 text-[11px] font-bold border-stone-100 text-stone-100">
              Submit your project <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-[1.1fr_.9fr]">
          {stories.map((story, index) => (
            <article className={`group relative min-h-[350px] overflow-hidden bg-zinc-800 ${index === 0 ? "md:row-span-2 md:min-h-[690px]" : ""}`} key={story.title}>
              <img className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.04]" src={story.image} alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <Eyebrow light>{story.tag}</Eyebrow>
                <h3 className="mt-3 max-w-125 text-[clamp(20px,2vw,31px)] font-bold leading-[1.08] tracking-[-.06em]">{story.title}</h3>
                {index === 0 ? (
                  <div className="mt-5 flex items-baseline gap-2">
                    <strong className="text-[35px] tracking-[-.07em] text-[var(--orange)]">10M+</strong>
                    <span className="text-[10px] text-stone-200">daily database requests optimized</span>
                  </div>
                ) : (
                  <button onClick={() => setModalOpen(true)} className="mt-5 inline-block border-b border-white/70 text-[11px] font-bold">Read build story ↗</button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-32">
      <div className="mx-auto w-[min(1170px,calc(100%-38px))]">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Eyebrow>Worth your compile time</Eyebrow>
            <h2 className="mt-3 text-[clamp(34px,4vw,55px)] font-bold leading-[.98] tracking-[-.073em]">Open-source codebases<br />and guides.</h2>
          </div>
          <div className="hidden md:block">
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 border-b pb-1 text-[11px] font-bold border-zinc-950 text-zinc-950">
              Request resources <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
        <div className="grid border-t border-[var(--line)] md:grid-cols-3">
          {featuredResources.map(([meta, title, action], i) => (
            <article className={`flex min-h-52 flex-col border-b border-[var(--line)] py-6 ${i > 0 ? "md:border-l md:pl-7" : "md:pr-7"}`} key={title}>
              <Eyebrow>{meta}</Eyebrow>
              <h3 className="mt-2 max-w-70 text-xl font-bold leading-[1.18] tracking-[-.06em]">{title}</h3>
              <button onClick={() => setModalOpen(true)} className="mt-auto pt-6 text-[11px] font-bold text-left hover:text-[#fa6739] transition-colors">{action} <span className="ml-1 text-base">↗</span></button>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="join" className="bg-[var(--orange)] py-18 md:py-24">
      <div className="mx-auto grid w-[min(1170px,calc(100%-38px))] items-end gap-9 md:grid-cols-[1.05fr_.75fr] md:gap-[12%]">
        <div>
          <Eyebrow>Join the developer stream</Eyebrow>
          <h2 className="mt-3 max-w-142 text-[clamp(37px,4vw,58px)] font-bold leading-[1.01] tracking-[-.073em]">Code and architectural stories shipped <em>monthly.</em></h2>
        </div>
        <div>
          <p className="mb-5 text-xs leading-relaxed text-[#71301f]">
            One curated email per month: open-source boilerplates, local LLM configurations, and live cohort invitations. No spam, ever.
          </p>
          <form onSubmit={subscribe} className="flex flex-col gap-2 sm:flex-row">
            <Input name="email" type="email" required placeholder="Your email address" className="bg-stone-50 border-stone-300 text-zinc-950 placeholder:text-stone-400" />
            <Button variant="dark" type="submit">Subscribe <ArrowUpRight size={16} /></Button>
          </form>
          <p className="mt-2 min-h-4 text-[10px] text-[#71301f]" aria-live="polite">
            {submitted && "You're on the list. Welcome to TamilDev."}
          </p>
        </div>
      </div>
    </section>

    <section className="bg-zinc-950 py-24 text-center text-white md:py-32">
      <div className="mx-auto w-[min(900px,calc(100%-38px))]">
        <Eyebrow light>Independent, together</Eyebrow>
        <h2 className="mt-4 text-[clamp(46px,5vw,72px)] font-bold leading-[.98] tracking-[-.08em]">Great products grow<br />in good company.</h2>
        <Button onClick={() => setModalOpen(true)} className="mt-8 inline-flex">
          Join TamilDev — it's free <ArrowUpRight size={16} />
        </Button>
        <p className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[.06em] text-stone-500">
          15k+ developers <i className="h-1 w-1 rounded-full bg-[var(--orange)]" /> 800+ repos <i className="h-1 w-1 rounded-full bg-[var(--orange)]" /> Since 2021 <i className="h-1 w-1 rounded-full bg-[var(--orange)]" /> Built for modern minds
        </p>
      </div>
    </section>

    <Footer />
    <JoinModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
  </main>;
}
