import "module-alias/register";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);
import appRoutes from "@routes/index";
import { serverConfig } from "@src/server";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./errors/AppError";
import ErrorHandler from "./errors/ErrorHandler";
import { CustomError } from "./Types";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v2", appRoutes);
app.use("/", (req, res)=>res.send("Hello"));

app.use(
    (
        err: CustomError | AppError,
        req: Request,
        res: Response,
        next: NextFunction // eslint-disable-line
    ):void => {
      const handler = new ErrorHandler(res, err);
      handler.handleError();
    },
);


serverConfig(app, process.env.PORT ?? "3001");
export default app;
