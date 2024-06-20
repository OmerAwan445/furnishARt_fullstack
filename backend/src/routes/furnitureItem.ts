import { FurnitureItemController } from "@src/controllers/furnitureItem_controller";
import { Router as expressRouters } from "express";

const furntiureItemRoutes = expressRouters();
const controller = new FurnitureItemController();

furntiureItemRoutes.get("/bestseller", controller.getBestSellerFurnitureItems);

export default furntiureItemRoutes;
