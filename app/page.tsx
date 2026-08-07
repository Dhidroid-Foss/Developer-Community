"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faFigma, faNodeJs } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faLaptopCode, faMobileScreenButton, faRobot, faServer, faVideo } from "@fortawesome/free-solid-svg-icons";
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

// Inline Brand Icons (SVG)
const ReactLogo = ({ className }: { className?: string }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const ReactNativeLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#00D8FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="#888" strokeWidth="1" />
    <circle cx="12" cy="12" r="1.5" fill="#00D8FF" />
    <ellipse rx="6" ry="2.2" transform="translate(12, 12) rotate(30)" />
    <ellipse rx="6" ry="2.2" transform="translate(12, 12) rotate(90)" />
    <ellipse rx="6" ry="2.2" transform="translate(12, 12) rotate(150)" />
  </svg>
);

const FigmaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 38 57" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 17C10.5 12.3 14.3 8.5 19 8.5C23.7 8.5 27.5 12.3 27.5 17V25.5H19C14.3 25.5 10.5 21.7 10.5 17Z" fill="#F24E1E" />
    <path d="M10.5 40.8C10.5 36.1 14.3 32.3 19 32.3H27.5V40.8C27.5 45.5 23.7 49.3 19 49.3C14.3 49.3 10.5 45.5 10.5 40.8Z" fill="#0ACF83" />
    <path d="M19 32.3C23.7 32.3 27.5 28.5 27.5 23.8V17H19V32.3Z" fill="#A259FF" />
    <path d="M10.5 23.8C10.5 19.1 14.3 15.3 19 15.3V32.3C14.3 32.3 10.5 28.5 10.5 23.8Z" fill="#1ABCFE" />
    <path d="M19 49.3C23.7 49.3 27.5 45.5 27.5 40.8V32.3H19V49.3Z" fill="#FF7262" />
  </svg>
);

const NextjsLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 180 180" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M180 90C180 139.706 139.706 180 90 180C40.2944 180 0 139.706 0 90C0 40.2944 40.2944 0 90 0C139.706 0 180 40.2944 180 90ZM122.956 50.8412C122.253 50.8412 121.684 51.41 121.684 52.1132V109.914L63.5041 51.5441C62.9056 50.9456 61.9056 50.9456 61.3071 51.5441C61.0118 51.8394 60.8462 52.2394 60.8462 52.6565V127.143C60.8462 127.847 61.4151 128.415 62.1182 128.415C62.8214 128.415 63.3902 127.847 63.3902 127.143V69.3424L121.57 127.712C122.169 128.311 123.169 128.311 123.767 127.712C124.062 127.417 124.228 127.017 124.228 126.6V52.1132C124.228 51.41 123.659 50.8412 122.956 50.8412Z" />
  </svg>
);

const NodejsLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 295" className={className} fill="#339933" xmlns="http://www.w3.org/2000/svg">
    <path d="M142.9 2.5c-9.1-5.3-20.7-5.3-29.8 0L20 56.1C9.9 62 3.7 72.8 3.7 84.5v125.7c0 11.7 6.2 22.5 16.3 28.4l93.1 53.7c9.1 5.3 20.7 5.3 29.8 0l93.1-53.7c10.1-5.9 16.3-16.7 16.3-28.4V84.5c0-11.7-6.2-22.5-16.3-28.4L142.9 2.5zM128 259.9V35.1c3.1 0 6.2.8 8.8 2.3l93.1 53.7c5.1 3 8.2 8.4 8.2 14.3v107.5c0 5.9-3.1 11.3-8.2 14.3l-93.1 53.7c-2.6 1.5-5.7 2.3-8.8 2.3z" />
  </svg>
);

const PostgresLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="#336791" xmlns="http://www.w3.org/2000/svg">
    <path d="M51.9 29.1c.1-.8.2-1.7.2-2.5 0-11.4-8.8-19.1-18.7-19.1-11.2 0-20.3 9.4-20.3 20.9 0 2 .3 4 .9 5.8-2.6.8-4.5 3.3-4.5 6.2 0 3.7 3 6.6 6.7 6.6h.4v2.7c0 4.1 3.3 7.5 7.5 7.5h16.2c4.1 0 7.5-3.3 7.5-7.5v-2.7h.5c3.7 0 6.7-3 6.7-6.6.1-4-2.8-7.3-6.5-7.9zM33.4 12c7.9 0 14.2 6 14.2 14.6 0 .8-.1 1.7-.2 2.5H19.5c-.1-.8-.2-1.7-.2-2.5 0-8.6 6.2-14.6 14.1-14.6z" />
  </svg>
);

const PrismaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 45 52" className={className} fill="#2D3748" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.023.238L.484 38.643a1.144 1.144 0 0 0 .991 1.701h12.56L22.023 26.65l7.989 13.693h12.56a1.144 1.144 0 0 0 .991-1.701L22.023.238z" fill="#0C344B" />
    <path d="M22.023.238v26.412l7.989 13.693h12.56a1.144 1.144 0 0 0 .991-1.701L22.023.238z" fill="#16A394" />
  </svg>
);

const ClaudeLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#D97706" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.6 14.4L14.4 15.6L12 13.2L9.6 15.6L8.4 14.4L10.8 12L8.4 9.6L9.6 8.4L12 10.8L14.4 8.4L15.6 9.6L13.2 12L15.6 14.4Z" />
  </svg>
);

const OllamaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18a4 4 0 0 0-8 0" />
    <path d="M12 2v4" />
    <path d="M9 3v2" />
    <path d="M15 3v2" />
    <rect x="4" y="6" width="16" height="10" rx="2" />
  </svg>
);

const LumaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
    <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10" />
    <path d="M2 12h20" />
  </svg>
);

const VercelLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 76 65" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
  </svg>
);

const SupabaseLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 106 106" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64.66 103.738C61.424 107.514 55.234 105.228 55.234 100.279V58.334H96.388C104.092 58.334 108.312 67.288 103.446 73.256L64.66 103.738Z" fill="#3ECF8E" />
    <path d="M41.34 2.262C44.576 -1.514 50.766 0.772 50.766 5.721V47.666H9.612C1.908 47.666 -2.312 38.712 2.554 32.744L41.34 2.262Z" fill="#3ECF8E" fillOpacity="0.8" />
  </svg>
);

const GithubLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 98 96" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.237-5.704-5.431-7.255-5.431-7.255-4.428-3.016.33-2.934.33-2.934 4.907.33 7.5 5.052 7.5 5.052 4.347 7.5 11.416 5.378 14.244 4.156.409-3.18 1.699-5.378 3.07-6.6-10.844-1.141-22.298-5.459-22.298-24.36 0-5.378 1.94-9.778 5.176-13.2-.501-1.221-2.262-6.275.474-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0112.217-1.63c4.136 0 8.33.57 12.228 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.747 6.763.976 11.817.485 13.038 3.236 3.422 5.176 7.822 5.176 13.2 0 18.98-11.481 23.18-22.428 24.36 1.776 1.549 3.316 4.482 3.316 9.127 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364C83.924 89.389 98 70.973 98 49.217 98 22 76.161 0 48.854 0z" />
  </svg>
);

const DockerLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#2496ED" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.185.185 0 00.186-.186V3.575a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m0 2.716h2.118a.185.185 0 00.186-.186V6.29a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.186.186 0 00-.185-.185H8.075a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m0 2.714h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H8.075a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.955 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.12a.185.185 0 00-.185.186v1.887c0 .102.084.185.185.185m-2.954 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.166a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m5.909 2.715h2.119a.186.186 0 00.185-.185v-1.887a.186.186 0 00-.185-.186H8.075a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.955 0h2.119a.186.186 0 00.185-.185v-1.887a.186.186 0 00-.185-.186H5.12a.185.185 0 00-.185.186v1.887c0 .102.084.185.185.185m-2.954 0h2.119a.185.185 0 00.185-.185v-1.887a.185.185 0 00-.185-.186H2.166a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185M.056 12.3c-.04.428.024 1.343.468 2.27 1.332 2.784 4.544 3.738 8.04 3.738 6.47 0 11.233-3.084 13.06-8.736.216-.67.432-.937 1.054-.937h.375c.67 0 .942-.514.54-1.026-.395-.503-1.424-1.258-2.656-1.258-1.503 0-2.457.778-2.88 1.488-.958-.168-2.58-.228-4.22.288-.936.288-1.92.79-2.64 1.44-1.056-.552-2.592-.816-4.08-.816-1.536 0-3.048.288-4.128.84-1.08.552-1.992 1.392-2.328 2.25-.264.12-.456.288-.66.456z" />
  </svg>
);

const AWSLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#FF9900" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.75 14.88c-1.87 1.37-4.57 2.1-7.25 2.1-3.66 0-6.95-1.37-9.5-3.67-.2-.18-.04-.42.2-.28 2.77 1.6 6.13 2.55 9.55 2.55 2.37 0 4.96-.52 7.2-1.54.36-.16.66.24.2.84zm1.2-1.98c-.46-.58-3.05-.28-4.22-.14-.35.04-.41-.26-.08-.49 2.12-1.52 4.45-.63 4.88-.09.43.54-.04 2.92-2.04 4.67-.32.28-.54.12-.34-.24.64-1.18 1.26-3.13.8-3.71zM11.75 4c-1.35 0-2.22.82-2.22 2.14 0 1.25.75 2.05 2.22 2.05 1.35 0 2.22-.8 2.22-2.05C13.97 4.82 13.1 4 11.75 4z" />
  </svg>
);

const TypeScriptLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <path fill="#FFF" d="M13.2 17.5c.4.6 1.1.9 1.9.9 1.1 0 1.7-.5 1.7-1.3 0-.8-.5-1.1-1.7-1.6l-.6-.2c-1.7-.7-2.5-1.6-2.5-3.1 0-2.3 1.8-3.7 4.5-3.7 1.8 0 3.1.6 3.9 1.9l-1.8 1.1c-.5-.8-1.2-1.2-2.1-1.2-1 0-1.6.5-1.6 1.1 0 .7.4 1 1.5 1.4l.6.2c1.9.8 2.7 1.6 2.7 3.3 0 2.5-1.9 3.8-4.8 3.8-2.2 0-3.8-.8-4.7-2.3l1.7-1.2zM5.5 10.3h2.6v9.4H11v-9.4h2.6V8.5H5.5v1.8z" />
  </svg>
);

const TailwindLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#38BDF8" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
  </svg>
);

const RedisLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#DC382D" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.5 16.5l-9.5 5.5-9.5-5.5v-11l9.5-5.5 9.5 5.5v11zm-9.5-14.8l-7.7 4.4 7.7 4.5 7.7-4.5-7.7-4.4z" />
    <circle cx="12" cy="12" r="1.5" fill="#FFF" />
  </svg>
);

const blueprintTechs = [
  { id: "01", name: "Vercel", icon: VercelLogo, role: "HOSTING" },
  { id: "02", name: "React", icon: ReactLogo, role: "UI LIBRARY" },
  { id: "03", name: "Next.js", icon: NextjsLogo, role: "FRAMEWORK" },
  { id: "04", name: "Supabase", icon: SupabaseLogo, role: "BACKEND" },
  { id: "05", name: "PostgreSQL", icon: PostgresLogo, role: "DATABASE" },
  { id: "06", name: "Node.js", icon: NodejsLogo, role: "RUNTIME" },
  { id: "07", name: "Docker", icon: DockerLogo, role: "CONTAINERS" },
  { id: "08", name: "AWS", icon: AWSLogo, role: "CLOUD" },
  { id: "09", name: "GitHub", icon: GithubLogo, role: "DEVOPS" },
  { id: "10", name: "TypeScript", icon: TypeScriptLogo, role: "LANGUAGE" },
  { id: "11", name: "Tailwind CSS", icon: TailwindLogo, role: "STYLING" },
  { id: "12", name: "Redis", icon: RedisLogo, role: "CACHING" },
];

