"use client";

import { Download, Plus } from "lucide-react";
import { toast } from "@/components/Toaster";

type ActionsProps = {
  /** Filename for the demo CSV download (without extension). */
  exportName: string;
  /** Header row + sample rows that get downloaded. */
  exportRows: string[][];
  /** Label for the create button. */
  createLabel: string;
  /** Description shown in the toast when the create button is clicked. */
  createDescription: string;
};

/**
 * Reusable header actions used by /admin/customers and /admin/inventory.
 * - Export downloads a real CSV file generated client-side from the supplied rows.
 * - The create button surfaces a demo toast until Lifelong POS is wired up.
 */
export default function PageActions({
  exportName,
  exportRows,
  createLabel,
  createDescription,
}: ActionsProps) {
  function onExport() {
    const csv = exportRows
      .map((row) =>
        row
          .map((cell) => {
            const needsQuotes = /[",\n]/.test(cell);
            const escaped = cell.replace(/"/g, '""');
            return needsQuotes ? `"${escaped}"` : escaped;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().split("T")[0];
    a.href = url;
    a.download = `${exportName}-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    toast({
      title: `${exportName}-${stamp}.csv exported`,
      description: `${exportRows.length - 1} rows downloaded`,
      tone: "success",
    });
  }

  function onCreate() {
    toast({
      title: createLabel,
      description: createDescription,
      tone: "info",
    });
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onExport}
        className="btn-ghost text-sm py-2.5 px-4"
      >
        <Download className="w-3.5 h-3.5" />
        Export
      </button>
      <button
        type="button"
        onClick={onCreate}
        className="btn-primary text-sm py-2.5 px-4"
      >
        <Plus className="w-3.5 h-3.5" />
        {createLabel}
      </button>
    </div>
  );
}
