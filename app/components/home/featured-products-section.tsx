"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FeaturedProductsSkeleton } from "../skeletons";

export function FeaturedProductsSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const reduceMotion = useReducedMotion();

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
    <motion.section
      className="py-10 sm:py-14 md:py-20"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* HEADER */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
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
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="block bg-surface border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
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
              </motion.div>
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

    </motion.section>
  );
}