import { FurnitureItemController } from "@src/controllers/furnitureItem_controller";
import { validateRequestSchema } from "@src/middlewares/validate-request-schema";
import { autoCompleteFurnitureItems, getFurnitureFromID } from "@src/validations/FurnitureItemValidationSchema";
import { Router as expressRouters } from "express";
import { checkSchema } from "express-validator";

const furntiureItemRoutes = expressRouters();
const controller = new FurnitureItemController();

furntiureItemRoutes.get("/", checkSchema(autoCompleteFurnitureItems, ['query']), validateRequestSchema, controller.getAutoCompleteFurnitureItems);

furntiureItemRoutes.get("/best-sellers", controller.getBestSellerFurnitureItems);

furntiureItemRoutes.get("/:id", checkSchema(getFurnitureFromID, ['params']), validateRequestSchema, controller.getFurnitureItemFromID);

export default furntiureItemRoutes;
