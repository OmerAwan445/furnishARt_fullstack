import { validateRequestSchema } from "@src/middlewares/validate-request-schema";
import verifyLogin from "@src/middlewares/verifyLogin";
import { verifyLoginSchema } from "@src/validations/AuthValidationSchemas";
import { Router as expressRouter } from "express";
import { checkSchema } from "express-validator";
import authRoutes from "./auth";
import furntiureItemRoutes from "./furnitureItem";
import categoryRoutes from "./category";
import cartRoutes from "./cart";

const appRoutes = expressRouter();
const protectedRoutes = expressRouter();

protectedRoutes.use(checkSchema(verifyLoginSchema, ['headers']), validateRequestSchema, verifyLogin);

// Protected routes(Accessed after login)
protectedRoutes.use("/cart", cartRoutes);

// Accessible routes
appRoutes.use("/auth", authRoutes);
appRoutes.use("/furniture-item", furntiureItemRoutes);
appRoutes.use("/category", categoryRoutes);

appRoutes.use(protectedRoutes);

export default appRoutes;
