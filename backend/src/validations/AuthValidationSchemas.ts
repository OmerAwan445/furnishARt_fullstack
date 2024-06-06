import { ParamSchema, Schema } from "express-validator";

function requiredStringSchema(field_name: string): ParamSchema {
  return {
    notEmpty: true,
    isString: {
      errorMessage: `${field_name} must be a string`,
    },
    errorMessage: `${field_name} is required`,
  };
}
function requiredEmailSchema(): ParamSchema {
  return {
    notEmpty: true,
    isEmail: true,
    errorMessage: "Provide a valid email address",
  };
}

// matches: {
//   options: /^[a-zA-Z\s]+$/,
//   errorMessage: "First name must contain only alphabetic characters",
// },
export const signupSchema: Schema = {
  first_name: requiredStringSchema("first_name"),
  last_name: requiredStringSchema("last_name"),
  email: requiredEmailSchema(),
  username: requiredStringSchema("username"),
  address: {
    notEmpty: false,
    isString: {
      errorMessage: "address must be a string",
    },
    errorMessage: "address is required",
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be 8 characters",
    },
  },
};

export const loginSchema: Schema = {
  email: requiredEmailSchema(),
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

export const sendVerificationEmailSchema: Schema = {
  customer_id: {
    exists: {
      options: { values: "falsy" },
      errorMessage: "customer_id is required",
    },
    custom: {
      options: (value: any) => {
        if (
          typeof value !== "number" ||
          value <= 0 ||
          !Number.isInteger(value)
        ) {
          throw new Error("customer_id must be an integer greater than 0");
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
