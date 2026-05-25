import { Suspense } from "react";
import { getCourses } from "@/lib/data";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { CourseSkeleton } from "@/components/ui/CourseSkeleton";
import { ErrorBoundaryWrapper } from "@/components/ui/ErrorBoundaryWrapper";

// Force dynamic rendering so Supabase data is always fresh
export const dynamic = "force-dynamic";

async function CoursesSection() {
  const courses = await getCourses();
  return <CourseGrid courses={courses} />;
}

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <BentoGrid>
        {/* Hero tile — full width on mobile, 2/3 on desktop */}
        <div className="col-span-12 lg:col-span-8">
          <HeroTile studentName="kishna" streak={14} />
        </div>

        {/* Activity tile — full width on mobile, 1/3 on desktop */}
        <div className="col-span-12 lg:col-span-4">
          <ActivityTile />
        </div>

        {/* Course tiles — fetched from Supabase via RSC */}
        <div className="col-span-12">
          <ErrorBoundaryWrapper>
            <Suspense fallback={<CourseSkeleton count={4} />}>
              <CoursesSection />
            </Suspense>
          </ErrorBoundaryWrapper>
        </div>
      </BentoGrid>
    </div>
  );
}
