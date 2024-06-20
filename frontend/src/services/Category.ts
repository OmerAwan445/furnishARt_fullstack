import apiInstance from "@/ApiInstance";
import { handleApiCall } from "@/utils/apiUtils/handleApiCall";
import { BACKEND_API_ENDPOINTS } from "./apiEndpoints/apiEndpoints";
import { GetCategoriesResponse } from "@/types/Types";

class CategoryServices {
  static async getCategories() {
    const { data, error } = await handleApiCall<{ data: GetCategoriesResponse[] }>(async ()=> await apiInstance.get(BACKEND_API_ENDPOINTS.getCategories));
    
    if (error) return null;
    return data.data;
  }
}

export default CategoryServices;
