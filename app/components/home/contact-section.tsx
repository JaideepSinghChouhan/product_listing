"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import { ContactSectionSkeleton } from "../skeletons";
import { getGoogleMapsEmbedUrl } from "@/lib/maps";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function ContactSection() {
  const [data, setData] = useState<any>(null);
  const [loadingContact, setLoadingContact] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  // FETCH CONTACT DATA
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("/api/contact");
        const json = await res.json();
        setData(json);
      } finally {
        setLoadingContact(false);
      }
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
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.details || errorData?.error || "Failed to submit form");
      }

      setForm({
        name: "",
        email: "",
        company: "",
        message: "",
        contact: "",
      });

      setSubmitted(true);
    } catch (err: any) {
      alert(err?.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  if (loadingContact) return <ContactSectionSkeleton />;

  if (!data) return null;

  const mapSrc = getGoogleMapsEmbedUrl(data.mapUrl, data.address);

  return (
    <motion.section
      className="py-12 sm:py-16 md:py-20 bg-surface-elevated"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >

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
              src={mapSrc}
              title="Business location map"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

        </div>

        {/* RIGHT SIDE (FORM EXACT LIKE IMAGE) */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="submitted"
              className="border rounded-xl p-6 bg-background flex flex-col gap-4 items-center justify-center text-center min-h-[420px]"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-playfair text-2xl sm:text-3xl">Enquiry Sent</h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Thanks for reaching out. We have received your enquiry and a welcome mail has been sent if you used a Gmail address.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 border py-3 px-6 rounded-full text-sm"
              >
                Send Another Enquiry
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="border rounded-xl p-6 bg-background flex flex-col gap-4"
              initial={reduceMotion ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </motion.section>
  );
}