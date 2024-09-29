import { z } from "zod";

export const academicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "Name must be a string",
  }),
});
