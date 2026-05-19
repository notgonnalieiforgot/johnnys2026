"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ToastTone = "success" | "error" | "info";

export type ToastDetail = {
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number; // ms
};

type Toast = ToastDetail & { id: number; tone: ToastTone };

const ICON: Record<ToastTone, LucideIcon> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const ACCENT: Record<ToastTone, string> = {
  success: "border-crimson-400/30 text-crimson-300",
  error: "border-crimson-400/50 text-crimson-300",
  info: "border-white/15 text-bone/85",
};

let nextId = 1;

/**
 * Programmatic helper. Works from anywhere on the client without context.
 * Example: toast({ title: "Added 50 points to Marcus", tone: "success" })
 */
export function toast(detail: ToastDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ToastDetail>("johnny:toast", { detail }));
}

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    function onToast(e: Event) {
      const detail = (e as CustomEvent<ToastDetail>).detail;
      if (!detail?.title) return;
      const id = nextId++;
      const t: Toast = { id, tone: detail.tone ?? "success", ...detail };
      setToasts((cur) => [...cur, t]);
      const ttl = detail.duration ?? 3600;
      window.setTimeout(() => {
        setToasts((cur) => cur.filter((x) => x.id !== id));
      }, ttl);
    }
    window.addEventListener("johnny:toast", onToast);
    return () => window.removeEventListener("johnny:toast", onToast);
  }, []);

  function dismiss(id: number) {
    setToasts((cur) => cur.filter((x) => x.id !== id));
  }

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-4 right-4 z-[9998] flex flex-col gap-2 max-w-sm pointer-events-none"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const Icon = ICON[t.tone];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              role="status"
              className={`clay-sm pointer-events-auto flex items-start gap-3 px-4 py-3 border ${ACCENT[t.tone]}`}
            >
              <Icon className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2.2} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-bone leading-tight">
                  {t.title}
                </div>
                {t.description && (
                  <div className="mt-0.5 text-xs text-bone/65 leading-snug">
                    {t.description}
                  </div>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="p-1 -m-1 text-bone/45 hover:text-bone transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
