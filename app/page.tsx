import dynamic from "next/dynamic"
import { SiteHeader } from "./components/site-header"
import { SiteFooter } from "./components/site-footer"
import { HeroSection } from "./components/home/hero-section"
import {
  AboutSectionSkeleton,
  CategoriesSkeleton,
  ContactSectionSkeleton,
  FeaturedProductsSkeleton,
  TestimonialsSkeleton,
  VideoSectionSkeleton,
} from "./components/skeletons"

const CategoriesSection = dynamic(
  () => import("./components/home/categories-section").then((mod) => mod.CategoriesSection),
  { loading: () => <CategoriesSkeleton /> },
)
const FeaturedProductsSection = dynamic(
  () => import("./components/home/featured-products-section").then((mod) => mod.FeaturedProductsSection),
  { loading: () => <FeaturedProductsSkeleton /> },
)
const AboutSection = dynamic(
  () => import("./components/home/about-section").then((mod) => mod.AboutSection),
  { loading: () => <AboutSectionSkeleton /> },
)
const TestimonialsSection = dynamic(
  () => import("./components/home/testimonials-section").then((mod) => mod.TestimonialsSection),
  { loading: () => <TestimonialsSkeleton /> },
)
const VideoSection = dynamic(
  () => import("./components/home/video-section").then((mod) => mod.VideoSection),
  { loading: () => <VideoSectionSkeleton /> },
)
const ProductsCtaSection = dynamic(
  () => import("./components/home/products-cta-section.tsx").then((mod) => mod.ProductsCtaSection),
)
const ContactSection = dynamic(
  () => import("./components/home/contact-section").then((mod) => mod.ContactSection),
  { loading: () => <ContactSectionSkeleton /> },
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
