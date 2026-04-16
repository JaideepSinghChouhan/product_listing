"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { api } from "@/lib/api";

export default function CategoryForm({
  open,
  onClose,
  refresh,
  initialData,
}: any) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    }
  }, [initialData]);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (initialData) {
        await api(`/categories/${initialData.id}`, {
          method: "PUT",
          body: JSON.stringify({ name }),
        });
      } else {
        await api("/categories", {
          method: "POST",
          body: JSON.stringify({ name }),
        });
      }

      refresh();
      onClose();

    } catch (err) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-surface p-6 rounded-xl w-[350px] flex flex-col gap-4">

        <div className="flex justify-between">
          <h2 className="font-playfair">
            {initialData ? "Edit Category" : "Add Category"}
          </h2>
          <button onClick={onClose}><X /></button>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="border p-2 rounded"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-accent text-white py-2 rounded active:scale-95 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

      </div>
    </div>
  );
}