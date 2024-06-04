"use client";

import { SignupFormSchema } from "@/utils/FormValidations/ValidationSchemas";
import { Formik } from "formik";
import { useState } from "react";
import { ErrorMessageToast } from "../common/ErrorMessageToast";
import { MyPasswordInput } from "../common/FormFields/MyPasswordInput";
import { MyTextInput } from "../common/FormFields/MyTextInput";
import GradientButton from "../common/buttons/GradientButton";

const SignupForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    address: "",
    password: "",
    confirm_password: "",
  };

  async function handlerSubmit(values: typeof initialValues) {
    alert(JSON.stringify(values, null, 2));
    // actions.setSubmitting(false);
    
  }

  return (
    <Formik
      onSubmit={handlerSubmit}
      validationSchema={SignupFormSchema}
      initialValues={initialValues}
    >
      {({ errors, touched, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="mt-10">
          <ErrorMessageToast
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MyTextInput
                className={`${
                  touched.first_name && errors.first_name
                    ? "border-2 border-red-600 focus:border-red-600 focus:ring-0"
                    : "caret-gray-900 border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                } text-input block w-full px-4 py-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all outline-none duration-200 border rounded-xl bg-gray-50 focus:bg-white font-pj`}
                name="first_name"
                type="text"
                placeholder="First Name"
              />

              <MyTextInput
                className={`${
                  touched.last_name && errors.last_name
                    ? "border-2 border-red-600 focus:border-red-600 focus:ring-0"
                    : "caret-gray-900 border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                } text-input block w-full px-4 py-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border rounded-xl bg-gray-50 outline-none focus:bg-white font-pj`}
                name="last_name"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MyTextInput
                className={`${
                  touched.username && errors.username
                    ? "border-2 border-red-600 focus:border-red-600 focus:ring-0"
                    : "caret-gray-900 border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                } text-input block w-full px-4 py-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border rounded-xl bg-gray-50 outline-none focus:bg-white font-pj`}
                name="username"
                type="text"
                placeholder="Username"
              />

              <MyTextInput
                className={`${
                  touched.email && errors.email
                    ? "border-2 border-red-600 focus:border-red-600 focus:ring-0"
                    : "border-gray-300 focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                } text-gray-900 block w-full px-4 py-4 overflow-hidden text-base font-normal placeholder-gray-600 transition-all duration-200 border rounded-xl bg-gray-50 outline-none focus:bg-white font-pj`}
                name="email"
                type="email"
                placeholder="Email address"
                autoComplete="email"
              />
            </div>

            <MyTextInput
              className={`${
                touched.address && errors.address
                  ? "border-2 border-red-600 focus:border-red-600 focus:ring-0"
                  : "caret-gray-900 border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              } text-input block w-full px-4 py-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border rounded-xl bg-gray-50 outline-none focus:bg-white font-pj`}
              name="address"
              type="text"
              placeholder="Address"
            />

            <MyPasswordInput
              name="password"
              placeholder="Password"
              className={`${
                touched.password && errors.password
                  ? "border-2 border-red-600 focus:border-red-600 focus:ring-0"
                  : "border-gray-300 focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
              } block w-full px-4 py-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border rounded-xl bg-gray-50 outline-none focus:bg-white font-pj`}
            />

            <MyPasswordInput
              name="confirm_password"
              placeholder="Confirm Password"
              className={`${
                touched.confirm_password && errors.confirm_password
                  ? "border-2 border-red-600 focus:border-red-600 focus:ring-0"
                  : "border-gray-300 focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
              } block w-full px-4 py-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border rounded-xl bg-gray-50 outline-none focus:bg-white font-pj"`}
            />
          </div>

          <div className="mx-auto mt-8 sm:max-w-lg md:max-w-md xl:w-full xl:max-w-md">
            <GradientButton onClick={() => {}} disabled={false}>
              Signup now
            </GradientButton>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SignupForm;
