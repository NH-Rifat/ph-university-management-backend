import { z } from "zod";

const userSchemaValidation = z.object({
  //id: z.string(),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .max(20, { message: "Password must be less than 20 characters" })
    .optional(),
  //needPasswordChange: z.boolean().optional().default(true),
  //role: z.enum(["admin", "student", "faculty"]),
  //status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  // isDeleted: z.boolean().optional().default(false),
});

export { userSchemaValidation };
