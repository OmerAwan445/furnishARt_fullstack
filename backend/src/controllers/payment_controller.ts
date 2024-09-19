import { StripeSvs } from '@src/services/order&payment/StripeSvs';
import ApiResponse from '@src/utils/ApiResponse';
import { catchAsyncError } from '@src/utils/catchAsyncError';

export class PaymentController {
  private stripeSvs;

  constructor() {
    this.stripeSvs = new StripeSvs();
  }

  createStripeCustomer = catchAsyncError(async (req, res) => {
    const stripe_customer_id = await this.stripeSvs.getExistingOrCreateStripeCustomer(req.user!.id, req.user!.name, req.user!.email);
    return res.send(ApiResponse.success({ stripe_customer_id }));
  });
}
