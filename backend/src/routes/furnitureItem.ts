import { FurnitureItemController } from "@src/controllers/furnitureItem_controller";
import { checkAllowedRole } from "@src/middlewares/checkAllowedRoles";
import { validateRequestSchema } from "@src/middlewares/validate-request-schema";
import verifyLogin from "@src/middlewares/verifyLogin";
import { routePermissions } from "@src/utils/constants/RoutePermissions";
import { verifyLoginSchema } from "@src/validations/AuthValidationSchemas";
import { addFurnitureItemSchema, autoCompleteFurnitureItems,
  getFurnitureFromID, getFurnitureItems } from "@src/validations/FurnitureItemValidationSchema";
import { Router as expressRouters } from "express";
import { checkSchema } from "express-validator";

const furntiureItemRoutes = expressRouters();
const protectedFurntiureItemRoutes = expressRouters();
const controller = new FurnitureItemController();

protectedFurntiureItemRoutes.use(checkSchema(verifyLoginSchema, ['headers']), validateRequestSchema, verifyLogin);

furntiureItemRoutes.get("/", checkSchema(getFurnitureItems, ['query']), validateRequestSchema, controller.getFurnitureItems);

furntiureItemRoutes.get("/auto-complete", checkSchema(autoCompleteFurnitureItems, ['query']),
    validateRequestSchema, controller.getAutoCompleteFurnitureItems);

furntiureItemRoutes.get("/best-sellers", controller.getBestSellerFurnitureItems);

furntiureItemRoutes.get("/:id", checkSchema(getFurnitureFromID, ['params']), validateRequestSchema, controller.getFurnitureItemFromID);

protectedFurntiureItemRoutes.post("/", checkSchema(addFurnitureItemSchema, ['body']), validateRequestSchema,
    checkAllowedRole(routePermissions.furnitureItem.add), controller.addFurnitureItem);

furntiureItemRoutes.use(protectedFurntiureItemRoutes);

export default furntiureItemRoutes;
