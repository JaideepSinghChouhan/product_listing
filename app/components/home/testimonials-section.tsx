"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();

        const arr = Array.isArray(data)
          ? data
          : data?.data || [];

        setTestimonials(arr);
      } catch (err) {
        console.error("Testimonials fetch error:", err);
      }
    };

    fetchTestimonials();
  }, []);

  if (!testimonials.length) return null;

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-surface-elevated">

      {/* HEADER */}
      <div className="text-center mb-12 px-4">
        <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl">
          Experiences That Speak Volumes
        </h2>
        <p className="text-muted-foreground text-sm mt-2 max-w-xl mx-auto">
          Real stories from clients who trust our products
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-12">

        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-background border rounded-xl p-6 text-center flex flex-col gap-4"
          >

            {/* NAME */}
            <h3 className="font-medium text-sm">
              {t.name}
            </h3>

            {/* ⭐ STARS */}
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-black" />
              ))}
            </div>

            {/* ROLE + COMPANY (instead of title) */}
            {(t.role || t.company) && (
              <p className="text-xs text-muted-foreground">
                {t.role || ""} {t.company ? `• ${t.company}` : ""}
              </p>
            )}

            {/* MESSAGE */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              “{t.message}”
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}