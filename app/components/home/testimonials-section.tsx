"use client";

import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { TestimonialsSkeleton } from "../skeletons";

type TestimonialItem = {
  id?: string;
  name: string;
  role?: string | null;
  company?: string | null;
  message: string;
  rating?: number;
};

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();

        const arr: TestimonialItem[] = Array.isArray(data)
          ? data
          : data?.data || [];

        setTestimonials(arr);
      } catch (err) {
        console.error("Testimonials fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) return <TestimonialsSkeleton />;

  if (!testimonials.length) return null;

  const firstRow = [...testimonials, ...testimonials];
  const secondRow = [...testimonials, ...testimonials].reverse();

  return (
    <section className="relative overflow-hidden py-14 sm:py-16 md:py-20 bg-white">
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 36s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 36s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }

        .mask-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-black/5 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-10 sm:mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-black/5 text-xs sm:text-sm font-medium mb-4">
            <span className="h-2 w-2 rounded-full bg-black" />
            Trusted by clients
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-5xl leading-tight">
            What Our <span className="italic">Partners Say</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Real feedback from customers who trust our products, service, and delivery.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-4 sm:gap-6 mask-edges">
        <div className="flex w-max animate-scroll-left py-1">
          {firstRow.map((testimonial, index) => (
            <TestimonialCard
              key={`row-1-${testimonial.id || index}-cycle-${Math.floor(index / testimonials.length)}`}
              testimonial={testimonial}
            />
          ))}
        </div>

        <div className="flex w-max animate-scroll-right py-1">
          {secondRow.map((testimonial, index) => (
            <TestimonialCard
              key={`row-2-${testimonial.id || index}-cycle-${Math.floor(index / testimonials.length)}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  const rating = testimonial.rating || 5;

  return (
    <div className="group/card mx-2 sm:mx-3 w-[78vw] max-w-[280px] sm:w-[300px] md:w-[360px] flex-shrink-0 rounded-3xl border border-black/10 bg-white p-4 sm:p-5 md:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-5 right-5 text-black/5 group-hover/card:text-black/10 transition-colors">
        <Quote className="h-10 w-10 sm:h-12 sm:w-12 rotate-180" />
      </div>

      <div className="flex gap-1 mb-3 relative z-10">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-black text-black" />
        ))}
      </div>

      <p className="relative z-10 text-xs sm:text-sm text-neutral-700 leading-relaxed line-clamp-4 sm:line-clamp-5">
        “{testimonial.message}”
      </p>

      <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-black/5 relative z-10">
        <div className="min-w-0">
          <p className="font-semibold text-sm leading-tight text-[#1B365D]">
            {testimonial.name}
          </p>
          {(testimonial.role || testimonial.company) && (
            <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-[#0A5C36]">
              {testimonial.role || ""}
              {testimonial.role && testimonial.company ? " • " : ""}
              {testimonial.company || ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}