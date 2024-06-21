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

export const getFurnitureFromID: Schema = {
  id: {
    notEmpty: true,
    isInt: {
      errorMessage: "Id must be a number",
    },
    errorMessage: "Id is required",
  },
};
