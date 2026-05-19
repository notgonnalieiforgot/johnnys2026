"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Boxes,
  Settings,
  LogOut,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { signOut } from "../actions";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string; Icon: LucideIcon };

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin", Icon: LayoutDashboard },
  { label: "Customers", href: "/admin/customers", Icon: Users },
  { label: "Inventory", href: "/admin/inventory", Icon: Boxes },
  { label: "Settings", href: "/admin/settings", Icon: Settings },
];

export default function AdminShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: { email: string; role: string };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-950 text-bone">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-ink-900/70 backdrop-blur-xl border-r border-crimson-700/15",
          "transform transition-transform duration-300",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 px-6 flex items-center justify-between border-b border-crimson-700/15">
          <Link href="/admin" className="flex items-center">
            <Image
              src="/johnnys-logo.png"
              alt="Johnny's"
              width={999}
              height={461}
              className="h-8 w-auto drop-shadow-[0_2px_12px_rgba(220,38,38,0.45)]"
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1.5 rounded text-bone/60 hover:text-bone"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="p-3" aria-label="Admin sections">
          <ul className="space-y-1">
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors",
                      active
                        ? "text-crimson-300"
                        : "text-bone/65 hover:text-bone hover:bg-white/5"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="admin-active-pill"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 rounded-xl bg-crimson-500/12 border border-crimson-400/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                      />
                    )}
                    <item.Icon className="relative w-4 h-4" />
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 inset-x-0 p-3 border-t border-crimson-700/15">
          <Link
            href="/"
            className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm text-bone/60 hover:text-bone hover:bg-white/5 transition-colors"
          >
            <span>View public site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <div className="mt-2 px-3 py-2.5 rounded-xl bg-ink-800/60">
            <div className="text-[10px] text-bone/45 uppercase tracking-[0.2em]">
              {session.role}
            </div>
            <div className="text-sm text-bone/85 truncate">{session.email}</div>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="mt-1 w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-bone/60 hover:text-bone hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Topbar + content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between gap-4 px-5 lg:px-8 bg-ink-950/85 backdrop-blur-xl border-b border-crimson-700/15">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded text-bone/70 hover:text-bone"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-[11px] uppercase tracking-[0.22em] text-bone/45">
              Admin
            </span>
          </div>
        </header>

        {children}
      </div>

      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        />
      )}
    </div>
  );
}
