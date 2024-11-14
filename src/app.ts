/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));

//application routes
app.use("/api/v1", router);

const test = (req: Request, res: Response) => {
  res.send("Hello World");
};

app.get("/", test);

app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
