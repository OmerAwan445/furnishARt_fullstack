import { Schema } from "express-validator";

export const addCategory: Schema = {
  name: {
    notEmpty: true,
    isString: {
      errorMessage: "Category name must be a number",
    },
    matches: {
      options: /^[a-zA-Z\s]+$/,
      errorMessage: "Category name must contain only alphabetic characters",
    },
    errorMessage: "name is required",
  },
};
