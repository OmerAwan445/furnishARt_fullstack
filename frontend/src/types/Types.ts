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

export interface CustomToastProps {
  children: ReactNode;
  open: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  type: "success" | "error";
}


// ==== API CALLS ====
export type ApiCall<T> = () => Promise<AxiosResponse<T>>;

interface ApiSuccess<T> {
  data: T;
  error: null;
}

interface ApiError {
  data: null;
  error: CustomError;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;


export interface ResetPassword {
  token: string;
  password: string;
  confirm_password: string;
}

//  API RESPONSES
export interface AutoCompleteResponse {
  name: string
  id: string
}
export interface GetCategoriesResponse {
  id: number
  name: string
}

export interface ItemCardProps {
  id: number
  image: string
  name: string
  rating: number
  price: number
}

export type GetBestSellerResponse = ItemCardProps[]
