/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
// import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { TStudent } from "../student/student.interface";
import { studentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.mode";
import { Faculty } from "../faculty/faculty.mode";
import { Admin } from "../Admin/admin.model";
import { TAdmin } from "../Admin/admin.interface";

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
    const newUser = await User.create([userData], { session });

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
