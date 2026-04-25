"use client";

import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Tag,
  Image as ImageIcon,
  Video,
  Star,
  Inbox,
  Mail,
  ChevronRight,
  Users,
} from "lucide-react";
import logo from "@/public/logo-bg.png";

type Section =
  | "dashboard"
  | "products"
  | "categories"
  | "hero"
  | "aboutImages"
  | "contact"
  | "videos"
  | "testimonials"
  | "leads"
  | "admins";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "categories", label: "Categories", icon: Tag },
  { id: "hero", label: "Hero Section", icon: ImageIcon },
  { id: "aboutImages", label: "About Images", icon: ImageIcon },
  { id: "contact", label: "Contact Details", icon: Mail },
  { id: "videos", label: "Videos", icon: Video },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "leads", label: "Leads", icon: Inbox },
  { id: "admins", label: "Manage Admins", icon: Users },
];

export default function Sidebar({
  active,
  setActive,
  mobileOpen,
  onCloseMobile,
  adminRole,
}: {
  active: Section;
  setActive: (val: Section) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  adminRole?: string | null;
}) {
  // Filter nav items - only superadmin sees "Manage Admins"
  const filteredNavItems = navItems.filter(
    (item) => item.id !== "admins" || adminRole?.toLowerCase() === "superadmin"
  );

  return (
    <>
      {mobileOpen && (
        <button
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={onCloseMobile}
          aria-label="Close menu overlay"
        />
      )}

      <aside
        className={`w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed md:static inset-y-0 left-0 z-40 transform transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
      
      {/* Logo */}
      <div className="px-4 h-16 flex items-center gap-3 border-b border-sidebar-border">
        <div className="relative w-10 h-10 shrink-0">
          <Image
            src={logo}
            alt="PR Associates"
            fill
            sizes="40px"
            className="object-contain"
            loading="lazy"
          />
        </div>
        <div className="leading-tight">
          <p className="font-playfair text-base">PR Associates</p>
          <p className="text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
            Admin
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id as Section);
                onCloseMobile?.();
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                isActive
                  ? "bg-accent/15 text-accent"
                  : "hover:bg-accent/5 hover:text-accent"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
              {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
            </button>
          );
        })}
      </nav>
      </aside>
    </>
  );
}