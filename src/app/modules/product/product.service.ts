import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { productModel } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
  const newProduct = await productModel.create(productData);
  return newProduct;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  //passing the search term and middleware will handle it
  const products = await productModel.find().setOptions({ searchTerm });
  return products;
};

const getProductByIdFromDB = async (productId: string) => {
  const objectId = new mongoose.Types.ObjectId(productId);
  const product = await productModel.aggregate([{ $match: { _id: objectId } }]);
  if (!product.length) {
    throw new Error("Product not found");
  }
  return product;
};

// const updateProductByIdInDB = async (
//   productId: string,
//   productData: TProduct
// ) => {
//   const objectId = new mongoose.Types.ObjectId(productId);
//   const updatedProduct = await productModel.findByIdAndUpdate(
//     objectId,
//     productData,
//     { new: true, runValidators: true }
//   );
//   if (!updatedProduct) {
//     throw new Error("Product not found");
//   }
//   return updatedProduct;
// };

// update product by id with partial data
const updateProductByIdInDB = async (
  productId: string,
  productData: Partial<TProduct> // Use Partial to allow updating individual fields
) => {
  const objectId = new mongoose.Types.ObjectId(productId);

  // Using $set to only update the fields provided in the productData
  const updatedProduct = await productModel.findByIdAndUpdate(
    objectId,
    { $set: productData },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new Error("Product not found");
  }

  return updatedProduct;
};

const deleteProductByIdFromDB = async (productId: string) => {
  const objectId = new mongoose.Types.ObjectId(productId);
  const deletedProduct = await productModel.updateOne(
    { _id: objectId },
    { isDeleted: true }
  );
  if (!deletedProduct) {
    throw new Error("Product not found");
  }
  return deletedProduct;
};

export const productService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductByIdInDB,
  deleteProductByIdFromDB,
};
