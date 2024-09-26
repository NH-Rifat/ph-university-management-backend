import { model, Schema } from "mongoose";
import { TUser } from "./student.interface";

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      required: true,
    },
    isDeleted: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<TUser>("User", userSchema);
