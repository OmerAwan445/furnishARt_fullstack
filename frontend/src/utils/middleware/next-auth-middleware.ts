import { authConfig } from '@/utils/auth/auth.config';
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // console.log(req.nextauth.token, "Auth Middleware")
  },
  {
    ...authConfig,
    callbacks: {
    authorized: ({ req, token }) => {
      console.log(token, "Token");
      return token != null
    }
    },
  }
);