import { prisma } from "@src/db";
import { CartWithItems } from "@src/Types";

class OrderModel {
  public async deleteCartAndAddItemsToOrder(
      cart: CartWithItems,
      userId: number,
  ) {
    await prisma.$transaction(async (tx) => {
      // Add items to order before deleting the cart
      await tx.order.create({
        data: {
          customer_id: userId,
          order_status: "PENDING",
          total_amount: cart.price,
          orderItems: {
            create: cart.cartItems.map((item) => ({
              furniture_item_id: item.furniture_item_id,
              quantity: item.quantity,
            })),
          },
        },
      });

      // Empty cart items
      await tx.cartItem.deleteMany({
        where: {
          cart_id: cart.id,
        },
      });

      // Delete the cart
      await tx.cart.delete({
        where: {
          id: cart.id,
        },
      });
    });
  }
}

export default OrderModel;
