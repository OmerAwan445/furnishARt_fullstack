import { CartController } from "@src/controllers/cart_controller";
import validate from "@src/middlewares/validate";
import { addCartItem, deleteCartItem } from "@src/validations/CartValidationSchemas";
import { Router as expressRouters } from "express";

const cartRoutes = expressRouters();
const controller = new CartController();

cartRoutes
    .route("/")
    .get(controller.get_cart_items);

cartRoutes
    .route("/add-item")
    .post(validate(addCartItem, ["body"]), controller.add_cart_item);

cartRoutes
    .route('/remove-item/:productId')
    .delete(validate(deleteCartItem, ["params"]), controller.delete_cart_item);

export default cartRoutes;
