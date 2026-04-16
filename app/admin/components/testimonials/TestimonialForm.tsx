"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { api } from "@/lib/api";

export default function TestimonialForm({ open, onClose, refresh }: any) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api("/testimonials", {
        method: "POST",
        body: JSON.stringify({
          name,
          role,
          company,
          message,
        }),
      });

      refresh();
      onClose();

    } catch {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-surface p-6 rounded-xl w-[400px] flex flex-col gap-4">

        <div className="flex justify-between">
          <h2 className="font-playfair">Add Testimonial</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Client Name"
          className="border p-2 rounded"
        />

        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role (optional)"
          className="border p-2 rounded"
        />

        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company (optional)"
          className="border p-2 rounded"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Testimonial Message"
          className="border p-2 rounded"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-accent text-white py-2 rounded active:scale-95"
        >
          {loading ? "Saving..." : "Save"}
        </button>

      </div>
    </div>
  );
}