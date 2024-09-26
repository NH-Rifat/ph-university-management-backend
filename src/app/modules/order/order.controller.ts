/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { orderService } from "./order.service";
import { orderValidationSchema } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const orderData = orderValidationSchema.parse(req.body);
    const newOrder = await orderService.createOrderInDB(orderData);

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: newOrder,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create order",
      error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const orders = await orderService.getAllOrdersFromDB(email as string);

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch orders",
      error,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
};
