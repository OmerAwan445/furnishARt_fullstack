import { ORDERSTATUS } from "@prisma/client";
import { prisma } from "@src/db";
import { CartWithItems } from "@src/Types";

class OrderModel {
  public async deleteCartAndAddItemsToOrder(
      cart: CartWithItems,
      userId: number,
  ) {
    await prisma.$transaction(async (tx) => {
      // Add items to the order
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

      // Update stock quantities and total sales in bulk
      await Promise.all(
          cart.cartItems.map((item) =>
            tx.furnitureItem.update({
              where: { id: item.furniture_item_id },
              data: {
                stock_quantity: {
                  decrement: item.quantity,
                },
                total_sales: {
                  increment: item.quantity,
                },
              },
            }),
          ),
      );
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

  public async updateOrderStatus(order_id: number, status: ORDERSTATUS) {
    await prisma.order.update({
      where: {
        id: order_id,
      },
      data: {
        order_status: status,
      },
    });
  }

  public async getOrders() {
    return prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            furniture_item: true,
          },
        },
      },
    });
  }

  public async getUserOrders(id: number) {
    return prisma.order.findMany({
      where: {
        customer_id: id,
      },
      include: {
        orderItems: {
          include: {
            furniture_item: true,
          },
        },
      },
    });
  }
}

export default OrderModel;
