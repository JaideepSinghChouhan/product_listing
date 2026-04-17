"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { api } from "@/lib/api";
import ProductForm from "./ProductForm";

export default function ProductsTable({ products, refresh }: any) {
  const [editProduct, setEditProduct] = useState<any>(null);

  const toggleVisibility = async (id: string) => {
  await api(`/products/${id}/toggle`, {
    method: "PATCH",
  });

  refresh();
  };
const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  await api(`/products/${id}`, {
    method: "DELETE",
  });

  refresh();
};

  return (
    <>
      <div className="border rounded-xl bg-surface overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b">
              <th className="text-left px-5 py-3 text-xs uppercase">Product</th>
              <th className="text-left px-5 py-3 text-xs uppercase">SKU</th>
              <th className="text-left px-5 py-3 text-xs uppercase">
                Category
              </th>
              <th className="text-left px-5 py-3 text-xs uppercase">Status</th>
              <th className="text-right px-5 py-3 text-xs uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((p: any) => (
              <tr key={p.id} className="border-b hover:bg-surface-elevated">
                {/* Product */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative rounded overflow-hidden border">
                      <Image
                        src={p.images?.[0]?.url || "/placeholder.png"}
                        alt={p.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">{p.name}</span>
                  </div>
                </td>

                {/* SKU */}
                <td className="px-5 py-4 text-sm text-muted-foreground">
                  {p.sku}
                </td>

                {/* Category */}
                <td className="px-5 py-4 text-sm text-muted-foreground">
                  {p.category?.name || "—"}
                </td>

                {/* Status */}
                <td className="px-5 py-4 text-sm">
                {p.status === "HIDDEN" ? (
                  <span className="text-red-500">Hidden</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    {/* TOGGLE VISIBILITY */}
<button
  onClick={() => toggleVisibility(p.id)}
  className="p-2 hover:bg-accent/10 rounded transition active:scale-90"
  title={p.status === "HIDDEN" ? "Show Product" : "Hide Product"}
>
  {p.status === "HIDDEN" ? (
    <EyeOff className="w-4 h-4 text-red-500" />
  ) : (
    <Eye className="w-4 h-4 text-green-600" />
  )}
</button>

                    {/* EDIT */}
                    <button
                      onClick={() => setEditProduct(p)}
                      className="p-2 hover:bg-accent/10 rounded transition active:scale-90"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 hover:bg-red-500/10 rounded transition active:scale-90"
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

      {/* EDIT MODAL */}
      {editProduct && (
        <ProductForm
          open={true}
          onClose={() => setEditProduct(null)}
          refresh={refresh}
          initialData={editProduct}
        />
      )}
    </>
  );
}
