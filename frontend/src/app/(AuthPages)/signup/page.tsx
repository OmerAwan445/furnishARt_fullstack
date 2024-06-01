export const dynamic = "force-dynamic";

import SignupForm from "@/components/AuthForms/SignupForm";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Join us today, <p className="text-2xl">free 14-day trial</p>
            </h1>

           {/*  <div className="flex justify-center flex-shrink-0 mt-8 -space-x-4 overflow-hidden">
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
            </div> */}

            <p className="px-4 mt-5 text-lg font-normal text-gray-900 sm:px-0 font-pj">
              See what other{" "}
              <span className="font-bold">4600+ Instructors</span> are doing
            </p>
          </div>

          <SignupForm />

          <p className="text-gray-700 mt-3">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Go back to login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
