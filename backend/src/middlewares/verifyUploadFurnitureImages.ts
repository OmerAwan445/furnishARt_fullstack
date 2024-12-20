import multer from "multer";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@src/errors/AppError";

// Configure Multer
const storage = multer.memoryStorage();

const multerUpload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB max file size
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb( new AppError("Invalid file type. Only JPEG, PNG, and GIF files are allowed.", 400));
    }
    cb(null, true);
  },
}).array("images", 5);

// Middleware Function
export const verifyUploadFurnitureImages = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.files || !Array.isArray(req.files)) {
        throw new AppError("No files provided", 400);
      }
      multerUpload(req, res, (err: any) => {
        if (err) {
          // Pass Multer errors to the error handler middleware
          return next(err);
        }
        next();
      });
    },
);
