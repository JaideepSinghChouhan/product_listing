"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Truck, BadgeCheck, Users } from "lucide-react";

export function TrustSection() {
  const [visible, setVisible] = useState(false);

  const points = [
    {
      icon: ShieldCheck,
      title: "Premium Quality",
      desc: "We ensure top-grade materials in every product",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Reliable and timely delivery across India",
    },
    {
      icon: BadgeCheck,
      title: "Trusted Brand",
      desc: "Hundreds of satisfied business clients",
    },
    {
      icon: Users,
      title: "Bulk Orders",
      desc: "Special pricing for bulk & wholesale orders",
    },
  ];

  // 🔥 SCROLL ANIMATION
  useEffect(() => {
    const section = document.getElementById("trust-section");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="trust-section"
      className={`py-12 sm:py-16 md:py-20 bg-surface-elevated transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >

      {/* HEADER */}
      <div className="text-center mb-10 px-4">
        <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl">
          Why Choose Us
        </h2>
        <p className="text-muted-foreground text-sm mt-2">
          We deliver quality, trust and value
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 sm:px-6 md:px-12">

        {points.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className={`flex flex-col items-center text-center gap-3 p-4 rounded-xl border bg-background transition-all duration-500 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: `${i * 150}ms`, // 🔥 stagger effect
              }}
            >
              {/* ICON */}
              <div className="p-3 rounded-full border transition-transform duration-300 hover:scale-110">
                <Icon className="w-5 h-5" />
              </div>

              {/* TITLE */}
              <h3 className="text-sm font-medium">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-xs text-muted-foreground">
                {item.desc}
              </p>
            </div>
          );
        })}

      </div>

    </section>
  );
}