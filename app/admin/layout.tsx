"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function getTokenPayload(token: string): { exp?: number } | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const payload = getTokenPayload(token);
  if (!payload?.exp) return true;
  return payload.exp * 1000 <= Date.now();
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  const isPublicAdminPage = useMemo(
    () =>
      pathname === "/admin/login" ||
      pathname === "/admin/forgot-password" ||
      pathname === "/admin/reset-password",
    [pathname]
  );

  useEffect(() => {
    if (isPublicAdminPage) {
      setAllowed(true);
      return;
    }

    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("token");
      localStorage.removeItem("adminUser");
      router.replace("/admin/login");
      return;
    }

    setAllowed(true);
  }, [isPublicAdminPage, router]);

  if (!allowed) {
    return null;
  }

  return <div>{children}</div>;
}