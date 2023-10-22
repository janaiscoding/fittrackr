import express, { Express, NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";

const storage = multer.memoryStorage();

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: CallableFunction
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/gif"
  ) {
    callback(null, true);
  } else {
    callback("Error: Please select an image.", false);
  }
};
const uploadPicture = multer({
  limits: { fileSize: 1024 * 1024 * 2 },
  storage: storage,
  fileFilter: fileFilter,
});


export default uploadPicture;
