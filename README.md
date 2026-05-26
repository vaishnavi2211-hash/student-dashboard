# LearnOS — Student Dashboard

A high-fidelity, animated student dashboard built with Next.js App Router, Supabase, Tailwind CSS, and Framer Motion.

## 🚀 Live Demo

[View Live App](https://student-dashboard-theta-tan.vercel.app/dashboard)

---

## 🏗️ Architecture Overview

### Server / Client Component Split

The biggest architectural decision in this project is where data fetching lives.

**Server Components (RSC)** handle all Supabase queries:
- `app/dashboard/page.tsx` is a Server Component. It renders a `<Suspense>` boundary around `<CoursesSection />`, which itself is an `async` Server Component that calls `getCourses()` from `lib/data.ts`.
- This means the database query runs on the server at request time, **never exposing credentials to the browser**. The client only receives rendered HTML + hydration data.

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
| Supabase | `@supabase/supabase-js` | PostgreSQL database, server-side client |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 11 | Animations and spring physics |
| Lucide React | Latest | Icon system |
| TypeScript | 5 | Type safety across all components |

---

## ⚙️ Setup & Running Locally

### 1. Clone and install

```bash
git clone https://github.com/vaishnavi2211-hash/student-dashboard.git
cd student-dashboard
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
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1aW95dGpvcnRscHdpaHhhZ2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NzYxMTgsImV4cCI6MjA5NTI1MjExOH0.Gpa1D3155VJMqbZ-TFQajI1ho1jIWi2nP-sPWUQ1uak
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
learning-dashboard/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── dashboard/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── loading.tsx
│       ├── courses/page.tsx
│       ├── analytics/page.tsx
│       ├── achievements/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── BentoGrid.tsx
│   │   ├── BentoTile.tsx
│   │   ├── HeroTile.tsx
│   │   ├── ActivityTile.tsx
│   │   ├── CourseGrid.tsx
│   │   └── CourseCard.tsx
│   └── ui/
│       ├── DynamicIcon.tsx
│       ├── ProgressBar.tsx
│       ├── CourseSkeleton.tsx
│       └── ErrorBoundaryWrapper.tsx
├── lib/
│   └── data.ts
├── types/
│   └── index.ts
├── supabase-setup.sql
├── .env.example
└── README.md
---

## 🎨 Design Decisions

- **Dark-only theme**: deep `#080b11` base with subtle cyan (`#22d3ee`) and violet (`#8b5cf6`) accents
- **Syne + DM Sans**: Syne for display/headings (geometric, futuristic), DM Sans for body (clean, readable)
- **Bento grid**: 12-column CSS grid, tiles span differently per breakpoint — responsive without JS
- **Noise overlay**: SVG `feTurbulence` filter as a CSS pseudo-element for texture depth
- **Zero-layout-shift animations**: only `transform` and `opacity` animated, never width/height/margin

---

## 📝 Challenges & Solutions

**Supabase permissions**: The main challenge was debugging RLS policies — courses were not loading due to missing GRANT permissions on the table. Fixed by running `GRANT SELECT ON courses TO anon` in SQL Editor.

**Server/Client boundary with Framer Motion**: Framer Motion requires `"use client"`. Kept data fetching in pure Server Components and passed data down as props to animated Client Components.

**Dynamic icon rendering**: The `icon_name` field in Supabase stores a string like `"Layers"`. `DynamicIcon.tsx` converts it to PascalCase and does a dynamic lookup into the `lucide-react` module exports, with a `BookOpen` fallback for unknown names.

**Suspense + Error Boundary ordering**: React requires the error boundary to be *outside* the Suspense boundary. `ErrorBoundaryWrapper` wraps the `<Suspense>` block so errors thrown by the async Server Component are caught gracefully.
