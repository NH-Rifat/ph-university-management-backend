import { z } from "zod";
import {
  academicSemesterCode,
  academicSemesterNames,
  Months,
} from "./academicSemester.constant";

export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterNames] as [string, ...string[]]),
    year: z.date(),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    startDate: z.enum([...Months] as [string, ...string[]]),
    endDate: z.enum([...Months] as [string, ...string[]]),
  }),
});
