"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeaturedProductsSkeleton } from "../skeletons";

export function FeaturedProductsSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // 🔥 FETCH
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);

        const [productsData, categoriesData] = await Promise.all([
          productsRes.json(),
          categoriesRes.json(),
        ]);

        const productsArray = Array.isArray(productsData)
          ? productsData
          : productsData?.data || [];

        setAllProducts(productsArray);
        setProducts(productsArray.slice(0, 8));
        setCategories(Array.isArray(categoriesData) ? categoriesData.slice(0, 6) : []);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
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

  if (loading) return <FeaturedProductsSkeleton />;

  return (
    <section className="py-10 sm:py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* HEADER */}
        <div className="mb-6 sm:mb-8">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-surface border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-36 sm:h-48 md:h-52">
                  <Image
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
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
        <div className="mt-6 text-center">
          <Link
            href="/products"
            className="inline-block px-6 py-3 border rounded-full text-sm"
          >
            View All Products
          </Link>
        </div>
      </div>

    </section>
  );
}