// Frontend Cloudinary upload utility
const CLOUDINARY_CLOUD_NAME = "dbkzb49ua";
const CLOUDINARY_UPLOAD_PRESET = "pr_associate";
const CLOUDINARY_API_BASE = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`;

export const uploadVideoToCloudinary = async (file: File): Promise<{
  url: string;
  publicId: string;
}> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "videos");
  formData.append("resource_type", "video");

  const res = await fetch(`${CLOUDINARY_API_BASE}/video/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Upload failed");
  }

  const data = await res.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
};

export const uploadImageToCloudinary = async (
  file: File,
  folder = "products"
): Promise<{
  url: string;
  publicId: string;
}> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);

  const res = await fetch(`${CLOUDINARY_API_BASE}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Upload failed");
  }

  const data = await res.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
};

// For base64 uploads (from canvas/editor)
export const uploadBase64ToCloudinary = async (
  base64: string,
  resourceType: "image" | "video" = "image",
  folder = "products"
): Promise<{
  url: string;
  publicId: string;
}> => {
  const formData = new FormData();
  formData.append("file", base64);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);
  formData.append("resource_type", resourceType);

  const endpoint =
    resourceType === "video" ? "video/upload" : "image/upload";
  const res = await fetch(`${CLOUDINARY_API_BASE}/${endpoint}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Upload failed");
  }

  const data = await res.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
};
