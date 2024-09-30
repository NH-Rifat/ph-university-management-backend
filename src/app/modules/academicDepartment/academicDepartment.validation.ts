import { z } from "zod";

export const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic Faculty must be a string",
      required_error: "Academic Faculty is required",
    }),
  }),
});

export const updateDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic Faculty must be a string",
        required_error: "Academic Faculty is required",
      })
      .optional(),
  }),
});
