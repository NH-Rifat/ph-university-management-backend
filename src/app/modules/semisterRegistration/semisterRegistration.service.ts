import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semisterRegistration.interface";
import { SemesterRegistration } from "./semisterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilders";

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  // check if the semester is already registered
  const isAcademicSemesterExists = await AcademicSemesterModel.findById(
    payload?.academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic semester not found");
  }
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester: payload?.academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, "Semester is already registered");
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

// get all semester registration
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

// get single semester registration
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate("academicSemester");
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistration,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
};
