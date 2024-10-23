import { validateRequest } from "./../../middlewares/validateRequest";
import express from "express";

const router = express.Router();

import {
  assignFacultiesWithCourseValidationSchema,
  courseValidationSchema,
  updateValidationCourseSchemaOptional,
} from "./course.validation";
import { courseControllers } from "./course.controller";

router.post(
  "/create-course",
  validateRequest(courseValidationSchema),
  courseControllers.createCourse
);
router.get("/", courseControllers.getAllCourses);
router.get("/:id", courseControllers.getSingleCourse);
router.delete("/:id", courseControllers.deleteCourse);
router.put(
  "/:courseId/assign-faculties",
  validateRequest(assignFacultiesWithCourseValidationSchema),
  courseControllers.assignFacultiesWithCourse
);
router.delete(
  "/:courseId/remove-faculties",
  validateRequest(assignFacultiesWithCourseValidationSchema),
  courseControllers.removeFacultiesFromCourse
);

router.patch(
  "/:id",
  validateRequest(updateValidationCourseSchemaOptional),
  courseControllers.updateCourse
);

export const courseRoutes = router;
