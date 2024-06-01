"use client";
import { SigninUser } from "@/services/Auth";
import { LoginFormSchema } from "@/utils/FormValidations/ValidationSchemas";
import { Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ErrorMessageToast } from "@/components/common/ErrorMessageToast";
import { MyPasswordInput } from "../common/FormFields/MyPasswordInput";
import { MyTextInput } from "../common/FormFields/MyTextInput";
import { useMutation } from "@tanstack/react-query";


const LoginForm = () => {
  const saerchParams = useSearchParams();
  const initialValues = {
    username_or_email: "",
    password: "",
  };

  const [errorMessage, setErrorMessage] = useState("");
  const callbackUrl = saerchParams?.get("callbackUrl");

  const { mutate, isPending } = useMutation({ mutationFn: SigninUser });

  const handlerLogin = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    const { username_or_email, password } = values;
    mutate(
      { username_or_email, password },
      {
        onSuccess: (statusCode) => {
          // if (statusCode === 403) {
          //   setErrorMessage("Please verify your email address");
          //  // window.location.href = '/verify-email';
          // } else {
          //   window.location.href = callbackUrl || "/";
          // }
        },
        onError: (error) => {
          setErrorMessage(error.message);
          console.error(error.message, "login error");
        },
      }
    );
  };

  return (
    <>
      <Formik
        onSubmit={handlerLogin}
        validationSchema={LoginFormSchema}
        initialValues={initialValues}
      >
        {({ errors, touched, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="mt-8">
            <ErrorMessageToast
              setErrorMessage={setErrorMessage}
              errorMessage={errorMessage}
            />
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username_or_email"
                  className="text-base font-medium text-gray-900"
                >

                  Email address or Username
                </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <div
                    className={`${
                      touched.username_or_email && errors.username_or_email
                        ? "top-5"
                        : "inset-y-0 items-center"
                    } absolute left-0 flex pl-3 pointer-events-none`}
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>

                  <MyTextInput
                    id="username_or_email"
                    name="username_or_email"
                    type="text"
                    placeholder="Enter username or email to get started"
                    className={`${
                      touched.username_or_email && errors.username_or_email
                        ? "border-2 border-red-600 focus:border-red-600 focus:ring-0"
                        : "focus:border-blue-600 caret-blue-600 border border-gray-200"
                    }
             block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 focus:bg-white  rounded-md bg-gray-50 focus:outline-none placeholder:text-sm`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
                  >
                    {" "}
                    Forgot password?{" "}
                  </Link>
                </div>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <div
                    className={`${
                      touched.password && errors.password
                        ? "top-5"
                        : "inset-y-0 items-center"
                    } absolute left-0 flex pl-3 pointer-events-none`}
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                      />
                    </svg>
                  </div>
                  <MyPasswordInput
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className={`${
                      touched.password && errors.password
                        ? "border-2 border-red-600 focus:border-red-600 focus:ring-0"
                        : "focus:border-blue-600 caret-blue-600 border border-gray-200"
                    } block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 rounded-md bg-gray-50 focus:outline-none focus:bg-white placeholder:text-sm`}
                  />
                </div>
              </div>

              <button
                disabled={isPending}
                type="submit"
                className={`inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border rounded-md focus:outline-none ${
                  isPending
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-gradient-to-r from-fuchsia-600 to-blue-600 border-transparent hover:opacity-80 focus:opacity-80"
                }`}
              >
                {isPending ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
