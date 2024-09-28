import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

// find last student id
export const findLastStudentId = async () => {
  // find last student id
  const lastStudent = await UserModel.findOne(
    { role: "student" },
    {
      id: 1,
      _id: 0,
    }
  ).sort({ createdAt: -1 });
  return lastStudent?.id ? lastStudent.id.substring(6) : "0";
};

// year code and 4 digit number
export const generateStudentId = async (
  studentDataPayload: TAcademicSemester
) => {
  const currentId = (await findLastStudentId()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${studentDataPayload.year}${studentDataPayload.code}${incrementId}`;
  return incrementId;
};
