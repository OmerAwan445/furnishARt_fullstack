import "module-alias/register";
import dotenv from "dotenv";
dotenv.config();
import { appRoutes } from "@routes/index";
import { getEnv } from "@utils/getEnv";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { serverConfig } from "./server";
import ErrorHandler from "@src/Errors/ErrorHandler";

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/assets", appRoutes);

app.use(
    (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ):void => {
      const handler = new ErrorHandler(res, err);
      handler.handleError();
    },
);

serverConfig(app, getEnv("PORT") as string);
