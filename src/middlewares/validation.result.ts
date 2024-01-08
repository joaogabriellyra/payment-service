import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpCodes } from "../utils/httpCodes";

export const handleError = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next()
      }
    
      res.status(HttpCodes.BAD_REQUEST).json({ errors: result.array()});
}