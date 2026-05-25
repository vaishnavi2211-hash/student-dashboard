"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
}

export function ProgressBar({ value, color = "#22d3ee" }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div
      ref={ref}
      className="w-full h-1.5 rounded-full overflow-hidden"
      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        initial={{ width: "0%" }}
        animate={isInView ? { width: `${value}%` } : { width: "0%" }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
          delay: 0.2,
        }}
        className="h-full rounded-full relative overflow-hidden"
        style={{ backgroundColor: color }}
      >
        {/* Shimmer highlight */}
        <motion.div
          animate={{ x: ["−100%", "200%"] }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
