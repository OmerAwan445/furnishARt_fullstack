export const AUTH_URL = process.env.AUTH_URL;

export const authConfig = {
  secret: AUTH_URL!!,
  session: {
    strategy: "jwt" as "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET!!,
    maxAge: 60 * 60 // 1 hour
  },
  pages: {
    signIn: "/login",
  },
  
};
