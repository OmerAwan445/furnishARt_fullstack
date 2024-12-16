import apiInstance from "@/ApiInstance";
import { deleteCookies } from "@/server-actions/deleteCookies";
import { CookieKeys, ResetPassword, SignupFormData } from "@/types/Types";
import { handleApiCall } from "@/utils/apiUtils/handleApiCall";
import { signIn, signOut } from "next-auth/react";
import { BACKEND_API_ENDPOINTS } from "./apiEndpoints/apiEndpoints";
class AuthService {

  static async signUpCustomer(formData: SignupFormData) {
    const { data, error } = await handleApiCall<{ message: string }>(
      async () =>
        await apiInstance.post(BACKEND_API_ENDPOINTS.signupCustomer, formData)
    );
    console.log(data, "data", error, "err");
    if (error) throw error;
    return data;
  }

  static async signinUser(data: { email: string; password: string }) {
    const { email, password } = data;
    const response = await signIn("login", {
      email,
      password,
      redirect: false,
    });
    console.log(response, "response");
    if (response?.ok) {
      return response;
    } else {
      throw new Error(response?.error || "Authentication failed");
    }
  }

  static async signOutUser(callbackUrl?: string) {
    await deleteCookies([CookieKeys.StripeCustomerId, CookieKeys.UserId]);
    let options = {};
    if (callbackUrl) {
      options = { callbackUrl, redirect: false };
    }
    else {
      options = { redirect: false };
    }
  await signOut(options);
  }

  static async sendForgetPassEmail(email: string) {
    const { data, error } = await handleApiCall<{ message: string }>(async ()=> await apiInstance.post(BACKEND_API_ENDPOINTS.forgetPassword, { email }));
    
    if (error) throw error;
    return data;
  }
  
  static async verifyForgetPasswordToken(token: string) {
    const { data, error } = await handleApiCall<{ message: string }>(async ()=> await apiInstance.get(`${BACKEND_API_ENDPOINTS.verifyForgetPasswordToken}?token=${encodeURIComponent(token)}`));
    
    if (error) throw error;
    return data;
  }

  static async resetPassword({ token, password, confirm_password }: ResetPassword) {
    const { data, error } = await handleApiCall<{ message: string }>(async ()=> await apiInstance.post(BACKEND_API_ENDPOINTS.resetPassword, { token, password, confirm_password }));
    
    if (error) throw error;
    return data;
  }

  static async verifyEmail(token: string) {
    return await signIn("verify-email", { token, redirect: false });
  }
}

export default AuthService;
