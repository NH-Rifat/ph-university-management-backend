/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentService } from "./student.service";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await studentService.getAllStudentsFromDB();
  res.status(200).json({
    data: result,
    success: true,
    message: "All students fetched successfully",
  });
});

const getStudentById = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentService.getStudentByIdFromDB(studentId);
  res.status(200).json({
    data: result,
    success: true,
    message: "Student fetched successfully",
  });
});

const updateStudentById = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await studentService.updateStudentByIdFromDB(
    studentId,
    student
  );
  res.status(200).json({
    data: result,
    success: true,
    message: "Student updated successfully",
  });
});

const deleteStudentById = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentService.deleteStudentByIdFromDB(studentId);
  res.status(200).json({
    data: result,
    success: true,
    message: "Student deleted successfully",
  });
});

export const studentController = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
  updateStudentById,
};
