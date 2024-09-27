import { z } from "zod";

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
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
      gender: z.enum(["male", "female"]),
      // dateOfBirth will be the optional field as well
      dateOfBirth: z.date().optional(),
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
      guardianName: z.object({
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
    }),
  }),
});
