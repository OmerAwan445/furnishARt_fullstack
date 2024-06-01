import ApiResponse from '@src/utils/ApiResponse';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function validateRequestSchema(
    req: Request,
    res: Response,
    next: NextFunction,
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(ApiResponse.error( errors.array()[0].msg, 400 ));
  }
  next();
}
