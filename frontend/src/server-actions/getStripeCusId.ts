"use server";

import StripeSvs from "@/services/Stripe";
import { CookieKeys } from "@/types/Types";
import { cookies } from "next/headers";
import { createSecureCookie } from "./setCookies";

export async function getStripeCusId() {
  let stripe_cus_id = cookies().get(CookieKeys.StripeCustomerId)?.value;
    if(stripe_cus_id) return stripe_cus_id;
    
    stripe_cus_id = await StripeSvs.fetchStripeCusAccId();
    await createSecureCookie(CookieKeys.StripeCustomerId, stripe_cus_id);
    return stripe_cus_id;
}
