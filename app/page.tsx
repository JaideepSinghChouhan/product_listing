import { SiteHeader } from "./components/site-header"
import { SiteFooter } from "./components/site-footer"
import { HeroSection } from "./components/home/hero-section"
import { CategoriesSection } from "./components/home/categories-section"
import { FeaturedProductsSection } from "./components/home/featured-products-section"
import { TrustSection } from "./components/home/trust-section"
// import { BulkSection } from "@/components/home/bulk-section"
import { AboutSection } from "./components/home/about-section"
import { TestimonialsSection } from "./components/home/testimonials-section"
import { VideoSection } from "./components/home/video-section"
import { ProductsCtaSection } from "./components/home/products-cta-section.tsx"
// import { LeadCaptureSection } from "./components/home/lead-capture-section"
import { ContactSection } from "./components/home/contact-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProductsSection />
        {/* <TrustSection /> */}
        {/* <BulkSection /> */}
        <AboutSection />
        <VideoSection />
        <ProductsCtaSection />
        <TestimonialsSection />
        {/* <LeadCaptureSection /> */}
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
