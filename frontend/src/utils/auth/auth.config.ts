export const NEXTAUTH_SECRET_KEY = process.env.NEXTAUTH_SECRET_KEY;

export const authConfig = {
  secret: NEXTAUTH_SECRET_KEY!!,
  pages: {
    signIn: "/login",
  },
};
