"use client";

import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import DashboardSection from "./components/dashboard/DashBoardSection";
import ProductsSection from "./components/products/ProductsSection";
import CategoriesSection from "./components/categories/CategoriesSection";
import HeroSection from "./components/hero/HeroSection";
import ContactSection from "./components/contact/ContactSection";
import VideosSection from "./components/videos/VideosSection";
import TestimonialsSection from "./components/testimonials/TestimonialsSection";
import LeadsSection from "./components/leads/LeadsSection";

type Section =
  | "dashboard"
  | "products"
  | "categories"
  | "hero"
  | "contact"
  | "videos"
  | "testimonials"
  | "leads";

export default function AdminPage() {
  const [active, setActive] = useState<Section>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">

      <Sidebar
        active={active}
        setActive={setActive}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col md:ml-0">
        <Topbar title={active} onOpenMenu={() => setMobileSidebarOpen(true)} />

        <div className="p-4 sm:p-6">
        {active === "dashboard" && <DashboardSection />}

        {active === "products" && <ProductsSection />}

        {active === "categories" && <CategoriesSection />}

        {active === "hero" && <HeroSection />}

        {active === "contact" && <ContactSection />}

        {active === "videos" && <VideosSection />}

        {active === "testimonials" && <TestimonialsSection />}

        {active === "leads" && <LeadsSection />}
        </div>
      </div>

    </div>
  );
}