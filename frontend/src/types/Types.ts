import { ButtonProps } from "@mui/material"
import { ReactNode } from "react"

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


/* ========= PROPS TYPE ======= */
export interface CustomButtonProps extends Partial<ButtonProps> {
  children: ReactNode;
}
