/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { studentModel } from "./student.model";
import { UserModel } from "../user/user.model";
import { TStudent } from "./student.interface";
import AppError from "../../errors/AppError";
import QueryBuilders from "../../builder/QueryBuilders";
import { searchableFields } from "./student.constant";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const searchTerm = query.searchTerm ? query.searchTerm.toString() : "";
  const studentQuery = new QueryBuilders(studentModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery
    .populate({
      path: "academicDepartment",
      populate: { path: "academicFaculty" },
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
    throw new AppError(400, " Failed to delete student");
  }
};

const getStudentByIdFromDB = async (id: string) => {
  const result = await studentModel
    .findOne({ id })
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

const updateStudentByIdFromDB = async (
  id: string,
  studentDataPayload: Partial<TStudent>
) => {
  const { name, guardian, localGuardian, ...remainingData } =
    studentDataPayload;

  const modifiedUpdatedStudentData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedStudentData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedStudentData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedStudentData[`localGuardian.${key}`] = value;
    }
  }

  const updatedStudent = await studentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedStudentData,
    { new: true, runValidators: true }
  );
  return updatedStudent;
};

export const studentService = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentByIdFromDB,
  updateStudentByIdFromDB,
};
