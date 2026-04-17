"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { HeroSectionSkeleton } from "../skeletons";

export function HeroSection() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // FETCH
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch("/api/hero");
        const data = await res.json();
        setSlides(data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  // AUTOPLAY
  useEffect(() => {
    if (!autoPlay || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, slides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  if (loading) return <HeroSectionSkeleton />;

  if (!slides.length) {
    return null;
  }

  return (
    <section className="relative h-[72vh] sm:h-[80vh] md:h-[85vh] flex items-center overflow-hidden">

      {/* BACKGROUND IMAGES */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.imageUrl}
              alt={slide.heading || "hero"}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full px-5 sm:px-6 md:px-12">
        <div className="max-w-xl text-white">

          {/* LABEL */}
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3">
            {slides[currentSlide]?.heading || "Collection"}
          </p>

          {/* TITLE */}
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-5xl leading-tight mb-4">
            {slides[currentSlide]?.heading || "Premium Products"}
          </h1>

          {/* SUBTEXT */}
          <p className="text-xs sm:text-sm md:text-base opacity-90 mb-6">
            {slides[currentSlide]?.subtext || "Explore our collection"}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">

            <Link
              href="/products"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-black rounded-full text-sm"
            >
              Explore
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/911234567890"
              target="_blank"
              className="flex items-center justify-center gap-2 px-5 py-3 border border-white rounded-full text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>

          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        <button onClick={prevSlide} className="p-2 bg-white/80 rounded-full">
          <ChevronLeft size={16} />
        </button>
        <button onClick={nextSlide} className="p-2 bg-white/80 rounded-full">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* DOTS */}
      <div className="hidden sm:flex absolute bottom-5 right-5 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition ${
              index === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>

    </section>
  );
}