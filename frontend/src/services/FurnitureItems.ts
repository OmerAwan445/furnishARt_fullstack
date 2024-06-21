import apiInstance from "@/ApiInstance";
import { handleApiCall } from "@/utils/apiUtils/handleApiCall";
import { BACKEND_API_ENDPOINTS } from "./apiEndpoints/apiEndpoints";
import { AutoCompleteResponse, FurnitureItemDetailsResponse, GetBestSellerResponse } from "@/types/Types";
import axios from "axios";


class FurnitureItemsService {
    private static BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    static async fetchSuggestions({searchTerm, category_id }: {searchTerm: string, category_id: number } ) {
        const { data, error } = await handleApiCall<{data: AutoCompleteResponse[]}>(async ()=> await apiInstance.get(`${BACKEND_API_ENDPOINTS.autocompleteFurnitureItems}?q=${searchTerm}${category_id !== 0 ? `&cid=${category_id}`: "" }`));
    
        if (error) return null;
        return data.data;
    }

    static async getBestSellers() {
        const { data, error } = await handleApiCall<{ data: GetBestSellerResponse }>(async ()=> await axios.get(`${this.BASE_URL}${BACKEND_API_ENDPOINTS.getBestSellerFurnitureItems}`));
    
        if (error) return null;
        return data.data;
    }
    static async fetchFurnitureItemFromID(id: number) {
        const { data, error } = await handleApiCall<{data: FurnitureItemDetailsResponse}>(async ()=> await apiInstance.get(`${BACKEND_API_ENDPOINTS.getFurnitureItemFromID}/${id}`));
    
        if (error) return null;
        return data.data;
    }
}

export default FurnitureItemsService;
