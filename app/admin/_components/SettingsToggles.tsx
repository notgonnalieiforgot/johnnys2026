"use client";

import { useState } from "react";
import { toast } from "@/components/Toaster";

type Item = { id: string; label: string; description: string; initial: boolean };

const ITEMS: Item[] = [
  {
    id: "new-customer",
    label: "New customer alerts",
    description: "Push notification when a new member enrolls.",
    initial: true,
  },
  {
    id: "low-stock",
    label: "Low-stock SMS",
    description: "Text managers when a critical SKU drops below reorder.",
    initial: true,
  },
  {
    id: "digest",
    label: "Daily revenue digest",
    description: "Morning email summarizing yesterday's totals.",
    initial: false,
  },
];

export default function SettingsToggles() {
  const [state, setState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(ITEMS.map((i) => [i.id, i.initial]))
  );

  function toggle(id: string, label: string) {
    setState((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      toast({
        title: `${label} ${next[id] ? "enabled" : "disabled"}`,
        description: "Notification preferences saved.",
        tone: "success",
      });
      return next;
    });
  }

  return (
    <div className="space-y-3.5 text-sm">
      {ITEMS.map((i) => {
        const enabled = state[i.id];
        return (
          <button
            key={i.id}
            type="button"
            onClick={() => toggle(i.id, i.label)}
            aria-pressed={enabled}
            className="w-full flex items-center justify-between gap-4 text-left rounded-xl px-3 py-2 -mx-3 hover:bg-white/[0.025] transition-colors"
          >
            <span className="min-w-0">
              <span className="block text-bone leading-tight">{i.label}</span>
              <span className="block mt-0.5 text-xs text-bone/50 leading-snug">
                {i.description}
              </span>
            </span>
            <span
              aria-hidden
              className={`relative inline-block w-10 h-6 rounded-full shrink-0 transition-colors ${
                enabled ? "bg-crimson-500" : "bg-ink-700"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-bone shadow transition-transform duration-200 ${
                  enabled ? "translate-x-[18px]" : "translate-x-0.5"
                }`}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
