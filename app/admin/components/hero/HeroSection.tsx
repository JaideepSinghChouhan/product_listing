"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { api } from "@/lib/api";
import { uploadImageToCloudinary } from "@/lib/cloudinaryClient";

export default function HeroSection() {
  const [heading, setHeading] = useState("");
  const [subtext, setSubtext] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [heroes, setHeroes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // 🔥 FETCH ALL HERO SLIDES
  const fetchHeroes = async () => {
    const data = await api("/hero");
    setHeroes(data || []);
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      setUploadProgress(0);

      if (!image) return;

      setUploadProgress(10);
      const result = await uploadImageToCloudinary(image, "hero");
      setUploadProgress(90);

      await api("/hero", {
        method: "POST",
        body: JSON.stringify({
          heading,
          subtext,
          imageUrl: result.url,
          publicId: result.publicId,
        }),
      });

      setUploadProgress(100);
      setImage(null);
      setPreview("");
      fetchHeroes();

    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const deleteHero = async (id: string) => {
    if (!confirm("Delete this hero slide?")) return;

    try {
      await api(`/hero/${id}`, {
        method: "DELETE",
      });
      fetchHeroes();
    } catch (err: any) {
      alert(err?.message || "Failed to delete");
    }
  };

  return (
    <div className="max-w-2xl w-full flex flex-col gap-6">

      <div className="p-6 rounded-2xl bg-surface border flex flex-col gap-5">

        {/* Heading */}
        <input
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Heading"
          className="border p-3 rounded"
        />

        {/* Subtext */}
        <textarea
          value={subtext}
          onChange={(e) => setSubtext(e.target.value)}
          placeholder="Subtext"
          className="border p-3 rounded"
        />

        {/* Upload */}
        <label className="border-dashed border-2 p-6 flex flex-col items-center cursor-pointer rounded">
          <Upload className="w-6 h-6" />
          <span>Upload Image</span>

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

        {/* PREVIEW */}
        {preview && (
          <div className="relative w-full h-40">
            <img src={preview} className="w-full h-full object-cover rounded" />
          </div>
        )}

        {/* PROGRESS BAR */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full bg-gray-200 rounded overflow-hidden">
            <div 
              className="bg-accent h-2 transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {/* SAVE */}
        <button
          onClick={handleSave}
          className="bg-accent text-white py-3 rounded"
        >
          {loading ? "Saving..." : "Add Slide"}
        </button>

      </div>

      {/* 🔥 EXISTING HERO GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {heroes.map((hero) => (
          <div key={hero.id} className="relative h-24 rounded overflow-hidden border group">
            <Image src={hero.imageUrl} alt="" fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" loading="lazy" />

            <button
              onClick={() => deleteHero(hero.id)}
              className="absolute top-1 right-1 bg-black text-white p-1 rounded opacity-0 group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}