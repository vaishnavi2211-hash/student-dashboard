"use client";

import { motion } from "framer-motion";
import { CourseCard } from "./CourseCard";
import type { Course } from "@/types";

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="col-span-12 flex items-center justify-center py-16 text-white/30 text-sm">
        No courses found. Add some courses in your Supabase database.
      </div>
    );
  }

  return (
    <section aria-label="Active courses">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-white/80 text-sm">Active Courses</h2>
        <span className="text-xs text-white/30">{courses.length} enrolled</span>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {courses.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
