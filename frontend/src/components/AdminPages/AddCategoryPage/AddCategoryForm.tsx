"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "@/components/common/FormFields/MyTextInput";
import { AddCategoryFormSchema } from "@/utils/FormValidations/ValidationSchemas";
import GradientButton from "@/components/common/buttons/GradientButton";
import { useMutation } from "@tanstack/react-query";
import CategorySvs from "@/services/Category";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { SnackBarActions } from "@/store/Slices/SnackBarSlice";

  const AddCategoryForm = () => {

  const initialValues = { name: "" };
  const { addMessage } = SnackBarActions;
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: CategorySvs.addCategory,
    onSettled(data) {
      dispatch(
        addMessage({
          message: data?.message ?? "",
          type: data?.error ? "error" : "success",
        })
      );
    },
  });
  

  const onSubmit = (values: typeof initialValues) => mutate(values.name);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddCategoryFormSchema}
      onSubmit={(values, { resetForm }) => {
        // Call the onSubmit handler passed as a prop
        onSubmit(values);
        resetForm();
      }}
    >
      {({ touched, errors }) => (
        <Form className="w-full space-y-4 mt-10 p-4 border rounded-lg bg-white shadow-md">
          {/* Category Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <MyTextInput
              id="name"
              name="name"
              placeholder="Enter category name"
              className={`${
                touched.name && errors.name
                  ? "border-red-600 focus:ring-red-600"
                  : "border-gray-300 focus:ring-blue-500"
              } block w-full mt-1 rounded-md border p-2 placeholder:text-gray-400 focus:outline-none`}
            />
          </div>

          <div>
            <GradientButton type="submit">Add Category</GradientButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddCategoryForm;
