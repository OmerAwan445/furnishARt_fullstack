import { useField } from "formik";
import React from "react";
import FieldErrorMessage from "./FieldErrorMessage";
import { TextField } from "@mui/material";

interface MyTextInputProps {
  label?: string;
  name: string;
  className: string;
  type?: string;
  id?: string;
  placeholder: string
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
}

export const MyTextInput = ({ label, ...props }: MyTextInputProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      {props.multiline ? <TextField {...field} {...props} /> : <input {...field} {...props} />}
      {meta.touched && meta.error && <FieldErrorMessage
       message={meta.error} />}
    </div>
  );
};
