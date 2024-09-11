import { Schema } from "express-validator";

export const addCartItem: Schema = {
  productId: {
    notEmpty: true,
    isInt: {
      errorMessage: "Product Id must be a number",
    },
    errorMessage: "Product Id is required",
  },
  quantity: {
    notEmpty: true,
    isInt: {
      errorMessage: "Quantity must be a number",
    },
    errorMessage: "Quantity is required",
  },
};

export const deleteCartItem: Schema = {
  productId: {
    notEmpty: true,
    isInt: {
      errorMessage: "Product Id must be a number",
    },
    errorMessage: "Product Id is required",
  },
};
