import OrderController from "@src/controllers/order_controller";
import { checkAllowedRole } from "@src/middlewares/checkAllowedRoles";
import validate from "@src/middlewares/validate";
import { routePermissions } from "@src/utils/constants/RoutePermissions";
import { updateOrderStatusSchema } from "@src/validations/OrderValidationSchemas";
import { Router as expressRouters } from "express";

const orderRoutes = expressRouters();
const controller = new OrderController();

orderRoutes.get("/", checkAllowedRole(routePermissions.order), controller.getOrders);
orderRoutes.put("/update-status", validate(updateOrderStatusSchema, ["body"]),
    checkAllowedRole(routePermissions.order), controller.updateOrderStatus);

orderRoutes.get("/user", controller.getUserOrders);

export default orderRoutes;
