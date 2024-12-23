import { CustomError } from "@/utils/error/CustomError";
import { ButtonProps, TypographyProps } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ReactNode } from "react";

/* ========= COOKIES ======= */
export enum CookieKeys {
  UserId = "user_id",
  StripeCustomerId = "stripe_customer_id",
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
  type: "success" | "error" | "info";
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

export interface EditFurnitureItemFormData {
  id: number
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  color: string;
  dimension: string;
  weight: number;
  category_id: number;
};

export interface HorizontaltemCardWithLensEffectProps {
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
export interface CartItemsListProps {
  cartItems: CartItem[];
  handlerCartItems: (event: React.MouseEvent<HTMLDivElement>) => void;
  isCheckoutCartItems?: boolean;
}

export interface PaymentMethodCardProps{
  checkedCardId:string
  setCheckedCardId:React.Dispatch<string>
  cardDetails: PaymentMethods
}

/* ========= API CALLS ======== */
export type ApiCall<T> = () => Promise<AxiosResponse<T>>;
// Modify the ApiCall type to accept AxiosRequestConfig (or similar)

export type AuthApiCall<T> = (config?: AxiosRequestConfig) => Promise<{ data: T }>;
export type AuthFetchApiCall<T> = (config?: RequestInit) => Promise<{ data: T }>;



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

/*  API REQUEST */
export interface AddFurnitureItemRequest {
  name: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  dimension?: string;
  description?: string;
  color?: string;
  weight?: number;
}
export interface EditFurnitureItemRequest {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  dimension?: string;
  description?: string;
  color?: string;
  weight?: number;
}

export interface UploadMediaReq {
  files: any, 
  itemId: number, 
  mediaType: "image" | "model"
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

export interface OrderItem {
  id: number;
  quantity: number;
  furniture_item_id: number;
  order_id: number;
  furniture_item: {
    name: string;
    price: string;
    image_urls: string[];
  };
}

export interface Order {
  id: number;
  order_status: string;
  total_amount: string;
  customer_id: number;
  created_at: string;
  updated_at: string;
  orderItems: OrderItem[];
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

export interface PaymentMethods {
  id: string
  brand: string
  exp_year: number
  name: string
  last4: string
}
