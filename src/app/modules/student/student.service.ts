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
  // const queryObj = { ...query };

  // let searchTerm = "";
  // if (query.searchTerm) {
  //   searchTerm = query.searchTerm.toString();
  // }

  // const searchQuery = studentModel
  //   .find({
  //     $or: searchableFields.map((key) => ({
  //       [key]: { $regex: searchTerm, $options: "i" },
  //     })),
  //   })
  //   .populate({
  //     path: "academicDepartment",
  //     populate: {
  //       path: "academicFaculty",
  //     },
  //   })
  //   .populate("admissionSemester");

  // // filtering
  // const excludedFields = ["searchTerm", "limit", "page", "sort", "fields"];
  // excludedFields.forEach((field) => {
  //   delete queryObj[field];
  // });

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate({
  //     path: "academicDepartment",
  //     populate: {
  //       path: "academicFaculty",
  //     },
  //   })
  //   .populate("admissionSemester");

  // // sorting
  // let sort = "-createdAt";
  // if (query.sort) {
  //   sort = query.sort.toString();
  // }
  // const sortQuery = filterQuery.sort(sort);

  // // set limit
  // let limit = 99999;
  // if (query.limit) {
  //   limit = Number(query.limit) || 1;
  // }
  // // pagination
  // let page = 1;
  // let skip = 0;
  // if (query.page) {
  //   page = Number(query.page) || 1;
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // field query
  // let fields = "-__v";
  // if (query.fields) {
  //   fields = (query.fields as string).split(",").join(" ");
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;
  const searchTerm = query.searchTerm ? query.searchTerm.toString() : "";
  const studentQuery = new QueryBuilders(studentModel.find(), query)
    .search(searchableFields, searchTerm)
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
