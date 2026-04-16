"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { api } from "@/lib/api";

export default function HeroSection() {
  const [heading, setHeading] = useState("");
  const [subtext, setSubtext] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [heroId, setHeroId] = useState("");

  const [loading, setLoading] = useState(false);

  // FETCH HERO
  useEffect(() => {
    const fetchHero = async () => {
      const data = await api("/hero");

      if (data?.length > 0) {
        const hero = data[0];

        setHeroId(hero.id);
        setHeading(hero.heading || "");
        setSubtext(hero.subtext || "");
        setExistingImages(hero.images || []);
      }
    };

    fetchHero();
  }, []);

  // CONVERT FILE → BASE64
  const convertToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  // DRAG DROP
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
  };

  // REMOVE NEW IMAGE
  const removeNewImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // REMOVE EXISTING IMAGE (UI ONLY for now)
  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  
  // SUBMIT
  const handleSave = async () => {
    try {
      setLoading(true);

      let base64Images: string[] = [];

      for (let file of images) {
        const base64 = await convertToBase64(file);
        base64Images.push(base64);
      }

      await api("/hero", {
        method: "POST",
        body: JSON.stringify({
          heading,
          subtext,
          images: base64Images,
        }),
      });

      location.reload();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const deleteImage = async (publicId: string) => {
  try {
    await api(`/hero/${heroId}`, {
      method: "DELETE",
      body: JSON.stringify({ publicId }),
    });

    // remove from UI
    setExistingImages((prev) =>
      prev.filter((img) => img.publicId !== publicId)
    );

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="max-w-2xl flex flex-col gap-6">

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
        <label
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-dashed border-2 p-6 flex flex-col items-center cursor-pointer rounded"
        >
          <Upload className="w-6 h-6" />
          <span>Drag & drop or click</span>

          <input
            type="file"
            multiple
            hidden
            onChange={handleFileSelect}
          />
        </label>

        {/* EXISTING IMAGES */}
{existingImages.length > 0 && (
  <div>
    <p className="text-sm mb-2">Hero Images</p>

    <div className="grid grid-cols-3 gap-3">
      {existingImages.map((img, i) => (
        <div
          key={i}
          className="relative w-full h-24 rounded overflow-hidden border group"
        >
          <Image
            src={img.url}
            alt=""
            fill
            className="object-cover"
          />

          {/* DELETE BUTTON */}
          <button
            onClick={() => deleteImage(img.publicId)}
            className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  </div>
)}

        {/* NEW IMAGES */}
        {images.length > 0 && (
          <div>
            <p className="text-sm mb-2">New</p>
            <div className="flex gap-2 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className="relative w-20 h-20">
                  <img
                    src={URL.createObjectURL(img)}
                    className="object-cover rounded w-full h-full"
                  />
                  <button
                    onClick={() => removeNewImage(i)}
                    className="absolute top-0 right-0 bg-black text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SAVE */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-accent text-white py-3 rounded active:scale-95"
        >
          {loading ? "Saving..." : "Save"}
        </button>

      </div>
    </div>
  );
}