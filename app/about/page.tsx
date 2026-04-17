import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Sparkles, Truck } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { AboutSection } from "../components/home/about-section";
import img from "@/public/vase.jpg";

const highlights = [
  {
    title: "Premium Gifting",
    description:
      "Thoughtful corporate gifting collections built to strengthen brand recall and client relationships.",
    icon: Sparkles,
  },
  {
    title: "Custom Branding",
    description:
      "Logos, taglines, and promotional messages applied across products with a professional finish.",
    icon: BadgeCheck,
  },
  {
    title: "On-Time Delivery",
    description:
      "Reliable fulfillment for events, festivals, seminars, and bulk corporate requirements.",
    icon: Truck,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="py-16 sm:py-20 md:py-28 border-b bg-gradient-to-b from-surface-elevated to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                <span className="w-8 h-px bg-border" />
                About Us
                <span className="w-8 h-px bg-border" />
              </div>

              <div className="space-y-4">
                <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl leading-tight text-balance">
                  Corporate gifting that feels thoughtful, refined, and memorable.
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  PR Associates, founded in Jaipur, helps businesses across India
                  create stronger connections through premium gifting solutions,
                  brand-ready customization, and dependable bulk order support.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm"
                >
                  Browse Products
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border bg-surface-elevated shadow-sm">
                <Image
                  src={img}
                  alt="Corporate gifting and product story"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/70">
                    Jaipur, India
                  </p>
                  <p className="font-playfair text-2xl mt-2">
                    Built for modern businesses that value presentation.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[2rem] border border-border-gold pointer-events-none" />
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-2xl border bg-background p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="font-playfair text-xl">{item.title}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <AboutSection />

        <section className="py-16 sm:py-20 md:py-24 border-t bg-surface-elevated">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                What We Deliver
              </p>
              <h2 className="font-playfair text-3xl sm:text-4xl">
                A gifting partner for launches, festivals, events, and enterprise needs.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                From curated hampers to branded essentials, our catalog is designed
                to help teams present something useful, elegant, and consistent with
                the brand they represent.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Executive gifts",
                "Employee appreciation kits",
                "Festival gifting",
                "Conference giveaways",
                "Channel partner programs",
                "Custom branding support",
              ].map((item) => (
                <div key={item} className="rounded-2xl border bg-background px-5 py-4 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Start Here
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl mt-3">
              Explore the collection or reach out for a custom quote.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-2xl mx-auto">
              If you need a gifting solution tailored to your event or company,
              we can help you narrow it down quickly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm"
              >
                View Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border text-sm"
              >
                Contact Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}