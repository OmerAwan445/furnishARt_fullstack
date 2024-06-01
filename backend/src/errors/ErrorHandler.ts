import { CustomError } from "@src/Types";
import ApiResponse from "@utils/ApiResponse";
import { Response } from "express";
import { AppError } from "./AppError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { handlePrismaError } from "@src/utils/prisma/handlePrismaError";
import { isDevEnvironment } from "@src/utils/common/isDevEnvironment";

/**
 * It typically sits at the top level of your Express application and is used as middleware
 * to catch and process errors that occur during the request-response cycle.
 * It captures errors that are thrown or passed to the next() function in middleware etc.
 */
class ErrorHandler {
  responseStream: Response;
  error: CustomError | AppError;

  constructor(responseStream: Response, error: CustomError | AppError) {
    this.responseStream = responseStream;
    this.error = error;
  }

  async handleError() {
    await this.logError();
    return (
      await this.checkForDatabaseErrorAndSendResponse() ||
      await this.crashIfUntrustedErrorOrSendResponse()
    );
  }

  async logError() {
    console.error(this.error, "error Logger");
  }

  async crashIfUntrustedErrorOrSendResponse() {
    if (this.error instanceof AppError) {
      return this.responseStream
          .status(this.error.statusCode)
          .send(errorResponseObj(this.error));
      /*
  ======= To Catch the Prisma Unique Constraint Errors from db (useful to catch if 3 or more fields are unique) =======
      */
      // if (this.error instanceof Prisma.PrismaClientKnownRequestError && this.error.code === 'P2002') {
      //   // Unique constraint violation error
      //   const modelName = this.error.meta?.modelName;
      //   const targetFields = this.error.meta?.target as [] || [];
      //   const errorMessage = `The ${targetFields.join(', ')} in ${modelName} must be unique`;
      //   return this.responseStream.status(400).send(ApiResponse.error(errorMessage, 400));
      // }
    } else {
      // crash the application
      this.error.statusCode = 500;
      if (isDevEnvironment()) {
        return this.responseStream
            .status(500)
            .send(errorResponseObj(this.error));
      } else {
        this.error.message = "Internal Server Error";
        return this.responseStream
            .status(500)
            .send(errorResponseObj(this.error));
      }
    }
  }

  async checkForDatabaseErrorAndSendResponse() {
    if (!(this.error instanceof PrismaClientKnownRequestError) ) return null;
    const error = handlePrismaError(this.error);
    return this.responseStream.status(error.statusCode).send(errorResponseObj(error));
  }
}

export default ErrorHandler;

/*
 * Generates an error response object based on the provided error.
 * Returns a different error response object depending on the development environment.
 */
function errorResponseObj(error: AppError | CustomError) {
  if (isDevEnvironment()) {
    return {
      ...error,
      error: true,
      message: error.message,
      stack: error.stack,
      data: [],
    };
  } else {
    return ApiResponse.error(error.message, error.statusCode);
  }
}


/* const handlePrismaError = (err) => {
    switch (err.code) {
        case 'P2002':
            // handling duplicate key errors
            return new CustomError(`Duplicate field value: ${err.meta.target}`, 400);
        case 'P2014':
            // handling invalid id errors
            return new CustomError(`Invalid ID: ${err.meta.target}`, 400);
        case 'P2003':
            // handling invalid data errors
            return new CustomError(`Invalid input data: ${err.meta.target}`, 400);
        default:
            // handling all other errors
            return new CustomError(`Something went wrong: ${err.message}`, 500);
    }
};

const handleJWTError = () => new CustomError('Invalid token please login again', 400);

const handleJWTExpiredError = () => new CustomError('Token has expired please login again', 400);

const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        res.status(err.statusCode).json({
            status: err.status,
            errors: err,
            message: err.message,
            stack: err.stack,
        });
    } else {
        //rendered website
        res.status(err.statusCode).render('error', { title: 'Something went wrong!', msg: err.message });
    }
};

const sendErrorProd = (err, req, res) => {


    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational)
            return res.status(err.statusCode).json({ status: err.status, message: err.message });

        //programming errors dont leak details
        console.error('ERROR 💥', err);

        return res.status(400).json({ status: ' error', message: 'Please try again later' });
    }

    //for rendered website
    if (err.isOperational)
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    //programming errors should not leak details to client

    return res.status(500).json({ status: ' error', message: 'Sommething went wrong' });
};

const errorHandler = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500; //default status code for an error
    err.status = err.status || 'error'; //default status
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };

        error.message = err.message;
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            console.log("handlePrismaError")
            error = handlePrismaError(err);

        } else if (error.name === 'JsonWebTokenError') {
            error = handleJWTError();
        } else if (error.name === 'TokenExpiredError') {
            error = handleJWTExpiredError();
        }
        sendErrorProd(error, req, res);
    }
};

export default errorHandler */
