import "module-alias/register";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import appRoutes from "@routes/index";
import { serverConfig } from "@src/server";
import { getEnv } from "@utils/getEnv";
import ErrorHandler from "./errors/ErrorHandler";
import { AppError } from "./errors/AppError";
import { CustomError } from "./Types";
const app = express();


app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", appRoutes);

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

serverConfig(app, getEnv("server.port") as string);
