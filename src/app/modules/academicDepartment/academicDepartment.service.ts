import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.mode";

const createAcademicDepartmentIntoDB = async (
  academicDepartment: TAcademicDepartment
) => {
  const academicDepartmentModel =
    await AcademicDepartmentModel.create(academicDepartment);
  return academicDepartmentModel.save();
};

const getAcademicDepartmentsFromDB = async () => {
  const academicDepartments =
    await AcademicDepartmentModel.find().populate("academicFaculty");
  return academicDepartments;
};

const getAcademicDepartmentByIdFromDB = async (id: string) => {
  const academicDepartment = await AcademicDepartmentModel.findById(id);
  return academicDepartment;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  academicDepartmentPayload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(
    id,
    academicDepartmentPayload,
    { new: true }
  );
  return result;
};

const deleteAcademicDepartmentByIdFromDB = async (id: string) => {
  const deletedAcademicDepartment =
    await AcademicDepartmentModel.findByIdAndDelete(id);
  return deletedAcademicDepartment;
};

export const academicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAcademicDepartmentsFromDB,
  getAcademicDepartmentByIdFromDB,
  updateAcademicDepartmentIntoDB,
  deleteAcademicDepartmentByIdFromDB,
};
