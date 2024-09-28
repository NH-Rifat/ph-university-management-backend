import config from "../../config";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
// import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { TStudent } from "../student/student.interface";
import { studentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (
  password: string,
  studentDataPayload: TStudent
) => {
  //creating a user object
  const userData: Partial<TUser> = {};
  // if password is not provided, use the default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  // find academic semester info
  const findAdmissionSemester = await AcademicSemesterModel.findById(
    studentDataPayload.admissionSemester
  );
  //set generated id
  if (!findAdmissionSemester) {
    throw new Error("Admission semester not found");
  }
  userData.id = await generateStudentId(findAdmissionSemester);

  //create a user
  const result = await UserModel.create(userData);

  //create a student
  if (Object.keys(result).length > 0) {
    //set id, _id as user
    studentDataPayload.id = result.id;
    studentDataPayload.user = result._id; //reference_id
    // studentDataPayload.admissionSemester = result._id;

    const newStudent = await studentModel.create(studentDataPayload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
