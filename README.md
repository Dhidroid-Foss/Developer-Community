# Niral Developer (தமிழ்Dev) — Realtime Developer Community

A high-bandwidth developer community where Tamil-speaking engineers learn React, React Native, Next.js, Node.js, PostgreSQL, and AI tooling together — with live code reviews, architecture clinics, and open-source collaboration.

## Tech Stack

| Layer       | Technology                                        |
|-------------|---------------------------------------------------|
| Framework   | Next.js 16 (App Router, Static Export)            |
| UI          | React 19, Tailwind CSS v4, shadcn/ui              |
| Animation   | Motion (Framer Motion), GSAP + ScrollTrigger      |
| 3D / WebGL  | Three.js, React Three Fiber, Rapier               |
| AI          | Claude API, Ollama, Luma API                      |
| Deployment  | Cloudflare Workers (static export from `./out`)   |

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Type check
bun run typecheck

# Run all tests
bun test

# Run Lighthouse audit
bun run lighthouse
```

## Project Architecture

This project follows **Feature-Sliced Design (FSD)** — domain logic lives in `features/`, the `app/` directory is a thin routing shell, and `components/` holds only global shared UI.

### Folder Structure

```
CommunityWeb-dev/
│
├── app/                            # THIN routing layer only
│   ├── layout.tsx                  # Root layout (fonts, metadata, JSON-LD, providers)
│   ├── page.tsx                    # Home page — thin 45-line composition shell
│   ├── globals.css                 # Tailwind v4 + CSS custom properties
│   ├── robots.ts / sitemap.ts      # SEO metadata files
│   ├── icon.tsx / apple-icon.tsx   # App icons
│   ├── opengraph-image.tsx         # OG image generator
│   ├── not-found.tsx               # Custom 404
│   ├── assets/dev-cats/            # Static dev avatar placeholders
│   ├── stack/page.tsx              # /stack route
│   ├── developers/
│   │   ├── page.tsx                # /developers route
│   │   └── [id]/page.tsx           # /developers/[id] dynamic route
│   ├── cohorts/page.tsx            # /cohorts route
│   ├── resources/page.tsx          # /resources route
│   └── tech-briefs/page.tsx        # /tech-briefs route
│
├── features/                       # FEATURE-SLICED DESIGN — domain modules
│   ├── home/
│   │   ├── index.ts                # Barrel export (public API)
│   │   ├── components/             # Home page section components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ShowcaseSection.tsx
│   │   │   ├── CommunitySection.tsx
│   │   │   ├── ProgramsSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── ResourcesSection.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   ├── FaqSection.tsx
│   │   │   └── CtaSection.tsx
│   │   ├── data/
│   │   │   ├── home.data.ts        # Programs, stories, quotes, live events, stats
│   │   │   ├── tech-grid.data.ts   # blueprintTechs, page2Techs, homeIconMap
│   │   │   └── faq.data.ts         # FAQ items + SyncBot answers
│   │   └── types/home.types.ts
│   ├── developers/
│   │   ├── index.ts                # Barrel export
│   │   ├── data/developers.data.ts # Developer profiles + developersById lookup
│   │   └── types/developer.types.ts
│   ├── cohorts/
│   │   ├── index.ts
│   │   ├── data/cohorts.data.ts
│   │   └── types/cohort.types.ts
│   ├── resources/
│   │   ├── index.ts
│   │   ├── data/resources.data.ts
│   │   └── types/resource.types.ts
│   ├── stack/
│   │   ├── index.ts
│   │   ├── data/technologies.data.ts
│   │   └── types/technology.types.ts
│   └── tech-briefs/
│       ├── index.ts
│       ├── data/tech-briefs.data.ts
│       ├── data/code-snippets.data.ts
│       └── types/tech-brief.types.ts
│
├── components/                     # GLOBAL shared UI only
│   ├── Header.tsx                  # Fixed navigation bar
│   ├── Footer.tsx                  # Site-wide footer
│   ├── JoinModal.tsx               # Member registration modal
│   ├── FloatingWidgets.tsx         # Thin shell composing SyncBot + MeetingBooker
│   ├── LoadingWrapper.tsx          # 3.5s initial loading screen
│   ├── CloudLoader.tsx             # Cloud animation for loading
│   ├── WordmarkShimmerLoader.tsx   # Shimmer wordmark
│   ├── TimeNumberLoader.tsx        # Time counter loader
│   ├── PixelBlast.tsx              # WebGL pixel-explosion background
│   ├── PixelCard.tsx               # Canvas hover-animation card
│   ├── Shuffle.tsx                 # GSAP text scramble animation
│   ├── VariableProximity.tsx       # Mouse-follow variable-font effect
│   ├── Lanyard.tsx                 # Three.js 3D lanyard badge
│   ├── common/
│   │   ├── index.ts                # Barrel export
│   │   ├── eyebrow.tsx             # Section label (MONO uppercase)
│   │   └── DeviconIcon.tsx         # Devicon icon + makeIcon factory
│   ├── ui/                         # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── tabs.tsx
│   └── widgets/                    # Floating panel widgets
│       ├── SyncBotChat.tsx         # SyncBot FAQ chatbot
│       └── MeetingBooker.tsx       # Architecture session booking form
│
├── lib/                            # Cross-cutting utilities & config
│   ├── site.ts                     # ✅ Single source of truth — brand, SEO, socials
│   ├── seo.ts                      # pageMetadata() factory
│   ├── utils.ts                    # cn(), getAvatarUrl()
│   ├── data.ts                     # ⚠️ DEPRECATED compat re-export hub (Phase 4: delete)
│   ├── seo.test.ts
│   ├── site.test.ts
│   └── utils.test.ts
│
├── public/
│   ├── avatars/                    # Developer profile photos
│   └── llms.txt                    # AI-friendly site description
│
└── scripts/                        # Dev tooling
    ├── lighthouse.sh               # Lighthouse audit runner
    ├── assert-lighthouse.mjs       # CI performance threshold assertions
    └── serve-static.ts             # Local static server for ./out
