"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import ProductForm from "./ProductForm";
import { api } from "@/lib/api";
import ProductsTable from "./ProductsTable";

export default function ProductsSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);  

  const fetchProducts = async () => {
    const data = await api("/products/admin"); // admin route
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

 const filtered = products.filter((p) => {
  const name = p.name || "";
  const sku = p.sku || "";

  return (
    name.toLowerCase().includes(search.toLowerCase()) ||
    sku.toLowerCase().includes(search.toLowerCase())
  );
});

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">

        {/* Search */}
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-[260px] pl-10 pr-4 py-2.5 border rounded-lg bg-surface text-sm"
          />
        </div>

        {/* Add */}
        <button
        onClick={() => setOpen(true)}
            className="w-full sm:w-auto justify-center flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg text-sm active:scale-95 hover:bg-accent/90"
        >
        <Plus className="w-4 h-4" />
        Add Product
        </button>
      </div>

      {/* Table */}
      <ProductsTable products={filtered} refresh={fetchProducts} />
      <ProductForm open={open} onClose={() => setOpen(false)} refresh={fetchProducts} />
    </div>
  );
}