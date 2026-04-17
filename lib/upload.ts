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