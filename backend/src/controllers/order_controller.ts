import OrderSvs from "@src/services/order&payment/OrderSvs";
import { updateOrderStatusReqBody } from "@src/Types";
import ApiResponse from "@src/utils/ApiResponse";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { Request } from "express";

export class OrderController {
  private readonly orderSvs: OrderSvs;
  constructor() {
    this.orderSvs = new OrderSvs();
  }

  getUserOrders = catchAsyncError(async (req: Request<{id?: string}, object, object>, res) => {
    const { id } = req.user!;
    const orders = await this.orderSvs.getUserOrders(id);
    res.send(ApiResponse.success(orders, "Orders retrieved successfully"));
  });

  getOrders = catchAsyncError(async (req, res) => {
    // Get orders
    const orders = await this.orderSvs.getOrders();
    res.send(ApiResponse.success(orders, "Orders retrieved successfully"));
  });

  updateOrderStatus = catchAsyncError(async (req: Request<object, object, updateOrderStatusReqBody>, res) => {
    const { order_id, status } = req.body;
    await this.orderSvs.updateOrderStatus(order_id, status);

    res.send(ApiResponse.success(null, "Order status updated successfully"));
  });
}

export default OrderController;

