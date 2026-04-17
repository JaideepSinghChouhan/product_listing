"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { ProductCard } from "../../components/product-card";
import {
  MessageCircle,
  ChevronRight,
  CheckCircle,
  Send,
  ZoomIn,
} from "lucide-react";
import { ProductDetailSkeleton } from "../../components/skeletons";

interface PageProps {
  params: Promise<{ id: string }>;
}

const specs = [
  { label: "Material", value: "Premium Grade" },
  { label: "Dimensions", value: "Available on request" },
  { label: "MOQ", value: "50 units (bulk)" },
  { label: "Lead Time", value: "7–14 business days" },
  { label: "Packaging", value: "Individual gift box" },
  { label: "Customization", value: "Logo, color, packaging" },
];

export default function ProductDetailPage({ params}: PageProps) {
  const { id } = use(params);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [related, setRelated] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });

  // ✅ FETCH PRODUCT + RELATED
  useEffect(() => {
    const fetchProduct = async () => {
      try { 
        const res = await fetch(`/api/products/${id}`);
        if (res.status === 404) {
          setNotFound(true);
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to load product");
        }

        const data = await res.json();
        if (!data) {
          setNotFound(true);
          return;
        }

        setProduct(data);

        // related products (same category)
        const relRes = await fetch(`/api/products?categoryId=${data.categoryId}&limit=8`);
        const relData = await relRes.json();
        console.log("Related products data:", relData.data); 
        const relProducts = Array.isArray(relData.data)
          ? relData.data
          : relData.products || [];

        setRelated(
          relProducts
            .filter((p: any) => p.id !== data.id)
            .slice(0, 4)
        );
      } catch (err) {
        console.error("Error fetching product:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <ProductDetailSkeleton />;

  if (notFound) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl md:text-3xl font-playfair mb-3">Product not found</h1>
            <p className="text-sm text-gray-500 mb-6">
              The product you are looking for does not exist or may have been removed.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white"
            >
              Back to Products
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl md:text-3xl font-playfair mb-3">Product not found</h1>
            <p className="text-sm text-gray-500 mb-6">
              The product you are looking for does not exist or may have been removed.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white"
            >
              Back to Products
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const images =
    product.images?.map((img: any) => img.url) || [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* 🔹 BREADCRUMB */}
        <nav className="max-w-7xl mx-auto px-4 md:px-12 py-4 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* 🔥 MAIN SECTION */}
        <section className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT: IMAGES */}
            <div className="flex flex-col gap-4">

              <div className="relative aspect-square rounded-xl overflow-hidden border">
                <Image
                  src={images[activeImage] || "/placeholder.png"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />

                <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full">
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* THUMBNAILS */}
              <div className="flex gap-2">
                {images.slice(0, 4).map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border ${
                      activeImage === i ? "border-black" : ""
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: INFO */}
            <div>
              <p className="text-xs uppercase text-gray-500 mb-2">
                {product.category?.name}
              </p>

              <h1 className="text-2xl md:text-4xl font-playfair mb-3">
                {product.name}
              </h1>

              <p className="text-xs text-gray-500 mb-4">
                SKU: {product.sku}
              </p>

              <p className="text-gray-600 mb-6">
                {product.description}
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href="#enquiry-form"
                  className="flex-1 text-center py-3 bg-black text-white rounded-full"
                >
                  Enquire Now
                </a>

                <a
                  href={`https://wa.me/911234567890?text=${encodeURIComponent(
                    `Hi, I'm interested in ${product.name} (SKU: ${product.sku})`
                  )}`}
                  target="_blank"
                  className="flex-1 text-center py-3 border rounded-full"
                >
                  WhatsApp
                </a>

                <a
                  href="tel:+919876543210"
                  className="w-full sm:w-auto px-5 py-3 border rounded-full text-center"
                >
                  Call
                </a>
              </div>

              {/* SPECS */}
              <div className="border rounded-xl overflow-hidden">
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-between px-4 py-3 text-sm border-b last:border-none"
                  >
                    <span className="text-gray-500">{spec.label}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* TRUST */}
              <div className="flex flex-wrap gap-4 mt-6">
                {["Quality Assured", "Bulk Orders", "Fast Dispatch"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-1 text-xs text-gray-500"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 🔥 ENQUIRY FORM */}
        <section id="enquiry-form" className="py-14 sm:py-16 px-4 bg-surface-elevated border-t">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.28em] uppercase text-foreground-muted inline-flex items-center gap-3">
                <span className="w-10 h-px bg-border" />
                Enquire
                <span className="w-10 h-px bg-border" />
              </p>

              <h2 className="text-3xl sm:text-4xl font-playfair mt-3">
                Request Information
              </h2>

              <p className="text-foreground-muted text-sm mt-2">
                Pre-filled with this product&apos;s details. We&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="border rounded-2xl bg-surface p-10 sm:p-14 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-6">
                  <Send className="w-6 h-6 text-foreground" />
                </div>

                <h3 className="font-playfair text-3xl sm:text-4xl mb-2">Enquiry Submitted</h3>

                <p className="text-foreground-muted text-sm mb-5">
                  Our team will contact you shortly.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmitError("");
                  }}
                  className="text-sm underline underline-offset-2 hover:text-foreground-muted transition"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  try {
                    setSubmitting(true);
                    setSubmitError("");

                    const res = await fetch("/api/leads", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        contact: form.phone,
                        quantity: form.quantity ? Number(form.quantity) : undefined,
                        message: form.message,
                        productId: product.id,
                        requirement: `Enquiry for ${product.name} (SKU: ${product.sku})`,
                      }),
                    });

                    if (!res.ok) {
                      const errorData = await res.json().catch(() => ({}));
                      throw new Error(errorData?.error || "Failed to submit enquiry");
                    }

                    setSubmitted(true);
                  } catch (err: any) {
                    setSubmitError(err?.message || "Failed to submit enquiry");
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="border rounded-2xl bg-surface p-5 sm:p-8 flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase text-foreground-muted">Name *</span>
                    <input
                      placeholder="Your full name"
                      required
                      className="h-11 border rounded-xl px-4 bg-background"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase text-foreground-muted">Email *</span>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="h-11 border rounded-xl px-4 bg-background"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase text-foreground-muted">Phone</span>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      className="h-11 border rounded-xl px-4 bg-background"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase text-foreground-muted">Quantity Required</span>
                    <input
                      type="number"
                      min={1}
                      placeholder="e.g. 100"
                      className="h-11 border rounded-xl px-4 bg-background"
                      value={form.quantity}
                      onChange={(e) =>
                        setForm({ ...form, quantity: e.target.value })
                      }
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-xs tracking-[0.15em] uppercase text-foreground-muted">Product</span>
                  <input
                    readOnly
                    className="h-11 border rounded-xl px-4 bg-secondary text-foreground-muted"
                    value={`${product.name} (${product.sku})`}
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs tracking-[0.15em] uppercase text-foreground-muted">Additional Notes</span>
                  <textarea
                    placeholder="Customization requirements, delivery location, timeline..."
                    className="border rounded-xl px-4 py-3 bg-background min-h-[120px]"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                </label>

                {submitError && (
                  <p className="text-sm text-red-600">{submitError}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    disabled={submitting}
                    className="bg-black text-white py-3 rounded-full disabled:opacity-50 font-medium"
                  >
                    {submitting ? "Submitting..." : "Submit Enquiry"}
                  </button>

                  <a
                    href={`https://wa.me/911234567890?text=${encodeURIComponent(
                      `Hi, I'm interested in ${product.name} (SKU: ${product.sku})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border py-3 rounded-full text-center inline-flex items-center justify-center gap-2 hover:bg-secondary transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Instead
                  </a>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* 🔥 RELATED PRODUCTS */}
        <section className="py-12 px-4 border-t">
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
              <h2 className="text-2xl font-playfair">
                Related Products
              </h2>

              <Link href="/products">View all</Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}