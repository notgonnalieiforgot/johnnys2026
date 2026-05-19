"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { LOCATIONS } from "@/lib/locations";

export default function Locations() {
  const [activeId, setActiveId] = useState(LOCATIONS[0].id);
  const active = LOCATIONS.find((l) => l.id === activeId) ?? LOCATIONS[0];

  return (
    <section
      id="locations"
      aria-label="Our locations"
      className="relative py-28 lg:py-40 overflow-hidden bg-ink-950 grain"
    >
      <div
        aria-hidden
        className="absolute -top-20 right-1/2 w-[44rem] h-[44rem] rounded-full bg-crimson-700/[0.05] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-20">
          <div>
            <span className="label-eyebrow">Find Us</span>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight max-w-2xl text-balance">
              Eight bars. <span className="italic text-bone">One vibe.</span>
            </h2>
          </div>
          <p className="max-w-md text-bone/65 leading-relaxed">
            From Gulfport sunsets to Brandon late-nights — pick your room, we'll have a tea ready.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Location list — staggered cascade */}
          <motion.ul
            className="lg:col-span-7 space-y-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07 } },
            }}
          >
            {LOCATIONS.map((loc, i) => (
              <motion.li
                key={loc.id}
                variants={{
                  hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
                  show: {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <button
                  onClick={() => setActiveId(loc.id)}
                  onMouseEnter={() => setActiveId(loc.id)}
                  aria-pressed={activeId === loc.id}
                  className={`group relative w-full text-left flex items-center justify-between gap-6
                    rounded-2xl border px-5 lg:px-7 py-5 lg:py-6 transition-all duration-500
                    ${
                      activeId === loc.id
                        ? "border-crimson-400/40 bg-gradient-to-r from-crimson-500/10 to-transparent"
                        : "border-white/8 hover:border-white/20 bg-ink-900/40"
                    }`}
                >
                  <div className="flex items-center gap-5 min-w-0">
                    <span
                      className={`font-display text-2xl lg:text-3xl w-12 shrink-0 transition-colors
                        ${activeId === loc.id ? "text-crimson-400" : "text-bone/30"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-2xl lg:text-3xl tracking-tight truncate">
                        {loc.name}
                      </h3>
                      <p className="text-sm text-bone/55 truncate">{loc.area}</p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className={`w-5 h-5 shrink-0 transition-all duration-500
                      ${
                        activeId === loc.id
                          ? "text-crimson-400 -rotate-0"
                          : "text-bone/30 -rotate-45 group-hover:rotate-0 group-hover:text-bone"
                      }`}
                  />
                </button>
              </motion.li>
            ))}
          </motion.ul>

          {/* Active location detail panel */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 lg:sticky lg:top-28 self-start"
          >
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="glass-strong rounded-3xl p-7 lg:p-9"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-7 relative bg-gradient-to-br from-ink-800 to-ink-900 border border-white/5">
                {/* Stylized map placeholder using lat/lng for hint */}
                <MapPlaceholder lat={active.lat} lng={active.lng} />
                <div className="absolute top-4 left-4 glass rounded-full px-3 py-1.5 text-xs text-bone/80">
                  {active.area}
                </div>
              </div>

              <h3 className="font-display text-3xl lg:text-4xl tracking-tight">
                {active.name}
              </h3>

              <ul className="mt-6 space-y-3 text-bone/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-crimson-400 shrink-0" />
                  <span className="text-sm leading-relaxed">{active.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-1 text-crimson-400 shrink-0" />
                  <a
                    href={`tel:${active.phone.replace(/\D/g, "")}`}
                    className="text-sm hover:text-crimson-400 transition-colors"
                  >
                    {active.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-1 text-crimson-400 shrink-0" />
                  <span className="text-sm">{active.hours}</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={
                    active.directionsUrl ??
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      active.address
                    )}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm py-2.5 px-5"
                >
                  Get Directions
                </a>
                <a
                  href={`tel:${active.phone.replace(/\D/g, "")}`}
                  className="btn-ghost text-sm py-2.5 px-5"
                >
                  Call
                </a>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function MapPlaceholder({ lat, lng }: { lat: number; lng: number }) {
  // Deterministic decorative SVG — not a real map, no external requests.
  const hash = Math.abs(Math.sin(lat * lng) * 1000) % 1;

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#15120f" />
          <stop offset="100%" stopColor="#0c0a09" />
        </linearGradient>
        <radialGradient id="pin" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#d4a574" />
          <stop offset="100%" stopColor="#b8884f" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#mapBg)" />
      {/* Stylized "streets" */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          y1={20 + i * 38 + hash * 8}
          x2="400"
          y2={20 + i * 38 - hash * 6}
          stroke="rgba(245,239,230,0.05)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={20 + i * 40 + hash * 6}
          y1="0"
          x2={20 + i * 40 - hash * 4}
          y2="300"
          stroke="rgba(245,239,230,0.05)"
          strokeWidth="1"
        />
      ))}
      {/* Pin */}
      <g transform="translate(200,150)">
        <circle r="32" fill="url(#pin)" opacity="0.18" />
        <circle r="18" fill="url(#pin)" opacity="0.35" />
        <circle r="6" fill="#e7b770" />
      </g>
    </svg>
  );
}
