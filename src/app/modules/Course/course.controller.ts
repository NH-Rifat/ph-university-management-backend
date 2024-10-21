/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { courseService } from "./course.service";

const createCourse = catchAsync(async (req, res, next) => {
  const result = await courseService.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "course is created successfully",
    success: true,
    data: result,
  });
});

// get all course
const getAllCourses = catchAsync(async (req, res, next) => {
  const result = await courseService.getAllCoursesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "All courses are retrieved successfully",
    success: true,
    data: result,
  });
});

// get single course by id
const getSingleCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await courseService.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Single course is retrieved successfully",
    success: true,
    data: result,
  });
});

// update course by id
// const updateCourse = catchAsync(async (req, res, next) => {
//   const { courseId } = req.params;
//   const result = await courseService.updateCourseIntoDB(courseId, req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     message: "course is updated successfully",
//     success: true,
//     data: result,
//   });
// });

// delete course by id
const deleteCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await courseService.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "course is deleted successfully",
    success: true,
    data: result,
  });
});

// export all controllers
export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  // updateCourse,
  deleteCourse,
};
