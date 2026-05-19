import {
  Building2,
  Bell,
  Gift,
  Palette,
  ShieldCheck,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import SettingsToggles from "../_components/SettingsToggles";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const session = await getAdminSession();

  return (
    <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-8 lg:py-10 space-y-7">
      <header>
        <div className="text-[11px] uppercase tracking-[0.22em] text-crimson-400/90">
          Configuration
        </div>
        <h1 className="mt-1 font-display text-3xl lg:text-4xl tracking-tight">
          Settings
        </h1>
        <p className="mt-1.5 text-sm text-bone/55">
          Manage your bar, brand, loyalty rules, and staff. Changes save instantly in
          production.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Account" Icon={ShieldCheck}>
          <Row label="Signed in as" value={session?.email ?? "—"} />
          <Row label="Role" value={(session?.role ?? "—").toUpperCase()} mono />
          <Row label="Session expires" value="8 hours" />
        </Card>

        <Card title="Business" Icon={Building2}>
          <Row label="Locations" value="8 active" />
          <Row label="Public site" value="johnnys-smokeshop.vercel.app" mono />
          <Row label="Default hours" value="10am – 12am" />
        </Card>

        <Card title="Loyalty" Icon={Gift}>
          <Row label="Earn rate" value="1 pt / $1" />
          <Row label="Tier: Local" value="250 pts" />
          <Row label="Tier: VIP" value="1,000 pts" />
        </Card>

        <Card title="Brand" Icon={Palette}>
          <div className="flex items-center gap-3">
            <Swatch hex="#dc2626" label="Crimson" />
            <Swatch hex="#f5efe6" label="Bone" />
            <Swatch hex="#070303" label="Ink" />
          </div>
          <div className="mt-4 text-xs text-bone/55">
            Brand tokens are wired through Tailwind. Swap the palette in
            <code className="text-crimson-300/90"> tailwind.config.ts</code> to retheme.
          </div>
        </Card>

        <Card title="Notifications" Icon={Bell}>
          <SettingsToggles />
        </Card>

        <Card title="Compliance" Icon={ShieldCheck}>
          <Row label="Age gate" value="21+ enforced" badge="LIVE" />
          <Row label="Lab tests" value="Required on Delta-8" />
          <Row label="PII on client" value="Never returned" badge="LIVE" />
        </Card>
      </div>
    </div>
  );
}

function Card({
  title,
  Icon,
  children,
}: {
  title: string;
  Icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section className="clay-sm p-6 lg:p-7">
      <header className="flex items-center gap-3 mb-5">
        <span className="grid place-items-center w-9 h-9 rounded-2xl bg-crimson-500/10 border border-crimson-400/20 text-crimson-300">
          <Icon className="w-4 h-4" strokeWidth={2.2} />
        </span>
        <h2 className="font-display text-xl tracking-tight">{title}</h2>
      </header>
      <div className="space-y-3 text-sm">{children}</div>
    </section>
  );
}

function Row({
  label,
  value,
  mono,
  badge,
}: {
  label: string;
  value: string;
  mono?: boolean;
  badge?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-bone/55">{label}</span>
      <span
        className={`text-bone text-right ${mono ? "font-mono text-xs" : ""} flex items-center gap-2`}
      >
        {value}
        {badge && (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.16em] bg-crimson-500/10 border border-crimson-400/30 text-crimson-300">
            <Check className="w-2.5 h-2.5" /> {badge}
          </span>
        )}
      </span>
    </div>
  );
}

function Swatch({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-7 h-7 rounded-full border border-white/10 shadow-clay-sm"
        style={{ background: hex }}
      />
      <div className="leading-tight">
        <div className="text-xs text-bone">{label}</div>
        <div className="text-[10px] uppercase tracking-[0.16em] text-bone/45 font-mono">
          {hex}
        </div>
      </div>
    </div>
  );
}
