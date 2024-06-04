import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_URL } from "@/utils/auth/auth.config";

type ResponseType = NextResponse | null;

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
    if (this.pathname === "/login") {
// TODO: Add the logic to check if the user is logged in
      const token = await getToken({
        req: this.request,
        secret: AUTH_URL,
      });
      if (token) {
        return NextResponse.redirect(this.homePageRedirectionUrl);
      }
    }

    return null;
  };
}
