export const searchableFields = [
  "email",
  "id",
  "gender",
  "name.firstName",
  "name.lastName",
  "guardian.name",
  "localGuardian.name",
];

// const queryObj = { ...query };

// let searchTerm = "";
// if (query.searchTerm) {
//   searchTerm = query.searchTerm.toString();
// }

// const searchQuery = studentModel
//   .find({
//     $or: searchableFields.map((key) => ({
//       [key]: { $regex: searchTerm, $options: "i" },
//     })),
//   })
//   .populate({
//     path: "academicDepartment",
//     populate: {
//       path: "academicFaculty",
//     },
//   })
//   .populate("admissionSemester");

// // filtering
// const excludedFields = ["searchTerm", "limit", "page", "sort", "fields"];
// excludedFields.forEach((field) => {
//   delete queryObj[field];
// });

// const filterQuery = searchQuery
//   .find(queryObj)
//   .populate({
//     path: "academicDepartment",
//     populate: {
//       path: "academicFaculty",
//     },
//   })
//   .populate("admissionSemester");

// // sorting
// let sort = "-createdAt";
// if (query.sort) {
//   sort = query.sort.toString();
// }
// const sortQuery = filterQuery.sort(sort);

// // set limit
// let limit = 99999;
// if (query.limit) {
//   limit = Number(query.limit) || 1;
// }
// // pagination
// let page = 1;
// let skip = 0;
// if (query.page) {
//   page = Number(query.page) || 1;
//   skip = (page - 1) * limit;
// }
// const paginateQuery = sortQuery.skip(skip);

// const limitQuery = paginateQuery.limit(limit);

// // field query
// let fields = "-__v";
// if (query.fields) {
//   fields = (query.fields as string).split(",").join(" ");
// }

// const fieldQuery = await limitQuery.select(fields);

// return fieldQuery;
