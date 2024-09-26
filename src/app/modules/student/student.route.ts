import express from "express";
import { studentController } from "./student.controller";

const router = express.Router();

router.get("/", studentController.getAllStudents);
router.get("/:studentId", studentController.getStudentById);
router.delete("/:studentId", studentController.deleteStudentById);

export const studentRoutes = router;
