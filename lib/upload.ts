import cloudinary from "./cloudinary";

export const uploadImage = async (file: string, folder = "products") => {
  if (!file) {
    throw new Error("No file provided");
  }

  if (!file.startsWith("data:")) {
    throw new Error("File must be base64 data URI");
  }

  const res = await cloudinary.uploader.upload(file, {
    folder,
    unsigned: true,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });

  return {
    url: res.secure_url,
    publicId: res.public_id,
  };
};

export const uploadVideo = async (file: string) => {
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