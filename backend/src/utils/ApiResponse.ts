class ApiResponse {
  error: boolean;
  statusCode: number;
  message: string;
  data: any;
  count?: number;

  constructor(error: boolean, statusCode: number, message: string, data: any, count?: number) {
    this.error = error;
    this.statusCode = statusCode;
    this.message = message;
    this.count = count;
    this.data = data;
  }

  static success(data: any, message: string = 'Success', statusCode: number = 200, count?: number): ApiResponse {
    return new ApiResponse(false, statusCode, message, data, count);
  }

  static error(message: string = 'Internal Server Error', statusCode: number = 500, data? : any): ApiResponse {
    return new ApiResponse(true, statusCode, message, data ?? []);
  }
}

export default ApiResponse;
