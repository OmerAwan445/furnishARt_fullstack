import { authOptions } from "@/utils/auth/authOptions";
import NextAuth from "next-auth";

/* 
TODO: 
  GENERATE THE JWT TOKEN AT THIS NEXT SERVER
  ADD THE ADMIN AND USER ROLE INSIDE THE JWT TOKEN AT LOGIN TIME OR EMAIL VERIFICATION TIME
  Check The JWT TOKEN AT NEXT SERVER
*/


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

