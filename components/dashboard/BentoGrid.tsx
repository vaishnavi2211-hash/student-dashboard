"use client";

import { motion } from "framer-motion";

interface BentoGridProps {
  children: React.ReactNode;
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: 0.05 },
        },
      }}
      className="grid grid-cols-12 gap-4 md:gap-5"
      aria-label="Dashboard overview"
    >
      {children}
    </motion.section>
  );
}
