"use client";

import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { api } from "@/lib/api";

export default function CategoryForm({
  open,
  onClose,
  refresh,
  initialData,
}: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || "");
      setPreview(initialData.imageUrl || "");
    }
  }, [initialData]);

  if (!open) return null;

  const convertToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleSubmit = async () => {
    try {
      setError("");
      setLoading(true);

      if (name.trim().length < 2) {
        setError("Category name is required.");
        return;
      }

      if (description.trim().length > 500) {
        setError("Description is too long.");
        return;
      }

      let imageBase64 = "";

      if (image) {
        if (!image.type.startsWith("image/")) {
          setError("Please upload an image file.");
          return;
        }

        if (image.size > 5 * 1024 * 1024) {
          setError("Image must be 5 MB or smaller.");
          return;
        }

        imageBase64 = await convertToBase64(image);
      }

      if (initialData) {
        await api(`/categories/${initialData.id}`, {
          method: "PUT",
          body: JSON.stringify({
            name,
            description,
            image: imageBase64 || undefined, // optional update
          }),
        });
      } else {
        if (!imageBase64) {
          setError("Image required");
          return;
        }

        await api("/categories", {
          method: "POST",
          body: JSON.stringify({
            name,
            description,
            image: imageBase64,
          }),
        });
      }

      refresh();
      onClose();

    } catch (err) {
      console.error(err);
      setError("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">

      <div className="bg-surface p-5 rounded-xl w-full max-w-sm flex flex-col gap-4">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="font-playfair text-lg">
            {initialData ? "Edit Category" : "Add Category"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* NAME */}
        <input
          value={name}
          onChange={(e) => {
            setError("");
            setName(e.target.value);
          }}
          placeholder="Category name"
          className="border p-3 rounded text-sm"
        />

        {/* DESCRIPTION */}
        <textarea
          value={description}
          onChange={(e) => {
            setError("");
            setDescription(e.target.value);
          }}
          placeholder="Description"
          className="border p-3 rounded text-sm"
        />

        {/* IMAGE UPLOAD */}
        <label className="border-dashed border-2 p-4 flex flex-col items-center cursor-pointer rounded text-sm">
          <Upload className="w-5 h-5 mb-1" />
          Upload Image

          <input
            type="file"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setError("");
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* PREVIEW */}
        {preview && (
          <div className="w-full h-32 relative rounded overflow-hidden border">
            <img src={preview} className="w-full h-full object-cover" />
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-accent text-white py-3 rounded active:scale-95 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

      </div>
    </div>
  );
}