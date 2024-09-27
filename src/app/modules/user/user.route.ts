import express from "express";
import { userControllers } from "./user.controller";
import { createStudentValidationSchema } from "../student/student.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(createStudentValidationSchema),
  userControllers.createStudent
);

export const userRoutes = router;
