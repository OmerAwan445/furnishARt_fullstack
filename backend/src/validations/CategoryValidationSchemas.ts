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

export const deleteCategory: Schema = {
  id: {
    notEmpty: true,
    isInt: {
      errorMessage: "Category Id must be a number",
    },
    errorMessage: "Id is required",
  },
};

export const editCategory: Schema = {
  id: {
    notEmpty: true,
    isInt: {
      errorMessage: "Category Id must be a number",
    },
    errorMessage: "Id is required",
  },
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
