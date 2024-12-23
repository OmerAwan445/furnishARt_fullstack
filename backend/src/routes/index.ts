import { checkAllowedRole } from "@src/middlewares/checkAllowedRoles";
import { validateRequestSchema } from "@src/middlewares/validate-request-schema";
import verifyLogin from "@src/middlewares/verifyLogin";
import { routePermissions } from "@src/utils/constants/RoutePermissions";
import { verifyLoginSchema } from "@src/validations/AuthValidationSchemas";
import { Router as expressRouter } from "express";
import { checkSchema } from "express-validator";
import authRoutes from "./auth";
import cartRoutes from "./cart";
import categoryRoutes from "./category";
import furntiureItemRoutes from "./furnitureItem";
import paymentRoutes from "./stripePayment";
import orderRoutes from "./order";

const appRoutes = expressRouter();
const protectedRoutes = expressRouter();

protectedRoutes.use(checkSchema(verifyLoginSchema, ['headers']), validateRequestSchema, verifyLogin);

// Protected routes(Accessed after login)
protectedRoutes.use("/cart", checkAllowedRole(routePermissions.cart), cartRoutes);
protectedRoutes.use("/stripe", checkAllowedRole(routePermissions.stripe), paymentRoutes);
protectedRoutes.use("/orders", orderRoutes);

// Accessible routes
appRoutes.use("/auth", authRoutes);
appRoutes.use("/furniture-item", furntiureItemRoutes);
appRoutes.use("/category", categoryRoutes);

appRoutes.use(protectedRoutes);

export default appRoutes;
