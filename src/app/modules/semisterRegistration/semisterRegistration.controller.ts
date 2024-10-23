import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { semesterRegistrationService } from "./semisterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await semesterRegistrationService.createSemesterRegistration(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "course is created successfully",
    success: true,
    data: result,
  });
});

// get all course
const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationService.getAllSemesterRegistrationFromDB(
      req.query
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "All courses are retrieved successfully",
    success: true,
    data: result,
  });
});

// get single course by id
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationService.getSingleSemesterRegistrationFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Single course is retrieved successfully",
    success: true,
    data: result,
  });
});

// update course by id
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationService.updateSemesterRegistrationIntoDB(
      id,
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "course is updated successfully",
    success: true,
    data: result,
  });
});

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
