"use client";

import { motion } from "framer-motion";
import { Flame, Clock, Target, TrendingUp } from "lucide-react";
import { BentoTile } from "./BentoTile";

interface HeroTileProps {
  studentName: string;
  streak: number;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function HeroTile({ studentName, streak }: HeroTileProps) {
  return (
    <BentoTile className="min-h-[208px]" glowColor="cyan">
      {/* Background gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 90% 20%, rgba(34,211,238,0.08) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(139,92,246,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div>
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-sm font-medium text-white/50 mb-1 font-body"
          >
            {getGreeting()},
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="font-display text-3xl md:text-4xl font-bold text-white"
          >
            {studentName}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #22d3ee, #8b5cf6)",
              }}
            >
              👋
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-white/40 text-sm mt-1 font-body"
          >
            Ready to level up today? Your progress awaits.
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-wrap gap-3 mt-6"
        >
          {/* Streak badge */}
          <div className="flex items-center gap-2 bg-white/6 border border-white/8 rounded-xl px-4 py-2.5">
            <div className="relative">
              <Flame size={18} className="text-amber-400" />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Flame size={18} className="text-amber-400/30" />
              </motion.div>
            </div>
            <div>
              <span className="text-lg font-bold font-display text-amber-400">{streak}</span>
              <span className="text-xs text-white/40 ml-1">day streak</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/6 border border-white/8 rounded-xl px-4 py-2.5">
            <Clock size={16} className="text-cyan-400" />
            <div>
              <span className="text-lg font-bold font-display text-white">2.4h</span>
              <span className="text-xs text-white/40 ml-1">today</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/6 border border-white/8 rounded-xl px-4 py-2.5">
            <Target size={16} className="text-violet-400" />
            <div>
              <span className="text-lg font-bold font-display text-white">3/5</span>
              <span className="text-xs text-white/40 ml-1">goals</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/6 border border-white/8 rounded-xl px-4 py-2.5">
            <TrendingUp size={16} className="text-emerald-400" />
            <div>
              <span className="text-lg font-bold font-display text-emerald-400">+12%</span>
              <span className="text-xs text-white/40 ml-1">this week</span>
            </div>
          </div>
        </motion.div>
      </div>
    </BentoTile>
  );
}
