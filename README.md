# DevSync — Realtime Developer Community

A high-bandwidth developer community to learn, collaborate, and ship ReactJS, React Native, Next.js, Node.js, databases, and AI models in realtime.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, shadcn/ui |
| Animation | Framer Motion, GSAP + ScrollTrigger |
| 3D / WebGL | Three.js, React Three Fiber, Rapier |
| Database | PostgreSQL, Prisma ORM |
| AI | Claude API, Ollama, Luma API |
| Deployment | Cloudflare Workers (static export) |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
app/
  layout.tsx          # Root layout (fonts, metadata, LoadingWrapper)
  page.tsx            # Home page (/)
  globals.css         # Tailwind v4 + CSS variables
  stack/page.tsx      # /stack — Tech stack detail pages
  developers/
    page.tsx          # /developers — Contributors grid
    [id]/page.tsx     # /developers/[id] — Individual profiles
  cohorts/page.tsx    # /cohorts — Active cohorts/programs
  resources/page.tsx  # /resources — Codebases, guides, templates

components/
  Header.tsx          # Fixed navigation bar
  Footer.tsx          # Site-wide footer
  JoinModal.tsx       # Member registration modal
  FloatingWidgets.tsx # Chatbot (SyncBot) + Meeting Booker FABs
  LoadingWrapper.tsx  # 3.5s loading screen on initial load
  PixelBlast.tsx      # WebGL pixel-effect background
  PixelCard.tsx       # Canvas-based hover animation card
  Shuffle.tsx         # GSAP text scramble effect
  VariableProximity.tsx # Mouse-follow variable font weight
  Lanyard.tsx         # 3D Three.js lanyard badge

lib/
  data.ts             # Single source of truth for all page data
  utils.ts            # cn() helper (clsx + tailwind-merge)
```

## Data Architecture

All page data is centralized in `lib/data.ts`. Pages import data from this single source instead of defining their own copies:

- **Developers** — profiles, skills, projects, socials
- **Technologies** — names, descriptions, code samples
- **Programs / Cohorts** — session schedules, hosts, descriptions
- **Stories / Resources** — featured projects and developer assets

## Key Features

- **Static Export** — Fully static site deployed to Cloudflare Workers
- **Loading Screen** — Custom 3.5s presentation with developer quotes
- **Interactive WebGL** — PixelBlast canvas background on hero
- **3D Lanyard** — Three.js drag-to-spin developer badge
- **Chatbot** — SyncBot FAQ assistant with keyword matching
- **Meeting Booker** — Schedule architecture sessions with date/time picker
- **Newsletter** — Formspree-powered email subscription
- **Responsive** — Mobile-first design with adaptive layouts

## Environment Variables

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build static export to `./out` |
| `npm run start` | Serve production build locally |

## License

Built by the DevSync community. All rights reserved.
