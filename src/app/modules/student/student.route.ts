import { updateStudentValidationSchema } from "./student.validation";
import express from "express";
import { studentController } from "./student.controller";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router.get("/", studentController.getAllStudents);
router.get("/:studentId", studentController.getStudentById);
router.patch(
  "/:studentId",
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudentById
);
router.delete("/:studentId", studentController.deleteStudentById);

export const studentRoutes = router;
