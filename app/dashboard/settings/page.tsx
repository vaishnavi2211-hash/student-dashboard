"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe, ChevronRight } from "lucide-react";

const SECTIONS = [
  { title: "Profile", icon: User, color: "#22d3ee", items: ["Display Name", "Email Address", "Profile Picture", "Bio"] },
  { title: "Notifications", icon: Bell, color: "#8b5cf6", items: ["Daily Reminders", "Course Updates", "Achievement Alerts", "Weekly Summary"] },
  { title: "Privacy & Security", icon: Shield, color: "#10b981", items: ["Change Password", "Two-Factor Auth", "Active Sessions", "Data Export"] },
  { title: "Appearance", icon: Palette, color: "#f59e0b", items: ["Theme", "Font Size", "Compact Mode", "Animations"] },
  { title: "Language & Region", icon: Globe, color: "#f43f5e", items: ["Language", "Timezone", "Date Format"] },
];

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[800px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/40 text-sm mt-1">Manage your account preferences</p>
      </div>
      <div className="space-y-4">
        {SECTIONS.map((section, i) => { const Icon = section.icon; return (
          <motion.div key={section.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }} className="rounded-2xl border border-white/6 bg-bg-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${section.color}15`, border: `1px solid ${section.color}25` }}>
                <Icon size={15} style={{ color: section.color }} />
              </div>
              <h2 className="font-display font-semibold text-white text-sm">{section.title}</h2>
            </div>
            <div>
              {section.items.map((item) => (
                <button key={item} className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/3 transition-colors group border-b border-white/3 last:border-0">
                  <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{item}</span>
                  <ChevronRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        );})}
      </div>
    </div>
  );
}