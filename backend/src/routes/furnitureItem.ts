import { FurnitureItemController } from "@src/controllers/furnitureItem_controller";
import { checkAllowedRole } from "@src/middlewares/checkAllowedRoles";
import validate from "@src/middlewares/validate";
import verifyLogin from "@src/middlewares/verifyLogin";
import { verifyUploadFurnitureImages } from "@src/middlewares/verifyUploadFurnitureImages";
import { verifyUploadFurnitureModel } from "@src/middlewares/verifyUploadFurnitureModel";
import { routePermissions } from "@src/utils/constants/RoutePermissions";
import { verifyLoginSchema } from "@src/validations/AuthValidationSchemas";
import {
  addFurnitureItemSchema, autoCompleteFurnitureItems,
  editFurnitureItems,
  getFurnitureFromID, getFurnitureItems,
  updateStocksSchema,
  uploadMediaSchema,
} from "@src/validations/FurnitureItemValidationSchema";
import { Router as expressRouters } from "express";

const furntiureItemRoutes = expressRouters();
const protectedFurntiureItemRoutes = expressRouters();
const controller = new FurnitureItemController();


protectedFurntiureItemRoutes.use(validate(verifyLoginSchema, ['headers']), verifyLogin);

furntiureItemRoutes.get("/", validate(getFurnitureItems, ['query']), controller.getFurnitureItems);

furntiureItemRoutes.get("/auto-complete", validate(autoCompleteFurnitureItems, ['query']), controller.getAutoCompleteFurnitureItems);

furntiureItemRoutes.get("/best-sellers", controller.getBestSellerFurnitureItems);

furntiureItemRoutes.get("/:id", validate(getFurnitureFromID, ['params']), controller.getFurnitureItemFromID);

protectedFurntiureItemRoutes.put("/", validate(editFurnitureItems, ['body']),
    checkAllowedRole(routePermissions.furnitureItem.edit), controller.editFurnitureItems);

protectedFurntiureItemRoutes.delete("/:id", validate(getFurnitureFromID, ['params']),
    checkAllowedRole(routePermissions.furnitureItem.delete), controller.deleteFurnitureItem);

protectedFurntiureItemRoutes.post("/", validate(addFurnitureItemSchema, ['body']),
    checkAllowedRole(routePermissions.furnitureItem.add), controller.addFurnitureItem);

protectedFurntiureItemRoutes.put("/update-stock", validate(updateStocksSchema, ['body']),
    checkAllowedRole(routePermissions.furnitureItem.update_stocks), controller.updateStocks);

protectedFurntiureItemRoutes.post("/upload-images", checkAllowedRole(routePermissions.furnitureItem.upload_media),
    validate(uploadMediaSchema, ['query']), verifyUploadFurnitureImages, controller.uploadImageFiles);

protectedFurntiureItemRoutes.post("/upload-model", checkAllowedRole(routePermissions.furnitureItem.upload_media),
    validate(uploadMediaSchema, ['query']), verifyUploadFurnitureModel, controller.uploadModelFiles);

furntiureItemRoutes.use(protectedFurntiureItemRoutes);

export default furntiureItemRoutes;
