class ApiResponse {
  error: boolean;
  statusCode: number;
  message: string;
  data: any;

  constructor(error: boolean, statusCode: number, message: string, data: any) {
    this.error = error;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(data: any, message: string = 'Success', statusCode: number = 200): ApiResponse {
    return new ApiResponse(false, statusCode, message, data);
  }

  static error(message: string = 'Internal Server Error', statusCode: number = 500, data? : any): ApiResponse {
    return new ApiResponse(true, statusCode, message, data ?? []);
  }
}

export default ApiResponse;
