import apiInstance from "@/ApiInstance";
import { GetCartDetailsResponse } from "@/types/Types";
import { handleApiCall } from "@/utils/apiUtils/handleApiCall";
import { CustomError } from "@/utils/error/CustomError";
import { revalidateTagAction } from "../server-actions/revalidateCacheAction";
import { BACKEND_API_ENDPOINTS } from "./apiEndpoints/apiEndpoints";

class CartServices {
  static async addCartItem(productId: number, quantity: number) {
    const { data, error } =  await handleApiCall<{ message: string }>(
      async () =>
        await apiInstance.post(
          BACKEND_API_ENDPOINTS.addCartItem,
          { productId, quantity },
          {
            isPrivateReq: true
          }
         )
    );

    if (error) return { error: true, message: error.message, statusCode: error.statusCode };
    await revalidateTagAction("Cart");
    return { error: false, message: data.message };
  }

  static async getCartDetails() {
    const { data, error } = await handleApiCall<{ data: GetCartDetailsResponse }>(async () => 
      await apiInstance.get(BACKEND_API_ENDPOINTS.getCartDetails, {
        isPrivateReq: true
      })
    );
    
    if (error) return { data: null, message: error.message };
    return { data: data.data, message: null };
  }


  static async removeCartItem(cartItemId: number) {
    const { data, error } = await handleApiCall<{ message: string }>(
      async () =>
        await apiInstance.delete(
          `${BACKEND_API_ENDPOINTS.removeCartItem}/${cartItemId}`,
          {
            isPrivateReq: true
          }
        )
    );

    if (error) throw new CustomError(error.message, 400);
    await revalidateTagAction("Cart");
    return { error: false, message: data.message };
  }
}

export default CartServices;
