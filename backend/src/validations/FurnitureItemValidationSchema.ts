import { Schema } from "express-validator";

export const autoCompleteFurnitureItems: Schema = {
  q: {
    notEmpty: true,
    isString: {
      errorMessage: "Search Term must be a string",
    },
    errorMessage: "Search Term is required",
  },
};
