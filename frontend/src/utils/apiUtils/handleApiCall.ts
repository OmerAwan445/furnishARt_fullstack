
import { ApiResponse, ApiCall } from "@/types/Types";
import axios from "axios";
import { CustomError } from "../error/CustomError";


export async function handleApiCall<T>(apiCall: ApiCall<T>): Promise<ApiResponse<T>> {
  try {
    const { data } = await apiCall();
    return { data, error: null };
  } catch (error: any) {
    // Generate Custom Error class
    console.error("API call failed:", error);
    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText || 'An error occurred';
        statusCode = error.response.status;
      } else if (error.request) {
        errorMessage = 'No response received from the server';
        statusCode = 504;
      } else {
        errorMessage = error.message;
      }
    } else {
      errorMessage = error.message || 'An unknown error occurred';
    }

    return { data: null, error: new CustomError(errorMessage, statusCode) };
  }
}
