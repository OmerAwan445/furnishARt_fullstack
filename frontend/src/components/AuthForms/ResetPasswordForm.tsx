"use client";

import { MyPasswordInput } from "@/components/common/FormFields/MyPasswordInput";
import SubmitButton from "@/components/common/FormFields/SubmitBtn";
import useAuth from "@/hooks/useAuth";
import AuthSvs from "@/services/Auth";
import { ResetPasswordFormSchema } from "@/utils/FormValidations/ValidationSchemas";
import { Formik } from "formik";
import CustomToast from "../common/toasts/CustomToast";
import { handleClose } from "@/utils/toastHandleClose";
import { useRouter } from "next/navigation";

const ResetPasswordForm = ({ token }:{ token: string }) => {
  const initialValues = {
    new_password: "",
    confirm_password: "",
  };
  const router = useRouter();
  const { errorMessage, successMessage, isPending, mutate: resetPassword, clearMessages } = useAuth({ mutationFn: AuthSvs.resetPassword, onSuccess: () => setTimeout(() => router.push("/login"), 3000)});

  async function handleResetPassword(values: typeof initialValues) {
    const { new_password, confirm_password } = values;
    resetPassword({ password: new_password, confirm_password, token });
  }

  return (
    <>
    {(errorMessage || successMessage) && (
      <CustomToast
        open={!!successMessage || !!errorMessage}
        type={!!errorMessage ? "error" : "success"}
        handleClose={(event, reason) =>
          handleClose(clearMessages, event, reason)
        }
      >
        {successMessage || errorMessage}
      </CustomToast>
    )}
    <div  className="w-full flex-grow">
      <div className="text-center">
        <h4 className="xl:text-3xl lg:text-2xl text-2xl font-semibold xl:mt-5 lg:mt-5 mb-7 pb-1 dark:text-white">
          Set New Password{" "}
        </h4>
        <h4 className="text-xs sm:text-sm font-normal lg:mt-2 mb-16 pb-1 dark:text-white">
          Enter your new password
        </h4>
      </div>

      <Formik
        onSubmit={handleResetPassword}
        validationSchema={ResetPasswordFormSchema}
        initialValues={initialValues}
      >
        {({ errors, touched, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-5 mt-4 lg:mt-8">
            <div className="mb-4">
              <MyPasswordInput
                name="new_password"
                placeholder="Password"
                className={`${
                  touched && errors.new_password
                    ? "border-2 border-red-600 focus:border-red-600 focus:ring-0"
                    : "border-gray-300 focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                } block w-full px-4 py-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border rounded-xl bg-gray-50 outline-none focus:bg-white font-pj`}
              />
            </div>
            <MyPasswordInput
              name="confirm_password"
              placeholder="Confirm Password"
              className={`${
                touched.confirm_password && errors.confirm_password
                  ? "border-2 border-red-600 focus:border-red-600 focus:ring-0"
                  : "border-gray-300 focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
              } block w-full px-4 py-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border rounded-xl bg-gray-50 outline-none focus:bg-white font-pj"`}
            />
            <SubmitButton disabled={isPending}>
              {isPending ? "Loading..." : "Set New Password"}
            </SubmitButton>
          </form>
        )}
      </Formik>
    </div>
    </>
  );
};

export default ResetPasswordForm;
