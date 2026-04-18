"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { getContactInfo } from "@/lib/contactClient";

type ContactData = {
  phone?: string;
};

const FALLBACK_PHONE = "919876543210";
const WHATSAPP_TEXT =
  "Hi, I am interested in your products. Please share details for bulk order and customization.";

function normalizePhone(phone?: string) {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits || FALLBACK_PHONE;
}

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContactInfo();
        setContact(data);
      } catch {
        setContact(null);
      }
    };

    fetchContact();
  }, []);

  const shouldHide = pathname?.startsWith("/admin");

  const whatsappHref = useMemo(() => {
    const phone = normalizePhone(contact?.phone);
    return `https://wa.me/${phone}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;
  }, [contact?.phone]);

  if (shouldHide) return null;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[70] inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_12px_28px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </a>
  );
}
