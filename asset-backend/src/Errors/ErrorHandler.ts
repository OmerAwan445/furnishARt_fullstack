import { Response } from "express";
import { AppError } from "./AppError";

/**
 * It typically sits at the top level of your Express application and is used as middleware
 * to catch and process errors that occur during the request-response cycle.
 * It captures errors that are thrown or passed to the next() function in middleware etc.
 */
class ErrorHandler {
  responseStream: Response;
  error: AppError;

  constructor(responseStream: Response, error: AppError) {
    this.responseStream = responseStream;
    this.error = error;
  }

  async handleError() {
    await this.logError();
    return (
      (await this.crashIfUntrustedErrorOrSendResponse())
    );
  }

  async logError() {
    console.error(this.error, "error Logger");
  }

  async crashIfUntrustedErrorOrSendResponse() {
      if (this.error.statusCode === 500) this.error.message = "Internal Server Error";
      return this.responseStream.status(this.error.statusCode)
          .send(this.error.message); 
  }
}

export default ErrorHandler;