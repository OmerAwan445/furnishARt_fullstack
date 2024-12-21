import multer from "multer";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@src/errors/AppError";
import { fileSettings } from "@src/utils/constants/FileSettings";

// Configure Multer
const storage = multer.memoryStorage();

const multerImageUpload = multer({
  storage,
  limits: {
    fileSize: fileSettings["image"].maxSizeInBytes,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = fileSettings["image"].acceptedTypes;
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb( new AppError(fileSettings["image"].errorMessage, 400));
    }
    cb(null, true);
  },
}).array("files", 5);

// Middleware Function
export const verifyUploadFurnitureImages = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      multerImageUpload(req, res, (err: any) => {
        if (err) {
          // Handle Multer-specific errors
          return next(err);
        }
        if (!req.files || !Array.isArray(req.files)) {
          return next(new AppError("No files provided", 400));
        }
        next();
      });
    },
);
