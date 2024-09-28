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

// get all academic semester
const getAllAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "All academic semester",
    success: true,
    data: result,
  });
});

// get single academic semester by id
const getSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Single academic semester",
    success: true,
    data: result,
  });
});
// update academic semester by id
const updateAcademicSemester = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic semester is updated successfully",
    success: true,
    data: result,
  });
});

// export all controllers
export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
