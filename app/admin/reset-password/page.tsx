"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AdminResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validateForm = () => {
    if (!token) return "Missing reset token";
    if (!password || !confirmPassword) return "Please fill all fields";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      return "Password should include letters and numbers.";
    }

    return "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Reset failed");
      }

      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => {
        router.replace("/admin/login");
      }, 1200);
    } catch (err: any) {
      setError(err?.message || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[28px] border bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="p-6 sm:p-8 border-b bg-gradient-to-b from-surface-elevated to-background">
          <h1 className="font-playfair text-3xl leading-tight">Reset Password</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Set a new password for your admin account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-sm mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Re-enter new password"
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
            {loading ? "Updating..." : "Reset Password"}
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
