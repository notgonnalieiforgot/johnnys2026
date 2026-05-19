"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  Coins,
  Award,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Metric = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  Icon: LucideIcon;
};

const METRICS: Metric[] = [
  {
    label: "Monthly Revenue",
    value: "$42,500",
    delta: "+12% vs last month",
    trend: "up",
    Icon: DollarSign,
  },
  {
    label: "Active Members",
    value: "3,842",
    delta: "+184 this month",
    trend: "up",
    Icon: Users,
  },
  {
    label: "Points Outstanding",
    value: "1.24M",
    delta: "-3.1% redemption",
    trend: "down",
    Icon: Coins,
  },
  {
    label: "Top Category",
    value: "Kratom Tea",
    delta: "38% of revenue",
    trend: "up",
    Icon: Award,
  },
];

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {METRICS.map((m, i) => (
        <motion.article
          key={m.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="clay-sm p-6 relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="grid place-items-center w-10 h-10 rounded-2xl bg-crimson-500/10 border border-crimson-400/20 text-crimson-300">
              <m.Icon className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <span
              className={`inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] ${
                m.trend === "up" ? "text-crimson-300" : "text-bone/50"
              }`}
            >
              {m.trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
            </span>
          </div>

          <div className="mt-6">
            <div className="text-[11px] uppercase tracking-[0.22em] text-bone/45">
              {m.label}
            </div>
            <div className="mt-1.5 font-display text-3xl tracking-tight text-bone">
              {m.value}
            </div>
            <div className="mt-1 text-xs text-bone/50">{m.delta}</div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
