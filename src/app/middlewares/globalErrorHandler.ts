/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import e, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode =
    res.statusCode !== 200 ? res.statusCode : error.statusCode || 500;
  let message = error.message || "Something went wrong";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  const handleZodError = (err: ZodError) => {
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    const statusCode = 400;
    return {
      statusCode,
      message: "validation error",
      errorSources,
    };
  };

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? error.stack : null,
  });
};

export default globalErrorHandler;
