import { Schema } from "express-validator";

export const SavePaymentMethodSchema: Schema = {
  pm_id: {
    notEmpty: true,
    isString: {
      errorMessage: "Payment Id must be a string",
    },
    errorMessage: "Payment Id is required",
  },
  stripe_cus_id: {
    notEmpty: true,
    isString: {
      errorMessage: "Stripe customer Id must be a string",
    },
    errorMessage: "Stripe customer Id is required",
  },
};

export const PayCartSchema: Schema = {
  pm_id: {
    notEmpty: true,
    isString: {
      errorMessage: "Payment Id must be a string",
    },
    errorMessage: "Payment Id is required",
  },
  stripe_cus_id: {
    notEmpty: true,
    isString: {
      errorMessage: "Stripe customer Id must be a string",
    },
    errorMessage: "Stripe customer Id is required",
  },
  is_pm_save: {
    optional: true,
    isBoolean: {
      errorMessage: "is_pm_save must be a boolean",
    },
  },
};
