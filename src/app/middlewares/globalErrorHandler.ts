/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Application, Request, Response, NextFunction } from "express";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    res.statusCode !== 200 ? res.statusCode : error.statusCode || 500;
  const message = error.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    message,
    error: error.message,
  });
};

export default globalErrorHandler;
