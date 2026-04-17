"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { api } from "@/lib/api";

import CategoriesTable from "./CategoriesTable";
import CategoryForm from "./CategoryForm";
import { AdminListSkeleton } from "../../../components/skeletons";

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

  if (loading) return <AdminListSkeleton titleWidth={160} buttonWidth={160} rows={6} />;

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