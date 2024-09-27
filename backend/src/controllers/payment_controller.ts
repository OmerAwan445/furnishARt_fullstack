import { StripeSvs } from '@src/services/order&payment/StripeSvs';
import { PayCartRequestBody, SavePaymentMethodRequestBody } from '@src/Types';
import ApiResponse from '@src/utils/ApiResponse';
import { catchAsyncError } from '@src/utils/catchAsyncError';
import { ResponseMessages } from '@src/utils/ResponseMessages';
import { Request } from 'express';

export class PaymentController {
  private stripeSvs;

  constructor() {
    this.stripeSvs = new StripeSvs();
  }

  createStripeCustomer = catchAsyncError(async (req, res) => {
    const stripe_customer_id = await this.stripeSvs.getExistingOrCreateStripeCustomer(req.user!.id, req.user!.name, req.user!.email);

    return res.send(ApiResponse.success({ stripe_customer_id }));
  });

  savePaymentMethod = catchAsyncError(async (req: Request<object, object, SavePaymentMethodRequestBody>, res) => {
    const { pm_id, stripe_cus_id } = req.body;

    await this.stripeSvs.savePaymentCard(pm_id, stripe_cus_id);
    return res.send(ApiResponse.success({ }, ResponseMessages.STRIPE_Card_Saved));
  });

  getAllPaymentMethods = catchAsyncError(async (req: Request<{ cus_id?: string }, object>, res) => {
    const { cus_id } = req.params;

    const cards = await this.stripeSvs.getAllPaymentMethods(cus_id!);
    return res.send(ApiResponse.success({ cards }));
  });

  payCart = catchAsyncError(async (req: Request<object, object, PayCartRequestBody>, res) => {
    const { pm_id, stripe_cus_id, is_pm_save } = req.body;
    const payment = await this.stripeSvs.createPaymentIntent(pm_id, stripe_cus_id, req.user!.id, is_pm_save);
    return res.send(ApiResponse.success({ payment }));
  });
}
