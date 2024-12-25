import { AuthError } from "next-auth";

export class ApiResponseError extends AuthError {
  code = "api_response";
  name = "ApiResponseError";
  constructor(message: string) {
    super(message);
    this.code = message;
    this.message = message;

    Object.setPrototypeOf(this, ApiResponseError.prototype);
  }
}
