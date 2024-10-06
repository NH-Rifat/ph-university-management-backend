import { updateStudentValidationSchema } from "./student.validation";
import express from "express";
import { studentController } from "./student.controller";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.patch(
  "/:id",
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudentById
);
router.delete("/:id", studentController.deleteStudentById);

export const studentRoutes = router;
