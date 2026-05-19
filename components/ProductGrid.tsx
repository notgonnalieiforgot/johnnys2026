"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Leaf,
  Coffee,
  Flame,
  Wind,
  GlassWater,
  Shirt,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Product = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  Icon: LucideIcon;
  image: string;
  featured?: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "kava",
    title: "Kava",
    tagline: "Noble root, neat or shaken",
    description:
      "Traditional Vanuatu noble kava poured fresh. Calm without the dimmer switch — just steady, social ease.",
    Icon: Coffee,
    image: "/products/kava.png",
    featured: true,
  },
  {
    id: "kratom",
    title: "Kratom",
    tagline: "Brewed daily, by the leaf",
    description:
      "Fresh-brewed Kratom tea on tap. White, green, red — pick your mood, we'll handle the steep.",
    Icon: Leaf,
    image: "/products/kratom.png",
    featured: true,
  },
  {
    id: "delta-8",
    title: "Delta-8 THC",
    tagline: "Edibles, vapes, flower",
    description:
      "Lab-tested Delta-8, Delta-9, THC-A and HHC from brands we'd actually use ourselves.",
    Icon: Flame,
    image: "/products/delta-8.png",
  },
  {
    id: "vapes",
    title: "Vapes & Juices",
    tagline: "Disposables to mods",
    description:
      "Full wall of disposables, salt nic, freebase, devices, and the juice your shop never has in stock.",
    Icon: Wind,
    image: "/products/vapes.png",
  },
  {
    id: "glass",
    title: "Glass",
    tagline: "Heady to daily",
    description:
      "American heady, scientific, and clean daily-driver pieces. Hand-picked, no rebrands, no junk.",
    Icon: GlassWater,
    image: "/products/glass.png",
  },
  {
    id: "apparel",
    title: "Apparel",
    tagline: "Wear the bar",
    description:
      "Heavyweight tees, hoodies, and caps in seasonal drops. Built for the regulars who treat us like a second porch.",
    Icon: Shirt,
    image: "/products/apparel.png",
  },
];

export default function ProductGrid() {
  return (
    <section
      id="products"
      className="relative py-28 lg:py-40 overflow-hidden"
      aria-label="Our products"
    >
      {/* Background ambience */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950"
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-crimson-500/[0.06] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-20">
          <div>
            <span className="label-eyebrow">Our Menu</span>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight max-w-2xl text-balance">
              Six rooms under <span className="italic text-crimson-400">one roof</span>
            </h2>
          </div>
          <p className="max-w-md text-bone/65 leading-relaxed">
            Walk in for a Kratom tea, walk out with a hand-blown rig and a hoodie.
            Every category, curated by people who actually use the stuff.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const reduce = useReducedMotion();
  const { Icon } = product;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduce ? undefined : { y: -8, scale: 1.015 }}
      className="clay group relative overflow-hidden flex flex-col"
    >
      {/* Red glow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow:
            "0 30px 80px -16px rgba(220,38,38,0.55), 0 0 0 1px rgba(220,38,38,0.18) inset",
        }}
      />

      {/* Hero image — full-bleed top, clipped by the card's rounded corners via overflow-hidden */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.title} — Johnny's product visual`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          priority={product.featured}
        />

        {/* Soft top gradient for chip legibility */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent"
        />

        {/* Soft bottom gradient where the image meets the text block */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-900/85 to-transparent"
        />

        {/* Icon chip — top-left, aligned with the text block padding below */}
        <div className="absolute top-6 left-6 lg:top-7 lg:left-7 grid place-items-center w-10 h-10 rounded-2xl bg-ink-950/65 backdrop-blur-md border border-white/10 text-crimson-300">
          <Icon className="w-4 h-4" strokeWidth={2.2} />
        </div>

        {/* Arrow chip — top-right, mirrored padding */}
        <div className="absolute top-6 right-6 lg:top-7 lg:right-7 grid place-items-center w-10 h-10 rounded-2xl bg-ink-950/65 backdrop-blur-md border border-white/10 text-bone/70 group-hover:text-crimson-300 group-hover:bg-crimson-500/15 group-hover:border-crimson-400/30 transition-colors duration-500">
          <ArrowUpRight className="w-4 h-4 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
        </div>
      </div>

      {/* Text content — uniform padding so the title aligns with the icon chip above */}
      <div className="relative p-6 lg:p-7">
        <h3 className="font-display text-3xl lg:text-4xl tracking-tight leading-none">
          {product.title}
        </h3>
        <p className="mt-2 text-sm text-bone/60">{product.tagline}</p>

        {/* Hidden description reveals on hover */}
        <p
          className="mt-3 text-sm text-bone/70 leading-relaxed
                     max-h-0 opacity-0
                     group-hover:max-h-32 group-hover:opacity-100
                     group-focus-within:max-h-32 group-focus-within:opacity-100
                     overflow-hidden transition-all duration-500 ease-out"
        >
          {product.description}
        </p>
      </div>
    </motion.article>
  );
}
