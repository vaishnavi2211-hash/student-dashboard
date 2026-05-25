interface CourseSkeletonProps {
  count?: number;
}

export function CourseSkeleton({ count = 4 }: CourseSkeletonProps) {
  return (
    <section aria-label="Loading courses" aria-busy="true">
      <div className="flex items-center gap-2 mb-4">
        <div className="skeleton h-4 w-28 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/5 bg-bg-card p-5 space-y-4"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Icon skeleton */}
            <div className="skeleton w-10 h-10 rounded-xl" />

            {/* Title skeleton */}
            <div className="space-y-2">
              <div className="skeleton h-3.5 w-full rounded-full" />
              <div className="skeleton h-3.5 w-2/3 rounded-full" />
            </div>

            {/* Progress skeleton */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="skeleton h-2.5 w-12 rounded-full" />
                <div className="skeleton h-2.5 w-8 rounded-full" />
              </div>
              <div className="skeleton h-1.5 w-full rounded-full" />
            </div>

            {/* Badge skeleton */}
            <div className="skeleton h-5 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
