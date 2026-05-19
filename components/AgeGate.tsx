"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";

type Status = "checking" | "prompt" | "denied" | "verified";

const SESSION_KEY = "johnny_age_verified";

export default function AgeGate() {
  const [status, setStatus] = useState<Status>("checking");

  // On mount, decide whether the gate should render. SSR renders nothing.
  useEffect(() => {
    try {
      const ok = window.sessionStorage.getItem(SESSION_KEY) === "yes";
      setStatus(ok ? "verified" : "prompt");
    } catch {
      // Privacy-mode browsers can throw on sessionStorage — fall back to gating.
      setStatus("prompt");
    }
  }, []);

  // Lock body scroll while the gate is showing.
  useEffect(() => {
    if (status === "prompt" || status === "denied") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [status]);

  function onYes() {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "yes");
    } catch {
      /* sessionStorage can fail in private mode; we still let them in this session */
    }
    // Trigger the brand loader as we drop them into the experience
    window.dispatchEvent(
      new CustomEvent("johnny:show-loader", { detail: { duration: 900 } })
    );
    setStatus("verified");
  }

  function onNo() {
    setStatus("denied");
  }

  return (
    <AnimatePresence>
      {(status === "prompt" || status === "denied") && (
        <motion.div
          key="age-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
          className="fixed inset-0 z-[10000] flex items-center justify-center px-5"
        >
          {/* Backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 bg-ink-950/90 backdrop-blur-xl"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at center, rgba(220,38,38,0.18), transparent 60%)",
            }}
          />

          <motion.div
            initial={{ y: 24, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="clay-lg relative w-full max-w-md p-8 sm:p-10 text-center"
          >
            {status === "prompt" ? <Prompt onYes={onYes} onNo={onNo} /> : <Denied />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Prompt({ onYes, onNo }: { onYes: () => void; onNo: () => void }) {
  return (
    <>
      <Image
        src="/johnnys-logo.png"
        alt="Johnny's Smoke Shop & Kava Bar"
        width={999}
        height={461}
        priority
        className="h-14 w-auto mx-auto drop-shadow-[0_4px_22px_rgba(220,38,38,0.45)]"
      />

      <div className="mt-7 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson-500/10 border border-crimson-500/25 text-crimson-300">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span className="text-[10px] uppercase tracking-[0.24em]">Age Check</span>
      </div>

      <h2
        id="age-gate-title"
        className="mt-5 font-display text-3xl sm:text-4xl tracking-tight text-bone text-balance"
      >
        Are you{" "}
        <span className="font-script text-crimson-400 text-[1.4em] align-middle leading-none">
          21
        </span>{" "}
        or older?
      </h2>
      <p className="mt-3 text-sm text-bone/60 leading-relaxed max-w-xs mx-auto">
        Johnny&rsquo;s sells tobacco, vape, kava, kratom, and hemp products. You must be
        of legal age to enter.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onYes}
          className="btn-primary w-full justify-center"
        >
          Yes, I&rsquo;m 21+
        </button>
        <button
          type="button"
          onClick={onNo}
          className="btn-ghost w-full justify-center"
        >
          No
        </button>
      </div>

      <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-bone/35">
        By entering you accept our terms
      </p>
    </>
  );
}

function Denied() {
  return (
    <>
      <div className="mx-auto grid place-items-center w-14 h-14 rounded-full clay-inset">
        <X className="w-6 h-6 text-crimson-400" />
      </div>
      <h2 className="mt-6 font-display text-3xl sm:text-4xl tracking-tight">
        Come back when you&rsquo;re <span className="italic text-crimson-400">21</span>.
      </h2>
      <p className="mt-3 text-sm text-bone/60 leading-relaxed max-w-xs mx-auto">
        Johnny&rsquo;s is a 21+ establishment. Thanks for stopping by — we&rsquo;ll
        save your seat.
      </p>
      <a
        href="https://www.google.com"
        className="btn-ghost mt-7 inline-flex"
      >
        Take me back
      </a>
    </>
  );
}
