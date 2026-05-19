"use client";

import { useId, type ReactElement } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CLAY_AVATAR_SIZES,
  type ClayAvatarSize,
  type ClayAvatarVariant,
} from "./types";

type ClayAvatarProps = {
  variant: ClayAvatarVariant;
  size?: ClayAvatarSize;
  className?: string;
  label?: string;
  float?: boolean;
};

type AvatarCtx = { filterId: string; highlightId: string };

function ClayFilterDefs({ filterId }: { filterId: string }) {
  return (
    <defs>
      <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.45" />
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#fff" floodOpacity="0.12" />
      </filter>
    </defs>
  );
}

function HeadBase({ skin, highlightId }: { skin: string; highlightId: string }) {
  return (
    <>
      <ellipse cx="60" cy="52" rx="34" ry="36" fill={skin} />
      <ellipse cx="60" cy="48" rx="28" ry="26" fill={`url(#${highlightId})`} opacity="0.35" />
      <circle cx="48" cy="50" r="3.2" fill="#1a1010" />
      <circle cx="72" cy="50" r="3.2" fill="#1a1010" />
      <ellipse cx="60" cy="58" rx="5" ry="4" fill="#c4956a" opacity="0.5" />
    </>
  );
}

function AvatarBeanie({ filterId, highlightId }: AvatarCtx) {
  return (
    <g filter={`url(#${filterId})`}>
      <path
        d="M28 44c4-18 24-28 32-28s28 10 32 28c-2 2-8 4-14 5-6 14-22 14-32 0-6-1-12-3-14-5z"
        fill="#dc2626"
      />
      <path d="M26 48h68c0 8-14 12-34 12S26 56 26 48z" fill="#b91c1c" />
      <HeadBase skin="#d4a574" highlightId={highlightId} />
      <path
        d="M34 68c2 14 16 22 26 22s24-8 26-22c-8 6-18 10-26 10s-18-4-26-10z"
        fill="#2a1818"
      />
      <path d="M48 74c4 4 8 6 12 6s8-2 12-6" stroke="#ef4444" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

function AvatarGlasses({ filterId, highlightId }: AvatarCtx) {
  return (
    <g filter={`url(#${filterId})`}>
      <path d="M32 28c8-6 20-8 28-6 10 2 18 10 20 20H32z" fill="#4a3020" />
      <HeadBase skin="#8d5524" highlightId={highlightId} />
      <rect x="38" y="44" width="18" height="14" rx="5" fill="#1a1010" />
      <rect x="64" y="44" width="18" height="14" rx="5" fill="#1a1010" />
      <path d="M56 50h8" stroke="#1a1010" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M34 72c4 16 18 24 26 24s22-8 26-24c-8 8-18 12-26 12s-18-4-26-12z"
        fill="#3d2818"
      />
      <path d="M44 78c6 8 14 12 16 12s10-4 16-12" fill="#fafaf7" />
      <path d="M28 98h64l-6 18H34z" fill="#f472b6" />
      <circle cx="52" cy="108" r="2" fill="#1a1010" />
      <circle cx="68" cy="108" r="2" fill="#1a1010" />
    </g>
  );
}

function AvatarThumbs({ filterId, highlightId }: AvatarCtx) {
  return (
    <g filter={`url(#${filterId})`}>
      <path d="M30 26c6-8 18-12 30-10 12 2 22 10 24 22H30z" fill="#3d2818" />
      <HeadBase skin="#e8b88a" highlightId={highlightId} />
      <rect x="38" y="44" width="18" height="14" rx="5" fill="#1a1010" />
      <rect x="64" y="44" width="18" height="14" rx="5" fill="#1a1010" />
      <path d="M56 50h8" stroke="#1a1010" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M36 70c2 14 14 22 24 22s22-8 24-22c-6 6-14 10-24 10s-18-4-24-10z"
        fill="#2a1818"
      />
      <path d="M22 108h76v22c0 6-34 10-38 10S22 136 22 130z" fill="#1a1010" />
      <circle cx="42" cy="118" r="5" fill="#dc2626" stroke="#fafaf7" strokeWidth="1.5" />
      <path d="M88 108c8-4 14 2 14 10 0 8-6 14-14 12-4-8-2-16 0-22z" fill="#e8b88a" />
      <path d="M90 98l10-6 4 8-8 4z" fill="#e8b88a" />
    </g>
  );
}

function AvatarThink({ filterId, highlightId }: AvatarCtx) {
  return (
    <g filter={`url(#${filterId})`}>
      <ellipse cx="60" cy="38" rx="30" ry="8" fill="#9ca3af" />
      <HeadBase skin="#f0d5b8" highlightId={highlightId} />
      <rect x="40" y="44" width="16" height="12" rx="4" fill="none" stroke="#9ca3af" strokeWidth="2" />
      <rect x="64" y="44" width="16" height="12" rx="4" fill="none" stroke="#9ca3af" strokeWidth="2" />
      <path d="M56 50h8" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 62c4 2 8 3 10 3s6-1 10-3" stroke="#a39689" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M22 100h76v28c0 8-34 12-38 12S22 136 22 128z" fill="#1a1010" />
      <path d="M78 88c10-6 18 0 16 12-2 10-12 14-18 10-2-8 0-16 2-22z" fill="#f0d5b8" />
    </g>
  );
}

function AvatarHijab({ filterId, highlightId }: AvatarCtx) {
  return (
    <g filter={`url(#${filterId})`}>
      <path
        d="M24 52c0-24 36-36 36-36s36 12 36 36c-4 20-16 32-36 36-20-4-32-16-36-36z"
        fill="#ec4899"
      />
      <path d="M36 40c8-8 16-10 24-8 8 2 14 8 16 16H40z" fill="#86efac" opacity="0.85" />
      <HeadBase skin="#d4a574" highlightId={highlightId} />
      <rect x="40" y="46" width="16" height="12" rx="4" fill="#1a1010" />
      <rect x="64" y="46" width="16" height="12" rx="4" fill="#1a1010" />
      <path d="M56 52h8" stroke="#1a1010" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 64c4 2 8 3 10 3s6-1 10-3" stroke="#a39689" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M26 102h68v26c0 6-30 10-34 10S26 134 26 128z" fill="#a855f7" />
    </g>
  );
}

function AvatarSmile({ filterId, highlightId }: AvatarCtx) {
  return (
    <g filter={`url(#${filterId})`}>
      <path d="M32 28c10-10 24-12 28-10 6 2 12 8 14 18H32z" fill="#3d2818" />
      <HeadBase skin="#6b4423" highlightId={highlightId} />
      <path
        d="M38 72c4 18 16 26 22 26s18-8 22-26c-6 10-14 14-22 14s-16-4-22-14z"
        fill="#2a1818"
      />
      <path d="M42 76c6 10 14 14 18 14s12-4 18-14" fill="#fafaf7" />
      <path d="M26 100h68l-4 24H30z" fill="#f97316" />
      <rect x="34" y="108" width="10" height="8" rx="2" fill="#ea580c" opacity="0.5" />
    </g>
  );
}

const VARIANT_RENDER: Record<ClayAvatarVariant, (ctx: AvatarCtx) => ReactElement> = {
  beanie: AvatarBeanie,
  glasses: AvatarGlasses,
  thumbs: AvatarThumbs,
  think: AvatarThink,
  hijab: AvatarHijab,
  smile: AvatarSmile,
};

/** Claymorphism avatar — styled after /public/design-references/clay-avatars-style-*.png */
export default function ClayAvatar({
  variant,
  size = "md",
  className,
  label,
  float = false,
}: ClayAvatarProps) {
  const uid = useId().replace(/:/g, "");
  const filterId = `clay-shadow-${uid}`;
  const highlightId = `clay-skin-${uid}`;
  const px = CLAY_AVATAR_SIZES[size];
  const Render = VARIANT_RENDER[variant];
  const Wrapper = float ? motion.span : "span";

  return (
    <Wrapper
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className
      )}
      style={{ width: px, height: px * 1.15 }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={!label}
      {...(float
        ? {
            animate: { y: [0, -6, 0] },
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }
        : {})}
    >
      <span className="absolute inset-0 rounded-[28%] clay-inset ring-1 ring-white/5" aria-hidden />
      <svg
        viewBox="0 0 120 140"
        width={px * 0.88}
        height={px * 1.02}
        className="relative z-10 drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={highlightId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ClayFilterDefs filterId={filterId} />
        <Render filterId={filterId} highlightId={highlightId} />
      </svg>
    </Wrapper>
  );
}
