import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
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
      default: "in-progress",
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// pre hook save middleware/hook for hashing the password using bcrypt
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// post hook save middleware/hook set '' after saving the password
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const UserModel = model<TUser>("User", userSchema);
