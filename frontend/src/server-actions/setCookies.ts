"use server";

import { cookies } from "next/headers";

export async function createSecureCookie(CookieName: string, data: any) {
  if (!cookies().has(CookieName) && data ) {
    cookies().set({
      name: CookieName,
      value: data,
      httpOnly: true,
      path: "/",
    });
  }
}
