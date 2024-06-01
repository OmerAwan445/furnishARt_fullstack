import { useField } from "formik";
import React from "react";
import FieldErrorMessage from "./FieldErrorMessage";

interface MyPasswordInputProps {
  label?: string;
  name: string;
  className: string;
  id?: string;
  placeholder: string;
}

export const MyPasswordInput = ({
  label,
  ...props
}: MyPasswordInputProps) => {
  const [field, meta] = useField(props);

  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <input type="password" {...field} {...props} autoComplete="password" />
      {meta.touched && meta.error && (
          <FieldErrorMessage message={meta.error} />
        )}
    </>
  );
};
