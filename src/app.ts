import express, { Application, Request, Response } from "express";
import cors from "cors";
import { productRoutes } from "./app/modules/product/product.route";
import { orderRoutes } from "./app/modules/order/order.route";
// import { studentRoutes } from './app/modules/student/student.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
// app.use("/api", productRoutes, orderRoutes);

const getAController = (req: Request, res: Response) => {
  res.send("Hello World");
};

app.get("/", getAController);

export default app;
