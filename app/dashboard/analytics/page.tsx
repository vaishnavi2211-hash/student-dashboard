"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, BookOpen, Target, Award, Zap } from "lucide-react";

const STATS = [
  { label: "Total Hours Learned", value: "142h", change: "+12%", icon: Clock, color: "#22d3ee" },
  { label: "Courses Completed", value: "8", change: "+2 this month", icon: BookOpen, color: "#8b5cf6" },
  { label: "Current Streak", value: "14 days", change: "Personal best!", icon: Zap, color: "#f59e0b" },
  { label: "Goals Achieved", value: "23", change: "+5 this week", icon: Target, color: "#10b981" },
  { label: "Certificates Earned", value: "5", change: "3 pending", icon: Award, color: "#f43f5e" },
  { label: "Weekly Progress", value: "78%", change: "+8% vs last week", icon: TrendingUp, color: "#22d3ee" },
];

const WEEKLY = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 0.5 },
  { day: "Fri", hours: 2.1 },
  { day: "Sat", hours: 4.0 },
  { day: "Sun", hours: 1.2 },
];

const MAX_HOURS = Math.max(...WEEKLY.map((d) => d.hours));

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white">Analytics</h1>
        <p className="text-white/40 text-sm mt-1">Your learning performance overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="rounded-2xl border border-white/6 bg-bg-card p-5 relative overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 60% at 90% 10%, ${stat.color}10 0%, transparent 70%)` }} />
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                <Icon size={17} style={{ color: stat.color }} />
              </div>
              <p className="font-display text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-white/40 text-xs mb-2">{stat.label}</p>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                {stat.change}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="rounded-2xl border border-white/6 bg-bg-card p-6"
      >
        <h2 className="font-display font-semibold text-white mb-6">Hours This Week</h2>
        <div className="flex items-end gap-3 h-40">
          {WEEKLY.map((day, i) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-white/50">{day.hours}h</span>
              <motion.div
                className="w-full rounded-t-lg"
                initial={{ height: 0 }}
                animate={{ height: `${(day.hours / MAX_HOURS) * 120}px` }}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ background: "linear-gradient(to top, rgba(34,211,238,0.8), rgba(34,211,238,0.3))" }}
              />
              <span className="text-xs text-white/40">{day.day}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}