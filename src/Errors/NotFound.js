import { NOT_FOUND_STATUS } from "../Models/Constants.js";
import ErrorBase from "./ErrorBase.js";

class NotFound extends ErrorBase {
  constructor(message = "Page not found") {
    super(message, NOT_FOUND_STATUS);
  }
}

export default NotFound;
