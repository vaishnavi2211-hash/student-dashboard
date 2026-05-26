Student Learning Dashboard
A next-gen student dashboard built with Next.js, Supabase, Tailwind CSS, and Framer Motion.
Live Demo
https://student-dashboard-theta-tan.vercel.app/dashboard
GitHub
View Source Code : https://github.com/vaishnavi2211-hash/student-dashboard.git

Tech Stack
Next.js 14 (App Router)
Supabase (PostgreSQL database)
Tailwind CSS
Framer Motion
Lucide React
TypeScript

Setup
npm install
cp .env.example .env.local
# Add your Supabase credentials
npm run dev
Supabase setup — run supabase-setup.sql in SQL Editor, then add your URL and anon key to .env.local.

Architecture
Server vs Client Components — Data fetching happens in Server Components so Supabase credentials stay on the server and never reach the browser. Client Components handle animations and interactions.
Suspense + Error Boundary — Course tiles use React Suspense with skeleton loaders while data fetches. An error boundary catches any database failures gracefully.

Challenges
Connecting Supabase was the main challenge — the courses table needed proper RLS policies and GRANT permissions before the frontend could read data. Debugged by logging the raw Supabase error object to identify it was a permissions issue, not a connection issue.

Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1aW95dGpvcnRscHdpaHhhZ2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NzYxMTgsImV4cCI6MjA5NTI1MjExOH0.Gpa1D3155VJMqbZ-TFQajI1ho1jIWi2nP-sPWUQ1uak

