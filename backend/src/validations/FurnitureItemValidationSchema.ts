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
export const getFurnitureItems: Schema = {
  itemsPerPage: {
    optional: true,
    isInt: {
      errorMessage: "itemsPerPage must be a number",
    },
  },
  page: {
    optional: true,
    isInt: {
      errorMessage: "page must be a number",
    },
  },
  category_id: {
    optional: true,
    // isInt: {
    //   errorMessage: "category_id must be a number",
    // },
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
