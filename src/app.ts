/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/v1/users", userRoutes);

const getAController = (req: Request, res: Response) => {
  res.send("Hello World");
};

app.get("/", getAController);

app.use(globalErrorHandler);

export default app;
