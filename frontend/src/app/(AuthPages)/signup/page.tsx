export const dynamic = "force-dynamic";

import SignupForm from "@/components/SignupPage/SignupForm";
import I18nLink from "@/components/common/LocalizedLink";
import Image from "next/image";

export default function Signup() {
  return (
    <>
      <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Join us today, <p className="text-2xl">free 14-day trial</p>
            </h1>

            <div className="flex justify-center flex-shrink-0 mt-8 -space-x-4 overflow-hidden">
              <Image
                width={1000}
                height={1000}
                className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/avatar-male-1.png"
                alt=""
              />
              <Image
                width={1000}
                height={1000}
                className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/avatar-female-1.png"
                alt=""
              />
              <Image
                width={1000}
                height={1000}
                className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/avatar-female-2.png"
                alt=""
              />
              <Image
                width={1000}
                height={1000}
                className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/avatar-female-3.png"
                alt=""
              />
              <Image
                width={1000}
                height={1000}
                className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/avatar-male-2.png"
                alt=""
              />
              <Image
                width={1000}
                height={1000}
                className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/avatar-female-4.png"
                alt=""
              />
              <Image
                width={1000}
                height={1000}
                className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/avatar-female-5.png"
                alt=""
              />
            </div>

            <p className="px-4 mt-5 text-lg font-normal text-gray-900 sm:px-0 font-pj">
              See what other{" "}
              <span className="font-bold">4600+ Instructors</span> are doing
            </p>
          </div>

          <SignupForm />

          <p className="text-gray-700 mt-3">
            Already have an account?{" "}
            <I18nLink href="/login" className="text-blue-500 hover:underline">
              Go back to login
            </I18nLink>
          </p>
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
                  Sign up with Google
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
                  Sign up with Facebook
                </button>
              </div> */}
        </div>
      </div>
    </>
  );
}
