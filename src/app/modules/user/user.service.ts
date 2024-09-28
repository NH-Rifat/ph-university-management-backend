import config from "../../config";
// import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { TStudent } from "../student/student.interface";
import { studentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //creating a user object
  const userData: Partial<TUser> = {};
  // if password is not provided, use the default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  // generate student id based on year semesterCOde 4 digit number
  // const generateStudentId = (studentData: TAcademicSemester) => {

  // }
  //set manually generated id
  userData.id = "2030100003";

  //create a user
  const result = await UserModel.create(userData);

  //create a student
  if (Object.keys(result).length > 0) {
    //set id, _id as user
    studentData.id = result.id;
    studentData.user = result._id; //reference_id
    studentData.admissionSemester = result._id;

    const newStudent = await studentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
