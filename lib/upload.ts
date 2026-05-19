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
  if (!publicId) {
    console.warn("No publicId provided for deletion");
    return { success: true };
  }

  try {
    await cloudinary.uploader.destroy(publicId);
    console.log("Successfully deleted image from Cloudinary:", publicId);
    return { success: true };
  } catch (err: any) {
    // Log the error but don't crash - the record will still be deleted from DB
    console.warn("Warning: Failed to delete from Cloudinary:", {
      publicId,
      message: err?.message,
      status: err?.status,
    });
    // Return success anyway so the DB record gets deleted
    return { success: true, warning: "Cloudinary deletion failed but record removed from DB" };
  }
};