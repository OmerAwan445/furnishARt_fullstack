import LoginForm from "@/components/AuthForms/LoginForm";
import Link from "next/link";
import React, { Suspense } from "react";


export default function Login() {
  return (
    <Suspense>
      <div className="flex justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="w-full sm:max-w-lg md:max-w-md xl:w-full xl:max-w-md">
          <h2 className=" text-3xl lg:text-2xl xl:text-3xl font-bold leading-tight text-black sm:text-4xl">
          Unlock Exclusive Deals {"–"} <br/> Sign in to FurnishARt
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
            >
              Create a free account
            </Link>
          </p>

          <LoginForm />

          {/* <div className="mt-3 space-y-3">
            <button
              type="button"
              className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
            >
              <div className="absolute inset-y-0 left-0 p-4">
                <svg
                  className="w-6 h-6 text-rose-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </div>
              Sign in with Google
            </button>

            <button
              type="button"
              className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
            >
              <div className="absolute inset-y-0 left-0 p-4">
                <svg
                  className="w-6 h-6 text-[#2563EB]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
              </div>
              Sign in with Facebook
            </button>
          </div> */}
        </div>
      </div>
    </Suspense>
  );
}
