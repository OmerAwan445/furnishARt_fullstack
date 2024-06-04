"use client";

import { ForgotPasswordFormSchema } from "@/utils/FormValidations/ValidationSchemas";
import { Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useState } from "react";
import { ErrorMessageToast } from "../common/toasts/ErrorMessageToast";
import { MyTextInput } from "../common/FormFields/MyTextInput";
import SubmitBtn from "../common/FormFields/SubmitBtn";

{
}
const ForgetPasswordForm = () => {
  const initialValues = {
    email: "",
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handlerLogin = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {};

  return (
    <>
      <div className="w-full  rounded-md lg:rounded-none bg-login-bg-color md:bg-whitepx-8 md:px-10 xl:px-16 py-4 lg:py-6">
        <div className="text-center">
          <h4 className="2xl:text-4xl xl:text-3xl lg:text-2xl text-2xl font-semibold xl:mt-5 lg:mt-5 mb-7 pb-1 ">
            Forget Password
          </h4>
          <h4 className="text-xs sm:text-sm font-normal lg:mt-2 mb-16 pb-1 ">
            Enter your email address associated with your account we will send
            you a link to reset your password
          </h4>
        </div>

        <Formik
          onSubmit={handlerLogin}
          validationSchema={ForgotPasswordFormSchema}
          initialValues={initialValues}
        >
          {({ errors, touched, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-5 mt-4 lg:mt-8">
              <ErrorMessageToast
                setErrorMessage={setErrorMessage}
                errorMessage={errorMessage}
              />
              <div className="mb-4 relative">
                <MyTextInput
                  className={`${
                    touched.email && errors.email
                      ? "border-2 border-red-600 focus:border-red-600 focus:ring-0"
                      : "border-gray-300 focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                  } text-gray-900 block w-full px-4 py-4 overflow-hidden text-base font-normal placeholder-gray-600 transition-all duration-200 border rounded-xl bg-gray-50 outline-none focus:bg-white font-pj`}
                  name="email"
                  type="email"
                  placeholder="Email address"
                />
              </div>
              <SubmitBtn />
            </form>
          )}
        </Formik>

        <div className="mt-8 text-center">
          <div className="lg:mt-14">
            <span className="font-normal  text-black text-sm lg:text-base">
              {" "}
              Don't have an account?{" "}
              <span className="hover:underline">
                <Link href="/signup">Sign Up</Link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordForm;
