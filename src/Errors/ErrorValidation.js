import ErrorRequest from "./ErrorRequest.js";

class ErrorValidation extends ErrorRequest {
  constructor(error) {
    const errorMessage = Object.values(error.errors)
      .map((erro) => erro.message)
      .join("; ");

    super(`Send request validation error - ${errorMessage}`);
  }
}

export default ErrorValidation;
