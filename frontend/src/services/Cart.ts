import apiInstance, { apiInstanceSS } from "@/ApiInstance";
import { handleApiCall } from "@/utils/apiUtils/handleApiCall";
import { BACKEND_API_ENDPOINTS } from "./apiEndpoints/apiEndpoints";
import { GetCartDetailsResponse, GetCategoriesResponse } from "@/types/Types";
import axios from "axios";
import { authorizedApiCall } from "@/utils/apiUtils/authorizedApiCall";

class CartServices {
    // private static BASE_URL_SS = process.env.BACKEND_API_URL;

    static async getCartDetails() {
        const { data, error } = await authorizedApiCall<{ data: GetCartDetailsResponse }>(async (config) => 
          await apiInstanceSS.get(BACKEND_API_ENDPOINTS.getCartDetails, config)  // Pass the config with headers
        );
        
        if (error) return { data: null, message: error.message };
        return { data: data.data, message: null };
      }
}

export default CartServices;
