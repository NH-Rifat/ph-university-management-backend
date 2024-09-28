import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const creteAcademicSemesterIntoDB = async (
  academicSemesterData: TAcademicSemester
) => {
  if (
    academicSemesterNameCodeMapper[academicSemesterData.name] !==
    academicSemesterData.code
  ) {
    throw new Error("Invalid academic semester code");
  }
  const result = await AcademicSemesterModel.create(academicSemesterData);
  console.log("result", result);
  return result;
};

export const AcademicSemesterServices = {
  creteAcademicSemesterIntoDB,
};
