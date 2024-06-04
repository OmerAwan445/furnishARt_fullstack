import { NextRequest, NextResponse } from "next/server";
import { customMiddleware } from "./utils/middleware/customMiddleware";
import nextAuthMiddleware from "./utils/middleware/next-auth-middleware";

export const privatePathname = [ "/checkout", "/cart"];

// Combine both middlewares
export async function middleware(request: NextRequest) {
  // Run your custom middleware logic
  
  const isPrivatePath = privatePathname.includes(request.nextUrl.pathname);
  
  if(isPrivatePath){
    // Run next-auth middleware
    return (nextAuthMiddleware as any)(request);
  }
  else {
    const customResponse = await customMiddleware(request);
    if (customResponse) return customResponse;
  }

}

/* import { withAuth } from "next-auth/middleware"
import { authConfig } from "./utils/auth/auth.config"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log(token);
        return token !==  null
      },
    },
    ...authConfig
  },
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} */
