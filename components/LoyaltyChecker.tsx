"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Gift,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { checkLoyaltyPoints, type LoyaltyResult } from "@/app/actions/loyalty";

export default function LoyaltyChecker() {
  const [result, setResult] = useState<LoyaltyResult | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await checkLoyaltyPoints(fd);
      setResult(res);
    });
  }

  function reset() {
    setResult(null);
  }

  return (
    <section
      id="rewards"
      aria-label="Loyalty rewards"
      className="relative py-28 lg:py-40 overflow-hidden bg-ink-950"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(212,165,116,0.12),transparent_60%)]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="label-eyebrow">Johnny&rsquo;s Rewards</span>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight text-balance">
              Every pour <span className="italic text-crimson-400">earns you back.</span>
            </h2>
            <p className="mt-6 text-bone/65 leading-relaxed max-w-md">
              Members earn 1 point per dollar across every location. Check your balance
              in seconds — no app, no account login. Just your phone.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-bone/75">
              {[
                "100 pts · Free house tea",
                "250 pts · 20% off any vape",
                "500 pts · Kratom tea + vape discount",
                "1000 pts · Glass piece voucher",
              ].map((r) => (
                <li key={r} className="flex items-center gap-3">
                  <Sparkles className="w-3.5 h-3.5 text-crimson-400" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative glass-strong rounded-3xl p-7 lg:p-10 overflow-hidden"
            >
              {/* Decorative glow */}
              <div
                aria-hidden
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-crimson-500/15 blur-3xl pointer-events-none"
              />

              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Gift className="w-4 h-4 text-crimson-400" />
                      <span className="label-eyebrow">Check Your Points</span>
                    </div>
                    <h3 className="font-display text-2xl lg:text-3xl tracking-tight">
                      Your reward, in one tap.
                    </h3>
                    <p className="mt-2 text-sm text-bone/55">
                      We only need your phone number. We&rsquo;ll never display your name,
                      email, or visits on this screen.
                    </p>

                    <div className="mt-7 space-y-4">
                      <Field
                        label="Phone number"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="(727) 555-0123"
                        required
                      />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field
                          label="Email (optional)"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                        />
                        <Field
                          label="Last name (optional)"
                          name="lastName"
                          type="text"
                          autoComplete="family-name"
                          placeholder="For account matching"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={pending}
                      className="btn-primary mt-7 w-full sm:w-auto group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {pending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Looking up…
                        </>
                      ) : (
                        <>
                          Check Balance
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="mt-4 text-[11px] text-bone/40 leading-relaxed max-w-md">
                      Phone numbers are hashed server-side before lookup. This form returns
                      only your point balance — never your personal info.
                    </p>
                  </motion.form>
                ) : result.ok ? (
                  <Success result={result} onReset={reset} />
                ) : (
                  <Failure error={result.error} onReset={reset} />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, name, ...rest } = props;
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.24em] text-bone/50 mb-2">
        {label}
      </span>
      <input
        {...rest}
        name={name}
        className="w-full rounded-xl bg-ink-900/60 border border-white/10 px-4 py-3 text-bone placeholder:text-bone/30
                   focus:outline-none focus:border-crimson-400/60 focus:ring-4 focus:ring-crimson-500/10
                   transition-all duration-200"
      />
    </label>
  );
}

function Success({
  result,
  onReset,
}: {
  result: Extract<LoyaltyResult, { ok: true }>;
  onReset: () => void;
}) {
  const { points, tier, nextReward } = result;

  // Reward thresholds mirror the server action's REWARDS list. Sharing a constant
  // means the progress bar fills accurately whether the next gap is 100 or 1000 pts.
  const REWARD_THRESHOLDS = [0, 100, 250, 500, 1000, 2000];
  const tierStart =
    REWARD_THRESHOLDS.filter((t) => t < nextReward.thresholdAt).pop() ?? 0;
  const span = Math.max(1, nextReward.thresholdAt - tierStart);
  const progress =
    nextReward.pointsAway === 0
      ? 100
      : Math.min(100, Math.max(0, ((points - tierStart) / span) * 100));

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="flex items-center gap-2 mb-1">
        <CheckCircle2 className="w-4 h-4 text-bone" />
        <span className="label-eyebrow">Account Found</span>
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <motion.span
          key={points}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-7xl lg:text-8xl text-crimson-400 tracking-tighter"
        >
          {points}
        </motion.span>
        <span className="font-display text-2xl text-bone/55">pts</span>
        <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs uppercase tracking-[0.2em] bg-crimson-500/10 text-crimson-400 border border-crimson-400/20">
          {tier}
        </span>
      </div>

      {nextReward.pointsAway > 0 ? (
        <p className="mt-5 text-lg text-bone/85 leading-relaxed max-w-xl">
          You&rsquo;re only{" "}
          <span className="text-crimson-400 font-medium">
            {nextReward.pointsAway} points
          </span>{" "}
          away from a{" "}
          <span className="text-bone font-medium">{nextReward.name}</span>.{" "}
          <span className="text-bone/55">Stop by today.</span>
        </p>
      ) : (
        <p className="mt-5 text-lg text-bone/85 max-w-xl">
          You&rsquo;ve unlocked every standard reward. Ask the bar about{" "}
          <span className="text-crimson-400 font-medium">VIP pour-outs.</span>
        </p>
      )}

      {/* Progress bar */}
      <div className="mt-8">
        <div className="flex justify-between text-[11px] uppercase tracking-[0.22em] text-bone/45 mb-2">
          <span>Progress</span>
          <span>
            {points} / {nextReward.thresholdAt}
          </span>
        </div>
        <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-crimson-500 to-crimson-400 shadow-[0_0_24px_-4px_rgba(212,165,116,0.8)]"
          />
          {/* Shimmer overlay */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ width: "40%" }}
          />
        </div>
      </div>

      <div className="mt-9 flex flex-wrap gap-3">
        <a href="#locations" className="btn-primary group">
          Find a Bar
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
        <button onClick={onReset} className="btn-ghost">
          Check Another Number
        </button>
      </div>
    </motion.div>
  );
}

function Failure({ error, onReset }: { error: string; onReset: () => void }) {
  return (
    <motion.div
      key="failure"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-4 h-4 text-crimson-400" />
        <span className="label-eyebrow">Hmm</span>
      </div>
      <h3 className="font-display text-3xl tracking-tight">We couldn&rsquo;t find that.</h3>
      <p className="mt-3 text-bone/70 max-w-md leading-relaxed">{error}</p>
      <button onClick={onReset} className="btn-ghost mt-7">
        Try Again
      </button>
    </motion.div>
  );
}
