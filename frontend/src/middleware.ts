import authMiddleware from "@/utils/middleware/next-auth-middleware";
import { NextRequest, NextResponse } from "next/server";
import { MiddlewareRequestChecker } from "./utils/middleware/MiddlewareRequestChecker";

export const privatePathname = ["/checkout", "/cart"];


// custom middleware will not run on any of the above public page
async function customMiddleware(request: NextRequest) {
  function shouldIgnorePath(pathname: string) {
    const ignoredPaths = ["/_next", "/favicon.ico", "/api"];
    return ignoredPaths.some((path) => pathname.startsWith(path));
  }

  const pathname = request.nextUrl.pathname;

  // Check if the path should be ignored
  if (shouldIgnorePath(pathname)) {
    return NextResponse.next();
  }

  const checks = new MiddlewareRequestChecker(request);
  return checks.authChecker();
}


// Combine both middlewares
export async function middleware(request: NextRequest) {
  // Run your custom middleware logic
  const customResponse = await customMiddleware(request);
  if (customResponse) return customResponse;

  const isPrivatePath = privatePathname.includes(request.nextUrl.pathname);

  if(isPrivatePath){
    // Run next-auth middleware
    return (authMiddleware as any)(request);
  }
  else {
    return NextResponse.next();
  }

}