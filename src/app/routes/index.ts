import { Router } from "express";
import { studentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";
import { academicSemesterRouters } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/acdemicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { courseRoutes } from "../modules/Course/course.route";
import { semesterRegistrationRoute } from "../modules/semisterRegistration/semisterRegistration.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { offeredCourseRoutes } from "../modules/OfferedCourse/OfferedCourse.route";

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
    path: "/admins",
    route: AdminRoutes,
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
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/courses",
    route: courseRoutes,
  },
  {
    path: "/semester-registration",
    route: semesterRegistrationRoute,
  },
  {
    path: "/offered-course",
    route: offeredCourseRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(`${route.path}`, route.route);
});

export default router;
