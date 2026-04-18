"use client";

import { useEffect, useState } from "react";
import logo from "@/public/logo-bg.png";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function SiteFooter() {
  const [contact, setContact] = useState<{ email?: string; phone?: string } | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        setContact(data);
      } catch (err) {
        console.error("Footer contact fetch error:", err);
      }
    };

    fetchContact();
  }, []);

  return (
    <footer className="bg-[#f5f1eb] text-black pt-12 pb-6">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* LEFT - BRAND */}
          <div className="flex flex-col gap-4">

            {/* LOGO */}
            <div className="relative w-32 h-20">
              <Image
                src={logo}
                alt="PR Associates"
                fill
                sizes="128px"
                className="object-contain"
                loading="lazy"
              />
            </div>

            <p className="text-sm font-medium">
              PR Associates
            </p>

            <p className="text-sm text-muted-foreground">
              Premium corporate gifting, custom branding, and bulk order support.
            </p>

            <p className="text-sm">
              Email: <span className="font-medium">{contact?.email || "info@prassociates.com"}</span>
            </p>

            <p className="text-sm">
              Phone: <span className="font-medium">{contact?.phone || "+91 9876543210"}</span>
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-2">
              <div className="border p-2 rounded-full">
                <MessageCircle className="w-4 h-4" />
              </div>
            </div>

          </div>

          {/* BRAND LINKS */}
          <div className="sm:justify-self-end md:justify-self-auto">
            <h3 className="font-medium mb-4">Brand</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </div>

          {/* HELP LINKS */}
          <div className="sm:justify-self-end md:justify-self-auto">
            <h3 className="font-medium mb-4">Help</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Refund Policy</Link>
              <Link href="#">Shipping Policy</Link>
              <Link href="#">Terms of Service</Link>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">

          © 2025 PR Associates. All rights reserved.

        </div>

      </div>

    </footer>
  );
}