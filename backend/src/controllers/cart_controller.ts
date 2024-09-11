import CartSvs from "@src/services/CartSvs";
import { AddCartItemRequestBody } from "@src/Types";
import ApiResponse from "@src/utils/ApiResponse";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { Request, Response } from "express";

export class CartController {
  private readonly cartSvs: CartSvs;
  constructor() {
    this.cartSvs = new CartSvs();
  }

  add_cart_item = catchAsyncError(async (req: Request<object, object, AddCartItemRequestBody>, res: Response) => {
    const userId = req.user!.id;
    const { productId, quantity } = req.body;

    await this.cartSvs.addCartItem(userId, productId, quantity);

    return res.send(ApiResponse.success(null, "Added item to cart"));
  });

  get_cart_items = catchAsyncError(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const cartItems = await this.cartSvs.getCartItems(userId);

    return res.send(ApiResponse.success(cartItems, "Cart items retrieved successfully"));
  });

  delete_cart_item = catchAsyncError(async (req: Request<{ productId?: string }, object, object>, res: Response) => {
    const userId = req.user!.id;
    const { productId } = req.params;

    await this.cartSvs.deleteCartItem(userId, Number(productId));

    return res.send(ApiResponse.success(null, "Item removed", 204));
  });
}
