import express from "express";
import { academicSemesterControllers } from "./academicSemester.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(createAcademicSemesterValidationSchema),
  academicSemesterControllers.createAcademicSemester
);
// get single academic semester by id
router.get(
  "/:semesterId",
  academicSemesterControllers.getSingleAcademicSemester
);
// update academic semester by id
router.patch(
  "/:semesterId",
  validateRequest(updateAcademicSemesterValidationSchema),
  academicSemesterControllers.updateAcademicSemester
);
// get all academic semester
router.get("/", academicSemesterControllers.getAllAcademicSemester);

export const academicSemesterRouters = router;
