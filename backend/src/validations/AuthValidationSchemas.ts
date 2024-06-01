import { Schema } from "express-validator";

export const signupSchema:Schema = {
  first_name: {
    notEmpty: true,
    isString: {
      errorMessage: "First name must be a string",
    },
    // matches: {
    //   options: /^[a-zA-Z\s]+$/,
    //   errorMessage: "First name must contain only alphabetic characters",
    // },
    errorMessage: "First name is required",
  },
  last_name: {
    notEmpty: true,
    isString: {
      errorMessage: "Last name must be a string",
    },
    errorMessage: "Last name is required",
  },
  email: {
    isEmail: true,
    errorMessage: "Invalid Email",
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be 8 characters",
    },
  },
};

export const loginSchema: Schema = {
  email: {
    notEmpty: true,
    isEmail: true,
    errorMessage: "Provide a valid email address",
  },
  password: {
    notEmpty: true,
    errorMessage: "Password is required",
  },
};

export const verifyLoginSchema: Schema = {
  authorization: {
    notEmpty: true,
    exists: true,
    contains: {
      options: ["Bearer "],
      errorMessage: "Authorization token must start with 'Bearer '",
    },
    errorMessage: "No authorization token found",
  },
};


export const verifyEmailSchema: Schema = {
  userId: {
    exists: {
      options: { values: "falsy" },
      errorMessage: "User id is required",
    },
    custom: {
      options: (value:any) => {
        if (typeof value !== "number" || value <= 0 || !Number.isInteger(value)) {
          throw new Error("User id must be an integer greater than 0");
        }
        return true;
      },
    },
  },
};

export const verifyEmailTokenSchema: Schema = {
  token: {
    notEmpty: true,
    isString: {
      errorMessage: "Token must be a string",
    },
    errorMessage: "Token is required",
  },
};

export const forgetPasswordSchema: Schema = {
  email: {
    notEmpty: true,
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
};

export const resetPasswordSchema: Schema = {
  token: {
    notEmpty: true,
    isString: {
      errorMessage: "Token must be a string",
    },
    errorMessage: "Token is required",
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be 8 characters",
    },
  },
};
