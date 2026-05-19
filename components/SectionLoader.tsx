"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Near-native loading screen.
 *
 * Triggers:
 *   1. Click on any in-page anchor link (a[href^="#"]) — shows the overlay briefly
 *      and lets the browser smooth-scroll while the "J" plays.
 *   2. Route change — usePathname() change re-fires the animation on full nav.
 *
 * The "J" uses Pacifico (--font-script) to closely match the original brush
 * lettering. Pulse + draw-stroke pseudo-effect via a layered overlay mask.
 */
export default function SectionLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRender = useRef(true);

  function show(duration = 750) {
    if (timer.current) clearTimeout(timer.current);
    setVisible(true);
    timer.current = setTimeout(() => setVisible(false), duration);
  }

  // Fire on route change (skip the initial mount so we don't flash on first paint)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    show(800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Allow any component to programmatically request the loader.
  // Dispatch via: window.dispatchEvent(new CustomEvent("johnny:show-loader", { detail: { duration: 800 }}))
  useEffect(() => {
    function onShow(e: Event) {
      const detail = (e as CustomEvent<{ duration?: number }>).detail;
      show(detail?.duration ?? 800);
    }
    window.addEventListener("johnny:show-loader", onShow);
    return () => window.removeEventListener("johnny:show-loader", onShow);
  }, []);

  // Listen for in-page anchor clicks at the document level
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // Respect modifier-clicks (open in new tab etc.)
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href");
      // Ignore bare "#" buttons (often used as no-op anchors in stubs)
      if (!href || href === "#") return;

      // Let the browser handle the scroll, just paint the loader
      show(700);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Cleanup
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
          aria-hidden="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink-950/85 backdrop-blur-md"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at center, rgba(220,38,38,0.18), transparent 60%)",
            }}
          />

          {/* Animated J */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, filter: "blur(8px)" }}
            animate={{
              scale: [0.6, 1.08, 1],
              opacity: [0, 1, 1],
              filter: ["blur(8px)", "blur(0px)", "blur(0px)"],
            }}
            exit={{ scale: 1.2, opacity: 0, filter: "blur(6px)" }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.6, 1],
            }}
            className="relative"
          >
            <span
              className="j-loader-text font-script select-none leading-none block"
              style={{ fontSize: "clamp(8rem, 22vw, 18rem)" }}
            >
              J
            </span>

            {/* Underline shimmer to suggest "loading" */}
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-[3px] w-32 origin-left rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #ef4444, transparent)",
                boxShadow: "0 0 14px rgba(220,38,38,0.7)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
