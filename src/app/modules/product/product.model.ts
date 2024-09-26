import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const VariantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

export const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [String],
  variants: [VariantSchema],
  inventory: InventorySchema,
  isDeleted: { type: Boolean, required: true },
});

// pre hook to return only non-deleted products
productSchema.pre("find", function (next) {
  this.find({ isDeleted: false });
  next();
});

// pre hook to handle searchTerm filtering
productSchema.pre("find", function (next) {
  const searchTerm = this.getOptions().searchTerm as string | undefined;

  if (searchTerm) {
    const regex = { $regex: searchTerm, $options: "i" };
    const searchTermAsNumber = parseFloat(searchTerm);

    // Build the query for searchTerm
    this.find({
      $or: [
        { name: regex },
        { description: regex },
        { category: regex },
        { tags: regex },
        { "variants.type": regex },
        { "variants.value": regex },
        ...(isNaN(searchTermAsNumber)
          ? [] // Do not search for price or inventory if searchTerm is not a number
          : [
              { price: searchTermAsNumber },
              { "inventory.quantity": searchTermAsNumber },
            ]),
      ],
    });
  }

  next();
});

// pre hook to check if the product exists before updating or not deleted
productSchema.pre("findOneAndUpdate", async function (next) {
  // Get the productId from the query
  const productId = this.getQuery()["_id"];
  // Find the product
  const product = await this.model.findById(productId);

  // Product does not exist
  if (!product) {
    return next(new Error("Product not found"));
  }

  // Product is marked as deleted
  if (product.isDeleted) {
    return next(new Error("Product is already deleted"));
  }

  next();
});
// pre hook to check if the product exists before updating or not deleted
productSchema.pre("updateOne", async function (next) {
  // Get the productId from the query
  const productId = this.getQuery()["_id"];
  // Find the product
  const product = await this.model.findById(productId);

  // Product does not exist
  if (!product) {
    return next(new Error("Product not found"));
  }

  // Product is marked as deleted
  if (product.isDeleted) {
    return next(new Error("Product is already deleted"));
  }

  next();
});

// pre hook to return the single non-deleted product
productSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: false } });
  next();
});

export const productModel = model<TProduct>("Product", productSchema);
