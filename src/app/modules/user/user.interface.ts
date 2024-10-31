/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export type TUSerRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId: (id: string) => Promise<TUser>;
  isPasswordMatched: (
    plainTextPassword: string,
    hashedPassword: string
  ) => Promise<boolean>;
}
