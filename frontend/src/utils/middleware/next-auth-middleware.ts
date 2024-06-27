import { authConfig } from '@/utils/auth/auth.config';
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
  },
  {
    ...authConfig,
    callbacks: {
    authorized: ({ req, token }) => {
      return token != null
    }
    },
  }
);