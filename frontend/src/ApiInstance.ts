import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";
import AuthService from "./services/Auth";
import { getSessionServerSide } from "./utils/auth/getSessionServerSide";


// Api Instance
const apiInstance: AxiosInstance = axios.create({
  baseURL:
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_BACKEND_API_URL ??
    "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token with wvery request.
apiInstance.interceptors.request.use(
  async (req) => {
    const controller = new AbortController();
    req.signal = controller.signal; // Attach the AbortController's signal to the request

    if (!req.isPrivateReq) return req;

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
      controller.abort(); // cancel the request
      await AuthService.signOutUser();
      if (typeof window !== "undefined")
        window.location.href = "/login?callbackUrl=" + window.location.pathname;
    
    // Cancel the request and throw a cancellation error
    throw new axios.Cancel("Login required");
    }

    // Prepare the config with Authorization header
    req.headers.Authorization = `Bearer ${accessToken}`;

    return req;
  }
);

// TOCHECK: If the error is 401 on server side request, sign out the user
// check if the backend error is 401 and redirect to login page.
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status !== 401) return Promise.reject(error); // Pass the error to be handled by the calling function
    
    if (typeof window !== "undefined") {
      // CLIENT SIDE
      await AuthService.signOutUser();
      window.location.href = "/login?callbackUrl=" + window.location.pathname;
    } else {
      console.log("Logging out user on server side");
      // SERVER SIDE
      // manually delete cookies and redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
