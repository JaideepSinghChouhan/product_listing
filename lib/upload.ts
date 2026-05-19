import cloudinary from "./cloudinary";

export const uploadImage = async (file: string, folder = "products") => {
  if (!file) {
    throw new Error("No file provided");
  }

  if (!file.startsWith("data:")) {
    throw new Error("File must be base64 data URI");
  }

  try {
    const res = await cloudinary.uploader.upload(file, {
      folder,
      unsigned: true,
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    return {
      url: res.secure_url,
      publicId: res.public_id,
    };
  } catch (err: any) {
    console.error("Cloudinary upload error:", {
      folder,
      errorMessage: err?.message,
      errorStatus: err?.status,
      preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });
    throw new Error(`Cloudinary upload failed: ${err?.message || "Unknown error"}`);
  }
};

export const uploadVideo = async (file: string) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      folder: "videos",
      resource_type: "video",
      unsigned: true,
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    return {
      url: res.secure_url,
      publicId: res.public_id,
    };
  } catch (err: any) {
    console.error("Cloudinary video upload error:", {
      errorMessage: err?.message,
      errorStatus: err?.status,
      preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });
    throw new Error(`Video upload failed: ${err?.message || "Unknown error"}`);
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (err) {
    console.error("Error deleting image:", err);
    throw err;
  }
};