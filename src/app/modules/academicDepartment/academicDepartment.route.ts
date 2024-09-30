import express from "express";

const router = express.Router();

import { validateRequest } from "../../middlewares/validateRequest";
import { academicDepartmentValidationSchema } from "./academicDepartment.validation";
import { academicDepartmentControllers } from "./academicDepartment.controller";

router.post(
  "/create-academic-department",
  validateRequest(academicDepartmentValidationSchema),
  academicDepartmentControllers.createAcademicDepartment
);
router.get("/", academicDepartmentControllers.getAllAcademicDepartment);
router.get(
  "/:departmentId",
  academicDepartmentControllers.getSingleAcademicDepartment
);
router.patch(
  "/:departmentId",
  academicDepartmentControllers.updateAcademicDepartment
);

export const academicDepartmentRoutes = router;
