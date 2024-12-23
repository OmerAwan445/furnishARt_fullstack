import { ORDERSTATUS } from "@prisma/client";
import OrderModel from "@src/models/OrderModel";

class OrderSvs {
  private readonly OrderModel: OrderModel;

  constructor() {
    this.OrderModel = new OrderModel();
  }

  async updateOrderStatus(order_id: number, status: ORDERSTATUS) {
    await this.OrderModel.updateOrderStatus(order_id, status);
  }

  async getOrders() {
    return this.OrderModel.getOrders();
  }

  async getUserOrders(id: number) {
    return this.OrderModel.getUserOrders(id);
  }
}

export default OrderSvs;
