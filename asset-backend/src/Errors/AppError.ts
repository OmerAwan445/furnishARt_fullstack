
export class AppError extends Error { // Custom Error class
  isOperational:boolean;
  statusCode:number;

  constructor( message: string, statusCode: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = true;
    // Capture the stack trace
    Error.captureStackTrace(this);
  }
}
