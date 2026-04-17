"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import LeadDetailsModal from "./LeadsDetailsModal";

export default function LeadsTable({ leads, refresh }: any) {
  const [selected, setSelected] = useState(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "CONTACTED":
        return "bg-blue-100 text-blue-600";
      case "CLOSED":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      <div className="border rounded-2xl bg-surface overflow-hidden">

        <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-sm">
          <thead>
            <tr className="border-b text-muted-foreground uppercase text-xs tracking-wide">

              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Contact</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Requirement</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-right">Action</th>

            </tr>
          </thead>

          <tbody>
            {leads.map((l: any) => (
              <tr
                key={l.id}
                className="border-b hover:bg-surface-elevated transition"
              >
                {/* NAME */}
                <td className="px-6 py-5 font-medium text-foreground">
                  {l.name}
                </td>

                {/* CONTACT */}
                <td className="px-6 py-5 text-muted-foreground">
                  {l.contact}
                </td>

                {/* EMAIL */}
                <td className="px-6 py-5 text-muted-foreground">
                  {l.email || "—"}
                </td>

                {/* REQUIREMENT */}
                <td className="px-6 py-5 text-muted-foreground max-w-[200px] truncate">
                  {l.requirement || l.message || "—"}
                </td>

                {/* STATUS */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(
                      l.status
                    )}`}
                  >
                    {l.status}
                  </span>
                </td>

                {/* DATE */}
                <td className="px-6 py-5 text-muted-foreground">
                  {new Date(l.createdAt).toLocaleDateString()}
                </td>

                {/* ACTION */}
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => setSelected(l)}
                    className="p-2 hover:bg-accent/10 rounded transition"
                  >
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </div>

      {/* MODAL */}
      {selected && (
        <LeadDetailsModal
          lead={selected}
          onClose={() => setSelected(null)}
          refresh={refresh}
        />
      )}
    </>
  );
}