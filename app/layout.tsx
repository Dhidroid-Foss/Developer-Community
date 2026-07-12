import type { Metadata } from "next";
import { DM_Mono, Manrope, Playfair_Display } from "next/font/google";
import LoadingWrapper from "@/components/LoadingWrapper";
import FloatingWidgets from "@/components/FloatingWidgets";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const mono = DM_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });
const playfair = Playfair_Display({ variable: "--font-serif", subsets: ["latin"], weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "DevSync — Realtime Developer Community",
  description: "A high-bandwidth developer community to learn, collaborate, and ship ReactJS, React Native, Next.js, Node.js, databases, and AI models in realtime.",
  keywords: [
    "DevSync",
    "Developer Community",
    "Realtime Coding",
    "ReactJS",
    "React Native",
    "Figma",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Claude AI",
    "Ollama",
    "Luma API",
    "Fullstack Development",
    "AI Integration"
  ],
  authors: [{ name: "DevSync Team", url: "https://devsync.community" }],
  creator: "DevSync Community",
  publisher: "DevSync",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devsync.community",
    title: "DevSync — Realtime Developer Community",
    description: "Build in realtime. Ship with the best. Collaborative hub for modern developers mastering web, mobile, database, and generative AI stacks.",
    siteName: "DevSync",
    images: [
      {
        url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "DevSync Community Header",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevSync — Realtime Developer Community",
    description: "Collaborative hub for modern developers mastering web, mobile, database, and generative AI stacks.",
    images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${mono.variable} ${playfair.variable}`}>
        <LoadingWrapper>
          {children}
          <FloatingWidgets />
        </LoadingWrapper>
      </body>
    </html>
  );
}
