"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
import AdminsSection from "./components/admins/AdminsSection";

type Section =
  | "dashboard"
  | "products"
  | "categories"
  | "hero"
  | "contact"
  | "videos"
  | "testimonials"
  | "leads"
  | "admins";

export default function AdminPage() {
  const router = useRouter();
  const [active, setActive] = useState<Section>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [adminRole, setAdminRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
    const role = localStorage.getItem("adminRole");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setAdminRole(role);
    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-sm text-muted-foreground">
        Checking admin session...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">

      <Sidebar
        active={active}
        setActive={setActive}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        adminRole={adminRole}
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

        {active === "admins" && <AdminsSection />}
        </div>
      </div>

    </div>
  );
}