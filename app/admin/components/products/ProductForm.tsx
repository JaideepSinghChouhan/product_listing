"use client";

import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { api } from "@/lib/api";

interface ImagePreview {
  id?: string;
  url: string;
  publicId?: string;
  isNew?: boolean;
  file?: File;
}

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
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
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
      
      // Load existing images
      if (initialData.images && Array.isArray(initialData.images)) {
        const existingImages = initialData.images.map((img: any) => ({
          id: img.publicId,
          url: img.url,
          publicId: img.publicId,
          isNew: false,
        }));
        setImagePreviews(existingImages);
      }
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
    addImages(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addImages(files);
  };

  const addImages = (files: File[]) => {
    const currentCount = imagePreviews.length;
    const availableSlots = 5 - currentCount;
    const filesToAdd = files.slice(0, availableSlots);

    const newPreviews = filesToAdd.map((file) => ({
      url: URL.createObjectURL(file),
      isNew: true,
      file,
    }));

    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

const handleSubmit = async () => {
  try {
    setLoading(true);

    if (initialData) {
      // EDIT MODE: Handle image updates
      const newImages = imagePreviews.filter((img) => img.isNew && img.file);
      const existingImages = imagePreviews.filter((img) => !img.isNew);
      const removedImageIds = (initialData.images || [])
        .map((img: any) => img.publicId)
        .filter((publicId: string) => !existingImages.some((img) => img.publicId === publicId));

      let base64Images: string[] = [];
      for (let preview of newImages) {
        if (preview.file) {
          const base64 = await convertToBase64(preview.file);
          base64Images.push(base64);
        }
      }

      await api(`/products/${initialData.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          sku,
          description,
          moq: Number(moq),
          customization,
          categoryId,
          newImages: base64Images,
          existingImages: existingImages.map((img) => ({
            url: img.url,
            publicId: img.publicId,
          })),
          removedImageIds,
        }),
      });
    } else {
      // CREATE MODE: Upload all images
      let base64Images: string[] = [];
      for (let preview of imagePreviews) {
        if (preview.file) {
          const base64 = await convertToBase64(preview.file);
          base64Images.push(base64);
        }
      }

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

    setImagePreviews([]);
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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4 py-4 sm:py-6">

      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="font-playfair text-xl font-semibold">
            {initialData ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-5">

          {/* Name & SKU Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input 
                placeholder="e.g., Wall Clock" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">SKU *</label>
              <input 
                placeholder="e.g., WC-001" 
                value={sku} 
                onChange={(e) => setSku(e.target.value)} 
                className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea 
              placeholder="Product description..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows={3}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* MOQ & Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">MOQ</label>
              <input 
                type="number"
                placeholder="Minimum order qty" 
                value={moq} 
                onChange={(e) => setMoq(e.target.value)} 
                className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select 
                value={categoryId} 
                onChange={(e) => setCategoryId(e.target.value)} 
                className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Customization */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Customization (Optional)</label>
            <input 
              placeholder="e.g., Color, Size options..." 
              value={customization} 
              onChange={(e) => setCustomization(e.target.value)} 
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Image Upload & Preview */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">Product Images (Max 5) *</label>
            <div className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center cursor-pointer rounded-lg hover:border-blue-400 hover:bg-blue-50 transition">
              <label className="w-full flex flex-col items-center cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-center font-medium text-gray-700">
                  Drag & drop or click to add images
                </span>
                <span className="text-xs text-gray-500 mt-2">
                  {imagePreviews.length}/5 images
                </span>
                <input
                  type="file"
                  multiple
                  hidden
                  disabled={imagePreviews.length >= 5}
                  onChange={handleFileSelect}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-700 mb-3">Preview ({imagePreviews.length}/5)</div>
              <div className="grid grid-cols-5 gap-2">
                {imagePreviews.map((img, i) => (
                  <div
                    key={i}
                    className="relative group rounded-lg overflow-hidden bg-gray-200 aspect-square"
                  >
                    <img
                      src={img.url}
                      alt={`preview-${i}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer with Submit Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg 
            transition-all duration-150 active:scale-95 hover:shadow-lg
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
    </div>
  );
}