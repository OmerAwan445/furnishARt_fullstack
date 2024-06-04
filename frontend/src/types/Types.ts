import { CustomError } from "@/utils/error/CustomError"
import { ButtonProps } from "@mui/material"
import { AxiosResponse } from "axios"
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

/* ========= FORMS ======= */
export interface SignupFormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  address: string;
  password: string;
  confirm_password: string;
}

/* ========= PROPS TYPE ======= */
export interface CustomButtonProps extends Partial<ButtonProps> {
  children: ReactNode;
}

export interface SuccessMessageToastProps {
  children: ReactNode;
  open: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}


// ==== APi CALLS ====
export type ApiCall<T> = () => Promise<AxiosResponse<T>>;

export interface ApiResponse<T> {
  data: T | null;
  error: CustomError | null;
}
