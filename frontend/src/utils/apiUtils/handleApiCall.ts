import { ApiCall, ApiResponse } from "@/types/Types";
import { handleApiError } from "./handleApiError";

export async function handleApiCall<T>(
  apiCall: ApiCall<T>
): Promise<ApiResponse<T>> {
  try {
    const { data } = await apiCall();

    return { data, error: null };
  } catch (error: any) {
    return handleApiError(error);
  }
}
