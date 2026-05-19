"use client";

import { useState } from "react";
import { Pencil, Trash2, Eye, EyeOff, X } from "lucide-react";
import { api } from "@/lib/api";
import CategoryForm from "./CategoryForm";

export default function CategoriesTable({ categories, refresh }: any) {
  const [edit, setEdit] = useState<any>(null);
  const [error, setError] = useState("");

  const toggle = async (id: string) => {
    await api(`/categories/${id}/toggle`, {
      method: "PATCH",
    });
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete category permanently?")) return;

    try {
      setError("");
      await api(`/categories/${id}`, {
        method: "DELETE",
      });
      refresh();
    } catch (err: any) {
      const errorMsg = err?.message || "Failed to delete category";
      console.log("Setting error state:", errorMsg);
      setError(errorMsg);
      // Don't auto-clear - let user close manually
    }
  };

  return (
    <>
      {/* ERROR BANNER */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex justify-between items-start">
          <div>
            <p className="text-red-800 font-medium">Error</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
          <button
            onClick={() => setError("")}
            className="text-red-500 hover:text-red-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="border rounded-xl bg-surface overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[560px]">

          <thead>
            <tr className="border-b">
              <th className="px-5 py-3 text-left text-xs uppercase">Name</th>
              <th className="px-5 py-3 text-left text-xs uppercase">Status</th>
              <th className="px-5 py-3 text-right text-xs uppercase">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((c: any) => (
              <tr key={c.id} className="border-b hover:bg-surface-elevated">

                <td className="px-5 py-4">{c.name}</td>

                <td className="px-5 py-4">
                  {c.status === "HIDDEN" ? (
                    <span className="text-red-500">Hidden</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">

                    {/* Toggle */}
                    <button
                      onClick={() => toggle(c.id)}
                      className="p-2 rounded hover:bg-accent/10"
                    >
                      {c.status === "HIDDEN" ? (
                        <EyeOff className="w-4 h-4 text-red-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-green-600" />
                      )}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => setEdit(c)}
                      className="p-2 rounded hover:bg-accent/10"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-2 rounded hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
        </div>
      </div>

      {edit && (
        <CategoryForm
          open={true}
          onClose={() => setEdit(null)}
          refresh={refresh}
          initialData={edit}
        />
      )}
    </>
  );
}