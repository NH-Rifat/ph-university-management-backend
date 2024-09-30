import express from "express";

const router = express.Router();

import { academicFacultyControllers } from "./academicFaculty.controller";
import { academicFacultyValidationSchema } from "./academicFaculty.validation";
import { validateRequest } from "../../middlewares/validateRequest";

router.post(
  "/create-academic-faculty",
  validateRequest(academicFacultyValidationSchema),
  academicFacultyControllers.createAcademicFaculty
);
router.get("/", academicFacultyControllers.getAllAcademicFaculty);
router.get("/:facultyId", academicFacultyControllers.getSingleAcademicFaculty);
router.patch("/:facultyId", academicFacultyControllers.updateAcademicFaculty);

export const academicFacultyRoutes = router;
