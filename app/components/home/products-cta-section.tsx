import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";
import bg from "../../../public/bg.jpg";
export function ProductsCtaSection() {
  return (
    <section className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[32px] border bg-neutral-950 text-white shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
        <div className="absolute inset-0">
          <Image
            src={bg}
            alt="Featured product collection"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
        </div>

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] px-6 sm:px-10 md:px-14 py-10 sm:py-14 md:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/80">
              <ShoppingBag className="h-3.5 w-3.5" />
              Shop the collection
            </div>

            <h2 className="mt-5 font-playfair text-3xl sm:text-4xl md:text-5xl leading-tight">
              Find the products that fit your space, style, and budget.
            </h2>

            <p className="mt-4 max-w-xl text-sm sm:text-base text-white/78 leading-7">
              Explore our full product catalog to see the latest collections, bestsellers, and bulk-ready options in one place.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
              >
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                View Catalog
              </Link>
            </div>
          </div>

          <div className="relative lg:justify-self-end">
            <div className="grid gap-4 sm:grid-cols-2 lg:max-w-[360px]">
              {[
                "New arrivals",
                "Custom branding",
                "Bulk pricing",
                "Fast delivery",
              ].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-5 backdrop-blur-sm"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                    Highlight
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}