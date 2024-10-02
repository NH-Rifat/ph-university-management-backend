import { z } from "zod";

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      id: z.string(),
      password: z.string(),
      name: z.object({
        firstName: z.string().max(20, {
          message: "First Name cannot be more than 20 characters",
        }),
        // middleName will be the optional field
        middleName: z.string().optional(),
        lastName: z.string().max(20, {
          message: "Last Name cannot be more than 20 characters",
        }),
      }),
      // user: z.string(),
      gender: z.enum(["male", "female"]),
      // dateOfBirth will be the optional field as well
      dateOfBirth: z.string().optional(),
      email: z.string().email({
        message: "Invalid email format",
      }),
      contactNo: z.string().min(10, {
        message: "Contact number must be at least 10 digits",
      }),
      emergenceContactNo: z.string().min(10, {
        message: "Emergency contact number must be at least 10 digits",
      }),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string().nonempty({
        message: "Present address is required",
      }),
      permanentAddress: z.string().nonempty({
        message: "Permanent address is required",
      }),
      guardian: z.object({
        fatherName: z.string().nonempty({
          message: "Father’s name is required",
        }),
        fatherOccupation: z.string().nonempty({
          message: "Father’s occupation is required",
        }),
        fatherContactNo: z.string().min(10, {
          message: "Father’s contact number must be at least 10 digits",
        }),
        motherName: z.string().nonempty({
          message: "Mother’s name is required",
        }),
        motherOccupation: z.string().nonempty({
          message: "Mother’s occupation is required",
        }),
        motherContactNo: z.string().min(10, {
          message: "Mother’s contact number must be at least 10 digits",
        }),
      }),
      localGuardian: z.object({
        name: z.string().nonempty({
          message: "Local guardian’s name is required",
        }),
        occupation: z.string().nonempty({
          message: "Local guardian’s occupation is required",
        }),
        contactNo: z.string().min(10, {
          message: "Local guardian’s contact number must be at least 10 digits",
        }),
        address: z.string().nonempty({
          message: "Local guardian’s address is required",
        }),
      }),
      profileImg: z.string(),
      // admissionSemester: z.string(),
      // isDeleted: z.boolean(),
    }),
  }),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      id: z.string().optional(),
      password: z.string().optional(),
      name: z
        .object({
          firstName: z.string().optional(),
          // middleName will be the optional field
          middleName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      // user: z.string(),
      gender: z.enum(["male", "female"]).optional(),
      // dateOfBirth will be the optional field as well
      dateOfBirth: z.string().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergenceContactNo: z.string().optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: z
        .object({
          fatherName: z.string().optional(),
          fatherOccupation: z.string().optional(),
          fatherContactNo: z.string().optional(),
          motherName: z.string().optional(),
          motherOccupation: z.string().optional(),
          motherContactNo: z.string().optional(),
        })
        .optional(),
      localGuardian: z
        .object({
          name: z.string().optional(),
          occupation: z.string().optional(),
          contactNo: z.string().optional(),
          address: z.string().optional(),
        })
        .optional(),
      profileImg: z.string().optional(),
      // admissionSemester: z.string(),
      // isDeleted: z.boolean(),
    }),
  }),
});
