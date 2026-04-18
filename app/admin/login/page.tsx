"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo-bg.png";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isTokenExpired = (token: string) => {
    try {
      const [, payload] = token.split(".");
      if (!payload) return true;

      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = atob(base64);
      const parsed = JSON.parse(decoded) as { exp?: number };

      if (!parsed.exp) return true;
      return parsed.exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      router.replace("/admin");
      return;
    }

    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    localStorage.removeItem("adminUser");
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || data?.details || "Login failed");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.admin));
      localStorage.removeItem("token");

      router.replace("/admin");
    } catch (err: any) {
      setError(err?.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[28px] border bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="p-6 sm:p-8 border-b bg-gradient-to-b from-surface-elevated to-background">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src={logo}
                alt="PR Associates"
                fill
                sizes="48px"
                className="object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-playfair text-xl">PR Associates</p>
              <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                Admin Login
              </p>
            </div>
          </div>

          <h1 className="font-playfair text-3xl leading-tight">
            Sign in to manage the website.
          </h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Use the admin credentials you seeded in the database to access the dashboard and CMS sections.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black"
            />
            <div className="mt-2 text-right">
              <Link href="/admin/forgot-password" className="text-xs text-muted-foreground hover:text-black">
                Forgot password?
              </Link>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-black px-5 py-3 text-sm text-white disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <Link href="/" className="hover:text-black">
              Back to site
            </Link>
            <span>Secure admin access</span>
          </div>
        </form>
      </div>
    </div>
  );
}