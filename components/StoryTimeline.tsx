"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const CHAPTERS = [
  {
    year: "2014",
    title: "The First Door",
    body: "Johnny opens a single counter in St. Pete with a wall of glass, a few vape lines, and a stubborn refusal to feel like a gas station shop.",
  },
  {
    year: "2017",
    title: "The Kratom Tap",
    body: "We start brewing fresh Kratom in-house — actual leaves, actual water, no powder shaker. It changes the whole business overnight.",
  },
  {
    year: "2019",
    title: "Kava Joins the Bar",
    body: "Noble Kava from Vanuatu lands on tap next to the Kratom. The shop quietly becomes a bar, and our regulars become a community.",
  },
  {
    year: "2022",
    title: "The Eighth Location",
    body: "From Clearwater to Brandon, every neighborhood gets its own crew. Same brew, same standard, eight rooms that each feel like home.",
  },
];

export default function StoryTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Move the horizontal track through chapters as you scroll.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(CHAPTERS.length - 1) * 100}%`]);

  // A subtle background pan
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      id="story"
      ref={ref}
      aria-label="Our story"
      className="relative bg-ink-950"
      style={{ height: `${CHAPTERS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden grain">
        {/* Slow background */}
        <motion.div
          aria-hidden
          style={reduce ? undefined : { x: bgX }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-950 to-black" />
          <div className="absolute -top-40 left-1/4 w-[50rem] h-[50rem] rounded-full bg-crimson-500/[0.07] blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] rounded-full bg-crimson-700/[0.06] blur-3xl" />
        </motion.div>

        {/* Eyebrow */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 text-center">
          <span className="label-eyebrow">Our Story</span>
          <h2 className="mt-3 font-display text-4xl lg:text-5xl tracking-tight">
            Eleven Years, <span className="italic text-crimson-400">One Bar at a Time</span>
          </h2>
        </div>

        {/* Progress rail */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {CHAPTERS.map((c, i) => (
            <Tick key={c.year} progress={scrollYProgress} index={i} total={CHAPTERS.length} />
          ))}
        </div>

        {/* Horizontal track */}
        <motion.div
          style={reduce ? undefined : { x }}
          className="absolute inset-0 flex items-center"
        >
          {CHAPTERS.map((c, i) => (
            <Chapter key={c.year} chapter={c} index={i} progress={scrollYProgress} total={CHAPTERS.length} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Chapter({
  chapter,
  index,
  progress,
  total,
}: {
  chapter: (typeof CHAPTERS)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  // Each chapter "owns" a slice of progress
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    progress,
    [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
    [0.3, 1, 1, 0.3]
  );
  const y = useTransform(progress, [start, end], [40, -40]);

  return (
    <motion.article
      style={{ opacity }}
      className="relative shrink-0 w-screen h-screen flex items-center justify-center px-6 lg:px-20"
    >
      <motion.div style={{ y }} className="grid lg:grid-cols-12 gap-10 max-w-6xl w-full items-center">
        <div className="lg:col-span-5">
          <div className="font-display text-[clamp(8rem,18vw,16rem)] leading-none tracking-tighter bg-gradient-to-b from-crimson-400 to-crimson-600/30 bg-clip-text text-transparent">
            {chapter.year}
          </div>
        </div>
        <div className="lg:col-span-7 max-w-lg">
          <div className="text-xs uppercase tracking-[0.3em] text-bone/45 mb-4">
            Chapter {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
          <h3 className="font-display text-4xl lg:text-5xl tracking-tight mb-5 text-balance">
            {chapter.title}
          </h3>
          <p className="text-bone/75 leading-relaxed text-lg">{chapter.body}</p>
        </div>
      </motion.div>
    </motion.article>
  );
}

function Tick({
  progress,
  index,
  total,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const w = useTransform(progress, [start, end], ["0%", "100%"]);

  return (
    <div className="relative h-px w-16 bg-white/10 overflow-hidden">
      <motion.span style={{ width: w }} className="absolute inset-y-0 left-0 bg-crimson-400" />
    </div>
  );
}
