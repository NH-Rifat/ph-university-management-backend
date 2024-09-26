import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();

router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getAllOrders);

export const orderRoutes = router;
