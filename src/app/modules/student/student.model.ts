/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // TStudentMethod,
  TUserName,
} from "./student.interface";

// Create a Schema corresponding to the document interface.
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [50, "First Name cannot be more than 50 characters"],
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z ]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid name`,
    },
  },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  // password: { type: String, required: true },
  name: {
    type: userNameSchema,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  dateOfBirth: { type: Date, required: false },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergenceContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardianName: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: false,
  },
  profileImg: { type: String, required: true },

  isDeleted: { type: Boolean, default: false },
});

// for creating a static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await studentModel.findOne({ id });
  return existingUser;
};

// query middleware
studentSchema.pre("find", function (this: any, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//Create a Model.
export const studentModel = model<TStudent>("Student", studentSchema);
