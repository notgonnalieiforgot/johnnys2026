"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus, MoreHorizontal } from "lucide-react";
import { toast } from "@/components/Toaster";

type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  points: number;
  lastVisit: string;
};

const INITIAL_CUSTOMERS: Customer[] = [
  { id: "c1", name: "Marcus Webb",   phone: "(727) 555-0182", email: "marcus.w@email.com",  points: 1820, lastVisit: "Today" },
  { id: "c2", name: "Talia Reyes",   phone: "(727) 555-0214", email: "treyes@email.com",    points: 940,  lastVisit: "Yesterday" },
  { id: "c3", name: "Jamal Carter",  phone: "(813) 555-0307", email: "jamal.c@email.com",   points: 460,  lastVisit: "2d ago" },
  { id: "c4", name: "Olivia Bennett",phone: "(727) 555-0119", email: "obennett@email.com",  points: 2150, lastVisit: "Today" },
  { id: "c5", name: "Diego Marín",   phone: "(727) 555-0388", email: "diego.m@email.com",   points: 280,  lastVisit: "4d ago" },
  { id: "c6", name: "Priya Shah",    phone: "(727) 555-0271", email: "pshah@email.com",     points: 750,  lastVisit: "1w ago" },
  { id: "c7", name: "Kai Nakamura",  phone: "(813) 555-0193", email: "kai.n@email.com",     points: 120,  lastVisit: "Today" },
  { id: "c8", name: "Brielle Foster",phone: "(727) 555-0455", email: "bfoster@email.com",   points: 1340, lastVisit: "3d ago" },
];

const POINT_STEP = 50;

export default function CustomerTable() {
  const [q, setQ] = useState("");
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [actionRowId, setActionRowId] = useState<string | null>(null);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(needle) ||
        c.phone.includes(needle) ||
        c.email.toLowerCase().includes(needle)
    );
  }, [q, customers]);

  function adjustPoints(id: string, delta: number) {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, points: Math.max(0, c.points + delta) } : c
      )
    );
    const c = customers.find((x) => x.id === id);
    if (!c) return;
    const sign = delta > 0 ? "+" : "−";
    toast({
      title: `${sign}${Math.abs(delta)} pts · ${c.name}`,
      description:
        delta > 0
          ? "Points added. Receipt sent when SMS is wired."
          : "Points deducted from the customer's balance.",
      tone: "success",
    });
  }

  function openActions(id: string, name: string) {
    setActionRowId((cur) => (cur === id ? null : id));
    toast({
      title: `Demo: actions for ${name}`,
      description:
        "Edit profile, view visits, and message will hook into the Lifelong POS once connected.",
      tone: "info",
    });
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="clay-sm overflow-hidden p-0"
    >
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 lg:p-6 border-b border-crimson-700/15">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-bone/45">
            Loyalty
          </div>
          <h3 className="font-display text-2xl tracking-tight mt-1">Customers</h3>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-bone/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, phone, email…"
            aria-label="Search customers"
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-ink-800/60 border border-white/8 text-sm placeholder:text-bone/30 focus:outline-none focus:border-crimson-400/50 focus:ring-2 focus:ring-crimson-500/15"
          />
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-bone/45 border-b border-white/5">
              <th className="px-5 lg:px-6 py-3 font-medium">Name</th>
              <th className="px-3 py-3 font-medium">Phone</th>
              <th className="px-3 py-3 font-medium hidden md:table-cell">Email</th>
              <th className="px-3 py-3 font-medium text-right">Points</th>
              <th className="px-3 py-3 font-medium hidden sm:table-cell">Last visit</th>
              <th className="px-5 lg:px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr
                key={c.id}
                className={`border-b border-white/[0.04] transition-colors ${
                  actionRowId === c.id ? "bg-crimson-500/5" : "hover:bg-white/[0.02]"
                }`}
              >
                <td className="px-5 lg:px-6 py-3.5">
                  <div className="font-medium text-bone">{c.name}</div>
                </td>
                <td className="px-3 py-3.5 text-bone/70 whitespace-nowrap">
                  {c.phone}
                </td>
                <td className="px-3 py-3.5 text-bone/55 hidden md:table-cell">
                  {c.email}
                </td>
                <td className="px-3 py-3.5 text-right">
                  <AnimatedPoints value={c.points} />
                </td>
                <td className="px-3 py-3.5 text-bone/55 hidden sm:table-cell whitespace-nowrap">
                  {c.lastVisit}
                </td>
                <td className="px-5 lg:px-6 py-3.5">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => adjustPoints(c.id, POINT_STEP)}
                      aria-label={`Add ${POINT_STEP} points to ${c.name}`}
                      title={`+${POINT_STEP} pts`}
                      className="p-1.5 rounded-md border border-crimson-400/20 bg-crimson-500/5 text-crimson-300 hover:bg-crimson-500/15 hover:border-crimson-400/45 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustPoints(c.id, -POINT_STEP)}
                      aria-label={`Deduct ${POINT_STEP} points from ${c.name}`}
                      title={`−${POINT_STEP} pts`}
                      className="p-1.5 rounded-md border border-white/8 text-bone/65 hover:text-bone hover:bg-white/5 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openActions(c.id, c.name)}
                      aria-label={`More actions for ${c.name}`}
                      className="p-1.5 rounded-md text-bone/55 hover:text-bone hover:bg-white/5 transition-colors"
                    >
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-bone/45">
                  No customers match &ldquo;{q}&rdquo;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}

function AnimatedPoints({ value }: { value: number }) {
  return (
    <span className="inline-block tabular-nums font-display text-base text-crimson-400 leading-none">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {value.toLocaleString()}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
