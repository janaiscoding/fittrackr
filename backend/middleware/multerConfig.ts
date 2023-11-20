import { Request } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "./cloudinaryConfig";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    //@ts-ignore
    folder: "DEV",
  },
});

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: CallableFunction
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    callback(null, true);
  } else {
    callback("Invalid file type. Please upload png/jpeg/jpg/webp only.", false);
  }
};
const upload = multer({
  limits: { fileSize: 1024 * 1024 * 4 },
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
