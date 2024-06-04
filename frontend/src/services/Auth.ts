import apiInstance from "@/ApiInstance";
import { SignupFormData } from "@/types/Types";
import { signIn, signOut } from "next-auth/react";
import { BACKEND_API_ENDPOINTS } from "./apiEndpoints/apiEndpoints";
import { handleApiCall } from "@/utils/apiUtils/handleApiCall";
class AuthService {

static async signUpCustomer(formData: SignupFormData) {
  const { data, error} =  await handleApiCall(async ()=> await apiInstance.post(BACKEND_API_ENDPOINTS.signupCustomer, formData));
  console.log(data, "data", error, "err");
  if (error) {
    throw new Error(error.message); //make custom error class
  }
  return data;
}


static async signinUser (data: { email: string; password: string }) {
    const { email, password } = data;
      const response = await signIn('login', {
        email,
        password,
        redirect: false,
      });
      // const user_id = Cookies.get(CookieKeys.UserId)
    //   if(response?.status === 401 && user_id ){ // if account is not activated
        // if(response?.status === 403 && user_id ){ // if account is not activated
        // return response.status;
    //     return 403;
    //   }
      console.log(response, "====response===");
      if (response?.ok) {
        return response;
      }
      else {
        throw new Error(response?.error || "Authentication failed");
      }
};

static async signOutUser() {
  signOut();
}


}

export default AuthService;