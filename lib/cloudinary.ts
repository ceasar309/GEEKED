import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export async function uploadImage(file: string, folder: string) {
  const result = await cloudinary.uploader.upload(file, {
    folder: `geeked/${folder}`,
    resource_type: "auto",
  });
  return result.secure_url;
}

export async function deleteImage(publicId: string) {
  await cloudinary.uploader.destroy(publicId);
}
