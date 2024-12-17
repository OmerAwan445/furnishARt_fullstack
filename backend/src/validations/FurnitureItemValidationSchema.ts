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

export const addFurnitureItemSchema: Schema = {
  name: {
    notEmpty: true,
    isString: {
      errorMessage: "Name must be a string",
    },
    errorMessage: "Name is required",
  },
  description: {
    optional: true,
    isString: {
      errorMessage: "Description must be a string",
    },
  },
  price: {
    notEmpty: true,
    custom: {
      options: (value) => value !== 0,
      errorMessage: "Price is required and cannot be 0",
    },
    isFloat: {
      errorMessage: "Price must be a number",
    },
    errorMessage: "Price is required",
  },
  stock_quantity: {
    notEmpty: true,
    custom: {
      options: (value) => value !== 0,
      errorMessage: "Stock quantity is required and cannot be 0",
    },
    isInt: {
      errorMessage: "Stock quantity must be a number",
    },
    errorMessage: "Stock quantity is required",
  },
  category_id: {
    notEmpty: true,
    isInt: {
      errorMessage: "Category ID must be a number",
    },
    custom: {
      options: (value) => value !== 0,
      errorMessage: "Category ID is required",
    },
    errorMessage: "Category ID is required",
  },
  color: {
    optional: true,
    isString: {
      errorMessage: "Color must be a string",
    },
  },
  dimension: {
    optional: true,
    isString: {
      errorMessage: "Dimension must be a string",
    },
  },
  weight: {
    optional: true,
    isFloat: {
      errorMessage: "Weight must be a number",
    },
  },
};
