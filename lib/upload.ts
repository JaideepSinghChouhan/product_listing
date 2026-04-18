import cloudinary from "./cloudinary";

export const uploadImage = async (file: string) => {
  const res = await cloudinary.uploader.upload(file, {
    folder: "products",
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