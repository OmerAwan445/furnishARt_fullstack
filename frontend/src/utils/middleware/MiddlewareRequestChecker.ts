import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { NEXTAUTH_SECRET_KEY } from "@/utils/auth/auth.config";

type ResponseType = NextResponse | null;

const authpages = ["/login", "/signup", "/verify-email", "/forget-password", "/reset-password"];

export class MiddlewareRequestChecker {
  private request: NextRequest;
  private pathname: string;
  private homePageRedirectionUrl: URL;

  constructor(request: NextRequest) {
    this.request = request;
    this.pathname = request.nextUrl.pathname;
    this.homePageRedirectionUrl = new URL("/", this.request.url);
  }

  authChecker = async (): Promise<ResponseType> => {

    // if the user is logged in and tries to access auth page
    if (authpages.includes(this.pathname)) {
      const isAuthenticated = await getToken({
        req: this.request,
        secret: NEXTAUTH_SECRET_KEY,
      });
      if (isAuthenticated) {
        return NextResponse.redirect(this.homePageRedirectionUrl);
      }
    }

    return null;
  };
}
