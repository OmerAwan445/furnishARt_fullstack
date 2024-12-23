import apiInstance from "@/ApiInstance";
import {
  AddFurnitureItemRequest,
  AutoCompleteResponse,
  EditFurnitureItemRequest,
  FiltersSliceState,
  FurnitureItemDetailsResponse,
  GetBestSellerResponse,
  ReturnFurnitureItems,
  UploadMediaReq,
} from "@/types/Types";
import { getFilteredItems } from "@/utils/Itemsfilters&pagination/filteredItems";
import { makeFiltersQuery } from "@/utils/Itemsfilters&pagination/makeFiltersQuery";
import { handleApiCall } from "@/utils/apiUtils/handleApiCall";
import { BACKEND_API_ENDPOINTS } from "./apiEndpoints/apiEndpoints";
import { headers } from "next/headers";
import { CustomError } from "@/utils/error/CustomError";

class FurnitureItemsService {
  static async getFurnitureItems(filters?: FiltersSliceState) {
    let filtersQuery = "";
    if (filters) {
      filtersQuery = makeFiltersQuery(filters);
    }
    const { data, error } = await handleApiCall<{
      data: ReturnFurnitureItems[];
    }>(
      async () =>
        await apiInstance.get(
          `${BACKEND_API_ENDPOINTS.getFurnitureItems}?${filtersQuery}`
        )
    );

    if (error) return null;
    return getFilteredItems(data.data);
  }

  static async fetchSuggestions({
    searchTerm,
    category_id,
  }: {
    searchTerm: string;
    category_id: number;
  }) {
    const { data, error } = await handleApiCall<{
      data: AutoCompleteResponse[];
    }>(
      async () =>
        await apiInstance.get(
          `${BACKEND_API_ENDPOINTS.autocompleteFurnitureItems}?q=${searchTerm}${
            category_id !== 0 ? `&cid=${category_id}` : ""
          }`
        )
    );

    if (error) return null;
    return data.data;
  }

  static async getBestSellersSS() {
    const { data, error } = await handleApiCall<{
      data: GetBestSellerResponse;
    }>(
      async () =>
        await apiInstance.get(BACKEND_API_ENDPOINTS.getBestSellerFurnitureItems)
    );

    if (error) return null;
    return data.data;
  }

  static async fetchFurnitureItemFromID(id: number) {
    const { data, error } = await handleApiCall<{
      data: FurnitureItemDetailsResponse;
    }>(
      async () =>
        await apiInstance.get(
          `${BACKEND_API_ENDPOINTS.getFurnitureItemFromID}/${id}`
        )
    );

    if (error) return null;
    return data.data;
  }

  static async addFurnitureItem(requestData: AddFurnitureItemRequest) {
    const { data, error } = await handleApiCall<{
      message: string;
      error: string;
      data: { id: number };
    }>(
      async () =>
        await apiInstance.post(
          `${BACKEND_API_ENDPOINTS.addFurnitureItems}`,
          requestData,
          {
            isPrivateReq: true,
          }
        )
    );
    if (error) return { message: error.message, error: true };
    return { message: data.message, error: false,  id: data.data.id };
  }
  
  static async editFurnitureItem(requestData: EditFurnitureItemRequest) {
    const { data, error } = await handleApiCall<{
      message: string;
      error: string;
      data: { id: number };
    }>(
      async () =>
        await apiInstance.put(
          `${BACKEND_API_ENDPOINTS.addFurnitureItems}`,
          requestData,
          {
            isPrivateReq: true,
          }
        )
    );

    if (error) return { message: error.message, error: true };
    return { message: data.message, error: false,  id: data.data.id };
  }
  
  static async deleteFurnitureItem(id: number) {
    const { data, error } = await handleApiCall<{
      message: string;
      error: string;
      data: { id: number };
    }>(
      async () =>
        await apiInstance.delete(
          `${BACKEND_API_ENDPOINTS.deleteFurnitureItems}/${id}`,
          {
            isPrivateReq: true,
          }
        )
    );

    if (error) return { message: error.message, error: true };
    return { message: data.message, error: false };
  }

  static async uploadMedia(reqData: UploadMediaReq) {
    const { mediaType, files, itemId } = reqData;
    const formData = new FormData();
      Object.keys(files).forEach((key) => {
        formData.append("files", files[key]); // Append each file to the FormData object
      });
    const {data, error} = await handleApiCall<{message: string, error: string}>(async () => await apiInstance.post(`${mediaType === "image" ? BACKEND_API_ENDPOINTS.uploadFurnitureImages : BACKEND_API_ENDPOINTS.uploadFurnitureModel}?itemId=${itemId}`, formData, 
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      isPrivateReq: true
    }));
    
    if (error) throw new CustomError(error.message, error.statusCode);
    return { message: data.message, error: false };
  }
}

export default FurnitureItemsService;