// ── Page 2 logos ───────────────────────────────────────────────────────────────
const MongoDBLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.5 2 6 6.5 6 10c0 2.8 1.4 5.2 3.5 6.7V22h5v-5.3C16.6 15.2 18 12.8 18 10c0-3.5-2.5-8-6-8zm0 15.5c-1.1-.8-2-2.1-2-3.5 0-1 .5-3 2-3s2 2 2 3c0 1.4-.9 2.7-2 3.5z" fill="#47A248" />
  </svg>
);

const GraphQLLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" fill="#E10098" opacity="0.15" />
    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" fill="none" stroke="#E10098" strokeWidth="1.5" />
    <text x="12" y="16" textAnchor="middle" fill="#E10098" fontSize="8" fontWeight="bold" fontFamily="sans-serif">GQL</text>
  </svg>
);

const ViteLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7l1.5 10L12 22l7.5-5L21 7z" fill="#646CFF" opacity="0.15" />
    <path d="M14 3L8 14h3l-1 7 7-10h-3l1-8z" fill="#646CFF" />
    <path d="M14 3L8 14h3l-1 7 7-10h-3l1-8z" fill="#FFD62E" opacity="0.5" transform="translate(1, 0)" />
  </svg>
);

const FigmaLogo2 = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect x="8" y="2" width="4" height="4" rx="2" fill="#FF7262" />
    <rect x="12" y="2" width="4" height="4" rx="2" fill="#F24E1E" />
    <rect x="8" y="6" width="4" height="4" rx="2" fill="#A259FF" />
    <circle cx="14" cy="8" r="2" fill="#1ABCFE" />
    <rect x="8" y="10" width="4" height="4" rx="2" fill="#0ACF83" />
  </svg>
);

const StripeLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#635BFF" />
    <path fill="#FFF" d="M11.9 9.1c0-.8.7-1.1 1.8-1.1 1.6 0 3.6.5 5 1.3V5.4c-1.7-.7-3.3-1-5-1-4.1 0-6.8 2.1-6.8 5.7 0 5.5 7.6 4.6 7.6 7 0 .9-.8 1.2-2 1.2-1.7 0-3.9-.7-5.6-1.7v3.9c1.9.8 3.8 1.2 5.6 1.2 4.2 0 7.1-2.1 7.1-5.7-.1-6-7.7-4.9-7.7-7z" />
  </svg>
);

const CloudflareLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 13.5c.2-.5.3-1 .3-1.5 0-2.8-2.2-5-5-5-2.1 0-3.9 1.3-4.7 3.2-.3-.1-.7-.2-1.1-.2C4.2 10 3 11.2 3 12.8c0 .2 0 .4.1.6" fill="none" stroke="#F6821F" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16.5 13.5H4.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h12c1.7 0 3-1.3 3-3s-1.3-3-3-3c-.2 0-.3 0-.5.1" fill="#F6821F" opacity="0.2" />
    <rect x="3" y="13" width="15" height="3" rx="1.5" fill="#F6821F" />
  </svg>
);

const PythonLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.5 2 8 4 8 6v2h4V9H6C4 9 2 10.5 2 13s2 4 4 4h1v-2H6c-1 0-2-.5-2-2s1-2 2-2h6c2.5 0 4-1.5 4-4V6c0-2.5-2-4-4-4zm-1 3c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#3776AB" />
    <path d="M12 22c3.5 0 4-2 4-4v-2h-4v-1h6c2 0 4-1.5 4-4s-2-4-4-4h-1v2h1c1 0 2 .5 2 2s-1 2-2 2h-6c-2.5 0-4 1.5-4 4v2c0 2.5 2 4 4 4zm1-3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#FFD43B" />
  </svg>
);

const LinuxLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#333" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C9.8 2 8 4.5 8 7.5c0 1.5.4 2.8 1 3.8C7.4 12.5 6 14.5 6 17c0 2.5 1.5 4 3 4.5V22h6v-.5c1.5-.5 3-2 3-4.5 0-2.5-1.4-4.5-3-5.7.6-1 1-2.3 1-3.8C16 4.5 14.2 2 12 2zm-1.5 4c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm3 0c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" />
  </svg>
);

const KubernetesLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" fill="#326CE5" opacity="0.15" />
    <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" fill="none" stroke="#326CE5" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2.5" fill="#326CE5" />
    <line x1="12" y1="4" x2="12" y2="9.5" stroke="#326CE5" strokeWidth="1.2" />
    <line x1="12" y1="14.5" x2="12" y2="20" stroke="#326CE5" strokeWidth="1.2" />
    <line x1="19.4" y1="8.5" x2="14.1" y2="11" stroke="#326CE5" strokeWidth="1.2" />
    <line x1="9.9" y1="13" x2="4.6" y2="15.5" stroke="#326CE5" strokeWidth="1.2" />
    <line x1="4.6" y1="8.5" x2="9.9" y2="11" stroke="#326CE5" strokeWidth="1.2" />
    <line x1="14.1" y1="13" x2="19.4" y2="15.5" stroke="#326CE5" strokeWidth="1.2" />
  </svg>
);

const ZodLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#3068B7" opacity="0.12" />
    <path d="M7 7h10l-8 10h8" fill="none" stroke="#3068B7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const page2Techs = [
  { name: "Figma", icon: FigmaLogo2 },
  { name: "Prisma", icon: PrismaLogo },
  { name: "MongoDB", icon: MongoDBLogo },
  { name: "GraphQL", icon: GraphQLLogo },
  { name: "Stripe", icon: StripeLogo },
  { name: "Cloudflare", icon: CloudflareLogo },
  { name: "Python", icon: PythonLogo },
  { name: "Vite", icon: ViteLogo },
  { name: "Linux", icon: LinuxLogo },
  { name: "Kubernetes", icon: KubernetesLogo },
  { name: "Zod", icon: ZodLogo },
  { name: "Node.js", icon: NodejsLogo },
];

const techPages = [blueprintTechs, page2Techs];


const homeIconMap: Record<string, React.FC<{ className?: string }>> = {
  ReactJS: ({ className }) => <FontAwesomeIcon icon={faReact} className={className} />,
  "React Native": ({ className }) => <FontAwesomeIcon icon={faMobileScreenButton} className={className} />,
  Figma: ({ className }) => <FontAwesomeIcon icon={faFigma} className={className} />,
  "Next.js": ({ className }) => <FontAwesomeIcon icon={faLaptopCode} className={className} />,
  "Node.js": ({ className }) => <FontAwesomeIcon icon={faNodeJs} className={className} />,
  PostgreSQL: ({ className }) => <FontAwesomeIcon icon={faDatabase} className={className} />,
  Prisma: ({ className }) => <FontAwesomeIcon icon={faServer} className={className} />,
  Claude: ({ className }) => <FontAwesomeIcon icon={faRobot} className={className} />,
  Ollama: ({ className }) => <FontAwesomeIcon icon={faRobot} className={className} />,
  "Luma API": ({ className }) => <FontAwesomeIcon icon={faVideo} className={className} />,
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
          <Icon className="h-7 w-7 shrink-0" />
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
                      <IconComponent className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 text-stone-700" />
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
