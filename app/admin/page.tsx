"use client";

import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import DashboardSection from "./components/dashboard/DashBoardSection";
import ProductsSection from "./components/products/ProductsSection";
import CategoriesSection from "./components/categories/CategoriesSection";
import HeroSection from "./components/hero/HeroSection";
import TestimonialsSection from "./components/testimonials/TestimonialsSection";
import LeadsSection from "./components/leads/LeadsSection";

type Section =
  | "dashboard"
  | "products"
  | "categories"
  | "hero"
  | "videos"
  | "testimonials"
  | "leads";

export default function AdminPage() {
  const [active, setActive] = useState<Section>("dashboard");

  return (
    <div className="flex min-h-screen bg-background">

      <Sidebar active={active} setActive={setActive} />

      <div className="flex-1 flex flex-col">
        <Topbar title={active} />

        <div className="p-6">
        {active === "dashboard" && <DashboardSection />}

        {active === "products" && <ProductsSection />}

        {active === "categories" && <CategoriesSection />}

        {active === "hero" && <HeroSection />}

        {active === "testimonials" && <TestimonialsSection />}

        {active === "leads" && <LeadsSection />}
        </div>
      </div>

    </div>
  );
}