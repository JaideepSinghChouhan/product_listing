"use client";

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
} from "lucide-react";

type Section =
  | "dashboard"
  | "products"
  | "categories"
  | "hero"
  | "contact"
  | "videos"
  | "testimonials"
  | "leads";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "categories", label: "Categories", icon: Tag },
  { id: "hero", label: "Hero Section", icon: ImageIcon },
  { id: "contact", label: "Contact Details", icon: Mail },
  { id: "videos", label: "Videos", icon: Video },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "leads", label: "Leads", icon: Inbox },
];

export default function Sidebar({
  active,
  setActive,
  mobileOpen,
  onCloseMobile,
}: {
  active: Section;
  setActive: (val: Section) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
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
      <div className="px-6 h-16 flex items-center border-b border-sidebar-border font-playfair text-xl">
        Lux<span className="text-accent">ora</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
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