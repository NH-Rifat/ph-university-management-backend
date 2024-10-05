import { FilterQuery, Query } from "mongoose";

class QueryBuilders<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFields: string[], searchTerm: string) {
    if (this.query.searchTerm) {
      searchTerm = this.query.searchTerm.toString();
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (key) =>
            ({
              [key]: { $regex: searchTerm, $options: "i" },
            }) as FilterQuery<T>
        ),
      });
    }

    return this;
  }
  filter() {
    const queryObj = { ...this.query };
    const excludedFields = ["searchTerm", "limit", "page", "sort", "fields"];
    excludedFields.forEach((field) => {
      delete queryObj[field];
    });
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }
  sort() {
    let sort = "-createdAt";
    if (this.query.sort) {
      sort = this.query.sort.toString().split(",").join(" ");
    }
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }
  // limit() {
  //   let limit = 10;
  //   if (this.query.limit) {
  //     limit = Number(this.query.limit) || 10;
  //   }
  //   console.log("limit", limit);
  //   this.modelQuery = this.modelQuery.limit(limit);
  //   return this;
  // }
  paginate() {
    let page = 1;
    let limit = 10;
    if (this.query.page) {
      page = Number(this.query.page);
    }
    if (this.query.limit) {
      limit = Number(this.query.limit);
    }
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  fields() {
    let fields = "-__v";
    if (this.query.fields) {
      fields = this.query.fields.toString().split(",").join(" ");
      this.modelQuery = this.modelQuery.select(fields);
    }
    return this;
  }
}

export default QueryBuilders;
