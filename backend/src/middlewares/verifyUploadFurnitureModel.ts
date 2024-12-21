import multer from "multer";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@src/errors/AppError";
import { fileSettings } from "@src/utils/constants/FileSettings";

// Configure Multer
const storage = multer.memoryStorage();

const multerModelUpload = multer({
  storage,
  limits: {
    fileSize: fileSettings["model"].maxSizeInBytes,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = fileSettings["model"].acceptedTypes;
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    if (!allowedMimeTypes.includes(fileExtension || file.mimetype)) {
      return cb( new AppError(fileSettings["model"].errorMessage, 400));
    }
    cb(null, true);
  },
}).array("files", 1);

// Middleware Function
export const verifyUploadFurnitureModel = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      multerModelUpload(req, res, (err: any) => {
        if (err) {
          return next(err);
        }
        if (!req.files || !Array.isArray(req.files)) {
          return next(new AppError("No files provided", 400));
        }
        next();
      });
    },
);
