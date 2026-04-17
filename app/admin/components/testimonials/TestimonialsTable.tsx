"use client";

import { Trash2 } from "lucide-react";
import { api } from "@/lib/api";

export default function TestimonialsTable({ data, refresh }: any) {

  const handleDelete = async (id: string) => {
    if (!confirm("Delete testimonial?")) return;

    await api(`/testimonials/${id}`, {
      method: "DELETE",
    });

    refresh();
  };

  return (
    <div className="border rounded-xl bg-surface overflow-hidden">

      <div className="overflow-x-auto">
      <table className="w-full min-w-[680px]">
        <thead>
          <tr className="border-b">
            <th className="px-5 py-3 text-left text-xs uppercase">Client</th>
            <th className="px-5 py-3 text-left text-xs uppercase">Message</th>
            <th className="px-5 py-3 text-right text-xs uppercase">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((t: any) => (
            <tr key={t.id} className="border-b">

              {/* CLIENT INFO */}
              <td className="px-5 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{t.name}</span>

                  {(t.role || t.company) && (
                    <span className="text-xs text-muted-foreground">
                      {t.role}
                      {t.role && t.company ? " • " : ""}
                      {t.company}
                    </span>
                  )}
                </div>
              </td>

              {/* MESSAGE */}
              <td className="px-5 py-4 text-sm text-muted-foreground">
                {t.message}
              </td>

              {/* ACTION */}
              <td className="px-5 py-4 text-right">
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 hover:bg-red-500/10 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>

    </div>
  );
}