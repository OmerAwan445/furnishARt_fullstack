import { NextAuthOptions } from "next-auth";
import { authConfig } from "./auth.config";
import { BACKEND_API_ENDPOINTS } from "@/services/apiEndpoints/apiEndpoints";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

const API_BASE_URL = process.env.BACKEND_API_URL;
export const authOptions: NextAuthOptions = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Email and Password",
      credentials: {
        email: { },
        password: { },
      },
      authorize: async (credentials, req) => {
        try {
          if (!credentials?.email || !credentials?.password)
            return null;

          const { data } = await axios.post(
            API_BASE_URL!! + BACKEND_API_ENDPOINTS.loginCustomer,
            {
              password: credentials.password,
              email: credentials.email,
            }
          );

          if (data) {
            const user = {
              id: data.data.id,
              username: data.data.username,
              first_name: data.data.first_name,
              last_name: data.data.last_name,
              is_verified: data.data.is_verified ?? false,
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
              "Error in Authentication"
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
          id: user.id as number,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          is_verified: user.is_verified,
          is_admin: user.is_admin,
          email: user.email,
        };
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user.is_verified) {
        return true;
      } else {
        return "/verify-email";
      }
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
