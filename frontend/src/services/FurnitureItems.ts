import apiInstance from "@/ApiInstance";
import { handleApiCall } from "@/utils/apiUtils/handleApiCall";
import { BACKEND_API_ENDPOINTS } from "./apiEndpoints/apiEndpoints";
import { AutoCompleteResponse } from "@/types/Types";


class FurnitureItemsService {
    private static BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    static async fetchSuggestions({searchTerm, category_id }: {searchTerm: string, category_id: number } ) {
        const { data, error } = await handleApiCall<{data: AutoCompleteResponse[]}>(async ()=> await apiInstance.get(`${BACKEND_API_ENDPOINTS.autocompleteFurnitureItems}?q=${searchTerm}${category_id !== 0 ? `&cid=${category_id}`: "" }`));
    
        if (error) throw error;
        return data.data;
    }
}

export default FurnitureItemsService;
