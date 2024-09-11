import { CustomError } from "@/utils/error/CustomError"
import { ButtonProps, TypographyProps } from "@mui/material"
import { AxiosResponse } from "axios"
import { ReactNode } from "react"
import { AxiosRequestConfig } from 'axios';

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
export interface CustomHeadingProps extends Partial<TypographyProps> {
  children: ReactNode;
}

export interface CustomToastProps {
  children: ReactNode;
  open: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  type: "success" | "error";
}

export interface ItemCardProps {
  id: number
  image: string
  name: string
  rating: number
  price: number
}

export interface FurnitureItemDetailsProps {
  id: number;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  model_3d_url: string | null;
  image_urls: string[];
  total_sales: number;
  color: string;
  dimension: string;
  weight: string;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
};


export interface HorizontalItemCardProps {
  item: CartItem;
  hoveringItemId: number | null;
  mousePosition: { x: number; y: number };
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>, itemId: number) => void;
  setHoveringItemId: (id: number | null) => void;
  lensSize: number;
  zoomFactor: number;
}
export interface CartItemsSummeryProps {
  total: number
} 


/* ========= API CALLS ======== */
export type ApiCall<T> = () => Promise<AxiosResponse<T>>;
// Modify the ApiCall type to accept AxiosRequestConfig (or similar)

export type AuthApiCall<T> = (config?: AxiosRequestConfig) => Promise<{ data: T }>;


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

/*  API RESPONSES */
export interface AutoCompleteResponse {
  name: string
  id: string
}
export interface GetCategoriesResponse {
  id: number
  name: string
}

export interface GetCartDetailsResponse {  
    cart_id:  number;
    cart_total_price:  number;
    cartItems: CartItem[];
  }
export interface CartItem {
    id:         number;
    quantity:   number;
    name:       string;
    price:      number;
    thumbnail_image: string;
}



export interface Review {
  id: number;
  rating: number;
  comment: string;
  customer: {
      id: number;
      first_name: string;
      last_name: string;
      username: string;
  };
};


export interface TabData {
  label: string;
  component: React.ReactNode;
}

export interface SimpleTabsProps {
  tabs: TabData[];
}

export interface CustomTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface ReturnFurnitureItems {
  id: number;
  name: string;
  price: number;
  image_urls: string[];
  reviews: {
      rating: number;
  }[];
}

export type FurnitureItemDetailsResponse = FurnitureItemDetailsProps;


export type GetBestSellerResponse = ItemCardProps[];
export type GetFurnitureItems = ItemCardProps[];

/* ======= REDUX ======= */
export type CategoryInfo = {
  label: string;
  value: number;
}

export interface FiltersSliceState {
  category_ids?: number[]
  itemsPerPage: number
  page: number
}

export interface SnackBarSliceState {  
  open:  boolean;
  type: SnackBarType | null
  message: string
}
export type SnackBarType = "success" | "error"


