"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logo from "@/public/logo-bg.png";

export function SiteHeader() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // 🔥 SCROLL TO SECTION HANDLER
  const handleScroll = (id: string) => {
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full border-b">

      {/* 🔥 TOP BAR */}
      <div className="bg-black text-white text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-widest text-center py-2 px-3 sm:px-4 leading-relaxed">
        FREE CONSULTATION ON BULK ORDERS · CUSTOM BRANDING AVAILABLE · +91 98765 43210
      </div>

      {/* 🔥 MAIN NAV */}
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-10 py-3 sm:py-4 bg-white">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="PR Associates"
            width={42}
            height={42}
            sizes="42px"
            className="object-contain"
          />
          <div className="leading-tight">
            <p className="text-base sm:text-lg font-serif">PR Associates</p>
            <p className="text-[10px] tracking-widest text-gray-500">
              PREMIUM
            </p>
          </div>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/">HOME</Link>

          <Link href="/products" className="flex items-center gap-1">
            PRODUCTS
          </Link>

          <Link href="/about" className="flex items-center gap-1">
            ABOUT US
          </Link>

          <Link href="/contact" className="flex items-center gap-1">
            CONTACT
          </Link>
        </nav>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-3">

          {/* WhatsApp */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            className="hidden sm:flex items-center gap-2 px-4 py-2 border rounded-full text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>

          {/* Enquire */}
          <button
            onClick={() => handleScroll("contact")}
            className="px-3 sm:px-5 py-2 bg-black text-white rounded-full text-xs sm:text-sm"
          >
            Enquire
          </button>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg border"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-3 text-sm">
          <Link href="/" onClick={() => setMobileOpen(false)}>HOME</Link>
          <Link href="/products" onClick={() => setMobileOpen(false)}>PRODUCTS</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>ABOUT US</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>CONTACT</Link>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-full"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}