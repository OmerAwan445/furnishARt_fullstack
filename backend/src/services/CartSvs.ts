import { AppError } from "@src/errors/AppError";
import { CartItemModel } from "@src/models/CartItemModel";
import { CartModel } from "@src/models/CartModel";
import { FurnitureItemModel } from "@src/models/FurnitureItemModel";

class CartSvs {
  private readonly CartModel: CartModel;
  private readonly CartItemModel: CartItemModel;
  private readonly FurnitureItemModel: FurnitureItemModel;

  constructor() {
    this.CartModel = new CartModel();
    this.CartItemModel = new CartItemModel();
    this.FurnitureItemModel= new FurnitureItemModel();
  }

  public async addCartItem(
      userId: number,
      furnitureId: number,
      quantity: number,
  ) {
    // 1. Check if item exist in db and get price.
    const item = await this.FurnitureItemModel.getFurnitureItemPrice(furnitureId);
    if (!item) throw new AppError("Item not found", 404);
    // 2. Check if the user has already a cart id in the database
    const cart = await this.CartModel.findCustomerCart(userId);
    // 3. If the user has no cart id, STEP 4, else STEP 5
    if (!cart || !cart.id) {
    // 4. Create a new cart id for the user and add the item to cart
      await this.CartModel.createCustomerCartAndAddItem(userId, furnitureId, quantity, item.price);
    } else {
    // 5. Check if the item is already in the cart and update the quantity, else add the item to cart
      await this.CartModel.updateCartAndItems(cart.id, furnitureId, quantity, Number(item.price), Number(cart.price));
    }
  }

  public async getCartItems(userId: number) {
    const cart = await this.CartModel.getCartItems(userId);
    // Mapping Prisma data to `GetCartDetailsResponse` format
    if (!cart) throw new AppError("Cart not found", 404);

    const mappedCart = {
      cart_id: cart.id,
      cart_total_price: Number(cart.price),
      cartItems: cart.cartItems?.map((item) => ({
        id: item.furniture_item.id,
        quantity: item.quantity,
        name: item.furniture_item.name,
        price: Number(item.furniture_item.price),
        thumbnail_image: item.furniture_item.image_urls?.[0] || "",
      })),
    };

    return mappedCart;
  }

  public async deleteCartItem(userId: number, furniture_item_id: number) {
    const cart = await this.CartModel.findCustomerCart(userId);

    if (!cart || !cart.id) throw new AppError("Cart not found", 404);

    const cartItem = await this.CartItemModel.findCartItem(cart.id, furniture_item_id);
    if (!cartItem) throw new AppError("Item not found in cart", 404);

    await this.CartItemModel.deleteCartItem(cart.id, furniture_item_id);
    const updatedPrice = Number(cart.price) - (Number(cartItem.furniture_item.price) * cartItem.quantity);
    await this.CartModel.updateCartPrice(cart.id, updatedPrice);
  }
}

export default CartSvs;
