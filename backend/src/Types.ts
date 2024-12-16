import { Decimal, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request } from "express";

// ======= Global types ==========
declare module "jsonwebtoken" {
    export interface JwtPayload {
        user: JwtUser;
    }
}

// eslint-disable-next-line
declare global {
    // eslint-disable-next-line
    namespace Express {
        interface Request {
        user?: JwtUser; // Define the user property with the appropriate type
  }
}
}

// Define an extended request interface with the user property
export interface AuthenticatedRequest extends Request {
    user: JwtUser;
}

export interface CustomError extends Error {
    statusCode: number;
}
export interface ExtendedPrismaClientKnownRequestError extends PrismaClientKnownRequestError {
    statusCode?: number;
  }

export interface JwtUser {
    id: number
    email: string;
    name: string;
    username: string
    role: "ADMIN" | "USER";
}


// Request Body Interfaces
export interface SignupRequestBody {
    first_name: string
    last_name: string
    email: string
    address?: string
    username: string
    password: string;
    confirm_password: string;
}
export interface LoginRequestBody {
    email: string
    password: string;
}

export interface ResetPasswordRequestBody {
    token: string;
    password: string;
    confirm_password: string;
}

export interface GetFurnitureItemsFiltersReqQuery {
    category_id?: string
    itemsPerPage?: string
    page?: string
}
export interface GetFurnitureItemsFilters {
    category_id?: number[]
    itemsPerPage?: number
    page?: number
}

export interface FurnitureItemModelFilters {
    whereClause: {
        category_id?: {
            in: number[]
        };
    };
    orderBy: {
        createdAt: "desc" | "asc";
    };
    take: number;
    skip: number;
}

export interface VerificationEmailResponse {
    token?: string
    msg: string;
    error: boolean;
    statusCode: number;
  }

export interface EncryptedDataInToken {
    customer_id: number;
}

export interface AddCartItemRequestBody {
    productId: number;
    quantity: number;
}

export interface SavePaymentMethodRequestBody {
    pm_id: string
    stripe_cus_id: string
}
export interface PayCartRequestBody {
    pm_id: string
    stripe_cus_id: string
    is_pm_save?: boolean
}


export interface CartWithItems{
    id: number;
    price: Decimal;
    cartItems: {
        id: number;
        quantity: number;
        furniture_item_id: number;
        cart_id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]
}

