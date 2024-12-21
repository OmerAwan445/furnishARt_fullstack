import OrderController from "@src/controllers/order_controller";
import validate from "@src/middlewares/validate";
import { updateOrderStatusSchema } from "@src/validations/OrderValidationSchemas";
import { Router as expressRouters } from "express";

const orderRoutes = expressRouters();
const controller = new OrderController();

orderRoutes.get("/", controller.getOrders);

orderRoutes.put("/update-status", validate(updateOrderStatusSchema, ["body"]), controller.updateOrderStatus);

export default orderRoutes;
