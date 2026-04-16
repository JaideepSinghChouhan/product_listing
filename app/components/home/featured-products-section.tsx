"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function FeaturedProductsSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // 🔥 FETCH
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();

      const productsArray = Array.isArray(data)
        ? data
        : data?.data || [];

      setAllProducts(productsArray);
      setProducts(productsArray.slice(0, 8));
    };

    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();

      setCategories(Array.isArray(data) ? data.slice(0, 6) : []);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // 🔥 FILTER
  useEffect(() => {
    if (activeCategory === "all") {
      setProducts(allProducts.slice(0, 8));
    } else {
      const filtered = allProducts.filter(
        (p) => p.categoryId === activeCategory
      );
      setProducts(filtered.slice(0, 8));
    }
  }, [activeCategory, allProducts]);

  return (
    <section className="py-10 sm:py-14 md:py-20">

      {/* HEADER */}
      <div className="px-4 sm:px-6 md:px-12 mb-6 sm:mb-8">
        <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl text-center">
          Featured Products
        </h2>

        {/* CATEGORY BAR (ALWAYS VISIBLE ✅) */}
        <div className="flex justify-center gap-3 mt-4 flex-wrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-1 text-sm rounded-full border ${
              activeCategory === "all"
                ? "bg-black text-white"
                : "text-muted-foreground"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1 text-sm rounded-full border ${
                activeCategory === cat.id
                  ? "bg-black text-white"
                  : "text-muted-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="px-4 sm:px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-4">

        {products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-surface border rounded-xl overflow-hidden"
            >
              <div className="relative h-36 sm:h-48 md:h-52">
                <Image
                  src={product.images?.[0]?.url || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No products available in this category
          </div>
        )}

      </div>

      {/* VIEW ALL */}
      <div className="mt-6 px-4 text-center">
        <Link
          href="/products"
          className="inline-block px-6 py-3 border rounded-full text-sm"
        >
          View All Products
        </Link>
      </div>

    </section>
  );
}