// utils/uploadToCloudinary.ts

import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
  resourceType: "image" | "video" = "image"
) => {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      }
    );

    streamifier
      .createReadStream(buffer)
      .pipe(stream);
  });
};

export default uploadToCloudinary;