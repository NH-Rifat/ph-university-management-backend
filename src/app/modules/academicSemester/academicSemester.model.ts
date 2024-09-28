import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  academicSemesterCode,
  academicSemesterNames,
  Months,
} from "./academicSemester.constant";

export const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, required: true, enum: academicSemesterNames },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: academicSemesterCode },
    startMonth: { type: String, enum: Months, required: true },
    endMonth: { type: String, enum: Months, required: true },
  },
  {
    timestamps: true,
  }
);

AcademicSemesterSchema.pre("save", async function (next) {
  const isExistSemester = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });
  if (isExistSemester) {
    throw new Error("Semester already exist");
  }
  next();
});

// create model
export const AcademicSemesterModel = model<TAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema
);
