import { BAD_REQUEST_STATUS } from "../Models/Constants.js";
import ErrorBase from "./ErrorBase.js";

class ErrorRequest extends ErrorBase {
  constructor(message = "One or more fields are incorrect") {
    super(message, BAD_REQUEST_STATUS);
  }
}

export default ErrorRequest;
