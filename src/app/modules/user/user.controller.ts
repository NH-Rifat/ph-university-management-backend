import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;

    // creating a schema validation using zod
    // const zodParseData = studentValidationSchema.parse(studentData);
    // console.log(student);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );
    console.log(result);
    res.status(201).json({
      data: result,
      success: true,
      message: "Student created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const userControllers = {
  createStudent,
};
