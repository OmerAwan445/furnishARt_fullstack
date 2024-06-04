import { authConfig } from '@/utils/auth/auth.config';
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function onSuccess(req) {
    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null
    },
    ...authConfig
  }
);