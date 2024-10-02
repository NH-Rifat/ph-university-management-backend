/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
// import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { TStudent } from "../student/student.interface";
import { studentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentIntoDB = async (
  password: string,
  studentDataPayload: TStudent
) => {
  //creating a user object
  const userData: Partial<TUser> = {};
  // if password is not provided, use the default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  // find academic semester info
  const findAdmissionSemester = await AcademicSemesterModel.findById(
    studentDataPayload.admissionSemester
  );

  // transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set generated id
    if (!findAdmissionSemester) {
      throw new Error("Admission semester not found");
    }
    userData.id = await generateStudentId(findAdmissionSemester);

    //create a user
    const newUser = await UserModel.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    } else {
      //set id, _id as user
      studentDataPayload.id = newUser[0].id;
      studentDataPayload.user = newUser[0]._id; //reference_id
      // studentDataPayload.admissionSemester = result._id;

      // create student (transaction-2)
      const newStudent = await studentModel.create([studentDataPayload], {
        session,
      });
      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
      }
      await session.commitTransaction();
      await session.endSession();
      return newStudent;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
  }
};

export const UserServices = {
  createStudentIntoDB,
};
