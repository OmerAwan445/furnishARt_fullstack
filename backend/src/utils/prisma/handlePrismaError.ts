import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CustomError, ExtendedPrismaClientKnownRequestError } from "@src/Types";
import { isDevEnvironment } from "../common/isDevEnvironment";

export function handlePrismaError( error: PrismaClientKnownRequestError): CustomError {
  const prismaError = error as ExtendedPrismaClientKnownRequestError;
  const target = prismaError.meta?.target;
  prismaError.statusCode = 400;

  switch (prismaError.code) {
    case "P2002":
      // handling duplicate key errors
      prismaError.message = `Duplicate field value: ${target}`;
      break;
    case "P2014":
      // handling invalid id errors
      prismaError.message = `Invalid ID: ${target}`;
      break;
    case "P2003":
      // handling invalid data errors
      prismaError.message = `Invalid input data: ${target}`;
      break;
    case "P2025":
      // handling invalid data errors
      prismaError.message = `${error.meta?.modelName ?
        `${error.meta?.modelName} ${(error.meta?.cause as string ?? '')}` : "Record not found"}`;
      break;
    default:
      // handling all other errors
      prismaError.message = `An unexpected database error occurred. ${isDevEnvironment() ? prismaError.message : ''}`;
      prismaError.statusCode = 500;
  }

  return {
    ...error,
    statusCode: prismaError.statusCode || 500,
    message: prismaError.message,
  };
}
