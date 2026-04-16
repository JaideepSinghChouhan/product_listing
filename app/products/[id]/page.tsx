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
  Phone,
} from "lucide-react";

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
  const [related, setRelated] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [submitted, setSubmitted] = useState(false);

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
        const data = await res.json();

        setProduct(data);

        // related products (same category)
        const relRes = await fetch(
          `/api/products?id=${data.categoryId}`
        );
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
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // ✅ LOADING STATE
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading product...</p>
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
                  className="object-cover"
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
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: INFO */}
            <div>
              <p className="text-xs uppercase text-gray-500 mb-2">
                {product.category?.name}
              </p>

              <h1 className="text-2xl md:text-4xl font-serif mb-3">
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
                  className="px-5 py-3 border rounded-full text-center"
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
        <section id="enquiry-form" className="py-12 px-4">
          <div className="max-w-3xl mx-auto">

            <h2 className="text-2xl font-serif text-center mb-6">
              Request Information
            </h2>

            {submitted ? (
              <div className="text-center">
                <p>Enquiry Submitted ✅</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col gap-4"
              >
                <input
                  placeholder="Name"
                  required
                  className="border p-3 rounded"
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  placeholder="Email"
                  required
                  className="border p-3 rounded"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <textarea
                  placeholder="Message"
                  className="border p-3 rounded"
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />

                <button className="bg-black text-white py-3 rounded-full">
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </section>

        {/* 🔥 RELATED PRODUCTS */}
        <section className="py-12 px-4 border-t">
          <div className="max-w-7xl mx-auto">

            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-serif">
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