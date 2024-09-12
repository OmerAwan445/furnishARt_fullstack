import { ApiResponse, AuthApiCall, AuthFetchApiCall } from "@/types/Types";
import { getSessionServerSide } from "@/utils/auth/getSessionServerSide";
import axios, { AxiosRequestConfig } from "axios";
import { CustomError } from "../error/CustomError";
import { getSession } from "next-auth/react";
import { handleApiError } from "./handleApiError";

export async function authorizedApiCall<T>(
  apiCall: AuthApiCall<T>
): Promise<ApiResponse<T>> {
  try {
    let session = null;
    if (typeof window == "undefined") {
      // Get session and access token Server Side
      session = await getSessionServerSide();
    } else {
      // Get session and access token Client Side
      session = await getSession();
    }

    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new CustomError("Unauthorized: No access token found", 401);
    }

    // Prepare the config with Authorization header
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // Make the API call with the config
    const { data } = await apiCall(config);

    return { data, error: null };
  } catch (error: any) {
    return handleApiError(error);
  }
}


/* export async function authorizedFetchApiCall<T>(
  apiCall: AuthFetchApiCall<T>
): Promise<ApiResponse<T>> {
  try {
    let session = null;
    if (typeof window == "undefined") {
      // Get session and access token Server Side
      session = await getSessionServerSide();
    } else {
      // Get session and access token Client Side
      session = await getSession();
    }

    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new CustomError("Unauthorized: No access token found", 401);
    }

    // Prepare the config with Authorization header
    const config: RequestInit = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    // Make the API call with the config
    const { data } = await apiCall(config);

    return { data, error: null };
  } catch (error: any) {
    return handleApiError(error);
  }
} */