```

## Design Principles

| Principle | Applied How |
|---|---|
| **Feature-Sliced Design** | Domain data, types, and components live inside `features/`. `app/` only routes. |
| **Single Responsibility** | Each file does one thing. No more 887-line pages or 448-line multi-widget files. |
| **Barrel Exports** | Every `features/*` has `index.ts` — consumers import from the public API, not internals. |
| **Server/Client Boundary** | `page.tsx` = RSC (metadata only). `*Client.tsx` = all interactivity. |
| **Co-location** | Feature-specific code lives inside the feature, not mixed into global `components/`. |
| **Data Segregation** | Static data in `features/*/data/`. Config/identity in `lib/site.ts`. No hardcoded strings in components. |
| **Progressive Enhancement** | WebGL (`PixelBlast`) and GSAP (`Shuffle`) are lazy-loaded with `dynamic()`. |
| **DRY** | `Eyebrow` component is shared from `components/common` — not re-defined per file. |

## Key Features

- **Static Export** → Cloudflare Workers global edge delivery
- **Loading Screen** → Custom 3.5s presentation with developer quotes
- **Interactive WebGL** → PixelBlast canvas background on hero
- **3D Lanyard** → Three.js drag-to-spin developer badge
- **SyncBot** → FAQ chatbot powered by `features/home/data/faq.data.ts`
- **Meeting Booker** → Architecture session scheduling with ticket confirmation
- **Newsletter** → Formspree-powered email subscription
- **Responsive** → Mobile-first design with adaptive layouts

## Environment Variables

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

## Scripts

| Command               | Description                              |
|-----------------------|------------------------------------------|
| `bun run dev`         | Start development server                 |
| `bun run build`       | Build static export to `./out`           |
| `bun run start`       | Serve production build locally           |
| `bun run typecheck`   | Run TypeScript type checking             |
| `bun test`            | Run all tests                            |
| `bun run lighthouse`  | Run Lighthouse performance audit         |

## License

Built by the Niral Developer community. All rights reserved.
