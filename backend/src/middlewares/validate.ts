import { checkSchema, Schema, Location } from "express-validator";
import { validateRequestSchema } from "@src/middlewares/validate-request-schema";
import { RequestHandler } from "express";

// Utility to wrap schema validation and request schema validator
const validate = (schema: Schema, validationLocation: Location[]): RequestHandler[] => [
  ...checkSchema(schema, validationLocation), // Spread the array of validation chains
  validateRequestSchema, // Add the custom request schema validation middleware
];

export default validate;
