import { CategoryController } from "@src/controllers/category_controller";
import { checkAllowedRole } from "@src/middlewares/checkAllowedRoles";
import validate from "@src/middlewares/validate";
import { validateRequestSchema } from "@src/middlewares/validate-request-schema";
import verifyLogin from "@src/middlewares/verifyLogin";
import { routePermissions } from "@src/utils/constants/RoutePermissions";
import { verifyLoginSchema } from "@src/validations/AuthValidationSchemas";
import { addCategory, deleteCategory, editCategory } from "@src/validations/CategoryValidationSchemas";
import { Router as expressRouters } from "express";
import { checkSchema } from "express-validator";

const categoryRoutes = expressRouters();
const protectedCategoryRoutes = expressRouters();
const controller = new CategoryController();

protectedCategoryRoutes.use(checkSchema(verifyLoginSchema, ['headers']), validateRequestSchema, verifyLogin);

categoryRoutes.get("/", controller.getAllCategories);
protectedCategoryRoutes.post("/", validate(addCategory, ["body"]), checkAllowedRole(routePermissions.category.add), controller.addCategory);

protectedCategoryRoutes.put("/", validate(editCategory, ["body"]), checkAllowedRole(routePermissions.category.edit), controller.editCategory);
protectedCategoryRoutes.delete("/", validate(deleteCategory, ["query"]), checkAllowedRole(routePermissions.category.edit), controller.deleteCategory);

categoryRoutes.use(protectedCategoryRoutes);

export default categoryRoutes;
