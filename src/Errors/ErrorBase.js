import { INTERNAL_SERVER_ERROR_STATUS } from "../Models/Constants.js";

class ErrorBase extends Error {
  constructor(
    message = "Internal Server Error",
    status = INTERNAL_SERVER_ERROR_STATUS
  ) {
    super();
    this.message = message;
    this.status = status;
  }

  sendResponse(res) {
    res.status(this.status).send({
      message: this.message,
      status: this.status,
    });
  }
}

export default ErrorBase;
