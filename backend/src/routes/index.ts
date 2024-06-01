import veriyLogin from "@src/middlewares/verifyLogin";
import { verifyLoginSchema } from "@src/validations/AuthValidationSchemas";
import { Router as expressRouter } from "express";
import { checkSchema } from "express-validator";
import authRoutes from "./auth";
import restaurantRoutes from "./restaurant";
import { validateRequestSchema } from "@src/middlewares/validate-request-schema";
const appRoutes = expressRouter();
const protectedRoutes = expressRouter();


protectedRoutes.use(checkSchema(verifyLoginSchema, ['headers']), validateRequestSchema, veriyLogin);

appRoutes.use("/auth", authRoutes);
protectedRoutes.use("/restaurant", restaurantRoutes);


appRoutes.use(protectedRoutes);

export default appRoutes;
