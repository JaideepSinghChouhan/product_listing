"use client";

import { useState, useMemo, useEffect } from "react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { ProductCard } from "../components/product-card";
import { Search, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ProductsListingSkeleton } from "../components/skeletons";
import { motion, useReducedMotion } from "framer-motion";

const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "name-asc", label: "Name: A–Z" },
  { value: "name-desc", label: "Name: Z–A" },
];

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  const perPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);

        const pData = await pRes.json();
        const cData = await cRes.json();

        const productsArray = Array.isArray(pData.data)
          ? pData.data
          : pData?.products || [];

        setProducts(productsArray);
        setCategories(cData || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const categoryFromQuery =
      searchParams.get("category") || searchParams.get("categoryId");

    if (categoryFromQuery) {
      setActiveCategory(categoryFromQuery);
      setPage(1);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.categoryId === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q)
      );
    }

    if (sort === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") result.sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [products, search, activeCategory, sort]);

  const paged = filtered.slice(0, page * perPage);
  const hasMore = paged.length < filtered.length;

  if (loading) return <ProductsListingSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <motion.section
          className="py-12 border-b"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <motion.h1
              className="text-3xl sm:text-4xl font-playfair mb-2"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.04 }}
            >
              All Products
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 }}
            >
              Explore our full catalogue
            </motion.p>
          </div>
        </motion.section>

        <motion.section
          className="py-10"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <motion.div
              className="flex flex-col gap-4 mb-8"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 border rounded-full"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-4 py-2 rounded-full text-sm border ${
                    activeCategory === "all"
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  All
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm border ${
                      activeCategory === cat.id
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full sm:w-40 border rounded-full px-4 py-2"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.p
              className="text-sm mb-4"
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              Showing {paged.length} of {filtered.length} products
            </motion.p>

            {paged.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {paged.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.name,
                      images: product.images?.[0]?.url ? [{ url: product.images?.[0]?.url }] : [],
                      category: product.category?.name || "",
                      sku: product.sku,
                      description: product.description,
                    }}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-20"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <p className="text-xl">No products found</p>
              </motion.div>
            )}

            {hasMore && (
              <motion.div
                className="text-center mt-10"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-6 py-3 border rounded-full transition-transform hover:-translate-y-0.5"
                >
                  Load More
                </button>
              </motion.div>
            )}
          </div>
        </motion.section>

        <motion.section
          className="py-10 border-t"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
            <div>
              <h3 className="text-xl font-medium">
                Need bulk orders?
              </h3>
            </div>

            <a
              href="https://wa.me/911234567890"
              target="_blank"
              className="flex items-center gap-2 px-5 py-3 border rounded-full"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}