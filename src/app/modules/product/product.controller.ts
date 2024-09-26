// /* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { productValidationSchema } from "./product.validation";
import { productService } from "./product.service";
import mongoose from "mongoose";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { products: productData } = req.body;
    // console.log(productData);
    const zodParseData = productValidationSchema.parse(productData);
    const newProduct = await productService.createProductIntoDB(zodParseData);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "product already exists",
      error: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const products = await productService.getAllProductsFromDB(
      searchTerm as string
    );
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products",
      error: error,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
        data: null,
      });
    }
    const product = await productService.getProductByIdFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch product",
      error: error,
    });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    // Validate the productId as a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
        data: null,
      });
    }
    const productPartialValidationSchema = productValidationSchema.partial();

    const productData = productPartialValidationSchema.parse(req.body);

    const updatedProduct = await productService.updateProductByIdInDB(
      productId,
      productData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update product",
      error: error,
    });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
        data: null,
      });
    }
    const deletedProduct =
      await productService.deleteProductByIdFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete product",
      error: error,
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
