export const dynamic = "force-dynamic";

import SignupForm from "@/components/AuthForms/SignupForm";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="w-full sm:max-w-lg md:max-w-md xl:w-full xl:max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-2xl xl:text-3xl font-pj">
            Embark on a new journey in furniture shopping today.
            </h1>

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
