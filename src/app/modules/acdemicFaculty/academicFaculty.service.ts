import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyModel } from "./academicFaculty.mode";

const createAcademicFacultyIntoDB = async (
  academicFacultyData: TAcademicFaculty
) => {
  const academicFaculty = new AcademicFacultyModel(academicFacultyData);
  return academicFaculty.save();
};

const getAllAcademicFacultyFromDB = async () => {
  return AcademicFacultyModel.find();
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  return AcademicFacultyModel.findById(id);
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  academicFacultyData: TAcademicFaculty
) => {
  return AcademicFacultyModel.findByIdAndUpdate(id, academicFacultyData, {
    new: true,
  });
};

export const AcademicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
