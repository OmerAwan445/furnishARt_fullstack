import { PaymentController } from "@src/controllers/payment_controller";
import validate from "@src/middlewares/validate";
import { PayCartSchema, SavePaymentMethodSchema } from "@src/validations/PaymentValidationSchemas";
import { Router as expressRouters } from "express";

const stripePaymentRoutes = expressRouters();
const controller = new PaymentController();

stripePaymentRoutes
    .route("/customer-account-id")
    .get(controller.createStripeCustomer);

stripePaymentRoutes
    .route("/save-payment-method")
    .post(validate(SavePaymentMethodSchema, ["body"]), controller.savePaymentMethod);

stripePaymentRoutes
    .route("/all-payment-methods/:cus_id")
    .get(controller.getAllPaymentMethods);

stripePaymentRoutes
    .route("/pay-cart")
    .post(validate(PayCartSchema, ["body"]), controller.payCart);

export default stripePaymentRoutes;
