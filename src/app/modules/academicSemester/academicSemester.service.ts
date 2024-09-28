import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const creteAcademicSemesterIntoDB = async (
  academicSemesterPayload: TAcademicSemester
) => {
  if (
    academicSemesterNameCodeMapper[academicSemesterPayload.name] !==
    academicSemesterPayload.code
  ) {
    throw new Error("Invalid academic semester code");
  }
  const result = await AcademicSemesterModel.create(academicSemesterPayload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};

// get single academic semester by id
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id);
  return result;
};
// update academic semester by id
const updateAcademicSemesterIntoDB = async (
  id: string,
  academicSemesterPayload: Partial<TAcademicSemester>
) => {
  if (
    academicSemesterPayload.name &&
    academicSemesterPayload.code &&
    academicSemesterNameCodeMapper[academicSemesterPayload.name] !==
      academicSemesterPayload.code
  ) {
    throw new Error("Invalid academic semester code");
  }
  const result = await AcademicSemesterModel.findByIdAndUpdate(
    { _id: id },
    academicSemesterPayload,
    { new: true }
  );
  return result;
};

export const AcademicSemesterServices = {
  creteAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
