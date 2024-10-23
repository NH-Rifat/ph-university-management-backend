import { z } from "zod";

export const courseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255),
    prefix: z.string().min(1).max(255),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z
      .array(
        z.object({
          course: z.string().min(3).max(255).optional(),
          isDeleted: z.boolean().optional(),
        })
      )
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const updateValidationCourseSchemaOptional =
  // courseValidationSchema.partial();
  z.object({
    body: z.object({
      title: z.string().min(1).max(255).optional(),
      prefix: z.string().min(1).max(255).optional(),
      code: z.number().optional(),
      credits: z.number().optional(),
      preRequisiteCourses: z
        .array(
          z.object({
            course: z.string().min(1).max(255).optional(),
            isDeleted: z.boolean().optional(),
          })
        )
        .optional(),
      isDeleted: z.boolean().optional(),
    }),
  });

export const assignFacultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string().min(1).max(255)).optional(),
  }),
});
