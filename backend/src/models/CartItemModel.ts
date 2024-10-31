import { prisma } from "@src/db";

export class CartItemModel {
  async findCartItem(cartId: number, productId: number) {
    return await prisma.cartItem.findUnique({
      where: {
        furniture_item_id_cart_id: {
          cart_id: cartId,
          furniture_item_id: productId,
        },
      },
      select: {
        quantity: true,
        id: true,
        furniture_item: {
          select: {
            price: true,
          },
        },
      },
    });
  }

  async updateCartItemQuantity(cartItemId: number, quantity: number) {
    return await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: quantity,
      },
    });
  }

  async addItemToCart(cartId: number, productId: number, quantity: number) {
    return await prisma.cartItem.create({
      data: {
        cart_id: cartId,
        furniture_item_id: productId,
        quantity: quantity,
      },
    });
  }

  async deleteCartItem(cartId: number, furniture_item_id: number) {
    return await prisma.cartItem.delete({
      where: {
        furniture_item_id_cart_id: {
          cart_id: cartId,
          furniture_item_id: furniture_item_id,
        },
      },
    });
  }
}
