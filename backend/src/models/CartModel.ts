import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "@src/db";
import { CartItemModel } from "./CartItemModel";

export class CartModel {
  private readonly CartItemModel: CartItemModel;
  constructor() {
    this.CartItemModel = new CartItemModel();
  }

  async getCartItems(cusId: number) {
    return await prisma.cart.findUnique({
      where: {
        customer_id: cusId,
      },
      select: {
        id: true,
        price: true,
        cartItems: {
          select: {
            id: false,
            quantity: true,
            furniture_item: {
              select: {
                id: true,
                name: true,
                price: true,
                image_urls: true,
              },
            },
          },
        },
      },
    });
  }

  async findCustomerCart(cusId: number) {
    return await prisma.cart.findUnique({
      where: {
        customer_id: cusId,
      },
      select: { id: true, price: true, cartItems: true },
    });
  }

  async createCustomerCartAndAddItem(
      cusId: number,
      furnitureId: number,
      quantity: number,
      price: Decimal,
  ) {
    return await prisma.cart.create({
      data: {
        customer_id: cusId,
        price: Number(price) * quantity,
        cartItems: {
          create: [
            {
              furniture_item_id: furnitureId,
              quantity: quantity,
            },
          ],
        },
      },
    });
  }

  async updateCartPrice(cartId: any, newPrice: number) {
    await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        price: newPrice,
      },
    });
  }

  async updateCartAndItems(
      cartId: number,
      furnitureId: number,
      quantity: number,
      itemPrice: number,
      cartPrice: number,
  ) {
    return await prisma.$transaction(async () => {
      const cartItem = await this.CartItemModel.findCartItem(cartId, furnitureId);

      if (cartItem) {
        const newQuantity = cartItem.quantity + quantity;
        await this.CartItemModel.updateCartItemQuantity(cartItem.id, newQuantity);
      } else {
        await this.CartItemModel.addItemToCart(cartId, furnitureId, quantity);
      }

      cartPrice = cartPrice + itemPrice * quantity;
      // Recalculate the total price of the cart
      await this.updateCartPrice(cartId, cartPrice);
    });
  }
}
