import { CourseSkeleton } from "@/components/ui/CourseSkeleton";

export default function DashboardLoading() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Hero skeleton */}
        <div className="col-span-12 lg:col-span-8">
          <div className="skeleton rounded-2xl h-52 w-full" />
        </div>
        {/* Activity skeleton */}
        <div className="col-span-12 lg:col-span-4">
          <div className="skeleton rounded-2xl h-52 w-full" />
        </div>
        {/* Course skeletons */}
        <div className="col-span-12">
          <CourseSkeleton count={4} />
        </div>
      </div>
    </div>
  );
}
