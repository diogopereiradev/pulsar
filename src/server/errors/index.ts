import { IError } from "~/@types/error";

export class ErrorMessages {
  static unauthorized(): IError {
    return {
      status: 401,
      message: 'Unauthorized'
    };
  }

  static notfound(): IError {
    return {
      status: 404,
      message: 'This data was not found'
    }
  }

  static internalserver(): IError {
    return {
      status: 500,
      message: 'Internal server error'
    };
  }

  static custom(status: number, message: string): IError {
    return {
      status,
      message
    }
  }
}