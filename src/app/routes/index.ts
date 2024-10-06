import { Router } from "express";
import { studentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";
import { academicSemesterRouters } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/acdemicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/students",
    route: studentRoutes,
  },
  {
    path: "/academic-semesters",
    route: academicSemesterRouters,
  },
  {
    path: "/academic-faculties",
    route: academicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: academicDepartmentRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(`${route.path}`, route.route);
});

export default router;
