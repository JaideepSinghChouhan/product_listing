"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { MessageCircle } from "lucide-react";

export function LeadCaptureSection() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    const name = form.name.trim();
    const contact = form.contact.trim();
    const message = form.message.trim();

    if (name.length < 2) return "Please enter your name.";
    if (!contact) return "Please enter phone or email.";

    if (contact.includes("@")) {
      if (!/^\S+@\S+\.\S+$/.test(contact)) return "Please enter a valid email address.";
    } else {
      const phoneDigits = contact.replace(/\D/g, "");
      if (phoneDigits.length < 8 || phoneDigits.length > 15) {
        return "Please enter a valid phone number.";
      }
    }

    if (message.length > 1000) return "Requirement is too long.";

    return "";
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      setLoading(true);

      await api("/leads", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          message: form.message,
        }),
      });

      setSuccess(true);
      setForm({ name: "", contact: "", message: "" });

      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-surface-elevated">

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl">
            Get Bulk Pricing & Custom Quotes
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Tell us your requirement and we’ll get back instantly
          </p>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-4">

          {/* NAME */}
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => {
              setError("");
              setForm({ ...form, name: e.target.value });
            }}
            className="border rounded-lg p-3 text-sm"
          />

          {/* CONTACT */}
          <input
            type="text"
            placeholder="Phone / Email"
            value={form.contact}
            onChange={(e) => {
              setError("");
              setForm({ ...form, contact: e.target.value });
            }}
            className="border rounded-lg p-3 text-sm"
          />

          {/* MESSAGE */}
          <textarea
            placeholder="Your Requirement (optional)"
            value={form.message}
            onChange={(e) => {
              setError("");
              setForm({ ...form, message: e.target.value });
            }}
            className="border rounded-lg p-3 text-sm min-h-[100px]"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white py-3 rounded-lg text-sm active:scale-95 disabled:opacity-50"
          >
            {loading
              ? "Submitting..."
              : success
              ? "Submitted ✔"
              : "Get Quote"}
          </button>

          {/* WHATSAPP CTA */}
          <a
            href="https://wa.me/911234567890"
            target="_blank"
            className="flex items-center justify-center gap-2 border py-3 rounded-lg text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>

        </div>

      </div>

    </section>
  );
}