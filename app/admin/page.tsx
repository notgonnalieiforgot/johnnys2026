import { getAdminSession } from "@/lib/auth";
import MetricCards from "./_components/MetricCards";
import RevenueChart from "./_components/RevenueChart";
import CustomerTable from "./_components/CustomerTable";
import InventoryTable from "./_components/InventoryTable";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const greeting = greetingFor(session?.email);

  return (
    <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-8 lg:py-10 space-y-7">
      <header>
        <div className="text-[11px] uppercase tracking-[0.22em] text-crimson-400/90">
          Overview
        </div>
        <h1 className="mt-1 font-display text-3xl lg:text-4xl tracking-tight">
          {greeting}
        </h1>
        <p className="mt-1.5 text-sm text-bone/55">
          Snapshot for the last 30 days across all 8 locations.
        </p>
      </header>

      <MetricCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div className="xl:col-span-1">
          <InventoryTable />
        </div>
      </div>

      <CustomerTable />
    </div>
  );
}

function greetingFor(email?: string) {
  const hour = new Date().getHours();
  const tod = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
  if (!email) return `Good ${tod}.`;
  const name = email.split("@")[0].split(/[._]/)[0];
  const capital = name.charAt(0).toUpperCase() + name.slice(1);
  return `Good ${tod}, ${capital}.`;
}
