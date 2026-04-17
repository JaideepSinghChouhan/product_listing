"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function CategoriesSection() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data || []);
    };

    fetchCategories();
  }, []);

  if (!categories.length) return null;

  const isScrollable = categories.length >= 5;

  return (
    <section className="py-10 sm:py-14 md:py-20">

      {/* TITLE */}
      <div className="px-4 sm:px-6 md:px-12 mb-6 sm:mb-10 flex flex-col justify-center items-center">
        <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl">
          Browse Categories
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Explore our wide range of products
        </p>
      </div>

      {/* 🔥 CASE 1: NORMAL GRID */}
      {!isScrollable && (
        <div className="px-4 sm:px-6 md:px-12 grid grid-cols-2 sm:grid-cols-3 gap-4">

          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="relative h-28 sm:h-36 rounded-xl overflow-hidden border group"
            >
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition"
              />

              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute bottom-2 left-2 text-white text-sm">
                {cat.name}
              </div>
            </Link>
          ))}

        </div>
      )}

      {/* 🔥 CASE 2: INFINITE SCROLL */}
      {isScrollable && (
        <div className="overflow-hidden px-4 sm:px-6 md:px-12">

          <div className="flex gap-4 w-max animate-marquee">

            {/* 🔥 TRIPLE DUPLICATION (FIXES GAP ISSUE) */}
            {[...categories, ...categories, ...categories].map((cat, i) => (
              <Link
                key={i}
                href={`/products?category=${cat.id}`}
                className="relative min-w-[140px] sm:min-w-[180px] md:min-w-[220px] h-28 sm:h-36 md:h-44 rounded-xl overflow-hidden border group"
              >
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 220px"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

                <div className="absolute bottom-2 left-2 text-white text-xs sm:text-sm font-medium">
                  {cat.name}
                </div>
              </Link>
            ))}

          </div>
        </div>
      )}

      {/* 🔥 PERFECT LOOP ANIMATION */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

    </section>
  );
}