"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, BookOpen, Clock, Star, Target, Award, Flame } from "lucide-react";

const ACHIEVEMENTS = [
  { title: "First Step", desc: "Completed your first lesson", icon: Star, color: "#f59e0b", earned: true },
  { title: "Speed Learner", desc: "Finished a course in under 7 days", icon: Zap, color: "#22d3ee", earned: true },
  { title: "Bookworm", desc: "Read 50+ learning resources", icon: BookOpen, color: "#8b5cf6", earned: true },
  { title: "On Fire", desc: "Maintained a 14-day streak", icon: Flame, color: "#f43f5e", earned: true },
  { title: "Night Owl", desc: "Studied after midnight 5 times", icon: Clock, color: "#10b981", earned: true },
  { title: "Overachiever", desc: "Exceeded weekly goal by 200%", icon: Target, color: "#22d3ee", earned: false },
  { title: "Champion", desc: "Top 10% of all learners", icon: Trophy, color: "#f59e0b", earned: false },
  { title: "Master", desc: "Complete 10 courses", icon: Award, color: "#8b5cf6", earned: false },
];

export default function AchievementsPage() {
  const earned = ACHIEVEMENTS.filter((a) => a.earned);
  const locked = ACHIEVEMENTS.filter((a) => !a.earned);
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white">Achievements</h1>
        <p className="text-white/40 text-sm mt-1">{earned.length} of {ACHIEVEMENTS.length} unlocked</p>
      </div>
      <h2 className="font-display text-sm font-semibold text-white/50 mb-4 uppercase tracking-wider">Unlocked</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {earned.map((a, i) => { const Icon = a.icon; return (
          <motion.div key={a.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07, type: "spring", stiffness: 300, damping: 20 }} className="rounded-2xl border border-white/8 bg-bg-card p-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 70% at 50% 0%, ${a.color}12 0%, transparent 70%)` }} />
            <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${a.color}20`, border: `1px solid ${a.color}30` }}>
              <Icon size={22} style={{ color: a.color }} />
            </div>
            <p className="font-display font-semibold text-white text-sm mb-1">{a.title}</p>
            <p className="text-white/35 text-xs leading-snug">{a.desc}</p>
          </motion.div>
        );})}
      </div>
      <h2 className="font-display text-sm font-semibold text-white/30 mb-4 uppercase tracking-wider">Locked</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {locked.map((a, i) => { const Icon = a.icon; return (
          <motion.div key={a.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 300, damping: 20 }} className="rounded-2xl border border-white/4 bg-white/2 p-5 text-center opacity-50">
            <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-white/5">
              <Icon size={22} className="text-white/20" />
            </div>
            <p className="font-display font-semibold text-white/40 text-sm mb-1">{a.title}</p>
            <p className="text-white/20 text-xs leading-snug">{a.desc}</p>
          </motion.div>
        );})}
      </div>
    </div>
  );
}