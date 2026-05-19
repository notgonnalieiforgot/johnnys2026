"use client";

import { motion } from "framer-motion";
import ClayAvatar from "./ClayAvatar";
import type { ClayAvatarVariant } from "./types";

const SHOWCASE: { variant: ClayAvatarVariant; delay: number }[] = [
  { variant: "thumbs", delay: 0 },
  { variant: "think", delay: 0.08 },
  { variant: "hijab", delay: 0.16 },
  { variant: "smile", delay: 0.24 },
];

/** Decorative row — matches reference image B (four bust avatars). */
export default function ClayAvatarShowcase({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden
    >
      <ul className="flex flex-wrap items-end justify-center gap-3 sm:gap-5">
        {SHOWCASE.map(({ variant, delay }) => (
          <motion.li
            key={variant}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ClayAvatar variant={variant} size="lg" float />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
