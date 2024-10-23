import { validateRequest } from "./../../middlewares/validateRequest";
import express from "express";
import {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
} from "./semisterRegistration.validation";
import { semesterRegistrationController } from "./semisterRegistration.controller";

const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(createSemesterRegistrationValidationSchema),
  semesterRegistrationController.createSemesterRegistration
);
router.get("/", semesterRegistrationController.getAllSemesterRegistrations);
router.get(
  "/:id",
  semesterRegistrationController.getSingleSemesterRegistration
);
router.patch(
  "/:id",
  validateRequest(updateSemesterRegistrationValidationSchema),
  semesterRegistrationController.updateSemesterRegistration
);

export const semesterRegistrationRoute = router;
