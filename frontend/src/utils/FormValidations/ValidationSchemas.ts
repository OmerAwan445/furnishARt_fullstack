import * as Yup from "yup";

const EmailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const ForgotPasswordFormSchema = Yup.object({
    email: Yup.string().matches(EmailRegex, "Invalid email address").required("Email is required"),
});


export const ForgotPasswordVerifyFormSchema = Yup.object({
    code: Yup.number()
        .integer("Verification code must be numbers")
        .required("Verification code is required"),
});

export const SetNewPasswordFormSchema = Yup.object({
  new_password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});


export const SignupFormSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  surname: Yup.string().required("SurName is required"),
  email: Yup.string().matches(EmailRegex, "Invalid email address`").required("Email is required"),
  phone_number: Yup.string().required("Phone Number is required"),
  country_id: Yup.string().required("Country ID is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
  .oneOf([Yup.ref('password'), ''], "Passwords must match")
  .required("Confirm Password is required"),
});

export const LoginFormSchema = Yup.object({
  username_or_email: Yup.string().required("Username or email is required"),
  password: Yup.string().required("Password is required"),
});


