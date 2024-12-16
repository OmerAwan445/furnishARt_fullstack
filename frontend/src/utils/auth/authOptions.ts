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
          console.log(credentials?.email, credentials?.password, "credentials");
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
              role: data.data.role ?? "USER",
              email: data.data.email,
              accessToken: data.data.accessToken,
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
    CredentialsProvider({
            id: "verify-email",
            credentials: {
              token: {},
            },
            async authorize(credentials, req) {
              try {
              if (!credentials) return null;
              console.log(credentials.token, API_BASE_URL, "credentials.token");

              const { data } = await axios.get(`${API_BASE_URL!!}${BACKEND_API_ENDPOINTS.verifyEmail}?token=${encodeURIComponent(credentials.token)}`);
              if (data) {
                const user = {
                  id: data.data.id,
                  username: data.data.username,
                  first_name: data.data.first_name,
                  last_name: data.data.last_name,
                  is_verified: data.data.is_verified ?? false,
                  role: data.data.role ?? "USER",
                  email: data.data.email,
                  accessToken: data.data.accessToken,
                };
                return user;
              }
              
              return null;
              } catch (error:any) {
                console.error(error, "error");
                throw new Error(
                  error.response?.data?.message ||
                  error.message ||
                    "Error in verification"
                );
              }
            },
          }),
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
          role: user.role,
          email: user.email,
        };
        token.accessToken = user.accessToken;
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
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
