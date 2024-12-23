import apiInstance from "@/ApiInstance";
import { handleApiCall } from "@/utils/apiUtils/handleApiCall";
import { BACKEND_API_ENDPOINTS } from "./apiEndpoints/apiEndpoints";
import { Order } from "@/types/Types";

class OrderService {
  static async getOrders() {
    const { data, error } =  await handleApiCall<{ data: Order[] }>(
        async () => await apiInstance.get( BACKEND_API_ENDPOINTS.getOrders, { isPrivateReq: true})
      );
  
      if (error) return null;
      return data.data;
    }
    static async updateOrderStatus(order_id: number, status: string) {
      const { data, error } =  await handleApiCall<{ message: string }>(
        async () => await apiInstance.put( `${BACKEND_API_ENDPOINTS.updateOrderStatus}`, { order_id, status }, { isPrivateReq: true})
      );
  
      if (error) return { error: true, message: error.message };
      return { error: false, message: data.message };
}
static async getUserOrders() {
  const { data, error } =  await handleApiCall<{ data: Order[] }>(
      async () => await apiInstance.get( BACKEND_API_ENDPOINTS.getUserOrders, { isPrivateReq: true})
    );

    if (error) return null;
    return data.data;
  
}
}

export default OrderService;