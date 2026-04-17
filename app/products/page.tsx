"use client";

import { useState, useMemo, useEffect } from "react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { ProductCard } from "../components/product-card";
import { Search, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";

const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "name-asc", label: "Name: A–Z" },
  { value: "name-desc", label: "Name: Z–A" },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  const perPage = 8;

  // 🔥 FETCH DATA FROM API
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
        console.log("Fetched products:", productsArray);
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

  // 🔥 FILTER LOGIC
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

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* HEADER */}
        <section className="py-12 border-b">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <h1 className="text-3xl sm:text-4xl font-playfair mb-2">All Products</h1>
            <p className="text-muted-foreground">
              Explore our full catalogue
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-12">

            {/* SEARCH */}
            <div className="flex flex-col gap-4 mb-8">

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

              {/* CATEGORY BAR */}
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

              {/* SORT */}
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
            </div>

            {/* COUNT */}
            <p className="text-sm mb-4">
              {loading ? "Loading products..." : `Showing ${paged.length} of ${filtered.length} products`}
            </p>

            {/* GRID */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="border rounded-xl overflow-hidden">
                    <Skeleton className="h-48" />
                    <div className="p-3">
                      <Skeleton height={16} />
                    </div>
                  </div>
                ))}
              </div>
            ) : paged.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <div className="text-center py-20">
                <p className="text-xl">No products found</p>
              </div>
            )}

            {/* LOAD MORE */}
            {!loading && hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-6 py-3 border rounded-full"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </section>

        {/* BULK CTA */}
        <section className="py-10 border-t">
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
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}