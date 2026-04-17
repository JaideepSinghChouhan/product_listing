import dynamic from "next/dynamic"
import { SiteHeader } from "./components/site-header"
import { SiteFooter } from "./components/site-footer"
import { HeroSection } from "./components/home/hero-section"

const CategoriesSection = dynamic(
  () => import("./components/home/categories-section").then((mod) => mod.CategoriesSection),
)
const FeaturedProductsSection = dynamic(
  () => import("./components/home/featured-products-section").then((mod) => mod.FeaturedProductsSection),
)
const AboutSection = dynamic(
  () => import("./components/home/about-section").then((mod) => mod.AboutSection),
)
const TestimonialsSection = dynamic(
  () => import("./components/home/testimonials-section").then((mod) => mod.TestimonialsSection),
)
const VideoSection = dynamic(
  () => import("./components/home/video-section").then((mod) => mod.VideoSection),
)
const ProductsCtaSection = dynamic(
  () => import("./components/home/products-cta-section.tsx").then((mod) => mod.ProductsCtaSection),
)
const ContactSection = dynamic(
  () => import("./components/home/contact-section").then((mod) => mod.ContactSection),
)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProductsSection />
        <AboutSection />
        <VideoSection />
        <ProductsCtaSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
