"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Circle } from "lucide-react";

type StockStatus = "critical" | "low" | "ok";

type Item = {
  sku: string;
  name: string;
  category: string;
  stock: number;
  reorderAt: number;
  status: StockStatus;
};

const ITEMS: Item[] = [
  { sku: "KRT-RED-100", name: "Red Bali Kratom — 100g", category: "Kratom", stock: 4, reorderAt: 15, status: "critical" },
  { sku: "KAV-VAN-1L", name: "Vanuatu Kava Concentrate — 1L", category: "Kava", stock: 9, reorderAt: 12, status: "low" },
  { sku: "D8-CART-1G", name: "Cake Delta-8 Cart 1g (Strawberry)", category: "Delta-8", stock: 6, reorderAt: 20, status: "critical" },
  { sku: "VAPE-ELF-BP10K", name: "Elf Bar BP10000 (Blue Razz)", category: "Vapes", stock: 22, reorderAt: 25, status: "low" },
  { sku: "JUICE-NKD-30", name: "Naked 100 30ml — Amazing Mango", category: "Juice", stock: 48, reorderAt: 20, status: "ok" },
  { sku: "GLASS-RIG-DAB-M", name: "Mini Dab Rig (Heady, Assorted)", category: "Glass", stock: 11, reorderAt: 10, status: "ok" },
];

const STATUS_STYLES: Record<
  StockStatus,
  { label: string; chip: string; Icon: typeof CheckCircle2 }
> = {
  critical: {
    label: "Critical",
    chip: "bg-crimson-500/18 text-crimson-200 border-crimson-400/45",
    Icon: AlertTriangle,
  },
  low: {
    label: "Low",
    chip: "bg-crimson-500/10 text-crimson-300 border-crimson-500/30",
    Icon: Circle,
  },
  ok: {
    label: "In Stock",
    chip: "bg-white/5 text-bone/85 border-white/15",
    Icon: CheckCircle2,
  },
};

export default function InventoryTable() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.55 }}
      className="clay-sm overflow-hidden p-0"
    >
      <header className="flex items-center justify-between gap-4 p-5 lg:p-6 border-b border-white/5">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-bone/45">
            Inventory
          </div>
          <h3 className="font-display text-2xl tracking-tight mt-1">
            Low Stock Alerts
          </h3>
        </div>
        <a
          href="/admin/inventory"
          className="text-xs uppercase tracking-[0.18em] text-crimson-400 hover:text-crimson-300"
        >
          View all
        </a>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-bone/45 border-b border-white/5">
              <th className="px-5 lg:px-6 py-3 font-medium">SKU</th>
              <th className="px-3 py-3 font-medium">Product</th>
              <th className="px-3 py-3 font-medium hidden md:table-cell">Category</th>
              <th className="px-3 py-3 font-medium text-right">Stock</th>
              <th className="px-5 lg:px-6 py-3 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((it) => {
              const style = STATUS_STYLES[it.status];
              return (
                <tr
                  key={it.sku}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 lg:px-6 py-3.5 font-mono text-xs text-bone/60">
                    {it.sku}
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="text-bone">{it.name}</div>
                    <div className="text-xs text-bone/45 mt-0.5">
                      Reorder at {it.reorderAt}
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-bone/60 hidden md:table-cell">
                    {it.category}
                  </td>
                  <td className="px-3 py-3.5 text-right font-display text-lg text-bone">
                    {it.stock}
                  </td>
                  <td className="px-5 lg:px-6 py-3.5">
                    <div className="flex justify-end">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] uppercase tracking-[0.12em] ${style.chip}`}
                      >
                        <style.Icon className="w-3 h-3" />
                        {style.label}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
