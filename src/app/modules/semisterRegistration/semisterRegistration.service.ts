import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semisterRegistration.interface";
import { SemesterRegistration } from "./semisterRegistration.model";

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

export const semesterRegistrationService = {
  createSemesterRegistration,
};
