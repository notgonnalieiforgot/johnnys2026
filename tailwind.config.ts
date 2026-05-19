import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand surfaces — deep red-black like cured leather
        ink: {
          950: "#070303",
          900: "#0e0808",
          800: "#170d0d",
          700: "#1f1313",
          600: "#2a1818",
          500: "#3a2020",
        },
        // Primary brand — Johnny's crimson
        crimson: {
          300: "#fda4af",
          400: "#ef4444",
          500: "#dc2626",
          600: "#b91c1c",
          700: "#991b1b",
          800: "#7f1d1d",
          900: "#5b1414",
        },
        bone: "#f5efe6",
        snow: "#fafaf7",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        script: ["var(--font-script)", "Brush Script MT", "cursive"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        // Claymorphism — pillowy, dark, with subtle inner highlight
        clay:
          "16px 16px 32px rgba(0,0,0,0.55), -4px -4px 14px rgba(220,38,38,0.05), inset 2px 2px 4px rgba(255,255,255,0.04), inset -2px -2px 4px rgba(0,0,0,0.45)",
        "clay-lg":
          "22px 22px 44px rgba(0,0,0,0.6), -6px -6px 18px rgba(220,38,38,0.06), inset 2px 2px 5px rgba(255,255,255,0.05), inset -3px -3px 6px rgba(0,0,0,0.45)",
        "clay-sm":
          "8px 8px 18px rgba(0,0,0,0.5), -2px -2px 8px rgba(220,38,38,0.04), inset 1px 1px 2px rgba(255,255,255,0.04), inset -1px -1px 2px rgba(0,0,0,0.4)",
        "clay-red":
          "12px 12px 28px rgba(0,0,0,0.55), 0 6px 24px -4px rgba(220,38,38,0.55), inset 2px 2px 4px rgba(255,255,255,0.18), inset -2px -2px 4px rgba(0,0,0,0.35)",
        "clay-pressed":
          "inset 10px 10px 20px rgba(0,0,0,0.55), inset -6px -6px 14px rgba(255,255,255,0.03)",
        "glow-red":
          "0 14px 50px -10px rgba(220,38,38,0.6), 0 6px 22px -8px rgba(220,38,38,0.4)",
      },
      backgroundImage: {
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        "radial-red":
          "radial-gradient(ellipse at top, rgba(220,38,38,0.22), transparent 60%)",
      },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-12px) translateX(6px)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scribble: {
          "0%": { strokeDashoffset: "100%" },
          "100%": { strokeDashoffset: "0%" },
        },
      },
      animation: {
        drift: "drift 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
