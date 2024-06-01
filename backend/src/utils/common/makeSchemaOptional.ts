import { Schema } from "express-validator";

// Function to make fields optional
export const makeSchemaOptional = (schema: Schema, otherFields?: (key:string)=> object): Schema => {
  const optionalSchema: Schema = {};
  for (const key in schema) {
    if (schema.hasOwnProperty(key)) { //eslint-disable-line
      optionalSchema[key] = {
        ...schema[key],
        optional: true,
        notEmpty: false, // Remove notEmpty check for optional fields
      };
      if (otherFields) {
        optionalSchema[key] = {
          ...optionalSchema[key],
          ...otherFields(key),
        };
      }
    }
  }
  return optionalSchema;
};
