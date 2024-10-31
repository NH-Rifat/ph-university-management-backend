import express from "express";
import { userControllers } from "./user.controller";
import { createStudentValidationSchema } from "../student/student.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import { USER_ROLE } from "./user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(createStudentValidationSchema),
  userControllers.createStudent
);
router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  userControllers.createFaculty
);

router.post(
  "/create-admin",
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin
);

export const userRoutes = router;
