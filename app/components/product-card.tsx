"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, MessageCircle } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  images?: { url: string }[];
  category?: { name: string };
  sku: string;
  description?: string;
  customization?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const imageUrl =
    product.images?.[0]?.url || "/placeholder.png";

  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-white border hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-500 ${
            hovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* CUSTOMIZABLE TAG */}
        {product.customization && (
          <span className="absolute top-3 left-3 px-3 py-1 text-[10px] uppercase bg-black text-white rounded-full">
            Customizable
          </span>
        )}

        {/* HOVER OVERLAY */}
        <div
          className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-all duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            href={`/products/${product.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm rounded-full hover:bg-gray-200"
          >
            <Eye className="w-4 h-4" />
            View
          </Link>

          <a
            href={`https://wa.me/911234567890?text=${encodeURIComponent(
              `Hi, I'm interested in ${product.name} (SKU: ${product.sku})`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded-full"
          >
            <MessageCircle className="w-4 h-4" />
            Enquire
          </a>
        </div>
      </div>

      {/* INFO */}
      <div className="p-4">
        <p className="text-xs uppercase text-gray-500 mb-1">
          {product.category?.name || "General"}
        </p>

        <h3 className="text-sm font-medium line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          SKU: {product.sku}
        </p>
      </div>
    </div>
  );
}