import { BACKEND_API_ENDPOINTS } from "@/services/apiEndpoints/apiEndpoints";
import { authConfig } from "@/utils/auth/auth.config";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/* 
TODO: 
  GENERATE THE JWT TOKEN AT THIS NEXT SERVER
  ADD THE ADMIN AND USER ROLE INSIDE THE JWT TOKEN AT LOGIN TIME OR EMAIL VERIFICATION TIME
  Check The JWT TOKEN AT NEXT SERVER
*/

const API_BASE_URL = process.env.BACKEND_API_URL;

console.log(authConfig, "authConfig");
const handler = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Email and Password",
      credentials: {
        username_or_email: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
    authorize: async (credentials, req) => {
        try {
          if (!credentials?.username_or_email || !credentials?.password)
            return null;

          const { data } = await axios.post(
            API_BASE_URL!! + BACKEND_API_ENDPOINTS.loginUser,
            {
              password: credentials.password,
              username_or_email: credentials.username_or_email,
            }
          );

          if (data) {
            const user = {
              id: data.data.id,
              username: data.data.username,
              first_name: data.data.first_name,
              last_name: data.data.last_name,
              is_email_verified: data.data.is_email_verified ?? false,
              is_admin: data.data.is_admin ?? false,
              email: data.data.email,
            };
            return user;
          }

          return null;
        } catch (err: any) {
          // if account is not acctivated
          // if (err.response && err.response.status === 403 && err.response.data && err.response.data.user_id) {
          //   cookies().set(CookieKeys.UserId, err.response.data.user_id,{expires:cookieConfig[CookieKeys.UserId].expirationTime});
          // }
          throw new Error(
            err.response?.data?.message ||
              err.message ||
              "Authentication failed"
          );
        }
      },
    }),
    /* CredentialsProvider({
          id: "verify-email",
          credentials: {
            token: {},
          },
          async authorize(credentials) {
            try {
              console.log('called Signup' , credentials?.token);
              return {
                id: '1',
                accessToken: credentials?.token ?? 'asdasd',
                refreshToken: 'asdasd',
                accessTokenExpires: getAccessTokenExpTime(),
              }

            } catch (error:any) {
              throw new Error(error.message);
            }
          },
        }), */
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          is_email_verified: user.is_email_verified,
          is_admin: user.is_admin,
          email: user.email,
        };
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user.is_email_verified) {
        return true;
      } else {
        return '/auth/verify-email'; // Redirect to email verification page
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
          first_name: token.first_name,
          last_name: token.last_name,
          is_email_verified: token.is_email_verified,
          is_admin: token.is_admin,
          email: token.email,
        };
      }
      return session;
    },
  }, 
  session: {
    strategy: "jwt" as "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET!!,
    maxAge: 60 * 60 // 1 hour
  },
});

export { handler as GET, handler as POST };

