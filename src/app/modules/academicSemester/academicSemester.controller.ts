/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.creteAcademicSemesterIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic semester is created successfully",
    success: true,
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
};
