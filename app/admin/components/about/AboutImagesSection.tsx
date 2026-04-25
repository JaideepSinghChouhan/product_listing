"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { api } from "@/lib/api";
import fallbackImage from "@/public/vase.jpg";

type AboutImagesResponse = {
  homeAboutImageUrl: string | null;
  aboutPageHeroImageUrl: string | null;
};

type ImageSlot = {
  key: "home-about-image" | "about-page-hero-image";
  title: string;
  description: string;
};

const SLOTS: ImageSlot[] = [
  {
    key: "home-about-image",
    title: "Home About Section Image",
    description: "Used in Home About section and again in About page lower story section.",
  },
  {
    key: "about-page-hero-image",
    title: "About Page Hero Image",
    description: "Used in About page top hero block.",
  },
];

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export default function AboutImagesSection() {
  const [images, setImages] = useState<AboutImagesResponse>({
    homeAboutImageUrl: null,
    aboutPageHeroImageUrl: null,
  });
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const imageMap = useMemo(
    () => ({
      "home-about-image": images.homeAboutImageUrl,
      "about-page-hero-image": images.aboutPageHeroImageUrl,
    }),
    [images]
  );

  const fetchImages = async () => {
    try {
      const data = await api("/about-images");
      setImages({
        homeAboutImageUrl: data?.homeAboutImageUrl || null,
        aboutPageHeroImageUrl: data?.aboutPageHeroImageUrl || null,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const saveSlot = async (slotKey: ImageSlot["key"]) => {
    const file = files[slotKey];
    if (!file) return;

    try {
      setSavingKey(slotKey);
      const base64 = await toBase64(file);

      await api("/about-images", {
        method: "POST",
        body: JSON.stringify({
          key: slotKey,
          image: base64,
        }),
      });

      setFiles((prev) => ({ ...prev, [slotKey]: null }));
      setPreviews((prev) => ({ ...prev, [slotKey]: "" }));
      await fetchImages();
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="max-w-5xl w-full flex flex-col gap-6">
      <div className="p-6 rounded-2xl bg-surface border">
        <h2 className="text-lg font-semibold">About Images</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Upload or replace the two images used across About sections. If none is set,
          the current hardcoded fallback image is used automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {SLOTS.map((slot) => {
          const current = imageMap[slot.key];
          const preview = previews[slot.key];
          const isSaving = savingKey === slot.key;

          return (
            <div key={slot.key} className="p-5 rounded-2xl bg-surface border flex flex-col gap-4">
              <div>
                <h3 className="font-medium">{slot.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{slot.description}</p>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border bg-background">
                <Image
                  src={preview || current || fallbackImage}
                  alt={slot.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <label className="border-dashed border-2 p-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer text-sm">
                <Upload className="w-4 h-4" />
                {preview ? "Change selected image" : "Select new image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (!file) return;
                    setFiles((prev) => ({ ...prev, [slot.key]: file }));
                    setPreviews((prev) => ({ ...prev, [slot.key]: URL.createObjectURL(file) }));
                  }}
                />
              </label>

              <button
                onClick={() => saveSlot(slot.key)}
                disabled={!files[slot.key] || isSaving || loading}
                className="bg-accent text-white py-2.5 rounded disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save Image"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
