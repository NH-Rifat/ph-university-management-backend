import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "academicFaculty",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// pre hook for checking the department name is exist or not
academicDepartmentSchema.pre("save", async function (next) {
  const department = this as TAcademicDepartment;
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: department.name,
  });
  if (isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Department is already exists");
  }
  next();
});

// pre hook the department id before update is exist or not
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartmentModel.findById(query._id);
  if (!isDepartmentExist) {
    throw new AppError(404, "Department not found");
  }
  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  "academicDepartment",
  academicDepartmentSchema
);
