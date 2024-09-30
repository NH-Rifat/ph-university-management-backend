import { studentModel } from "./student.model";

const getAllStudentsFromDB = async () => {
  const result = await studentModel
    .find()
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("admissionSemester");
  return result;
};
const deleteStudentByIdFromDB = async (id: string) => {
  const result = await studentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  const result = await studentModel
    .findById({ _id: id })
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("admissionSemester");
  // const result = await studentModel.aggregate([{ $match: { id } }]);
  return result;
};

export const studentService = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentByIdFromDB,
};
