import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// find last student id
export const findLastStudentId = async (
  admissionSemesterPayload: TAcademicSemester
) => {
  const { year, code } = admissionSemesterPayload;
  const lastStudent = await User.findOne({
    role: "student",
    id: new RegExp(`^${year}${code}`),
  })
    .sort({ id: -1 })
    .select("id");
  return lastStudent?.id;
};
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({
    role: "faculty",
  })
    .sort({ id: -1 })
    .select("id");
  return lastFaculty?.id;
};
// year code and 4 digit number
export const generateStudentId = async (
  admissionSemesterPayload: TAcademicSemester
) => {
  // default student id
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId(admissionSemesterPayload);
  // console.log("lastStudentId", lastStudentId);
  // 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = admissionSemesterPayload.code;
  const currentSemesterYear = admissionSemesterPayload.year;
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${admissionSemesterPayload.year}${admissionSemesterPayload.code}${incrementId}`;
  return incrementId;
};
export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: "admin",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `A-${incrementId}`;
  return incrementId;
};
