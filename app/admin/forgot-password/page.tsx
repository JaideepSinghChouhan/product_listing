"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          redirectBaseUrl: window.location.origin,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Request failed");
      }

      setMessage(data?.message || "Reset link sent if account exists");
      setEmail("");
    } catch (err: any) {
      setError(err?.message || "Unable to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[28px] border bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="p-6 sm:p-8 border-b bg-gradient-to-b from-surface-elevated to-background">
          <h1 className="font-playfair text-3xl leading-tight">Forgot Password</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Enter your admin email and we will send a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-sm mb-2">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-black px-5 py-3 text-sm text-white disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-sm text-muted-foreground text-center">
            <Link href="/admin/login" className="hover:text-black">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
