"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { BentoTile } from "./BentoTile";

// Generate mock 12-week activity data
function generateActivityData() {
  const weeks = 12;
  const days = 7;
  const data = [];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      // Simulate realistic learning patterns
      const base = Math.random();
      const count = base > 0.35 ? Math.floor(base * 5) : 0;
      week.push(count);
    }
    data.push(week);
  }
  return data;
}

const activityData = generateActivityData();
const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

function getCellColor(count: number): string {
  if (count === 0) return "rgba(255,255,255,0.04)";
  if (count === 1) return "rgba(34,211,238,0.2)";
  if (count === 2) return "rgba(34,211,238,0.4)";
  if (count === 3) return "rgba(34,211,238,0.6)";
  return "rgba(34,211,238,0.85)";
}

export function ActivityTile() {
  return (
    <BentoTile className="min-h-[208px]" glowColor="emerald">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 p-5 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-emerald-400" />
          <h2 className="font-display font-semibold text-sm text-white">Learning Activity</h2>
          <span className="ml-auto text-xs text-white/30">Last 12 weeks</span>
        </div>

        {/* Contribution grid */}
        <div className="flex gap-1 flex-1 items-end">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-1">
            {DAY_LABELS.map((label, i) => (
              <div key={i} className="h-3 flex items-center">
                <span className="text-[9px] text-white/25 w-6">{label}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-1 flex-1 overflow-hidden">
            {activityData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1 flex-1">
                {week.map((count, di) => (
                  <motion.div
                    key={di}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: wi * 0.03 + di * 0.01,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    title={`${count} sessions`}
                    className="rounded-sm h-3 min-w-0 cursor-pointer"
                    style={{
                      backgroundColor: getCellColor(count),
                      transition: "background-color 0.2s",
                    }}
                    whileHover={{
                      scale: 1.4,
                      backgroundColor: count > 0 ? "rgba(34,211,238,1)" : "rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-3">
          <span className="text-[10px] text-white/30">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: getCellColor(level) }}
            />
          ))}
          <span className="text-[10px] text-white/30">More</span>
        </div>
      </div>
    </BentoTile>
  );
}
