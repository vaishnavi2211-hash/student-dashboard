# LearnOS — Student Dashboard

A high-fidelity, animated student dashboard built with Next.js App Router, Supabase, Tailwind CSS, and Framer Motion.

## 🚀 Live Demo

> Deploy to Vercel and paste your URL here.

---

## 🏗️ Architecture Overview

### Server / Client Component Split

The biggest architectural decision in this project is where data fetching lives.

**Server Components (RSC)** handle all Supabase queries:
- `app/dashboard/page.tsx` is a Server Component. It renders a `<Suspense>` boundary around `<CoursesSection />`, which itself is an `async` Server Component that calls `getCourses()` from `lib/data.ts`.
- This means the database query runs on the server at request time, **never exposing credentials to the browser**. The client only receives rendered HTML + hydration data.
- `lib/supabase/server.ts` uses `@supabase/ssr`'s `createServerClient` which reads cookies server-side, allowing secure, authenticated requests.

**Client Components** handle all interactivity:
- `Sidebar`, `BentoTile`, `CourseCard`, `ProgressBar`, `ActivityTile` are all `"use client"` because they use Framer Motion, `useState`, and event handlers.
- They receive data as props from their Server Component parents — clean data flow, no prop drilling across the RSC boundary.

### Loading States

`app/dashboard/loading.tsx` provides an automatic Suspense boundary for the entire route. Additionally, individual `<Suspense fallback={<CourseSkeleton />}>` boundaries wrap the courses section for granular loading UX. Skeletons use a CSS `shimmer` animation with `background-position` keyframes (no layout shifts).

### Error Handling

`ErrorBoundaryWrapper` is a React class component (required for error boundaries) placed around the `<Suspense>` block. If `getCourses()` throws (network failure, bad Supabase config), the error is caught and a user-friendly message is displayed with a retry button.

---

## 🎬 Animation Strategy (Framer Motion)

| Effect | Technique |
|---|---|
| Staggered tile entrance | `variants` with `staggerChildren` on the grid container |
| Card hover elevation | `whileHover` + `scale: 1.015` + `type: "spring"` physics |
| Border glow on hover | CSS `box-shadow` transition via `whileHover` |
| Sidebar active indicator | `layoutId="active-nav-pill"` for shared layout animation |
| Progress bar fill | `motion.div` animating `width` from `0%` to value, triggered by `useInView` |
| Activity grid cells | Staggered `scale` + `opacity` entrance |
| Sidebar collapse | `motion.nav` `animate={{ width }}` with spring |

All hover states use `type: "spring", stiffness: 300, damping: 20` for natural, non-linear feel. All entrance animations use `opacity` and `transform` (translateY) exclusively — **zero layout shifts**.

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 14 | App Router, RSC, file-based routing |
| Supabase | `@supabase/ssr` | PostgreSQL database, server-side client |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 11 | Animations and spring physics |
| Lucide React | Latest | Icon system |
| TypeScript | 5 | Type safety across all components |

---

## ⚙️ Setup & Running Locally

### 1. Clone and install

```bash
git clone https://github.com/your-username/learning-dashboard.git
cd learning-dashboard
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-setup.sql`
3. Go to **Settings → API** and copy your Project URL and anon key

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🚢 Deployment (Vercel)

1. Push your repo to GitHub (ensure `.env.local` is in `.gitignore`)
2. Import the project on [vercel.com](https://vercel.com)
3. Add environment variables in **Vercel → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — Vercel auto-detects Next.js

---

## 📁 Project Structure

```
learning-dashboard/
├── app/
│   ├── globals.css          # Base styles, CSS variables, shimmer keyframes
│   ├── layout.tsx           # Root layout with Google Fonts (Syne + DM Sans)
│   ├── page.tsx             # Redirects / → /dashboard
│   └── dashboard/
│       ├── layout.tsx       # Sidebar + main content wrapper
│       ├── page.tsx         # Server Component: fetches courses, sets up Suspense
│       └── loading.tsx      # Route-level loading skeleton
├── components/
│   ├── dashboard/
│   │   ├── Sidebar.tsx      # Collapsible nav with layoutId animation
│   │   ├── BentoGrid.tsx    # Stagger animation wrapper
│   │   ├── BentoTile.tsx    # Base tile with spring hover
│   │   ├── HeroTile.tsx     # Greeting + streak stats
│   │   ├── ActivityTile.tsx # Contribution heatmap graph
│   │   ├── CourseGrid.tsx   # Grid wrapper for course cards
│   │   └── CourseCard.tsx   # Individual course tile with progress bar
│   └── ui/
│       ├── DynamicIcon.tsx  # Renders Lucide icon from string name
│       ├── ProgressBar.tsx  # Animated progress bar (useInView triggered)
│       ├── CourseSkeleton.tsx         # Shimmer skeleton for loading
│       └── ErrorBoundaryWrapper.tsx   # React error boundary
├── lib/
│   ├── data.ts              # getCourses() — Supabase query
│   └── supabase/
│       ├── server.ts        # createClient() for RSC / Server Actions
│       └── client.ts        # createClient() for Client Components
├── types/
│   └── index.ts             # TypeScript interfaces (Course, NavItem, etc.)
├── supabase-setup.sql       # SQL to create table + seed data
├── .env.example             # Required env var template
└── README.md
```

---

## 🎨 Design Decisions

- **Dark-only theme**: deep `#080b11` base with subtle cyan (`#22d3ee`) and violet (`#8b5cf6`) accents
- **Syne + DM Sans**: Syne for display/headings (geometric, futuristic), DM Sans for body (clean, readable)
- **Bento grid**: 12-column CSS grid, tiles span differently per breakpoint — responsive without JS
- **Noise overlay**: SVG `feTurbulence` filter as a CSS pseudo-element for texture depth
- **Zero-layout-shift animations**: only `transform` and `opacity` animated, never width/height/margin

---

## 📝 Challenges & Solutions

**Server/Client boundary with Framer Motion**: Framer Motion requires `"use client"`. The solution was to keep data fetching in pure Server Components and pass data down as props to animated Client Components. `BentoGrid` is a Client Component purely for animation orchestration, but its children are passed as `ReactNode` props (the `children` prop works across the RSC boundary).

**Dynamic icon rendering**: The `icon_name` field in Supabase stores a string like `"Layers"`. `DynamicIcon.tsx` converts it to PascalCase and does a dynamic lookup into the `lucide-react` module exports, with a `BookOpen` fallback for unknown names.

**Suspense + Error Boundary ordering**: React requires the error boundary to be *outside* the Suspense boundary (not inside). `ErrorBoundaryWrapper` wraps the `<Suspense>` block so errors thrown by the async Server Component are caught.
