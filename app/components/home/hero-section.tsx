"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const [whatsappHref, setWhatsappHref] = useState("https://wa.me/919876543210");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const reduceMotion = useReducedMotion();

  const buildWhatsappHref = (phone?: string) => {
    const digits = String(phone || "").replace(/\D/g, "");
    const normalizedPhone = digits || "919876543210";
    const message = "Hello, I would like to know more about your products.";

    return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
  };

  // FETCH
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const [heroRes, contactRes] = await Promise.all([
          fetch("/api/hero"),
          fetch("/api/contact"),
        ]);

        const heroData = await heroRes.json();
        const contactData = await contactRes.json();

        setSlides(heroData || []);
        setWhatsappHref(buildWhatsappHref(contactData?.phone));
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
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1.03 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
          </motion.div>
        ))}

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          aria-hidden="true"
          className="absolute -top-20 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, 24, 0], y: [0, 18, 0], opacity: [0.28, 0.45, 0.28] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-200/10 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, -18, 0], y: [0, -20, 0], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* CONTENT */}
      <motion.div
        className="relative z-10 w-full px-5 sm:px-6 md:px-12"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        key={currentSlide}
      >
        <motion.div
          className="max-w-xl text-white"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
        >

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
            >
              {/* LABEL */}
              <motion.p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.04 }}
              >
                {slides[currentSlide]?.heading || "Collection"}
              </motion.p>

              {/* TITLE */}
              <motion.h1
                className="font-playfair text-2xl sm:text-3xl md:text-5xl leading-tight mb-4"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: "easeOut", delay: 0.08 }}
              >
                {slides[currentSlide]?.heading || "Premium Products"}
              </motion.h1>

              {/* SUBTEXT */}
              <motion.p
                className="text-xs sm:text-sm md:text-base opacity-90 mb-6 max-w-lg"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: "easeOut", delay: 0.14 }}
              >
                {slides[currentSlide]?.subtext || "Explore our collection"}
              </motion.p>

              {/* CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: "easeOut", delay: 0.2 }}
              >

                <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
                  <Link
                    href="/products"
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-black rounded-full text-sm"
                  >
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>

                <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 border border-white rounded-full text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </motion.div>

              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

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