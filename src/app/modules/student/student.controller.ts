/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await studentService.getAllStudentsFromDB();
    res.status(200).json({
      data: result,
      success: true,
      message: "All students fetched successfully",
    });
  } catch (error: any) {
    next(error);
  }
};

const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getStudentByIdFromDB(studentId);
    res.status(200).json({
      data: result,
      success: true,
      message: "Student fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.deleteStudentByIdFromDB(studentId);
    res.status(200).json({
      data: result,
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error: any) {
    next(error);
  }
};

export const studentController = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
