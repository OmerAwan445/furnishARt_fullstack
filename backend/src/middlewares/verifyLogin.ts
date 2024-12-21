import JwtSvs from "@src/services/auth/jwtSvs";
import { AuthenticatedRequest } from "@src/Types";
import { catchAsyncError } from "@src/utils/catchAsyncError";

import { NextFunction, Request, Response } from "express";

export const verifyLogin = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const accessToken = req.cookies?.accessToken ?? req.headers["authorization"]?.split("Bearer ")[1];
      const tokenVerification = await JwtSvs.verifyToken(accessToken);

      // Here we are asserting that req.user will never be undefined
      (req as AuthenticatedRequest).user = tokenVerification.user;

      next();
    },
);

export default verifyLogin;
