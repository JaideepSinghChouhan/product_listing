"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { api } from "@/lib/api";

import CategoriesTable from "./CategoriesTable";
import CategoryForm from "./CategoryForm";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchCategories = async () => {
    const data = await api("/categories/admin");
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-playfair text-xl">Categories</h2>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded active:scale-95"
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