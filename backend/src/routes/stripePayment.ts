import { PaymentController } from "@src/controllers/payment_controller";
import { Router as expressRouters } from "express";

const stripePaymentRoutes = expressRouters();
const controller = new PaymentController();

stripePaymentRoutes
    .route("/create-customer")
    .post(controller.createStripeCustomer);

export default stripePaymentRoutes;
