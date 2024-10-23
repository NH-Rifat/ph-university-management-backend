import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semisterRegistration.interface";
import { SemesterRegistration } from "./semisterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilders";
import { semesterRegistrationStatusEnum } from "./semesterRegistration.constant";

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  // check if there any register semester that is already "UPCOMING" or "ONGOING"
  const isSemesterUpcomingOrOngoing = await SemesterRegistration.findOne({
    status: {
      $in: [
        semesterRegistrationStatusEnum.UPCOMING,
        semesterRegistrationStatusEnum.ONGOING,
      ],
    },
  });
  if (isSemesterUpcomingOrOngoing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a semester registration that is ${isSemesterUpcomingOrOngoing.status}`
    );
  }
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

// update semester registration
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  // check if the semester is already ended, then it can't be updated
  const semester = await SemesterRegistration.findById(id);
  if (!semester) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester not found");
  }
  if (semester?.status === semesterRegistrationStatusEnum.ENDED) {
    throw new AppError(httpStatus.BAD_REQUEST, "Semester is already ended");
  }

  // UPCOMING-->ONGOING-->ENDED
  // if the status is UPCOMING, then it can be updated to ONGOING  not able to UPDATE TO ENDED
  // if the status is ONGOING, then it can be updated to ENDED not able to UPDATE TO UPCOMING
  // if the status is ENDED, then it can't be updated
  if (
    semester?.status === semesterRegistrationStatusEnum.UPCOMING &&
    payload?.status === semesterRegistrationStatusEnum.ONGOING
  ) {
    const result = await SemesterRegistration.findByIdAndUpdate(
      id,
      { status: semesterRegistrationStatusEnum.ONGOING },
      { new: true }
    );
    return result;
  } else if (
    semester?.status === semesterRegistrationStatusEnum.ONGOING &&
    payload?.status === semesterRegistrationStatusEnum.ENDED
  ) {
    const result = await SemesterRegistration.findByIdAndUpdate(
      id,
      { status: semesterRegistrationStatusEnum.ENDED },
      { new: true }
    );
    return result;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid status update");
  }
};

export const semesterRegistrationService = {
  createSemesterRegistration,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
