import { AlertTriangle } from "lucide-react";
import InventoryTable from "../_components/InventoryTable";
import PageActions from "../_components/PageActions";

export const metadata = { title: "Inventory" };

const CSV_HEADER = ["SKU", "Product", "Category", "Stock", "Reorder at", "Status"];
const CSV_ROWS: string[][] = [
  ["KRT-RED-100",     "Red Bali Kratom — 100g",            "Kratom",  "4",  "15", "Critical"],
  ["KAV-VAN-1L",      "Vanuatu Kava Concentrate — 1L",     "Kava",    "9",  "12", "Low"],
  ["D8-CART-1G",      "Cake Delta-8 Cart 1g (Strawberry)", "Delta-8", "6",  "20", "Critical"],
  ["VAPE-ELF-BP10K",  "Elf Bar BP10000 (Blue Razz)",       "Vapes",   "22", "25", "Low"],
  ["JUICE-NKD-30",    "Naked 100 30ml — Amazing Mango",    "Juice",   "48", "20", "In Stock"],
  ["GLASS-RIG-DAB-M", "Mini Dab Rig (Heady, Assorted)",    "Glass",   "11", "10", "In Stock"],
];

export default function InventoryPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-8 lg:py-10 space-y-7">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-crimson-400/90">
            Stock
          </div>
          <h1 className="mt-1 font-display text-3xl lg:text-4xl tracking-tight">
            Inventory
          </h1>
          <p className="mt-1.5 text-sm text-bone/55">
            Live levels across all 8 locations. Critical items flagged in crimson.
          </p>
        </div>
        <PageActions
          exportName="johnnys-inventory"
          exportRows={[CSV_HEADER, ...CSV_ROWS]}
          createLabel="New SKU"
          createDescription="Demo mode — opens the SKU creator once Lifelong POS is connected."
        />
      </header>

      <CriticalCallout />
      <InventoryTable />
    </div>
  );
}

function CriticalCallout() {
  return (
    <div className="clay-sm p-5 flex items-start gap-4">
      <div className="grid place-items-center w-10 h-10 rounded-2xl bg-crimson-500/15 border border-crimson-400/30 text-crimson-300 shrink-0">
        <AlertTriangle className="w-4 h-4" />
      </div>
      <div>
        <div className="font-display text-xl tracking-tight">
          2 SKUs below reorder threshold
        </div>
        <p className="mt-1 text-sm text-bone/60 max-w-2xl">
          Red Bali Kratom (100g) and the Cake Delta-8 Cart 1g are both critically low.
          Generate a purchase order or contact the supplier from the actions column.
        </p>
      </div>
    </div>
  );
}
