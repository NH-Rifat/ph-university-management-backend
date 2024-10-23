import { z } from "zod";

export const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(["UPCOMING", "ONGOING", "ENDED"]).default("UPCOMING"),
    startDate: z.string(),
    endDate: z.string(),
    minCredit: z.number().default(3),
    maxCredit: z.number().default(3),
  }),
});

export const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z.enum(["UPCOMING", "ONGOING", "ENDED"]).optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    minCredit: z.number().default(3).optional(),
    maxCredit: z.number().default(3).optional(),
  }),
});
