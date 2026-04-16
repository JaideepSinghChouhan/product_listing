"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, Check } from "lucide-react";
import { api } from "@/lib/api";

export default function HeroSection() {
  const [headline, setHeadline] = useState("");
  const [subtext, setSubtext] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // 🔥 FETCH EXISTING HERO
  useEffect(() => {
    const fetchHero = async () => {
      const data = await api("/hero");
      if (data) {
        setHeadline(data.headline || "");
        setSubtext(data.subtext || "");
        setPreview(data.imageUrl || "");
      }
    };
    fetchHero();
  }, []);

  const convertToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleSave = async () => {
    try {
      setLoading(true);

      let imageBase64 = "";

      if (image) {
        imageBase64 = await convertToBase64(image);
      }

      await api("/hero", {
        method: "POST",
        body: JSON.stringify({
          headline,
          subtext,
          image: imageBase64,
        }),
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl flex flex-col gap-6">

      <div className="p-6 rounded-2xl bg-surface border border-card-border flex flex-col gap-5">

        {/* Headline */}
        <div>
          <label className="text-xs uppercase text-muted-foreground mb-2 block">
            Hero Headline
          </label>
          <input
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full border p-3 rounded"
          />
        </div>

        {/* Subtext */}
        <div>
          <label className="text-xs uppercase text-muted-foreground mb-2 block">
            Subtext
          </label>
          <textarea
            value={subtext}
            onChange={(e) => setSubtext(e.target.value)}
            className="w-full border p-3 rounded"
          />
        </div>

        {/* Image */}
        <div>
          <label className="text-xs uppercase text-muted-foreground mb-2 block">
            Hero Image
          </label>

          <div className="flex gap-4 items-center">
            {preview && (
              <div className="w-24 h-24 relative rounded overflow-hidden border">
                <Image src={preview} alt="hero" fill className="object-cover" />
              </div>
            )}

            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded">
              <Upload className="w-4 h-4" />
              Upload
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-accent text-white py-3 rounded flex items-center justify-center gap-2 active:scale-95"
        >
          {loading ? (
            "Saving..."
          ) : saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </button>

      </div>

    </div>
  );
}