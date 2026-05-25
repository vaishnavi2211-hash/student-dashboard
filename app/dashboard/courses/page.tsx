import { getCourses } from "@/lib/data";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/CourseSkeleton";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { ErrorBoundaryWrapper } from "@/components/ui/ErrorBoundaryWrapper";

export const dynamic = "force-dynamic";

async function CoursesSection() {
  const courses = await getCourses();
  return <CourseGrid courses={courses} />;
}

export default function CoursesPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white">My Courses</h1>
        <p className="text-white/40 text-sm mt-1">Track your active learning paths</p>
      </div>
      <ErrorBoundaryWrapper>
        <Suspense fallback={<CourseSkeleton count={4} />}>
          <CoursesSection />
        </Suspense>
      </ErrorBoundaryWrapper>
    </div>
  );
}