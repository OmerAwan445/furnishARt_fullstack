"use server";

import { cookies } from "next/headers";

export async function deleteCookies(cookiesName: string[]) {
    cookiesName.forEach(name => {
        cookies().delete(name);
    })
}