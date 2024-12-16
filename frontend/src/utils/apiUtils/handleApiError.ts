import axios from "axios";
import { CustomError } from "../error/CustomError";

export function handleApiError(error: any): { data: null, error: CustomError } {
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.statusText ||
          "An error occurred";
        statusCode = error.response.status;
      } else if (error.request) {
        errorMessage = "No response received from the server";
        statusCode = 504;
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof CustomError) {
      errorMessage = error.message;
      statusCode = error.statusCode;
    }
     else {
      errorMessage = error.message || "An unknown error occurred";
    }
    return { data: null, error: new CustomError(errorMessage, error.statusCode) };
  }