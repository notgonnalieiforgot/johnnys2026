"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Parallax: background scrolls slower than foreground.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const fade = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.25 + i * 0.12,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-[100svh] w-full overflow-hidden grain"
      aria-label="Hero"
    >
      {/* Layer 1 — deepest background: gradient + atmospheric vapor placeholder */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: bgY }}
        className="absolute inset-0 -z-30"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-950 to-black" />
        {/* Cinematic vapor placeholder — replace with <video> later */}
        <div
          className="absolute inset-0 opacity-60 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 30% 35%, rgba(220,38,38,0.28), transparent 60%), radial-gradient(ellipse 60% 50% at 75% 60%, rgba(239,68,68,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 50% 85%, rgba(255,255,255,0.05), transparent 60%)",
          }}
        />
      </motion.div>

      {/* Layer 2 — mid drifting blobs (slower than fg, faster than bg) */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: midY }}
        className="absolute inset-0 -z-20"
      >
        <div className="absolute -top-32 -left-20 w-[40rem] h-[40rem] rounded-full bg-crimson-500/10 blur-3xl animate-drift" />
        <div className="absolute top-1/3 -right-24 w-[36rem] h-[36rem] rounded-full bg-crimson-600/10 blur-3xl animate-drift [animation-delay:-2s]" />
        <div className="absolute -bottom-20 left-1/3 w-[30rem] h-[30rem] rounded-full bg-crimson-700/10 blur-3xl animate-drift [animation-delay:-5s]" />
      </motion.div>

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]"
      />

      {/* Foreground content */}
      <motion.div
        style={reduce ? undefined : { y: fgY, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-40 lg:pt-48 pb-24 min-h-[100svh] flex flex-col justify-center"
      >
        <motion.span
          custom={0}
          initial="hidden"
          animate="show"
          variants={fade}
          className="label-eyebrow inline-flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Est. 2014 · Tampa Bay
        </motion.span>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-6 font-display text-5xl sm:text-6xl lg:text-8xl xl:text-[7.5rem] leading-[0.95] tracking-tight text-balance max-w-5xl"
        >
          Tampa Bay&rsquo;s{" "}
          <span className="italic text-crimson-400">Premier</span> Smoke Shop
          <span className="text-bone/40"> &amp; </span>
          <span className="italic text-bone">Kava Bar</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-8 max-w-xl text-lg text-bone/70 leading-relaxed"
        >
          Eight neighborhood bars pouring fresh-brewed Kratom and Kava since 2017.
          Glass, vapes, Delta-8, and a crew that actually knows the menu.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="#products" className="btn-primary group">
            Explore the Menu
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#locations" className="btn-ghost group">
            <MapPin className="w-4 h-4" />
            8 Locations
          </a>
        </motion.div>

        {/* Quick stats strip — clay pill cluster */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-20 lg:mt-28 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl"
        >
          {[
            { k: "8", v: "Locations" },
            { k: "11 yrs", v: "Serving Tampa Bay" },
            { k: "Daily", v: "Fresh Kratom Brew" },
            { k: "21+", v: "Welcome Inside" },
          ].map((s) => (
            <div
              key={s.v}
              className="clay-sm px-5 py-5 flex flex-col gap-1"
            >
              <div className="font-display text-2xl lg:text-3xl text-crimson-400">
                {s.k}
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-bone/55">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-bone/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative w-px h-10 overflow-hidden bg-white/10">
          <motion.span
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-crimson-400"
          />
        </span>
      </motion.div>
    </section>
  );
}
