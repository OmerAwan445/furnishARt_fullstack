import apiInstance from "@/ApiInstance";
import { handleApiCall } from "@/utils/apiUtils/handleApiCall";
import { BACKEND_API_ENDPOINTS } from "./apiEndpoints/apiEndpoints";
import { GetCategoriesResponse } from "@/types/Types";

class CategoryServices {
  static async getCategories() {
    const { data, error } = await handleApiCall<{
      data: GetCategoriesResponse[];
    }>(async () => await apiInstance.get(BACKEND_API_ENDPOINTS.getCategories));

    if (error) return null;
    return data.data;
  }
  static async addCategory(name: string) {
    const { data, error } = await handleApiCall<{
      message: string;
      error: string;
    }>(
      async () =>
        await apiInstance.post(
          `${BACKEND_API_ENDPOINTS.addCategory}`,
          {
            name,
          },
          {
            isPrivateReq: true,
          }
        )
    );
    if (error) return { message: error.message, error: true };
    return { message: data.message, error: false };
  }
  static async editCategory(id: number, name: string) {
    const { data, error } = await handleApiCall<{
      message: string;
      error: string;
    }>(
      async () =>
        await apiInstance.put(
          `${BACKEND_API_ENDPOINTS.editCategory}`,
          {
            id,
            name,
          },
          {
            isPrivateReq: true,
          }
        )
    );
    if (error) return { message: error.message, error: true };
    return { message: data.message, error: false };
  }

  static async deleteCategory(id: number) {
    const { data, error } = await handleApiCall<{
      message: string;
      error: string;
    }>(
      async () =>
        await apiInstance.delete(`${BACKEND_API_ENDPOINTS.deleteCategory}?id=${id}`, {
          isPrivateReq: true,
        })
    );
    if (error) return { message: error.message, error: true };
    return { message: data.message, error: false };
  }
}

export default CategoryServices;
