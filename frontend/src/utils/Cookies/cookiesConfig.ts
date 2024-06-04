import { CookieKeys, CookieSettings } from "@/types/Types";
import { getCookieExpirationTimer } from "./getCookieExpirationTimer";


const cookieConfig: Record<CookieKeys, CookieSettings> = {

  [CookieKeys.UserId]:{
    name:CookieKeys.UserId,
    expirationTime:getCookieExpirationTimer( (1 / 24) / 2 ), // 30 minutes
  }

};

export { CookieKeys, cookieConfig };

