import { validateRequestSchema } from "@src/middlewares/validate-request-schema";
import verifyLogin from "@src/middlewares/verifyLogin";
import { verifyLoginSchema } from "@src/validations/AuthValidationSchemas";
import { Router as expressRouter } from "express";
import { checkSchema } from "express-validator";
import authRoutes from "./auth";
import furntiureItemRoutes from "./furnitureItem";

const appRoutes = expressRouter();
const protectedRoutes = expressRouter();

protectedRoutes.use(checkSchema(verifyLoginSchema, ['headers']), validateRequestSchema, verifyLogin);
// appRoutes.use(protectedRoutes);

appRoutes.use("/auth", authRoutes);
appRoutes.use("/furniture-items", furntiureItemRoutes);

export default appRoutes;
