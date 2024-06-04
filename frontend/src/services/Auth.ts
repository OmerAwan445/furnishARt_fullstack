import { signIn } from "next-auth/react";

const SigninUser = async (data: { username_or_email: string; password: string })=> {
    const { username_or_email, password } = data;
      const response = await signIn('login', {
        username_or_email,
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

export { SigninUser };
