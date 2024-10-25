import { NOT_FOUND_STATUS } from "../Models/Constants.js";
import ErrorBase from "./ErrorBase.js";

class NotFound extends ErrorBase {
  constructor() {
    super("Page not found", NOT_FOUND_STATUS);
  }
}

export default NotFound;
