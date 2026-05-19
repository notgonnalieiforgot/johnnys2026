"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import ClayAvatar from "@/components/clay/ClayAvatar";
import ClayAvatarShowcase from "@/components/clay/ClayAvatarShowcase";
import type { ClayAvatarVariant } from "@/components/clay/types";

type Testimonial = {
  name: string;
  location: string;
  quote: string;
  variant: ClayAvatarVariant;
};

const REVIEWS: Testimonial[] = [
  {
    name: "Chad",
    location: "Clearwater",
    variant: "thumbs",
    quote:
      "Wide selection of products and fresh brewed Kratom, Kava, and coffee. The bar is set up well with a stage for live music, ping pong, video games on TV, and more. New favorite place in Clearwater.",
  },
  {
    name: "Kayla",
    location: "St. Pete",
    variant: "hijab",
    quote:
      "My boyfriend and I stumbled upon this spot one afternoon. Totally blown away with their friendly service and quality of kratom.",
  },
  {
    name: "Marcus",
    location: "Brandon",
    variant: "smile",
    quote:
      "Same brew every visit — you can tell it's made in-house. Staff actually explains what you're getting without the hard sell.",
  },
  {
    name: "Dana",
    location: "Gulfport",
    variant: "beanie",
    quote:
      "Feels like a neighborhood hangout, not a corner store. Good music, cold tap, and they remember your usual.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="reviews"
      aria-label="Customer reviews"
      className="relative py-28 lg:py-40 overflow-hidden bg-ink-950"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(220,38,38,0.14),transparent_55%)]"
      />

      <motion.div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="label-eyebrow">Real regulars</span>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight text-balance">
              The community <span className="italic text-crimson-400">keeps showing up.</span>
            </h2>
            <p className="mt-6 text-bone/65 leading-relaxed max-w-md">
              Eight bars across Tampa Bay — same fresh tap, same crew energy. Here&apos;s what
              people are saying after they pull up a stool.
            </p>

            <ClayAvatarShowcase className="mt-10 hidden sm:block" />

            <div className="mt-8 flex items-center gap-4 clay-sm px-5 py-4 max-w-xs">
              <ClayAvatar variant="beanie" size="sm" label="Clay avatar style reference" />
              <ClayAvatar variant="glasses" size="sm" float />
              <p className="text-xs text-bone/55 leading-relaxed">
                Pillowy clay avatars inspired by our design references — friendly, tactile, and
                on-brand.
              </p>
            </div>
          </div>

          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {REVIEWS.map((t, i) => (
              <motion.li
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="clay p-6 lg:p-7 flex flex-col gap-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <ClayAvatar
                    variant={t.variant}
                    size="md"
                    label={`Avatar for ${t.name}`}
                  />
                  <Quote className="w-8 h-8 text-crimson-500/40 shrink-0" aria-hidden />
                </div>
                <blockquote className="text-bone/80 text-sm leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="clay-divider pt-4">
                  <p className="font-medium text-bone">{t.name}</p>
                  <p className="text-xs text-bone/50 mt-0.5">{t.location}</p>
                </footer>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
