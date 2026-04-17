"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { api } from "@/lib/api";

import CategoriesTable from "./CategoriesTable";
import CategoryForm from "./CategoryForm";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const data = await api("/categories/admin");
      setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
          <Skeleton width={180} height={28} />
          <Skeleton className="w-full sm:w-[160px] h-10 rounded" />
        </div>
        <div className="border rounded-xl overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 border-b last:border-b-0" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
        <h2 className="font-playfair text-xl">Categories</h2>

        <button
          onClick={() => setOpen(true)}
          className="w-full sm:w-auto justify-center flex items-center gap-2 px-4 py-2 bg-accent text-white rounded active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <CategoriesTable categories={categories} refresh={fetchCategories} />

      <CategoryForm open={open} onClose={() => setOpen(false)} refresh={fetchCategories} />

    </div>
  );
}