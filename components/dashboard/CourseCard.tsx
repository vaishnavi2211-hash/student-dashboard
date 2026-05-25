"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  index: number;
}

const GRADIENT_PRESETS = [
  { from: "rgba(34,211,238,0.12)", to: "rgba(139,92,246,0.06)", icon: "#22d3ee", bar: "#22d3ee" },
  { from: "rgba(139,92,246,0.12)", to: "rgba(34,211,238,0.06)", icon: "#a78bfa", bar: "#8b5cf6" },
  { from: "rgba(16,185,129,0.12)", to: "rgba(34,211,238,0.04)", icon: "#34d399", bar: "#10b981" },
  { from: "rgba(245,158,11,0.12)", to: "rgba(16,185,129,0.04)", icon: "#fbbf24", bar: "#f59e0b" },
];

export function CourseCard({ course, index }: CourseCardProps) {
  const preset = GRADIENT_PRESETS[index % GRADIENT_PRESETS.length];

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="noise-overlay relative rounded-2xl border border-white/6 bg-bg-card overflow-hidden cursor-pointer group will-change-transform"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
    >
      {/* Card background gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 20% 20%, ${preset.from} 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, ${preset.to} 0%, transparent 70%)`,
        }}
      />

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${preset.icon}40`,
        }}
        transition={{ duration: 0.2 }}
      />

      <div className="relative z-10 p-5">
        {/* Icon + action */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${preset.icon}18`, border: `1px solid ${preset.icon}25` }}
          >
            <DynamicIcon name={course.icon_name} size={20} style={{ color: preset.icon }} />
          </div>

          <motion.div
            className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            transition={{ duration: 0.15 }}
          >
            <ArrowUpRight size={14} className="text-white/60" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-white text-sm leading-snug mb-3 line-clamp-2">
          {course.title}
        </h3>

        {/* Progress section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40 font-body">Progress</span>
            <span className="text-xs font-semibold font-display" style={{ color: preset.bar }}>
              {course.progress}%
            </span>
          </div>
          <ProgressBar value={course.progress} color={preset.bar} />
        </div>

        {/* Status chip */}
        <div className="mt-3">
          <span
            className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${preset.bar}15`,
              color: preset.bar,
              border: `1px solid ${preset.bar}25`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse-slow"
              style={{ backgroundColor: preset.bar }}
            />
            In Progress
          </span>
        </div>
      </div>
    </motion.article>
  );
}
