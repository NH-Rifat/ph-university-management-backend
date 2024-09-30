/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { studentModel } from "./student.model";
import { UserModel } from "../user/user.model";

const getAllStudentsFromDB = async () => {
  const result = await studentModel
    .find()
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("admissionSemester");
  return result;
};
const deleteStudentByIdFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await studentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      }
    );
    if (!deletedStudent) {
      throw new Error("Student not found");
    }
    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      }
    );
    if (!deletedUser) {
      throw new Error("User not found");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession;
  }
};

const getStudentByIdFromDB = async (id: string) => {
  const result = await studentModel
    .findById({ _id: id })
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("admissionSemester");
  // const result = await studentModel.aggregate([{ $match: { id } }]);
  return result;
};

export const studentService = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentByIdFromDB,
};
