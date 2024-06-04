import { NextRequest, NextResponse } from "next/server";
import { MiddlewareRequestChecker } from "./MiddlewareRequestChecker";

export async function customMiddleware(request: NextRequest) {
    function shouldIgnorePath(pathname: string) {
      const ignoredPaths = ["/_next", "_next/static", "_next/image", "/favicon.ico", "/api"];
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