/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { academicDepartmentService } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await academicDepartmentService.createAcademicDepartmentIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic department is created successfully",
    success: true,
    data: result,
  });
});

// get all academic semester
const getAllAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await academicDepartmentService.getAcademicDepartmentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "All academic department retrieved successfully",
    success: true,
    data: result,
  });
});

// get single academic semester by id
const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentService.getAcademicDepartmentByIdFromDB(
      departmentId
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Single academic department retrieved successfully",
    success: true,
    data: result,
  });
});
// update academic semester by id
const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;
  const result = await academicDepartmentService.updateAcademicDepartmentIntoDB(
    departmentId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic department is updated successfully",
    success: true,
    data: result,
  });
});

// export all controllers
export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
