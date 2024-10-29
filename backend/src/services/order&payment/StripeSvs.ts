import { AppError } from "@src/errors/AppError";
import { CartModel } from "@src/models/CartModel";
import {
  findStripeCustomerId,
  updateStripeCustomerId,
} from "@src/models/CustomerModel";
import OrderModel from "@src/models/OrderModel";
import { getEnv } from "@src/utils/getEnv";
import Stripe from "stripe";

export class StripeSvs {
  private readonly stripe: Stripe;
  private readonly CartModel: CartModel;
  private readonly OrderModel: OrderModel;

  constructor() {
    this.stripe = new Stripe(getEnv("stripe.secret_key"));
    this.CartModel = new CartModel();
    this.OrderModel = new OrderModel();
  }

  getExistingOrCreateStripeCustomer = async (
      id: number,
      name: string,
      email: string,
  ) => {
    // Check for the existing cus_id in customer table
    const user = await findStripeCustomerId(id);
    if (user?.stripe_customer_id) {
      return user.stripe_customer_id;
    }
    const customer = await this.stripe.customers.create({
      name,
      email,
    });
    await updateStripeCustomerId(id, customer.id);
    // save the customer_id in db
    return customer.id;
  };

  savePaymentCard = async (pm_id: string, stripe_cus_id: string) => {
    await this.stripe.paymentMethods.attach(pm_id, {
      customer: stripe_cus_id,
    });
  };

  getAllPaymentMethods = async (stripe_cus_id: string) => {
    const res = await this.stripe.paymentMethods.list({
      type: "card",
      limit: 3,
      customer: stripe_cus_id,
    });
    return res.data.map((method) => ({
      id: method.id,
      brand: method.card?.brand,
      exp_year: method.card?.exp_year,
      name: method.billing_details.name,
      last4: method.card?.last4,
    }));
  };

  createPaymentIntent = async (pm_id: string, stripe_cus_id: string, user_id: number, is_pm_save = false) => {
    // save the card details in db if is_pm_save is true
    if (is_pm_save) {
      await this.savePaymentCard(pm_id, stripe_cus_id);
    }
    // get the Cart price
    const cart = await this.CartModel.findCustomerCart(user_id);
    if (!cart) {
      throw new AppError("Cart not found", 404);
    }
    const cartprice = Number(cart.price);

    if (cartprice <= 0) {
      throw new AppError("Cart is empty", 400);
    }

    const payment = await this.stripe.paymentIntents.create({
      currency: "usd",
      amount: 100 * cartprice,
      payment_method: pm_id,
      customer: stripe_cus_id,
      confirm: true,
      return_url: getEnv('FRONTEND_URL'),
    });

    if (payment.status !== "succeeded") {
      throw new AppError("Payment failed", 400);
    }

    await this.OrderModel.deleteCartAndAddItemsToOrder(cart, user_id);
    return payment;
  };
}
