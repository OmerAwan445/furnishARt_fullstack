import { findStripeCustomerId, updateStripeCustomerId } from "@src/models/CustomerModel";
import { getEnv } from "@src/utils/getEnv";
import Stripe from "stripe";

export class StripeSvs {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(getEnv('stripe.secret_key'));
  }

  getExistingOrCreateStripeCustomer = async (id: number, name: string, email: string) => {
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
}
