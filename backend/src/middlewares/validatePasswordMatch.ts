import { AppError } from "@src/errors/AppError";
import { SignupRequestBody } from "@src/Types";
import { NextFunction, Request, Response } from "express";

export const validatePasswordMatch = (
    req: Request<object, object, SignupRequestBody>,
    res: Response,
    next: NextFunction,
) => {
  const { password, confirm_password } = req.body;
  if (password !== confirm_password) {
    return next(new AppError("Password and confirm password don't match", 400));
  } else {
    next();
  }
};
