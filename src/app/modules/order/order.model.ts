/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";
import { productModel } from "../product/product.model";

const orderSchema = new Schema<IOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// pre hook to update inventory
orderSchema.pre("save", async function (next) {
  try {
    const product = await productModel.findById(this.productId);
    if (product) {
      if (product.inventory.quantity < this.quantity) {
        throw new Error("Insufficient quantity available in inventory");
      } else {
        product.inventory.quantity -= this.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        await product.save();
      }
    } else {
      throw new Error("Order not found");
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

export const orderModel = model<IOrder>("Order", orderSchema);
