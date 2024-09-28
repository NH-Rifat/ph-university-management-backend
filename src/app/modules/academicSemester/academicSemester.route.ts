import express from "express";
import { academicSemesterControllers } from "./academicSemester.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createAcademicSemesterValidationSchema } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(createAcademicSemesterValidationSchema),
  academicSemesterControllers.createAcademicSemester
);

export const academicSemesterRouters = router;
