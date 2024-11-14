import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semisterRegistration.interface";
import { semesterRegistrationStatus } from "./semesterRegistration.constant";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
      ref: "AcademicSemester",
    },
    status: {
      type: String,
      enum: semesterRegistrationStatus,
      default: "UPCOMING",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 18,
    },
  },
  {
    timestamps: true,
  }
);

// create a model
export const SemesterRegistration = model<TSemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema
);
