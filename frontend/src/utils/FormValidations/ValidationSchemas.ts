import * as Yup from "yup";

const EmailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const ForgotPasswordFormSchema = Yup.object({
    email: Yup.string().matches(EmailRegex, "Invalid email address").required("Email is required"),
});

export const ResetPasswordFormSchema = Yup.object({
  new_password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});


export const SignupFormSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().matches(EmailRegex, "Invalid email address`").required("Email is required"),
  address: Yup.string().required("Address is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
  .oneOf([Yup.ref('password'), ''], "Passwords must match")
  .required("Confirm Password is required"),
});

export const LoginFormSchema = Yup.object({
  email: Yup.string().matches(EmailRegex, "Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});



export const AddFurnitureItemFormSchema = Yup.object({
    name: Yup.string().required("Title is required"),
    price: Yup.string()
    .required("Price is required")
    .test("is-numeric", "Price must be a number without units (e.g., '49.99')", (value) => {
      if (!value) return false; // Ensure value exists
      return !isNaN(Number(value)) && /^\d+(\.\d+)?$/.test(value); // Allow only numbers and decimals
    }),
    stock_quantity: Yup.number()
      .required("Stock quantity is required")
      .integer("Must be an integer")
      .min(0),
    category_id: Yup.number().required("Category ID is required").integer(),
    dimension: Yup.string(),
    description: Yup.string(),
    color: Yup.string(),
    weight: Yup.string()
    .required("Weight is required")
    .test("is-numeric", "Weight must be a number without units (e.g., '12.2')", (value) => {
      if (!value) return false; // Ensure value exists
      return !isNaN(Number(value)) && /^\d+(\.\d+)?$/.test(value); // Allow only numbers and decimals
    }),
  });

 export const AddCategoryFormSchema = Yup.object({
    name: Yup.string()
      .required("Category name is required")
      .max(100, "Category name cannot exceed 100 characters")
      .matches(
        /^[a-zA-Z0-9 ]+$/,
        "Category name must only contain letters, numbers, and spaces"
      ),
  });


