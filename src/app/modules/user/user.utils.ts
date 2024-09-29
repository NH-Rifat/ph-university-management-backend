import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

// find last student id
export const findLastStudentId = async (
  admissionSemesterPayload: TAcademicSemester
) => {
  const { year, code } = admissionSemesterPayload;
  const lastStudent = await UserModel.findOne({
    role: "student",
    id: new RegExp(`^${year}${code}`),
  })
    .sort({ id: -1 })
    .select("id");
  return lastStudent?.id;
};

// year code and 4 digit number
export const generateStudentId = async (
  admissionSemesterPayload: TAcademicSemester
) => {
  // default student id
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId(admissionSemesterPayload);
  console.log("lastStudentId", lastStudentId);
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
