"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { api } from "@/lib/api";

export default function LeadDetailsModal({ lead, onClose, refresh }: any) {
  const [status, setStatus] = useState(lead.status);
  const [note, setNote] = useState("");

  const handleUpdate = async () => {
    await api(`/leads/${lead.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status,
        note,
      }),
    });

    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 py-6">

      <div className="bg-surface p-5 sm:p-6 rounded-xl w-full max-w-[420px] max-h-full overflow-y-auto flex flex-col gap-4">

        <div className="flex justify-between">
          <h2 className="font-playfair">Lead Details</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <p><strong>Name:</strong> {lead.name}</p>
        <p><strong>Contact:</strong> {lead.contact}</p>
        <p><strong>Message:</strong> {lead.message}</p>

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="NEW">NEW</option>
          <option value="CONTACTED">CONTACTED</option>
          <option value="CLOSED">CLOSED</option>
        </select>

        {/* NOTE */}
        <textarea
          placeholder="Add note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border p-2 rounded"
        />

        {/* WHATSAPP */}
        <a
          href={`https://wa.me/${lead.contact}`}
          target="_blank"
          className="text-green-600 underline text-sm"
        >
          Open WhatsApp
        </a>

        <button
          onClick={handleUpdate}
          className="bg-accent text-white py-2 rounded"
        >
          Update
        </button>

      </div>
    </div>
  );
}