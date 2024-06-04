/* ========= COOKIES ======= */
export enum CookieKeys {
    UserId = "user_id",
  }
  export type CommonCookieConfig = {
    path?: string
    sameSite?: "Strict"
  }
  
  export type CookieSettings = {
    name: CookieKeys
    httpOnly?: boolean
    expirationTime?: Date
  } & CommonCookieConfig
  