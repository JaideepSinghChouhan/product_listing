"use client";

import { useEffect, useState } from "react";
import { Save, MapPin, Phone, Mail, Link as LinkIcon } from "lucide-react";
import { api } from "@/lib/api";
import { getGoogleMapsEmbedUrl } from "@/lib/maps";

type ContactFormState = {
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
};

const emptyForm: ContactFormState = {
  address: "",
  phone: "",
  email: "",
  mapUrl: "",
};

function normalizeIndianPhone(phone: string) {
  const trimmed = phone.trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("+91")) {
    return trimmed;
  }

  const digits = trimmed.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("0")) {
    return `+91${digits.slice(1)}`;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return `+${digits}`;
  }

  return trimmed.startsWith("+") ? trimmed : `+91${digits || trimmed}`;
}

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await api("/contact");

        setForm({
          address: data?.address || "",
          phone: data?.phone || "",
          email: data?.email || "",
          mapUrl: data?.mapUrl || "",
        });
      } catch (error) {
        console.error("Failed to load contact info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const normalizedForm = {
        ...form,
        phone: normalizeIndianPhone(form.phone),
      };

      setForm(normalizedForm);

      const response = await api("/contact", {
        method: "POST",
        body: JSON.stringify(normalizedForm),
      });

      if (response?.error) {
        throw new Error(response?.details || response.error);
      }

      setMessage("Contact details saved successfully.");
    } catch (error: any) {
      setMessage(error?.message || "Failed to save contact details.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border bg-background p-6">
        Loading contact settings...
      </div>
    );
  }

  const mapPreviewSrc = getGoogleMapsEmbedUrl(form.mapUrl, form.address || "Jaipur, India");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Contact Settings
        </p>
        <h2 className="font-playfair text-2xl">Edit Site Contact Details</h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          These values are used by the public contact section and the enquiry flows.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border rounded-2xl bg-background p-6 space-y-4">
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm">
              <span className="flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4" />
                Address
              </span>
              <textarea
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                rows={4}
                className="border rounded-xl px-4 py-3 bg-surface text-sm"
                placeholder="Full business address"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="flex items-center gap-2 font-medium">
                <Phone className="w-4 h-4" />
                Phone
              </span>
              <input
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                onBlur={(e) => updateField("phone", normalizeIndianPhone(e.target.value))}
                className="border rounded-xl px-4 py-3 bg-surface text-sm"
                placeholder="Phone number"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="flex items-center gap-2 font-medium">
                <Mail className="w-4 h-4" />
                Email
              </span>
              <input
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="border rounded-xl px-4 py-3 bg-surface text-sm"
                placeholder="Email address"
                type="email"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="flex items-center gap-2 font-medium">
                <LinkIcon className="w-4 h-4" />
                Google Maps Embed URL
              </span>
              <input
                value={form.mapUrl}
                onChange={(e) => updateField("mapUrl", e.target.value)}
                className="border rounded-xl px-4 py-3 bg-surface text-sm"
                placeholder="Paste a Google Maps link or embed URL"
              />
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black text-white text-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Contact Details"}
            </button>

            <button
              type="button"
              onClick={() => setForm(emptyForm)}
              className="px-5 py-3 rounded-xl border text-sm"
            >
              Clear
            </button>
          </div>

          {message && (
            <p className="text-sm text-muted-foreground">
              {message}
            </p>
          )}
        </div>

        <div className="border rounded-2xl bg-surface-elevated p-6 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Live Preview
            </p>
            <h3 className="font-playfair text-xl mt-2">Public Contact Section</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="rounded-xl border bg-background p-4">
              <p className="text-xs text-muted-foreground mb-1">Address</p>
              <p>{form.address || "No address set"}</p>
            </div>

            <div className="rounded-xl border bg-background p-4">
              <p className="text-xs text-muted-foreground mb-1">Phone</p>
              <p>{form.phone || "No phone set"}</p>
            </div>

            <div className="rounded-xl border bg-background p-4">
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <p>{form.email || "No email set"}</p>
            </div>

            <div className="rounded-xl border bg-background p-4">
              <p className="text-xs text-muted-foreground mb-1">Map URL</p>
              <p className="break-all text-xs text-muted-foreground">
                {form.mapUrl || "No map URL set"}
              </p>
            </div>

            <div className="rounded-xl border bg-background overflow-hidden">
              <iframe
                src={mapPreviewSrc}
                title="Contact map preview"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}