import { makeSchemaOptional } from "@src/utils/common/makeSchemaOptional";
import { Schema } from "express-validator";

export const RegisterRestaurantSchema: Schema = {
  name: {
    notEmpty: true,
    isString: {
      errorMessage: "name must be a string",
    },
    // matches: {
    //   options: /^[a-zA-Z\s]+$/,
    //   errorMessage: "name must contain only alphabetic characters",
    // },
  },
  location: {
    notEmpty: true,
    isString: {
      errorMessage: "location must be a string",
    },
  },
  priceRange: {
    notEmpty: true,
    isFloat: {
      errorMessage: "priceRange must be number",
    },
  },
};

export const updateRestaurantSchema: Schema = makeSchemaOptional(RegisterRestaurantSchema, (key:string)=> (
  {
    exists: {
      options: { values: "falsy" },
      errorMessage: `${key} must contain a valid value`,
    },
  }
));

export const updateRestaurantReqParamsSchema: Schema = {
  restaurantId: {
    notEmpty: true,
    custom: {
      options: (value: string) => {
        const parsedValue = parseInt(value, 10);
        if (
          isNaN(parsedValue) ||
          parsedValue <= 0 ||
          !Number.isInteger(parsedValue)
        ) {
          throw new Error("restaurantId must be an integer greater than 0");
        }
        return true;
      },
    },
    errorMessage: "restaurantId is required in params",
  },
};


export const createRatingSchema: Schema = {
  rating: {
    notEmpty: true,
    isFloat: {
      options: { min: 1, max: 5 },
      errorMessage: "Rating must be between 1 and 5",
    },
    errorMessage: "rating is required",
  },
  review: {
    notEmpty: true,
    isString: {
      errorMessage: "Review must be a string",
    },
    errorMessage: "review is required",
  },
};

export const createRatingSchemaParams: Schema = updateRestaurantReqParamsSchema;
