import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicFacultySchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
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
academicFacultySchema.pre("save", async function (next) {
  const department = this as TAcademicDepartment;
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: department.name,
  });
  if (isDepartmentExist) {
    throw new Error("Department name already exists");
  }
  next();
});

// pre hook the department id before update is exist or not
academicFacultySchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    _id: query._id,
  });
  if (!isDepartmentExist) {
    throw new Error("Department not found");
  }
  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  "academicDepartment",
  academicFacultySchema
);