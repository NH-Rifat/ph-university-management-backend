import { studentModel } from "./student.model";

const getAllStudentsFromDB = async () => {
  const result = await studentModel.find();
  return result;
};
const deleteStudentByIdFromDB = async (id: string) => {
  const result = await studentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  // const result = await studentModel.findOne({ id });
  const result = await studentModel.aggregate([{ $match: { id } }]);
  return result;
};

export const studentService = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentByIdFromDB,
};
