import { validateRequest } from "./../../middlewares/validateRequest";
import express from "express";
import { createSemesterRegistrationValidationSchema } from "./semisterRegistration.validation";
import { semesterRegistrationController } from "./semisterRegistration.controller";

const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(createSemesterRegistrationValidationSchema),
  semesterRegistrationController.createSemesterRegistration
);
router.get("/", semesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoute = router;
