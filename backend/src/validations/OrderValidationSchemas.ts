import { Schema } from "express-validator";

export const updateOrderStatusSchema: Schema = {
  order_id: {
    notEmpty: true,
    isInt: {
      errorMessage: "Order Id must be a number",
    },
    errorMessage: "Order Id is required",
  },
  status: {
    notEmpty: true,
    isString: {
      errorMessage: "Status must be a string",
    },
    errorMessage: "Status is required",
  },
};
