import CustomerTable from "../_components/CustomerTable";
import PageActions from "../_components/PageActions";

export const metadata = { title: "Customers" };

// Mock roster duplicated from CustomerTable so the CSV export reflects what's on screen.
// In production this will read from the same data source as the table (Lifelong POS).
const CSV_HEADER = ["Name", "Phone", "Email", "Points", "Last visit"];
const CSV_ROWS: string[][] = [
  ["Marcus Webb",    "(727) 555-0182", "marcus.w@email.com",  "1820", "Today"],
  ["Talia Reyes",    "(727) 555-0214", "treyes@email.com",    "940",  "Yesterday"],
  ["Jamal Carter",   "(813) 555-0307", "jamal.c@email.com",   "460",  "2d ago"],
  ["Olivia Bennett", "(727) 555-0119", "obennett@email.com",  "2150", "Today"],
  ["Diego Marín",    "(727) 555-0388", "diego.m@email.com",   "280",  "4d ago"],
  ["Priya Shah",     "(727) 555-0271", "pshah@email.com",     "750",  "1w ago"],
  ["Kai Nakamura",   "(813) 555-0193", "kai.n@email.com",     "120",  "Today"],
  ["Brielle Foster", "(727) 555-0455", "bfoster@email.com",   "1340", "3d ago"],
];

export default function CustomersPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-8 lg:py-10 space-y-7">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-crimson-400/90">
            Loyalty
          </div>
          <h1 className="mt-1 font-display text-3xl lg:text-4xl tracking-tight">
            Customers
          </h1>
          <p className="mt-1.5 text-sm text-bone/55">
            Every member of Johnny&rsquo;s Rewards. Adjust points right from the row.
          </p>
        </div>
        <PageActions
          exportName="johnnys-customers"
          exportRows={[CSV_HEADER, ...CSV_ROWS]}
          createLabel="New customer"
          createDescription="Demo mode — opens the new-customer modal once Lifelong POS is connected."
        />
      </header>

      <SummaryStats />
      <CustomerTable />
    </div>
  );
}

function SummaryStats() {
  const stats = [
    { label: "Total members", value: "3,842" },
    { label: "New this month", value: "184" },
    { label: "Avg points", value: "612" },
    { label: "VIP tier (1k+)", value: "486" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="clay-sm p-5">
          <div className="text-[11px] uppercase tracking-[0.22em] text-bone/45">
            {s.label}
          </div>
          <div className="mt-1.5 font-display text-3xl text-bone tracking-tight">
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
