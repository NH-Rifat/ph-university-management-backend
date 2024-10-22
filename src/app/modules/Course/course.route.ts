import express from "express";

const router = express.Router();

import { validateRequest } from "../../middlewares/validateRequest";
import {
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
router.patch(
  "/:id",
  validateRequest(updateValidationCourseSchemaOptional),
  courseControllers.updateCourse
);

export const courseRoutes = router;
