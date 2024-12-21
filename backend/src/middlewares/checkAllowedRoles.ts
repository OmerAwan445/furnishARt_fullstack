import { AppError } from "@src/errors/AppError";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { NextFunction, Request, Response } from "express";

export const checkAllowedRole = (allowedRoles: string[]) => {
  return catchAsyncError(
      async (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user!.role; // assuming the user role is stored in req.user
        if (!allowedRoles.includes(userRole)) {
          throw new AppError("Access forbidden: insufficient permissions.", 403);
        }
        next();
      },
  );
};
