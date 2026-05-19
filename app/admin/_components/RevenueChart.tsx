"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

// 30 days of mock daily revenue + point redemptions
const DATA = Array.from({ length: 30 }).map((_, i) => {
  const day = i + 1;
  const base = 1200 + Math.sin(i / 3) * 200 + (i / 30) * 400;
  const weekend = day % 7 === 0 || day % 7 === 6 ? 600 : 0;
  return {
    day: `D${day}`,
    revenue: Math.round(base + weekend + Math.random() * 220),
    redemptions: Math.round(40 + Math.sin(i / 2) * 18 + Math.random() * 14),
  };
});

export default function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="clay-sm p-6 lg:p-7"
    >
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-bone/45">
            Last 30 Days
          </div>
          <h3 className="font-display text-2xl tracking-tight mt-1">
            Revenue & Point Redemptions
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-2 text-bone/70">
            <span className="w-2.5 h-2.5 rounded-full bg-crimson-400" />
            Revenue
          </span>
          <span className="flex items-center gap-2 text-bone/70">
            <span className="w-2.5 h-2.5 rounded-full bg-bone/70" />
            Redemptions
          </span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="grad-rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad-red" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5efe6" stopOpacity={0.32} />
                <stop offset="100%" stopColor="#f5efe6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="rgba(245,239,230,0.35)"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval={3}
            />
            <YAxis
              stroke="rgba(245,239,230,0.35)"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={48}
            />
            <Tooltip
              cursor={{ stroke: "rgba(220,38,38,0.3)", strokeWidth: 1 }}
              contentStyle={{
                background: "rgba(14,8,8,0.95)",
                border: "1px solid rgba(220,38,38,0.25)",
                borderRadius: 14,
                color: "#f5efe6",
                fontSize: 12,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "rgba(245,239,230,0.55)" }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#grad-rev)"
            />
            <Area
              type="monotone"
              dataKey="redemptions"
              stroke="#f5efe6"
              strokeWidth={2}
              fill="url(#grad-red)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
