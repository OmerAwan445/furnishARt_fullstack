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


