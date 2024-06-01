import { useField } from "formik";
import React from "react";
import FieldErrorMessage from "./FieldErrorMessage";

interface MyTextInputProps {
  label?: string;
  name: string;
  className: string;
  type?: string;
  id?: string;
  placeholder: string
  autoComplete?: string;
}

export const MyTextInput = ({ label, ...props }: MyTextInputProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <input {...field} {...props} />
      {meta.touched && meta.error && <FieldErrorMessage
       message={meta.error} />}
    </>
  );
};
