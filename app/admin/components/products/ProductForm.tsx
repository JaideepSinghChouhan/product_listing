"use client";

import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { api } from "@/lib/api";

export default function ProductForm({
  open,
  onClose,
  refresh,
  initialData,
}: any) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [moq, setMoq] = useState("");
  const [customization, setCustomization] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await api("/categories/admin");
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // 🔥 EDIT PREFILL
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSku(initialData.sku);
      setDescription(initialData.description || "");
      setMoq(initialData.moq || "");
      setCustomization(initialData.customization || "");
      setCategoryId(initialData.categoryId || "");
    }
  }, [initialData]);

  if (!open) return null;

  // 🔥 BASE64 CONVERTER
  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  // 🔥 DRAG DROP
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
  };

const handleSubmit = async () => {
  try {
    setLoading(true);

    let base64Images: string[] = [];

    for (let file of images) {
      const base64 = await convertToBase64(file);
      base64Images.push(base64);
    }

    if (initialData) {
      await api(`/products/${initialData.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          sku,
          description,
          moq: Number(moq),
          customization,
          categoryId,
        }),
      });
    } else {
      await api("/products", {
        method: "POST",
        body: JSON.stringify({
          name,
          sku,
          description,
          moq: Number(moq),
          customization,
          categoryId,
          images: base64Images,
        }),
      });
    }
    setImages([]);
    refresh();
    onClose();

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-surface p-6 rounded-xl w-[420px] flex flex-col gap-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-playfair text-lg">
            {initialData ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" />
        <input placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} className="border p-2 rounded" />

        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded" />

        <input placeholder="MOQ" value={moq} onChange={(e) => setMoq(e.target.value)} className="border p-2 rounded" />

        <input placeholder="Customization (optional)" value={customization} onChange={(e) => setCustomization(e.target.value)} className="border p-2 rounded" />

        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border p-2 rounded">
          <option value="">Select Category</option>
          {categories.map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* Upload */}
        {!initialData && (
          <>
            <label
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-dashed border-2 p-6 flex flex-col items-center cursor-pointer rounded"
            >
              <Upload className="w-6 h-6" />
              <span className="text-sm">Drag & drop or click</span>

              <input type="file" multiple hidden onChange={handleFileSelect} />
            </label>

            {/* Preview */}
            {images.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    className="w-14 h-14 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-accent text-white py-2 rounded 
          transition-all duration-150 active:scale-95 hover:opacity-90 
          disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}

      {initialData
      ? loading
      ? "Updating..."
      : "Update Product"
      : loading
        ? "Saving..."
        : "Save Product"}
      </button>

      </div>
    </div>
  );
}