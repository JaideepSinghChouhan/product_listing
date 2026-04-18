"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import logo from "@/public/logo-bg.png";
import { getContactInfo } from "@/lib/contactClient";

type ContactData = {
  phone?: string;
};

const FALLBACK_PHONE = "919876543210";
const FALLBACK_PHONE_DISPLAY = "+91 98765 43210";
const WHATSAPP_TEXT =
  "Hi, I am interested in your products. Please share details for bulk order and customization.";

function normalizePhone(phone?: string) {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits || FALLBACK_PHONE;
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      const data = await getContactInfo();
      setContact(data);
    };

    fetchContact();
  }, []);

  const whatsappHref = useMemo(() => {
    const phone = normalizePhone(contact?.phone);
    return `https://wa.me/${phone}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;
  }, [contact?.phone]);

  const displayPhone = contact?.phone?.trim() || FALLBACK_PHONE_DISPLAY;

  return (
    <header className="w-full border-b">

      {/* 🔥 TOP BAR */}
      <div className="bg-black text-white text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-widest text-center py-2 px-3 sm:px-4 leading-relaxed">
        FREE CONSULTATION ON BULK ORDERS · CUSTOM BRANDING AVAILABLE · {displayPhone}
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
            loading="lazy"
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
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 border rounded-full text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>

          {/* Enquire */}
          <Link
            href="/contact"
            className="px-3 sm:px-5 py-2 bg-black text-white rounded-full text-xs sm:text-sm"
          >
            Enquire
          </Link>

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
            href={whatsappHref}
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