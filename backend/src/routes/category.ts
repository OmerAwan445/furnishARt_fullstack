import { CategoryController } from "@src/controllers/category_controller";
import { Router as expressRouters } from "express";

const categoryRoutes = expressRouters();
const controller = new CategoryController();

categoryRoutes.get("/", controller.getAllCategories);

export default categoryRoutes;
