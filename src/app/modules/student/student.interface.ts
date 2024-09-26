import { Types } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: "male" | "female";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergenceContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardianName: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  isDeleted: boolean;
};

// export interface StudentModelType extends Model<TStudent> {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

// for creating static methods
// export type TStudentMethod = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModelType = Model<TStudent, {}, TStudentMethod>;
