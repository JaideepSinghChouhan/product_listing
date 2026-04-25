"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import img from "@/public/vase.jpg";
import { getAboutImages } from "@/lib/aboutImagesClient";

export function AboutSection() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    getAboutImages().then((data) => {
      setImageUrl(data.homeAboutImageUrl);
    });
  }, []);
  console.log("AboutSection imageUrl:", imageUrl);

  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans semibold">
                Our Story
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground text-balance mb-6">
              Bringing Beauty &amp;
              <br />
              <em className="text-gold not-italic">Balance</em> to Every Space
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-5">
              PR Associate, founded in the vibrant city of Jaipur, is your
              trusted partner in premium and thoughtful corporate gifting. We
              specialize in providing high- quality, customized gifting
              solutions designed to help businesses across India build stronger
              connections and enhance brand identity. Our extensive product
              range includes laptop bags, executive gift sets, diaries, pens,
              file folders, keychains, religious idols, flash drives, and
              more—each available with complete branding options such as logos,
              taglines, or promotional messages.
            </p>
            <p className="text-foreground-muted leading-relaxed mb-8">
              At PR Associate, we believe a gift goes beyond
              the product—it reflects values, gratitude, and professionalism.
              With our focus on quality, innovation, and timely delivery, we
              ensure every gifting experience leaves a memorable impact. Let us
              help you make every gesture thoughtful, elegant, and
              unforgettable.
            </p>

            {/* Mission pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-border">
              {[
                { label: "Quality First", sub: "Uncompromising standards" },
                { label: "Curated Range", sub: "200+ premium products" },
                { label: "Partner Focus", sub: "Built for businesses" },
              ].map((pillar) => (
                <div key={pillar.label}>
                  <p className="font-serif text-sm text-gold mb-1">
                    {pillar.label}
                  </p>
                  <p className="text-xs text-foreground-subtle">{pillar.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src={imageUrl || img}
                alt="Our craft and story"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            {/* Decorative border offset */}
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full rounded-3xl border border-border-gold pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
