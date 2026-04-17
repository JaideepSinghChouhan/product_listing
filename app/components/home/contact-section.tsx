"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export function ContactSection() {
  const [data, setData] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);

  // FETCH CONTACT DATA
  useEffect(() => {
    const fetchContact = async () => {
      const res = await fetch("/api/contact");
      const json = await res.json();
      setData(json);
    };

    fetchContact();
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.contact) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          contact: form.contact,
          companyName: form.company,
          message: form.message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      setForm({
        name: "",
        email: "",
        company: "",
        message: "",
        contact: "",
      });

      alert("Enquiry Sent!");
    } catch {
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-surface-elevated">

      {/* HEADER */}
      <div className="text-center mb-12 px-4">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">
          Contact
        </p>
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl">
          Let’s Talk
        </h2>
        <p className="text-muted-foreground text-sm mt-2 max-w-xl mx-auto">
          Ready to place a bulk order or need a custom quote? Reach out and our
          team will get back within 24 hours.
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4">

          {/* PHONE */}
          <div className="border rounded-xl p-4 flex gap-4 items-center">
            <Phone className="w-5 h-5" />
            <div>
              <p className="text-xs text-muted-foreground">PHONE</p>
              <p className="text-sm">{data.phone}</p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="border rounded-xl p-4 flex gap-4 items-center">
            <Mail className="w-5 h-5" />
            <div>
              <p className="text-xs text-muted-foreground">EMAIL</p>
              <p className="text-sm">{data.email}</p>
            </div>
          </div>

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/${data.phone}`}
            target="_blank"
            className="border rounded-xl p-4 flex gap-4 items-center hover:bg-accent/5"
          >
            <MessageCircle className="w-5 h-5" />
            <div>
              <p className="text-xs text-muted-foreground">WHATSAPP</p>
              <p className="text-sm">Chat with us now</p>
            </div>
          </a>

          {/* ADDRESS */}
          <div className="border rounded-xl p-4 flex gap-4 items-center">
            <MapPin className="w-5 h-5" />
            <div>
              <p className="text-xs text-muted-foreground">ADDRESS</p>
              <p className="text-sm">{data.address}</p>
            </div>
          </div>

          {/* MAP (LEFT SIDE BOTTOM ✅) */}
          <div className="border rounded-xl overflow-hidden h-[220px]">
            <iframe
              src={data.mapUrl}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

        </div>

        {/* RIGHT SIDE (FORM EXACT LIKE IMAGE) */}
        <div className="border rounded-xl p-6 bg-background flex flex-col gap-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <input
              placeholder="Your Name *"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="border rounded-lg p-3 text-sm"
            />

            <input
              placeholder="Email Address *"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="border rounded-lg p-3 text-sm"
            />

          </div>

          <input
            placeholder="Phone Number"
            value={form.contact}
            onChange={(e) =>
              setForm({ ...form, contact: e.target.value })
            }
            className="border rounded-lg p-3 text-sm"
          />
          <input
            placeholder="Company Name"
            value={form.company}
            onChange={(e) =>
              setForm({ ...form, company: e.target.value })
            }
            className="border rounded-lg p-3 text-sm"
          />

          <textarea
            placeholder="Tell us about your requirements — product type, quantity..."
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="border rounded-lg p-3 text-sm min-h-[140px]"
          />

          {/* BUTTONS */}
          <div className="flex gap-4 flex-col sm:flex-row mt-2">

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-black text-white py-3 px-6 rounded-full text-sm flex-1 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Enquiry"}
            </button>

            <a
              href={`https://wa.me/${data.phone}`}
              target="_blank"
              className="border py-3 px-6 rounded-full text-sm flex-1 text-center"
            >
              WhatsApp Instead
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}