"use client";

import { motion } from "framer-motion";

interface BentoTileProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "emerald" | "amber";
}

const GLOW_MAP = {
  cyan: "rgba(34,211,238,0.15)",
  violet: "rgba(139,92,246,0.15)",
  emerald: "rgba(16,185,129,0.15)",
  amber: "rgba(245,158,11,0.15)",
};

const BORDER_MAP = {
  cyan: "rgba(34,211,238,0.3)",
  violet: "rgba(139,92,246,0.3)",
  emerald: "rgba(16,185,129,0.3)",
  amber: "rgba(245,158,11,0.3)",
};

export function BentoTile({ children, className = "", glowColor = "cyan" }: BentoTileProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
      }}
      whileHover={{
        scale: 1.015,
        boxShadow: `0 0 0 1px ${BORDER_MAP[glowColor]}, 0 0 30px ${GLOW_MAP[glowColor]}, 0 20px 40px rgba(0,0,0,0.4)`,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`
        noise-overlay relative rounded-2xl border border-white/6 bg-bg-card
        overflow-hidden will-change-transform
        ${className}
      `}
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {children}
    </motion.article>
  );
}
