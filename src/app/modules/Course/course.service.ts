/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilders";
import AppError from "../../errors/AppError";
import { courseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import mongoose from "mongoose";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  try {
    // Step 1: Update basic course data if any non-prerequisite data is provided
    if (Object.keys(courseRemainingData).length > 0) {
      const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
        id,
        courseRemainingData,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedBasicCourseInfo) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Failed to update course data"
        );
      }
    }

    // Step 2: Process preRequisiteCourses array updates
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // Handle deletions from preRequisiteCourses
      const deletedPreRequisiteCoursesId = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      if (deletedPreRequisiteCoursesId.length > 0) {
        const deletePreRequisiteCourse = await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              preRequisiteCourses: {
                course: { $in: deletedPreRequisiteCoursesId },
              },
            },
          },
          { new: true, runValidators: true }
        );
        if (!deletePreRequisiteCourse) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            "Failed to update course data"
          );
        }
      }

      // Handle additions to preRequisiteCourses (avoid duplicates)
      const existingCourse = await Course.findById(id).lean();
      if (!existingCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, "Course not found");
      }

      // Filter out duplicates by checking against existing prerequisites
      const newPreRequisites = preRequisiteCourses
        ?.filter((el) => el.course && !el.isDeleted)
        .filter(
          (newReq) =>
            !existingCourse.preRequisiteCourses.some(
              (existingReq) =>
                existingReq.course.toString() === newReq.course.toString()
            )
        );

      // Add filtered prerequisites to the course
      if (newPreRequisites.length > 0) {
        const addNewPreRequisiteCourse = await Course.findByIdAndUpdate(
          id,
          {
            $addToSet: {
              preRequisiteCourses: { $each: newPreRequisites },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        if (!addNewPreRequisiteCourse) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            "Failed to update course data"
          );
        }
      }

      // Final result with populated data
      const result = await Course.findById(id).populate(
        "preRequisiteCourses.course"
      );
      return result;
    }
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course data");
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

const assignFacultiesIntoCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: {
        faculties: {
          $each: payload,
        },
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};

const removeFacultiesFromCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: {
        faculties: {
          $in: payload,
        },
      },
    },
    {
      new: true,
    }
  );
  return result;
};

export const courseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesIntoCourseIntoDB,
  removeFacultiesFromCourseIntoDB,
};
