import { SignupRequestBody } from "@src/Types";
import ApiResponse from "@src/utils/ApiResponse";
import { Request, Response, NextFunction } from "express";

export const validatePasswordMatch = (req: Request<object, object, SignupRequestBody>,
    res: Response, next: NextFunction) => {
  const { password, confirm_password } = req.body;
  if (password !== confirm_password) { // put that in validation middleware
    return res.status(400).send(ApiResponse.error("Password and confirm password don't match", 400));
  } else {
    next();
  }
};
